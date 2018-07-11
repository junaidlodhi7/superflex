import { TestBed, inject } from '@angular/core/testing';

import { ProductConfigsService } from './product-configs.service';

describe('ProductConfigsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductConfigsService]
    });
  });

  it('should be created', inject([ProductConfigsService], (service: ProductConfigsService) => {
    expect(service).toBeTruthy();
  }));
});
