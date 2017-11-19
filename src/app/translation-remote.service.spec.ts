import { TestBed, inject } from '@angular/core/testing';

import { TranslationRemoteService } from './translation-remote.service';

describe('TranslationRemoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TranslationRemoteService]
    });
  });

  it('should be created', inject([TranslationRemoteService], (service: TranslationRemoteService) => {
    expect(service).toBeTruthy();
  }));
});
