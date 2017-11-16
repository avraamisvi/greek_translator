import { TestBed, inject } from '@angular/core/testing';

import { BookRemoteService } from './book-remote.service';

describe('BookRemoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookRemoteService]
    });
  });

  it('should be created', inject([BookRemoteService], (service: BookRemoteService) => {
    expect(service).toBeTruthy();
  }));
});
