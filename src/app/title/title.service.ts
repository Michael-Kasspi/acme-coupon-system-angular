import {Injectable} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class TitleService {

    private static readonly MAIN_TITLE: String = 'Acme Coupon System';

    constructor(private titleService: Title) {
    }

    public append(titlePrefix: string): void {
        const title = titlePrefix + ' | ' + TitleService.MAIN_TITLE;
        this.set(title);
    }

    public set(title) {
        this.titleService.setTitle(title);
    }
}
