import { Component, Output, EventEmitter } from '@angular/core';
import { Word } from './domain/word';
import { Book } from './domain/book';

// import { BOOK } from './domain/mock-book';
import { Chapter } from './domain/chapter';
import { TranslationProject } from './domain/translation';
import { BookRemoteService } from './book-remote.service';
import { VerseRemoteServiceService } from './verse-remote-service.service';
import { TranslationRemoteService } from './translation-remote.service';

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

  constructor(private bookService: BookRemoteService, 
    private verseService: VerseRemoteServiceService,
    private translationService: TranslationRemoteService) {

    bookService.list().subscribe((bks)=>{
      console.log(bks);
      this.books = bks;
      // this.currentBook = bks[0];
    });

    translationService.listProjects().subscribe((ret)=>{
      this.translations = ret;
    });
  }

  set selectedBook(book: Book) {
    // this.currentBook = book;

    this.verseService.getVerses(book, 1).subscribe( (chps) => {
      this.currentBook = {
        chapters: chps,
        name: book.name,
        number: book.number
      };

      this.currentChapter = this.currentBook.chapters[0];
    });

  }

  set selectChapter(chapter) {

    this.verseService.getVerses(this.currentBook, chapter.number).subscribe( (chps) => {
      this.currentBook = {
        chapters: chps,
        name: this.currentBook.name,
        number: this.currentBook.number
      };

      this.currentChapter = this.currentBook.chapters[chapter.number-1];
    });

  }

  get selectChapter() {
    return this.currentChapter;
  }

  set currentTranslation(proj: TranslationProject) {
    this.translation = proj;
    this.translationService.openProject(proj).subscribe((ret)=>{
    });
  }

  get currentTranslation() {
    return this.translation;
  }

  saveTranslation(name: string) {
    this.translationService.createProject(name).subscribe((ret)=>{
      this.translation = ret;
    });
  }

  selectTranslationView() {
    window.location.assign("/");
    // this.translation = null;//reload translations
    // this.translationService.listProjects().subscribe((res)=>{
    //   this.translations = res;
    // });
  }

  wordSelected(word: Word, sidenav:any) {
    console.log(sidenav.opened);
    
    if(!sidenav.opened)//TODO change this to service
      sidenav.toggle();

    this.selectedWord = word;
    // this.onWordSelected.emit(word);
  }
}
