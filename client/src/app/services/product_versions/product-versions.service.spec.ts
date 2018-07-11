import { TestBed, inject } from '@angular/core/testing';

import { ProductVersionsService } from './product-versions.service';

describe('ProductVersionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductVersionsService]
    });
  });

  it('should be created', inject([ProductVersionsService], (service: ProductVersionsService) => {
    expect(service).toBeTruthy();
  }));
});
