import {UserType} from "./UserType";
import {Account} from "./Account";
import {Deserializable} from "./Deserializable";

export class Session {

    private _userType: UserType = null;
    private _empty: boolean = false;

    private static EMPTY_SESSION: Session = null;

    constructor(userType?: UserType) {
        this.userType = userType;
    }

    public static empty(): Session {

        if (Session.EMPTY_SESSION !== null) {
            return Session.EMPTY_SESSION;
        }

        let session = new Session();
        session.empty = true;
        session.userType = UserType.GUEST;

        return Session.EMPTY_SESSION = session;
    }

    get userType(): UserType {
        return this._userType;
    }

    set userType(value: UserType) {
        this._userType = value;
    }

    get empty(): boolean {
        return this._empty;
    }

    set empty(value: boolean) {
        this._empty = value;
    }
}
