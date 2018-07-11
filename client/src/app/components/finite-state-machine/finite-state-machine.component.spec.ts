import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteStateMachineComponent } from './finite-state-machine.component';

describe('FiniteStateMachineComponent', () => {
  let component: FiniteStateMachineComponent;
  let fixture: ComponentFixture<FiniteStateMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiniteStateMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteStateMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
