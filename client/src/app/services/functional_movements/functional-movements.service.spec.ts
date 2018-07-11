import { TestBed, inject } from '@angular/core/testing';

import { FunctionalMovementsService } from './functional-movements.service';

describe('FunctionalMovementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunctionalMovementsService]
    });
  });

  it('should be created', inject([FunctionalMovementsService], (service: FunctionalMovementsService) => {
    expect(service).toBeTruthy();
  }));
});
