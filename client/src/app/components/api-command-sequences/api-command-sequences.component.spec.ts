import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCommandSequencesComponent } from './api-command-sequences.component';

describe('ApiCommandSequencesComponent', () => {
  let component: ApiCommandSequencesComponent;
  let fixture: ComponentFixture<ApiCommandSequencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiCommandSequencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCommandSequencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
