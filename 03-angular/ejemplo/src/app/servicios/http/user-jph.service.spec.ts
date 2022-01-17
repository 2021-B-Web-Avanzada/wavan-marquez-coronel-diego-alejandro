import { TestBed } from '@angular/core/testing';

import { UserJPHService } from './user-jph.service';

describe('UserJPHService', () => {
  let service: UserJPHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserJPHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
