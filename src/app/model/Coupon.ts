import {Company} from './Company';
import {Deserializable} from './Deserializable';
import {Category} from './Category';

export class Coupon implements Deserializable {
    private _id: number = 0;
    private _company: Company = null;
    private _category: Category = null;
    private _title: string = '';
    private _description: string = '';
    private _startDate: Date = null;
    private _endDate: Date = null;
    private _amount: number = 0;
    private _price: number = 0;
    private _imageUrl: string = '';
    private _imagePreview: any = null;

    constructor(input?: any) {
        if (input != null) {
            this.deserialize(input);
        }
    }

    deserialize(input: any): this {
        Object.assign(this, input);

        if (this.category === null) {
            this.category = new Category(this.category);
        }

        if (this.company === null) {
            this.company = new Company(this.company);
        }

        this.startDate = new Date(this._startDate);
        this.endDate = new Date(this._endDate);
        return this;
    }

    serialize(): Object {
        function serializeDate(date: Date): string {
            let hoursDiff = date.getHours() - date.getTimezoneOffset() / 60;
            let minutesDiff = (date.getHours() - date.getTimezoneOffset()) % 60;
            date.setHours(hoursDiff);
            date.setMinutes(minutesDiff);
            return date.toJSON();
        }

        return {
            id: this.id,
            company: this.company,
            category: this.category,
            title: this.title,
            description: this.description,
            startDate: serializeDate(this.startDate),
            endDate: serializeDate(this.endDate),
            amount: this.amount,
            price: this.price,
            imageUrl: this.imageUrl
        };
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get company(): Company {
        return this._company;
    }

    set company(value: Company) {
        this._company = value;
    }

    get category(): Category {
        return this._category;
    }

    set category(value: Category) {
        this._category = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get startDate(): Date {
        return this._startDate;
    }

    set startDate(value: Date) {
        this._startDate = value;
    }

    get endDate(): Date {
        return this._endDate;
    }

    set endDate(value: Date) {
        this._endDate = value;
    }

    get amount(): number {
        return this._amount;
    }

    set amount(value: number) {
        this._amount = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    get imagePreview(): any {
        return this._imagePreview;
    }

    set imagePreview(value: any) {
        this._imagePreview = value;
    }

    get isInStock(): boolean {
        return this?.amount > 0;
    }
}
