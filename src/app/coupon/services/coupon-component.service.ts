import {Injectable} from '@angular/core';
import {Coupon} from '../../model/Coupon';
import {first, tap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {CartEvent, CartEventAdd, CartEventCheckout, CartEventRemove, CartService} from '../../cart/services/cart.service';
import {EndpointService} from '../../endpoint/endpoint.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Company} from '../../model/Company';
import {Category} from '../../model/Category';
import {SessionService} from '../../auth/session/session.service';
import {UserType} from '../../model/UserType';
import {User} from '../../model/User';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CouponComponentService {

    public inCart: boolean = false;
    public inWishList: boolean = false;
    public showEditButton: boolean = false;
    private _coupon: Coupon = null;
    private cartEventsSubscription$: Subscription = null;

    constructor(
        private endpoint: EndpointService,
        private snackBar: MatSnackBar,
        private cartService: CartService,
        private sessionService: SessionService,
        private router: Router
    ) {
    }

    onInit(): void {
        this.isInCart$().subscribe();
        this.handleCartEvents();
        this.checkAllowedToEdit();
    }

    onDestroy(): void {
        this.showEditButton = false;
        this.inCart = false;
        this.inWishList = false;
        this.cartEventsSubscription$.unsubscribe();
    }

    public onCartClick(): void {
        this.isInCart$().pipe(first()).subscribe(inCart => {
            if (inCart) {
                this.removeFromCart();
            } else {
                this.addToCart();
            }
        });
    }

    public onWishlistClick(): void {
        this.inWishList = !this.inWishList;
    }

    public addToCart(): void {
        this.inCart = true;
        this.cartService.addCoupon$(this.coupon).pipe(first())
            .subscribe({error: () => this.inCart = false});
    }

    public removeFromCart(): void {
        this.inCart = false;
        this.cartService.removeCoupon$(this.coupon.id).pipe(first())
            .subscribe({error: () => this.inCart = true});
    }

    public isInCart$(): Observable<boolean> {
        return this.cartService
            .isInCart$(this.coupon.id)
            .pipe(first(), tap(inCart => {
                this.inCart = inCart;
            }));
    }

    public navigateToEditCoupon(): void {
        this.sessionService.userType$().pipe(first()).subscribe(userType => {
            if (userType === UserType.ADMIN) {
                this.router.navigate([`/dashboard/admin/coupons/edit/${this.coupon.id}`]);
                return;
            }

            if (userType === UserType.COMPANY) {
                this.router.navigate([`/dashboard/company/coupons/edit/${this.coupon.id}`]);
                return;
            }
        })
    }

    public get coupon(): Coupon {
        return this._coupon;
    }

    public set coupon(value: Coupon) {
        this._coupon = value;
    }

    public get imageUrl(): string {
        return this.generateImageUrl(this?.coupon?.imageUrl);
    }

    public get companyLogoUrl(): string {
        return this.generateImageUrl(this?.company?.imageUrl);
    }

    public get couponPageUrl(): string {
        return `/coupons/page/${this?.coupon?.id}`;
    }

    public get companyName(): string {
        return this.company?.name;
    }

    public get couponTitle(): string {
        return this.coupon?.title;
    }

    public get companyProfileUrl(): string {
        return `/companies/profiles/${this.company?.id}`;
    }

    public get category(): Category {
        return this?.coupon?.category;
    }

    public get couponCategoryName(): string {
        return this?.category?.name;
    }

    public get categoryUrl(): string {
        return `/categories/${this.category.id}`;
    }

    public get description(): string {
        return this?.coupon?.description;
    }

    public get startDate(): Date {
        return this?.coupon?.startDate;
    }

    public get endDate(): Date {
        return this?.coupon?.endDate;
    }

    private get company(): Company {
        return this.coupon?.company;
    }

    private generateImageUrl(url: string): string {
        return url ? `${this.endpoint.res}${url}` : '';
    }

    private handleCartEvents(): void {
        this.cartEventsSubscription$ = this.cartService.cartEvents$()
            .subscribe((event: CartEvent<Coupon | Coupon[]>) => {
                switch (true) {
                    case event instanceof CartEventAdd:
                        const addedCoupon = event.payload as Coupon;
                        if (this.coupon.id === addedCoupon.id) {
                            this.inCart = true;
                        }
                        break;
                    case event instanceof CartEventRemove:
                        const removedCoupon = event.payload as Coupon;
                        if (this.coupon.id === removedCoupon.id) {
                            this.inCart = false;
                        }
                        break;
                    case event instanceof CartEventCheckout:
                        this.inCart = false;
                        break;
                }
            });
    }

    private checkAllowedToEdit(): void {
        const user: User = this.sessionService.user;
        if (user === null) {
            return;
        }

        if (user.type === UserType.ADMIN) {
            this.showEditButton = true;
            return;
        }

        if (user.type === UserType.COMPANY) {
            const company: Company = user as Company;
            this.showEditButton = company.id === this.company?.id;
        }
    }
}
