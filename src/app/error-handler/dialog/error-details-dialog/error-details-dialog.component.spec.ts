import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorDetailsDialogComponent } from './error-details-dialog.component';

describe('ErrorDetailsDialogComponent', () => {
  let component: ErrorDetailsDialogComponent;
  let fixture: ComponentFixture<ErrorDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
