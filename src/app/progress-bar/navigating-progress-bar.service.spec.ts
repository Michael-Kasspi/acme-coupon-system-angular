import { TestBed } from '@angular/core/testing';

import { NavigatingProgressBarService } from './navigating-progress-bar.service';

describe('NavigatingProgressBarService', () => {
  let service: NavigatingProgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigatingProgressBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
