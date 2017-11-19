import { TestBed, inject } from '@angular/core/testing';

import { GrammarRemoteService } from './grammar-remote.service';

describe('GrammarRemoteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrammarRemoteService]
    });
  });

  it('should be created', inject([GrammarRemoteService], (service: GrammarRemoteService) => {
    expect(service).toBeTruthy();
  }));
});
