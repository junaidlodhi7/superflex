import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftgoodsVersionsComponent } from './softgoods-versions.component';

describe('SoftgoodsVersionsComponent', () => {
  let component: SoftgoodsVersionsComponent;
  let fixture: ComponentFixture<SoftgoodsVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftgoodsVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftgoodsVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
