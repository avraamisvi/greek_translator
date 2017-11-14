import { Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../domain/word';

// import {FormControl, Validators} from '@angular/forms';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';

// import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-word-entry',
  templateUrl: './word-entry.component.html',
  styleUrls: ['./word-entry.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class WordEntryComponent implements OnInit {

  @Output() onSave = new EventEmitter<boolean>();

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  word: Word = {value:"", id:-1, classes:"word", transalation:""};//@Input() 
  grammarTags = [];
  validGrammarTags = ["1 pessoa", "singular", "nominativo"];
  error: string = null;
  //The grammar definition does not exist.

  constructor() { }

  ngOnInit() {
  }

  setSelectedWord(word: Word) {
    this.word = word;
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {

      // if(this.validGrammarTags.find((el)=>{return el == value;})) {
        this.grammarTags.push({ name: value.trim() });
      // } else {
      //   this.error = 'The grammar definition ' + value + ' does not exist.'
      // }
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    let index = this.grammarTags.indexOf(fruit);

    if (index >= 0) {
      this.grammarTags.splice(index, 1);
    }
  }

  save() {
    //TODO enviar para o servidor
    this.onSave.emit(true);
  }

}
