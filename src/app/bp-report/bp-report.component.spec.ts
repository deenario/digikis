import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpReportComponent } from './bp-report.component';

describe('BpReportComponent', () => {
  let component: BpReportComponent;
  let fixture: ComponentFixture<BpReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BpReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
