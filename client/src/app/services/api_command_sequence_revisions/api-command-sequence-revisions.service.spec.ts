import { TestBed, inject } from '@angular/core/testing';

import { ApiCommandSequenceRevisionsService } from './api-command-sequence-revisions.service';

describe('ApiCommandSequenceRevisionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiCommandSequenceRevisionsService]
    });
  });

  it('should be created', inject([ApiCommandSequenceRevisionsService], (service: ApiCommandSequenceRevisionsService) => {
    expect(service).toBeTruthy();
  }));
});
