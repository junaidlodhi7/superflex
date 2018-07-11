import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftgoodsModelsComponent } from './softgoods-models.component';

describe('SoftgoodsModelsComponent', () => {
  let component: SoftgoodsModelsComponent;
  let fixture: ComponentFixture<SoftgoodsModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftgoodsModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftgoodsModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
