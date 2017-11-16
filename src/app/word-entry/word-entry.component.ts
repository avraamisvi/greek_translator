import { Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Word } from '../domain/word';

// import {FormControl, Validators} from '@angular/forms';

import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { Translation, GrammarTag } from '../domain/translation';

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

  word: Word;//@Input() 
  grammarTags = [];
  grammarInput: string;
  validGrammarTags = ["1 pessoa", "singular", "nominativo"];
  error: string = null;

  translation: Translation = {id:-1, 
                              note: "no note", 
                              value: "no value", 
                              grammarTags: [], 
                              wordOrder: 1,
                              book: 1,
                              chapter: 1,
                              verse: 1,
                              word: ""
                              };

  constructor() { }

  ngOnInit() {
  }

  setSelectedWord(word: Word) {
    this.word = word;

    //TODO get translation 
    this.translation = word.translation = {id:-1, 
                        note: "", 
                        value: "_____", 
                        grammarTags: [], 
                        wordOrder: 1,
                        book: word.verse.book_number,
                        chapter: word.verse.chapter,
                        verse: word.verse.verse,
                        word: word.value};
  }

  @Input()
  set translationValue(value: string) {
    if(this.translation)
      this.translation.value = value;

    console.log(value);
  }

  get translationValue() {
    if(this.translation)
      return this.translation.value;
    return null;
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our person
    if ((value || '').trim()) {

      // if(this.validGrammarTags.find((el)=>{return el == value;})) {
        this.translation.grammarTags.push({  name: value.trim(), description: "" });
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
    console.log("save");
    console.log(this.translation);
  }

}
