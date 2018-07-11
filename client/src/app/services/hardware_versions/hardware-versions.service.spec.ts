import { TestBed, inject } from '@angular/core/testing';

import { HardwareVersionsService } from './hardware-versions.service';

describe('HardwareVersionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HardwareVersionsService]
    });
  });

  it('should be created', inject([HardwareVersionsService], (service: HardwareVersionsService) => {
    expect(service).toBeTruthy();
  }));
});
