import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../domain/word';
import { BookComponent } from '../book/book.component';

// import { MissionService } from './mission.service';
import { Subscription }   from 'rxjs/Subscription';
import { BookWordServiceService } from '../book-word-service.service';

@Component({
  selector: 'app-verse-word',
  templateUrl: './verse-word.component.html',
  styleUrls: ['./verse-word.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerseWordComponent implements OnInit {

  @Input() word: Word;
  selected: boolean = false;

  constructor(private service: BookWordServiceService) {
    this.service.announced$.subscribe(w => this.selected = w.id == this.word.id);
  }

  ngOnInit() {
  }

  get isSelected() {
    return this.selected;
  }

}
