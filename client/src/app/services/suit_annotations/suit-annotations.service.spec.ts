import { TestBed, inject } from '@angular/core/testing';

import { SuitAnnotationsService } from './suit-annotations.service';

describe('SuitAnnotationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuitAnnotationsService]
    });
  });

  it('should be created', inject([SuitAnnotationsService], (service: SuitAnnotationsService) => {
    expect(service).toBeTruthy();
  }));
});
