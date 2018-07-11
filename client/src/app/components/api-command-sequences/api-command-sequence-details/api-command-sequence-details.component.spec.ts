import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCommandSequenceDetailsComponent } from './api-command-sequence-details.component';

describe('ApiCommandSequenceDetailsComponent', () => {
  let component: ApiCommandSequenceDetailsComponent;
  let fixture: ComponentFixture<ApiCommandSequenceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCommandSequenceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCommandSequenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
