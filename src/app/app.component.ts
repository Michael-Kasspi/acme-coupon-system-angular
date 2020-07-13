import {Component, OnInit} from '@angular/core';
import {ProgressBarService} from './progress-bar/progress-bar.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Acme Coupon System';
  loading = false;

  constructor(private progressBar: ProgressBarService) {
  }

  ngOnInit(): void {
    this.progressBar
      .onLoading()
      .pipe(delay(0)) /*prevent value changed after it was checked*/
      .subscribe(value => this.loading = value);
  }
}
