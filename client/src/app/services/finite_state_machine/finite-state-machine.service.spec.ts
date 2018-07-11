import { TestBed, inject } from '@angular/core/testing';

import { FiniteStateMachineService } from './finite-state-machine.service';

describe('FiniteStateMachineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiniteStateMachineService]
    });
  });

  it('should be created', inject([FiniteStateMachineService], (service: FiniteStateMachineService) => {
    expect(service).toBeTruthy();
  }));
});
