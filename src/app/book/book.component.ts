import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';

import {Book} from '../domain/book';
import {Verse} from '../domain/verse';
import {Word} from '../domain/word';

import { BookWordServiceService } from '../book-word-service.service';
import { Chapter } from '../domain/chapter';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers:[BookWordServiceService]
})
export class BookComponent implements OnInit {

  book: Book;
  chapter: Chapter;
  selectedWord: Word = null;

  @Output() onWordSelected = new EventEmitter<Word>();
  
  constructor(private service: BookWordServiceService) { 
    service.confirmed$.subscribe(w => console.log(w.value));
  }

  @Input()
  set currentBook(book: Book) {
    this.book = book;
  }

  @Input()
  set currentChapter(chapter: Chapter) {
    this.chapter = chapter;
  }

  get currentChapter() {
    return this.chapter;
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
