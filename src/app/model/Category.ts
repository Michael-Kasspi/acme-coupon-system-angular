import { Deserializable } from './Deserializable';

export class Category implements Deserializable{

    private _id: number;
    private _name: string;
    private _description: string;

    constructor(input?: any) {
        if (input != null) {
            this.deserialize(input)
        }
    }

    get serialize(): Object {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        }
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
}
