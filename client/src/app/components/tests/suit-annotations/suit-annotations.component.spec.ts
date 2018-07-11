import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitAnnotationsComponent } from './suit-annotations.component';

describe('SuitAnnotationsComponent', () => {
  let component: SuitAnnotationsComponent;
  let fixture: ComponentFixture<SuitAnnotationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitAnnotationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
