import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../../auth/session/session.service';
import {CustomerService} from '../../customer/services/customer.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Coupon} from '../../model/Coupon';
import {Observable, Subject} from 'rxjs';
import {UserType} from '../../model/UserType';
import {finalize, first, merge, startWith} from 'rxjs/operators';
import {Account} from '../../model/Account';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private _coupons: Coupon[] = [];
    private _coupons$: Subject<Coupon[]> = new Subject();
    private _fetching: boolean = false;
    private _fetching$: Subject<boolean> = new Subject();
    private _cartEvents$: Subject<CartEvent<Coupon | Coupon[]>> = new Subject();

    constructor(
        private client: HttpClient,
        private sessionService: SessionService,
        private customerService: CustomerService,
        private snackBar: MatSnackBar
    ) {
        this._manageCouponsArray();
    }

    /**
     * This method is used to fetch the cart coupons from the server
     * and update all the active subscribers.
     *
     */
    public getCoupons$(): Observable<Coupon[]> {
        return this._coupons$.asObservable().pipe(merge<Coupon[]>(
            new Observable(subscriber => {
                this.sessionService.userType$()
                    .pipe(first())
                    .subscribe(userType => {
                        if (userType !== UserType.CUSTOMER) {
                            subscriber.next(this._coupons);
                            subscriber.complete();
                            this._notifyCouponListeners();
                            return;
                        }

                        this._isFetching$()
                            .pipe(first(fetching => fetching === false))
                            .subscribe(_ => {
                                this.fetching = true;
                                this.customerService.getCartCoupons()
                                    .pipe(finalize(() => this.fetching = false))
                                    .subscribe((coupons: Coupon[]) => {
                                        this._coupons = coupons;
                                        this.fetching = false;
                                        subscriber.next(this._coupons);
                                        subscriber.complete();
                                        this._notifyCouponListeners();
                                        this._cartEvents$.next(new CartEventFetched(this._coupons));
                                    });
                            });
                    });
            })
        ));
    }

    /**
     * This method checks if the coupon is in the cart.
     * If the user is not customer the subscriber will always receive false.
     * If the user is customer the coupon is searched in the array.
     * The method might be called when the coupons are still being fetched from the database.
     * The method will wait until the fetching is done and only then it will check if the coupon is in the cart.
     * @param couponId the id of coupon.
     */
    public isInCart$(couponId: number): Observable<boolean> {
        return new Observable(subscriber => {
            this.sessionService.userType$().pipe(first()).subscribe(userType => {
                if (userType !== UserType.CUSTOMER) {
                    subscriber.next(false); /*the user is not customer so no coupons in the cart*/
                }

                this._isFetching$()
                    .pipe(first(fetching => fetching === false)) /*waiting for the fetching to be done*/
                    .subscribe(_ => {
                        /*searching for the coupon by id*/
                        const coupon = this._coupons.find(coupon => coupon.id === couponId);
                        subscriber.next(coupon !== undefined); /*if the result is undefined the coupon is not found*/
                    });
            });
        });
    }

    /**
     * This method add the coupon to the cart.
     * If the user is not a customer an error message will be shown and the observable will return an error as well.
     * First the coupon is added to the coupons array in memory to reflect changes immediately for user experience.
     * If the the request errors the coupon is removed from the array in memory.
     * @param coupon the coupon to be added to the cart.
     */
    public addCoupon$(coupon: Coupon): Observable<Coupon> {
        return new Observable(subscriber => {
            this.sessionService.userType$().pipe(first()).subscribe(userType => {
                switch (userType) {
                    case UserType.GUEST:
                        this.snackBar.open('Please sign-in in order to add coupons to cart');
                        subscriber.error();
                        break;
                    case UserType.CUSTOMER:
                        this._isFetching$().pipe(first(fetching => fetching === false))
                            .subscribe(_ => {
                                const duplicate = this._coupons.find(couponInArray => couponInArray.id === coupon.id);
                                if (duplicate !== undefined) {
                                    this.snackBar.open('This coupon is already present in the cart');
                                    subscriber.error();
                                    return;
                                }
                                const index = this._coupons.push(coupon) - 1;
                                this._notifyCouponListeners();
                                this._cartEvents$.next(new CartEventAdd(coupon));
                                this.customerService
                                    .addCouponToCart(coupon.id)
                                    .subscribe(
                                        (coupon: Coupon) => {
                                            this.snackBar.open('The coupon has been added to the cart');
                                            subscriber.next(coupon);
                                            subscriber.complete();
                                        },
                                        error => {
                                            this._coupons.splice(index, 1);
                                            this._notifyCouponListeners();
                                            this._cartEvents$.next(new CartEventRemove(coupon));
                                            subscriber.error(error);
                                        });
                            });
                        break;
                    default:
                        this._displayErrorMessage(userType);
                        subscriber.error();
                        break;
                }
            });
        });
    }

    /**
     * This method removes the coupon from the cart.
     * If the user is not a customer an error message will be shown and the observable will return an error as well.
     * First the coupon is removed from the coupons array in memory to reflect changes immediately for user experience.
     * If the the request errors the coupon is put back to the array in memory.
     * @param couponId the id of the coupon to be removed.
     */
    public removeCoupon$(couponId: number): Observable<any> {
        return new Observable(subscriber => {
            this.sessionService.userType$().pipe(first()).subscribe(userType => {
                if (userType === UserType.CUSTOMER) {
                    this._isFetching$().pipe(first(fetching => fetching === false))
                        .subscribe(_ => {
                            const index = this._coupons.findIndex(coupon => coupon.id === couponId);
                            const removedCouponArray: Coupon[] = this._coupons.splice(index, 1);
                            this._notifyCouponListeners();
                            if (removedCouponArray.length === 0) {
                                this.snackBar.open('This coupon is not present in the cart');
                                subscriber.error();
                            }
                            const removedCoupon = removedCouponArray[0];

                            this._cartEvents$.next(new CartEventRemove(removedCoupon));
                            this.customerService.removeCouponFromCart(couponId)
                                .subscribe(
                                    value => {
                                        this.snackBar.open('The coupon has been removed from the cart');
                                        subscriber.next(value);
                                        subscriber.complete();
                                    },
                                    error => {
                                        /*put back the coupon since the server didn't complete the request*/
                                        this._coupons.push(removedCoupon);
                                        this._notifyCouponListeners();
                                        this._cartEvents$.next(new CartEventAdd(removedCoupon));
                                        subscriber.error(error);
                                    });
                        });
                } else {
                    this.snackBar.open('Unable to remove coupon from cart, unsupported user type: ' + userType);
                }
            });
        });
    }

    /**
     * This method purchases all the coupons in the cart.
     * Only customers can checkout, other users will receive an error message and the observable will error as well.
     * The cart must contain at least one coupon to complete the checkout.
     * The cart is cleared after the checkout is successful.
     */
    public checkout$(): Observable<Account> {
        return new Observable(subscriber => {
            this.sessionService.userType$()
                .pipe(first())
                .subscribe(userType => {
                    if (userType !== UserType.CUSTOMER) {
                        this.snackBar.open('Only customers can complete the checkout');
                        subscriber.error();
                        return;
                    }

                    if (this._coupons.length === 0) {
                        this.snackBar.open('Unable to checkout: no coupons in the cart');
                        subscriber.error();
                        return;
                    }
                    this.customerService.purchaseCoupons(this._coupons)
                        .subscribe((account: Account) => {
                            const purchasedCoupons = this._coupons.slice(0);
                            this._coupons.length = 0;
                            this._notifyCouponListeners();
                            this._cartEvents$.next(new CartEventCheckout(purchasedCoupons));
                            subscriber.next(account);
                            subscriber.complete();
                        });
                });
        });
    }

    cartEvents$(): Observable<CartEvent<Coupon | Coupon[]>> {
        return this._cartEvents$.asObservable();
    }

    /**
     * This method is used to manage the coupons array by keeping track of the user type.
     * If the user signs in the coupons are fetched.
     * If the user signs out the coupons are cleared.
     *
     * @private
     */
    private _manageCouponsArray(): void {
        this.sessionService.userType$().subscribe(userType => {
            if (userType === UserType.CUSTOMER) {
                /*fetch the coupons after the user signs in*/
                this.getCoupons$().pipe(first()).subscribe();
            } else {
                /*clear the array after the user sign out*/
                this._coupons.length = 0;
            }
        });
    }

    private _displayErrorMessage(userType) {
        /*capitalize first letter*/
        userType = userType.charAt(0).toUpperCase() + userType.slice(1);
        this.snackBar.open(`${userType} is not allowed to add coupons to cart`);
    }

    private _isFetching$(): Observable<boolean> {
        return this._fetching$.asObservable().pipe(startWith(this._fetching));
    }

    private _notifyCouponListeners() {
        this._coupons$.next(this._coupons);
    }

    private set fetching(value: boolean) {
        this._fetching = value;
        this._fetching$.next(value);
    }
}

export abstract class CartEvent<T> {
    private readonly _payload: T = null;

    protected constructor(payload: T) {
        this._payload = payload;
    }

    get payload(): T {
        return this._payload;
    }
}

export class CartEventAdd extends CartEvent<Coupon> {

    constructor(payload: Coupon) {
        super(payload);
    }
}

export class CartEventRemove extends CartEvent<Coupon> {

    constructor(payload: Coupon) {
        super(payload);
    }
}

export class CartEventFetched extends CartEvent<Coupon[]> {

    constructor(payload: Coupon[]) {
        super(payload);
    }
}

export class CartEventCheckout extends CartEvent<Coupon[]> {

    constructor(payload: Coupon[]) {
        super(payload);
    }
}
