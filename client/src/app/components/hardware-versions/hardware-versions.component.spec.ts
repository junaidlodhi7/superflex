import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareVersionsComponent } from './hardware-versions.component';

describe('HardwareVersionsComponent', () => {
  let component: HardwareVersionsComponent;
  let fixture: ComponentFixture<HardwareVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
