import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalMovementComponent } from './functional-movement.component';

describe('FunctionalMovementComponent', () => {
  let component: FunctionalMovementComponent;
  let fixture: ComponentFixture<FunctionalMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
