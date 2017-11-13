import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { Word } from '../domain/word';

// import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-word-entry',
  templateUrl: './word-entry.component.html',
  styleUrls: ['./word-entry.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class WordEntryComponent implements OnInit {

  @Input() word: Word = null;

  constructor() { }

  ngOnInit() {
  }
}
