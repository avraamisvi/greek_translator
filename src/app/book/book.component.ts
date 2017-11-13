import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

import {Book} from '../domain/book';
import {Verse} from '../domain/verse';
import {Word} from '../domain/word';

import { BOOK } from '../domain/mock-book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BookComponent implements OnInit {

  book = BOOK;
  selected_word: number = null;

  @Output() onWordSelected = new EventEmitter<Word>();
  
  constructor() { }

  ngOnInit() {
  }

  selectWord(word: Word) {
    this.selected_word = word.id;
    this.onWordSelected.emit(word);
    // console.log(word);
  }
}
