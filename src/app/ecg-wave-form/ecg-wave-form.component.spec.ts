import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgWaveFormComponent } from './ecg-wave-form.component';

describe('EcgWaveFormComponent', () => {
  let component: EcgWaveFormComponent;
  let fixture: ComponentFixture<EcgWaveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcgWaveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcgWaveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
