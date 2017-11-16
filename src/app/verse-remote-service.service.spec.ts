import { TestBed, inject } from '@angular/core/testing';

import { VerseRemoteServiceService } from './verse-remote-service.service';

describe('VerseRemoteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerseRemoteServiceService]
    });
  });

  it('should be created', inject([VerseRemoteServiceService], (service: VerseRemoteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
