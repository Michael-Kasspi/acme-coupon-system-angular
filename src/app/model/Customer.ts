import {User} from './User';
import {UserType} from './UserType';
import {Coupon} from './Coupon';

export class Customer extends User {

    private _id: number = 0;
    private _coupons: Coupon[] = null;
    private _cart: Coupon[] = null;
    private _wishlist: Coupon[] = null;

    constructor(input?: any) {
        super(UserType.CUSTOMER);
        if (input != null) {
            this.deserialize(input);
        }
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    get serialize(): Object {
        return {
            id: this.id,
            type: UserType.CUSTOMER,
            coupons: this.coupons,
            cart: this.cart,
            wishlist: this.wishlist
        };
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get coupons(): Coupon[] {
        return this._coupons;
    }

    set coupons(value: Coupon[]) {
        this._coupons = value;
    }

    get cart(): Coupon[] {
        return this._cart;
    }

    set cart(value: Coupon[]) {
        this._cart = value;
    }

    get wishlist(): Coupon[] {
        return this._wishlist;
    }

    set wishlist(value: Coupon[]) {
        this._wishlist = value;
    }
}
