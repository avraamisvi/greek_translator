import { TestBed, inject } from '@angular/core/testing';

import { BookWordServiceService } from './book-word-service.service';

describe('BookWordServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookWordServiceService]
    });
  });

  it('should be created', inject([BookWordServiceService], (service: BookWordServiceService) => {
    expect(service).toBeTruthy();
  }));
});
