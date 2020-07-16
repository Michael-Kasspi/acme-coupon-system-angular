import {Deserializable} from './Deserializable';

export abstract class User implements Deserializable {

    protected constructor(public _type?: string) {}

    abstract deserialize(input: any): this;

    abstract get serialize(): Object;

    abstract get id(): number;

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

}
