import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalMovementRevisionComponent } from './functional-movement-revision.component';

describe('FunctionalMovementRevisionComponent', () => {
  let component: FunctionalMovementRevisionComponent;
  let fixture: ComponentFixture<FunctionalMovementRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalMovementRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalMovementRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
