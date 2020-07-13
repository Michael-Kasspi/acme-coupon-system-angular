import { UserType } from './UserType';
import { Deserializable } from './Deserializable';

export abstract class User implements Deserializable {

    protected constructor(public _type?: UserType) {}

    abstract deserialize(input: any): this;

    get type(): UserType {
        return this._type;
    }

    set type(value: UserType) {
        this._type = value;
    }

}
