import { Component, Output, EventEmitter } from '@angular/core';
import { Word } from './domain/word';
import { Book } from './domain/book';

import { BOOK } from './domain/mock-book';
import { Chapter } from './domain/chapter';
import { TranslationProject } from './domain/translation';
import { BookRemoteService } from './book-remote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Greek Translator';

  open = false;
  selectedWord: Word = null;
  
  translation: TranslationProject = null;
  translations: TranslationProject[] = [];

  books: Book[];
  //  = [
  //   {name: "Κατά Ματθαίον", number: 1, chapters: []},
  //   {name: "Κατά Μάρκον", number: 1, chapters: []},
  //   {name: "Πράξεις Αποστόλων", number: 1, chapters: []},
  //   BOOK
  // ];
  
  currentBook: Book;// = this.books[0];
  currentChapter: Chapter;

  constructor(private bookService: BookRemoteService) {
    bookService.list().subscribe((bks)=>{
      this.books = bks;
      this.currentBook = bks[0];
    });
  }

  set selectedBook(book: Book) {
    this.currentBook = book;
    this.currentChapter = book.chapters[0];
  }

  set currentTranslation(transl: TranslationProject) {
    this.translation = transl;
  }

  saveTranslation(name: string) {
    this.translation = {id: 1, name: name};
    // TODO salvar no remoto
    this.translations.push(this.translation);
  }

  selectTranslationView() {
    this.translation = null;//reload translations
  }

  wordSelected(word: Word, sidenav:any) {
    console.log(sidenav.opened);
    
    if(!sidenav.opened)//TODO change this to service
      sidenav.toggle();

    this.selectedWord = word;
    // this.onWordSelected.emit(word);
  }
}
