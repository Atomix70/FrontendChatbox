import { TestBed } from '@angular/core/testing';

import { UserlogsignService } from './userlogsign.service';

describe('UserlogsignService', () => {
  let service: UserlogsignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserlogsignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
