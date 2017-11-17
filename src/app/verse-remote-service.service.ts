import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Book } from './domain/book';
import { Chapter } from './domain/chapter';

@Injectable()
export class VerseRemoteServiceService {

  constructor(private http: HttpClient) { }

  getVerses(book: Book): Observable<Chapter[]> {
    
    return Observable.create((observer: Observer<Chapter[]>)=>{
      console.log("aqui");
        this.http.get<any>("http://localhost:3000/verses/" + book.number).subscribe((items)=>{
          
          console.log(items);

          let chapters: Chapter[] = [];
          let chap = new Chapter();
          chap.number = 1;
          chap.verses = [];
          chapters.push(chap);

          items.data.forEach( (value) => {
            if(value.chapter != chap.number) {
              chap = new Chapter();
              chap.number = value.chapter;
              chapters.push(chap);
              chap.verses = [];
            }

            // chap.verses.push(value);

            let textArr = value.text.split(' ');
            let words = [];

            textArr.forEach((word, index) => {
              
            let idx = word.indexOf("<S>");
            
            if(idx > -1) {
                word = word.substring(0, idx);
            }
        
            if(word.indexOf("<m>") <= -1)
                words.push({id:index, 
                            value: word, 
                            classes: "word", 
                            translation: null,
                            verse: value
                        });
            });            
          
            chap.verses.push({
                book_number: value.book_number,
                chapter: value.chapter,
                text: words,
                verse: value.verse
              });
          });

          observer.next(chapters);
          observer.complete();

        });
    });
  }
}
