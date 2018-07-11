import { TestBed, inject } from '@angular/core/testing';

import { SoftgoodsModelsService } from './softgoods-models.service';

describe('SoftgoodsModelsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoftgoodsModelsService]
    });
  });

  it('should be created', inject([SoftgoodsModelsService], (service: SoftgoodsModelsService) => {
    expect(service).toBeTruthy();
  }));
});
