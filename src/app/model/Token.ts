import {Deserializable} from "./Deserializable";
import {Account} from "./Account";

export class Token implements Deserializable {

    private _token: String;
    private _account: Account;

    constructor(input: any = null) {
        if (input !== null){
            this.deserialize(input);
        }
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        this.account = new Account(this.account);
        return this;
    }

    get token(): String {
        return this._token;
    }

    set token(value: String) {
        this._token = value;
    }

    get account(): Account {
        return this._account;
    }

    set account(value: Account) {
        this._account = value;
    }
}
