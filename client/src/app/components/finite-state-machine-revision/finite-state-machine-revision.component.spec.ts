import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiniteStateMachineRevisionComponent } from './finite-state-machine-revision.component';

describe('FiniteStateMachineRevisionComponent', () => {
  let component: FiniteStateMachineRevisionComponent;
  let fixture: ComponentFixture<FiniteStateMachineRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiniteStateMachineRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiniteStateMachineRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
