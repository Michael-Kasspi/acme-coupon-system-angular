import { TestBed } from '@angular/core/testing';

import { ManualProgressBarService } from './manual-progress-bar.service';

describe('ManualProgressBarService', () => {
  let service: ManualProgressBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManualProgressBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
