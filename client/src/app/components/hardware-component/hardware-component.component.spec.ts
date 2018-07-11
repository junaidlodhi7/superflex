import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareComponentComponent } from './hardware-component.component';

describe('HardwareComponentComponent', () => {
  let component: HardwareComponentComponent;
  let fixture: ComponentFixture<HardwareComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
