import { TestBed, inject } from '@angular/core/testing';

import { SuitsService } from './suits.service';

describe('SuitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuitsService]
    });
  });

  it('should be created', inject([SuitsService], (service: SuitsService) => {
    expect(service).toBeTruthy();
  }));
});
