import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

import {Book} from '../domain/book';
import {Verse} from '../domain/verse';
import {Word} from '../domain/word';

import { BOOK } from '../domain/mock-book';
import { BookWordServiceService } from '../book-word-service.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[BookWordServiceService]
})
export class BookComponent implements OnInit {

  book = BOOK;
  selectedWord: Word = null;

  @Output() onWordSelected = new EventEmitter<Word>();
  
  constructor(private service: BookWordServiceService) { 
    service.confirmed$.subscribe(w => console.log(w.value));
  }

  ngOnInit() {
  }

  selectWord(word: Word) {
    this.selectedWord = word;
    this.onWordSelected.emit(word);
    this.service.announce(word);
    // console.log(word);
  }
}
