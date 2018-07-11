import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFunctionalMovementComponent } from './new.component';

describe('NewComponent', () => {
  let component: NewFunctionalMovementComponent;
  let fixture: ComponentFixture<NewFunctionalMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFunctionalMovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFunctionalMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
