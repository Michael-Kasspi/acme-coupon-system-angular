import { Component, OnInit } from '@angular/core';
import {LogoutService} from './services/logout.service';
import {ManualProgressBarService} from '../../progress-bar/manual-progress-bar.service';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private logoutService: LogoutService,
    private router: Router,
    private manualProgressBarService: ManualProgressBarService
  ) {
  }

  ngOnInit(): void {
    this.manualProgressBarService.status = true;
    this.logoutService.logout()
      .pipe(
        finalize(() => {
          this.manualProgressBarService.status = false;
          this.router.navigate(['/home']);
        })
      )
      .subscribe();
  }

}
