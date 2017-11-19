import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Book } from './domain/book';
import { Chapter } from './domain/chapter';
import { Word } from './domain/word';
import { Translation } from './domain/translation';

@Injectable()
export class VerseRemoteServiceService {

  constructor(private http: HttpClient) { }

  getChapters(book: Book): Observable<any> {
    return this.http.get<any>("http://localhost:3000/book/" + book.number + "/chapters");
  }

  getVerses(book: Book, chapterNumber: number): Observable<Chapter[]> {
    
    
    return Observable.create((observer: Observer<Chapter[]>)=>{
      // console.log("aqui");
          let translations = [];

          this.getChapters(book).subscribe((chapterCount) => {

            this.http.get<any>("http://localhost:3000/translation/by/chapter/" + book.number + "/" + chapterNumber + "/list")
            .subscribe((bytChapter)=>{

              translations = bytChapter.data;
              
              console.log("####translations####");
              console.log(translations);

              this.http.get<any>("http://localhost:3000/verses/" + book.number + "/" + chapterNumber)
              .subscribe((items)=>{
                
                  // console.log(items);
                  let chapters: Chapter[] = [];
    
                  for(let idx = 0; idx < chapterCount.data.chapters; idx++) {
                    chapters.push({
                      number: idx + 1,
                      verses: null
                    });
                  }
    
                  let chap = new Chapter();
                  chap.number = chapterNumber;
                  chap.verses = [];
                  chapters[chapterNumber-1] = chap;
        
                  items.data.forEach( (value) => {
    
                    if(value.chapter != chap.number) {
                      chap = new Chapter();
                      chap.number = value.chapter;
                      chapters[value.chapter-1] = chap;
                      chap.verses = [];
                    }
        
                    let textArr = value.text.split(' ');
                    let words: Word[] = [];
                    
                    textArr.forEach((word, index) => {
        
                      let rem_idx = word.indexOf("<S>");
                      
                      if(rem_idx > -1) {
                          word = word.substring(0, rem_idx);
                      }

                      let wrObject: Word = {
                        id:index, 
                        value: word, 
                        classes: "word", 
                        translation: null,
                        verse: value,
                        order: index
                      };

                      let translationForWord: Translation = null;
                  
                      if(word.indexOf("<m>") <= -1)
                        
                        words.push(wrObject);
                        
                        if(translations && translations.length > 0) {
                          let tempTrans = translations.find((tran)=>{
                            return tran.word_order == index && tran.chapter == chap.number && tran.verse == value.verse;
                        });
                          
                        if(tempTrans) {
                          translationForWord = {
                            id: tempTrans.id,
                            book: tempTrans.book,
                            chapter: tempTrans.chapter,
                            note: tempTrans.note,
                            value: tempTrans.value,
                            verse: tempTrans.verse,
                            word: word,
                            wordOrder: index,
                            grammarTags: []
                          };
                        }
                      }
                      
                      if(translationForWord) {
                        wrObject.translation = translationForWord;
                      } else {
                        wrObject.translation = {
                          book: value.book_number,
                          note: "",
                          chapter: chapterNumber,
                          verse: value.verse,
                          wordOrder: index,
                          grammarTags: [],
                          id: -1,
                          value: "",
                          word: word
                        };
                      }

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


            });//end translations by chapter

        });
    });
  }
}
