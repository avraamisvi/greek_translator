import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../domain/word';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-verse-word',
  templateUrl: './verse-word.component.html',
  styleUrls: ['./verse-word.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerseWordComponent implements OnInit {

  @Input() word: Word;

  constructor() { }

  ngOnInit() {
  }

  get isSelected() {
    return false;
  }

}
