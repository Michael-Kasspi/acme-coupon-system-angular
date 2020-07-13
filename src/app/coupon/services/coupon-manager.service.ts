import {Injectable} from '@angular/core';
import {CouponRestService} from './interfaces/CouponRestService';
import {SessionService} from '../../auth/session/session.service';
import {filter, finalize, first, flatMap, map, tap} from 'rxjs/operators';
import {UserType} from '../../model/UserType';
import {Observable, of, throwError} from 'rxjs';
import {AdminService} from '../../admin/services/admin.service';
import {CompanyService} from '../../company/services/company.service';
import {Coupon} from '../../model/Coupon';
import {WarningDialogComponent} from '../../dialog/warning-dialog/warning-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Category} from '../../model/Category';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CouponManagerService {

    private coupons: Coupon[] = null;
    private lastAddedCoupon: Coupon = null;
    private _uploadProgressPercentage: number = undefined;

    constructor(
        private sessionService: SessionService,
        private adminService: AdminService,
        private companyService: CompanyService,
        private dialog: MatDialog,
        private progressBar: ManualProgressBarService,
        private snackBar: MatSnackBar,
    ) {
    }

    public deleteCoupon(coupon: Coupon): Observable<any> {
        return new Observable<any>(subscriber => {
            this.openDeleteDialog()
                .afterClosed().subscribe(isDelete => {
                if (!isDelete) {
                    subscriber.complete();
                    return;
                }
                this.service.subscribe(service => {
                    this.progressBar.status = true;
                    service.deleteCoupon(coupon.id)
                        .pipe(finalize(() => this.progressBar.status = false))
                        .subscribe(success => {
                            this.snackBar.open('The coupon has been deleted successfully');
                            subscriber.next();
                            subscriber.complete();
                        });
                }, error => subscriber.error(error));
            });
        });
    }

    public addCoupon(coupon: Coupon, image: File): Observable<Coupon> {
        return new Observable<Coupon>(subscriber => {
            this.service.subscribe(service => {
                this.progressBar.status = true;
                const imagePreview = coupon.imagePreview;
                service.addCoupon(coupon)
                    .pipe(finalize(() => {
                        this.progressBar.status = false;
                    }))
                    .subscribe((coupon: Coupon) => {
                        coupon.imagePreview = imagePreview;
                        this.lastAddedCoupon = coupon;
                        subscriber.next(coupon);
                        this.snackBar.open('The coupon has been added successfully');
                        if (image) {
                            this._uploadImage(this.lastAddedCoupon, image, subscriber);
                        } else {
                            subscriber.complete();
                        }
                    }, subscriber.error);
            }, subscriber.error);
        });
    }

    public updateCoupon(coupon: Coupon): Observable<Coupon> {
        return new Observable<Coupon>(subscriber => {
            this.service.subscribe(service => {
                this.progressBar.status = true;
                service.updateCoupon(coupon)
                    .pipe(finalize(() => {
                        this.progressBar.status = false;
                    }))
                    .subscribe((coupon: Coupon) => {
                        this.snackBar.open('The coupon has been updated successfully');
                        subscriber.next(coupon);
                        subscriber.complete();
                    });
            }, subscriber.error);
        });
    }

    public getAllCoupons(): Observable<Coupon[]> {
        return this.service.pipe(flatMap(service => {
            return service.getCoupons().pipe(map((coupons: Coupon[]) => {
                return this.coupons = coupons;
            }));
        }));
    }

    public getAllCategories(): Observable<Category[]> {
        return this.service.pipe(flatMap(service => {
            return service.getAllCategories();
        }));
    }

    public getCoupon(couponId: number): Observable<Coupon> {
        if (!couponId || isNaN(couponId)) {
            this.snackBar.open('Invalid coupon id');
            return throwError(null);
        }
        const lastAddedCoupon = this.lastAddedCoupon;
        if (lastAddedCoupon && lastAddedCoupon.id === couponId) {
            this.lastAddedCoupon = null;
            return of(lastAddedCoupon);
        }

        return this.service.pipe(flatMap(service => {
            return service.getCoupon(couponId);
        }));
    }

    public uploadImage(coupon: Coupon, image: File, silent?: boolean): Observable<Coupon> {
        const oldImageUrl = coupon.imageUrl;
        coupon.imageUrl = null;
        return this.service.pipe(flatMap(service => {
            return service.uploadCouponImage(coupon.id, image)
                .pipe(
                    tap((event: HttpEvent<Coupon>) => {
                        if (event.type === HttpEventType.UploadProgress) {
                            this._uploadProgressPercentage = Math.round(100 * event.loaded / event.total);
                        }
                    }),
                    filter((event: HttpEvent<Coupon>) => event.type === HttpEventType.Response),
                    map((event: HttpEvent<Coupon>) => new Coupon((event as HttpResponse<Coupon>).body)),
                    tap(_ => {
                        this._uploadProgressPercentage = undefined;
                        if (!silent) {
                            this.snackBar.open('The image has been uploaded successfully');
                        }
                    }, error => coupon.imageUrl = oldImageUrl)
                );
        }));
    }

    public deleteImage(couponId: number): Observable<Coupon> {
        return this.service.pipe(flatMap(service => {
            return service.deleteImage(couponId);
        })).pipe(tap(_ => this.snackBar.open('The image has been deleted successfully')));
    }

    public get uploadProgressPercentage(): number | undefined {
        return this._uploadProgressPercentage;
    }

    private _uploadImage(lastAddedCoupon: Coupon, image: File, subscriber) {
        this.uploadImage(lastAddedCoupon, image, true).subscribe(coupon => {
            lastAddedCoupon.imageUrl = coupon.imageUrl;
            lastAddedCoupon.imagePreview = null;
            subscriber.next(lastAddedCoupon);
            subscriber.complete();
        }, error => subscriber.error(error));
    }

    private openDeleteDialog() {
        return this.dialog.open(WarningDialogComponent, {
            data: {
                title: 'Confirm coupon deletion',
                body: 'Are you sure you want to delete this coupon?',
                action: 'Delete'
            }
        });
    }

    private get service(): Observable<CouponRestService> {
        return this.sessionService.userType$().pipe(first(),
            flatMap(userType => {
                if (userType === UserType.ADMIN) {
                    return of(this.adminService as CouponRestService);
                } else if (userType === UserType.COMPANY) {
                    return of(this.companyService as CouponRestService);
                } else {
                    this.snackBar.open(`Unable to fulfill request: invalid user type ${userType}`);
                    return throwError(null);
                }
            }));
    }
}
