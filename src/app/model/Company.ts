import {User} from './User';
import {UserType} from './UserType';

export class Company extends User{

    private _id: number = 0;
    private _name: string = null;
    private _description: string = null;
    private _imageUrl: string = null;
    private _imagePreview: string = null;

    constructor(input?: any) {

        super(UserType.COMPANY);

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
            type: UserType.COMPANY,
            id: this.id,
            name: this.name,
            description: this.description
        }
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    set imageUrl(value: string) {
        this._imageUrl = value;
    }

    get imagePreview(): string {
        return this._imagePreview;
    }

    set imagePreview(value: string) {
        this._imagePreview = value;
    }
}
