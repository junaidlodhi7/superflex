import { TestBed, inject } from '@angular/core/testing';

import { TestTypesService } from './test-types.service';

describe('TestTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestTypesService]
    });
  });

  it('should be created', inject([TestTypesService], (service: TestTypesService) => {
    expect(service).toBeTruthy();
  }));
});
