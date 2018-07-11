import { TestBed, inject } from '@angular/core/testing';

import { HardwareComponentService } from './hardware-component.service';

describe('HardwareComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HardwareComponentService]
    });
  });

  it('should be created', inject([HardwareComponentService], (service: HardwareComponentService) => {
    expect(service).toBeTruthy();
  }));
});
