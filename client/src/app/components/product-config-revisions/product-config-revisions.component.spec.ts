import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductConfigRevisionsComponent } from './product-config-revisions.component';

describe('ProductConfigRevisionsComponent', () => {
  let component: ProductConfigRevisionsComponent;
  let fixture: ComponentFixture<ProductConfigRevisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductConfigRevisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductConfigRevisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
