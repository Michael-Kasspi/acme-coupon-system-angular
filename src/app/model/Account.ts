import {User} from './User';
import {Serializable} from "./Serializable";
import {Deserializable} from './Deserializable';
import {UserFactory} from './UserFactory';

export class Account implements Serializable ,Deserializable {
    private _id: number = 0;
    private _email: string = null;
    private _firstName: string = null;
    private _lastName: string = null;
    private _credit: number = 0;
    private _user: User = null;
    private _profilePictureUrl: string = null;

    constructor(input?: any) {

        if (input != null) {
            this.deserialize(input);
        }
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        if (this.user !== null) {
            this.user = UserFactory.get(input.user.type).deserialize(input.user);
        }

        return this;
    }

    serialize(): Object {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            credit: this.credit,
            user: this.user,
        }
    }

    get fullName(): String {
        return (this.firstName || '') + ' ' + (this.lastName || '');
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get credit(): number {
        return this._credit;
    }

    set credit(value: number) {
        this._credit = value;
    }

    get user(): User {
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }

    get profilePictureUrl(): string {
        return this._profilePictureUrl;
    }

    set profilePictureUrl(value: string) {
        this._profilePictureUrl = value;
    }
}
