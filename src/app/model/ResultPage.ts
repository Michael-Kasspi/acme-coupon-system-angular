import {Deserializable} from './Deserializable';

export class ResultPage<T extends Deserializable> implements Deserializable {

    private _content: T[] = [];
    private _empty: boolean = false;
    private _first: boolean = false;
    private _last: boolean = false;
    private _number: number = 0;
    private _numberOfElements: number = 0;
    private _size: number = 0;
    private _totalElements: number = 0;
    private _totalPages: number = 0;

    constructor(result: any) {
        if (result) {
            this.deserialize(result);
        }
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }

    get content(): T[] {
        return this._content;
    }

    set content(value: T[]) {
        this._content = value;
    }

    get empty(): boolean {
        return this._empty;
    }

    set empty(value: boolean) {
        this._empty = value;
    }

    get first(): boolean {
        return this._first;
    }

    set first(value: boolean) {
        this._first = value;
    }

    get last(): boolean {
        return this._last;
    }

    set last(value: boolean) {
        this._last = value;
    }

    get number(): number {
        return this._number;
    }

    set number(value: number) {
        this._number = value;
    }

    get numberOfElements(): number {
        return this._numberOfElements;
    }

    set numberOfElements(value: number) {
        this._numberOfElements = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    get totalElements(): number {
        return this._totalElements;
    }

    set totalElements(value: number) {
        this._totalElements = value;
    }

    get totalPages(): number {
        return this._totalPages;
    }

    set totalPages(value: number) {
        this._totalPages = value;
    }
}
