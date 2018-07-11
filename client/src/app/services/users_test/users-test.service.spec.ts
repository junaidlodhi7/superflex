import { TestBed, inject } from '@angular/core/testing';

import { UsersTestService } from './users-test.service';

describe('UsersTestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersTestService]
    });
  });

  it('should be created', inject([UsersTestService], (service: UsersTestService) => {
    expect(service).toBeTruthy();
  }));
});
