import { TestBed, inject } from '@angular/core/testing';

import { SoftgoodsVersionsService } from './softgoods-versions.service';

describe('SoftgoodsVersionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftgoodsVersionsService]
    });
  });

  it('should be created', inject([SoftgoodsVersionsService], (service: SoftgoodsVersionsService) => {
    expect(service).toBeTruthy();
  }));
});
