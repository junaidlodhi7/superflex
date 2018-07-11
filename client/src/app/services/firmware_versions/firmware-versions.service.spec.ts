import { TestBed, inject } from '@angular/core/testing';

import { FirmwareVersionsService } from './firmware-versions.service';

describe('FirmwareVersionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirmwareVersionsService]
    });
  });

  it('should be created', inject([FirmwareVersionsService], (service: FirmwareVersionsService) => {
    expect(service).toBeTruthy();
  }));
});
