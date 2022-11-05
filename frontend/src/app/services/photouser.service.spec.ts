import { TestBed } from '@angular/core/testing';

import { PhotouserService } from './photouser.service';

describe('PhotouserService', () => {
  let service: PhotouserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotouserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
