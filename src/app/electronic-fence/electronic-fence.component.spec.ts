import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicFenceComponent } from './electronic-fence.component';

describe('ElectronicFenceComponent', () => {
  let component: ElectronicFenceComponent;
  let fixture: ComponentFixture<ElectronicFenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectronicFenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicFenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
