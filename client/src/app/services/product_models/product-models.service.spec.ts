import { TestBed, inject } from '@angular/core/testing';

import { ProductModelsService } from './product-models.service';

describe('ProductModelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductModelsService]
    });
  });

  it('should be created', inject([ProductModelsService], (service: ProductModelsService) => {
    expect(service).toBeTruthy();
  }));
});
