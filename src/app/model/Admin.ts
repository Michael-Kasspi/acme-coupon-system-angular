import {User} from './User';
import {UserType} from './UserType';

export class Admin extends User {

    private _id: number;
    private _main: boolean;

    constructor(input?: any) {

        super(UserType.ADMIN);

        if (input != null) {
            this.deserialize(input);
        }
    }

    get serialize(): Object {
        return {
            id: this.id,
            type: UserType.ADMIN,
            main: this.main
        };
    }

    deserialize(input: any): this {
        return Object.assign(this, input);
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get main(): boolean {
        return this._main;
    }

    set main(value: boolean) {
        this._main = value;
    }
}
