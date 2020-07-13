import { Deserializable } from './Deserializable';

export class Category implements Deserializable{
    public id: number;
    public name: string;

    constructor(input?: any) {
        if (input != null) {
            this.deserialize(input)
        }
    }

    deserialize(input: any): this {
       return Object.assign(this, input);
    }
}
