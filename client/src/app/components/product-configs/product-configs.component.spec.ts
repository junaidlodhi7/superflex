import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigsComponent } from './product-configs.component';

describe('ProductConfigsComponent', () => {
  let component: ProductConfigsComponent;
  let fixture: ComponentFixture<ProductConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
