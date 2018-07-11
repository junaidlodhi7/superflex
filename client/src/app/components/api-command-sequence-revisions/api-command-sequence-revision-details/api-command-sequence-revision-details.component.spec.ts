import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCommandSequenceRevisionDetailsComponent } from './api-command-sequence-revision-details.component';

describe('ApiCommandSequenceRevisionDetailsComponent', () => {
  let component: ApiCommandSequenceRevisionDetailsComponent;
  let fixture: ComponentFixture<ApiCommandSequenceRevisionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCommandSequenceRevisionDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCommandSequenceRevisionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
