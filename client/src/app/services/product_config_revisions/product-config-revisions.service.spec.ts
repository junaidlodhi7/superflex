import { TestBed, inject } from '@angular/core/testing';

import { ProductConfigRevisionsService } from './product-config-revisions.service';

describe('ProductConfigRevisionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductConfigRevisionsService]
    });
  });

  it('should be created', inject([ProductConfigRevisionsService], (service: ProductConfigRevisionsService) => {
    expect(service).toBeTruthy();
  }));
});
