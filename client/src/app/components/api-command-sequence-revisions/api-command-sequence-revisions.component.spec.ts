import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCommandSequenceRevisionsComponent } from './api-command-sequence-revisions.component';

describe('ApiCommandSequenceRevisionsComponent', () => {
  let component: ApiCommandSequenceRevisionsComponent;
  let fixture: ComponentFixture<ApiCommandSequenceRevisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCommandSequenceRevisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCommandSequenceRevisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
