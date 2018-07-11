import { TestBed, inject } from '@angular/core/testing';

import { ApiCommandSequencesService } from './api-command-sequences.service';

describe('ApiCommandSequencesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCommandSequencesService]
    });
  });

  it('should be created', inject([ApiCommandSequencesService], (service: ApiCommandSequencesService) => {
    expect(service).toBeTruthy();
  }));
});
