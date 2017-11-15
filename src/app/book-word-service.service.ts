import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Word } from './domain/word';

@Injectable()
export class BookWordServiceService {

    // Observable string sources
  private announcedSource = new Subject<Word>();
  private confirmedSource = new Subject<Word>();

  announced$ = this.announcedSource.asObservable();
  confirmed$ = this.confirmedSource.asObservable();

    // Service message commands
    announce(word: Word) {
      this.announcedSource.next(word);
    }
   
    confirm(word: Word) {
      this.confirmedSource.next(word);
    }

}
