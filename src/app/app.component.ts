import { Component, Output, EventEmitter } from '@angular/core';
import { Word } from './domain/word';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Greek Translator';
  open = false;
  selectedWord: Word = null;
  
  // @Output() onWordSelected = new EventEmitter<Word>();

  wordSelected(word: Word, sidenav:any) {
    console.log(sidenav.opened);
    
    if(!sidenav.opened)
      sidenav.toggle();

    this.selectedWord = word;
    // this.onWordSelected.emit(word);
  }
}
