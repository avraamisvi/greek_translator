import { Injectable } from '@angular/core';
import { TranslationProject, Translation } from './domain/translation';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { HttpClient } from '@angular/common/http';
import { Verse } from './domain/verse';
import { Word } from './domain/word';

@Injectable()
export class TranslationRemoteService {

  constructor(private http: HttpClient) { }

  createTranslation(tr: Translation): Observable<any> {
    return this.http.post<any>("http://localhost:3000/translation", tr);
  }

  updateTranslation(tr: Translation): Observable<any> {
    return this.http.post<any>("http://localhost:3000/translation", tr);//PUT is not working here
  }  

  listTranslationByVerse(ver: Verse): Observable<Translation[]> {
    
      let q = "http://localhost:3000/translation/by/verse" + ver.book_number 
      + "/" + ver.chapter + "/" + ver.verse + "/list";
  
      return this.http.get<Translation[]>(q);
  }

  listTranslation(wr: Word): Observable<Translation[]> {

    let q = "http://localhost:3000/translation/" + wr.verse.book_number 
    + "/" + wr.verse.chapter + "/" + wr.verse.verse + "/" + wr.order + "/list";

    return this.http.get<Translation[]>(q);
  }

  getTranslation(wr: Word): Observable<Translation> {
    
        let q = "http://localhost:3000/translation/" + wr.verse.book_number
        + "/" + wr.verse.chapter + "/" + wr.verse.verse + "/" + wr.order;
    
        // return ;

        return Observable.create((observer: Observer<Translation>)=>{
          
          this.http.get<any>(q).subscribe((result) => {
            let ret:Translation;
            
            if(result.data && result.data.length > 0) {
              ret = {
                book: result.data.book,
                note: result.data.note,
                chapter: result.data.chapter,
                verse: result.data.verse,
                wordOrder: result.data.word_order,
                grammarTags: [],
                id: result.data.id,
                value: result.data.value,
                word: wr.value
              };
            } else {
              ret = {
                book: wr.verse.book_number,
                note: "",
                chapter: wr.verse.chapter,
                verse: wr.verse.verse,
                wordOrder: wr.order,
                grammarTags: [],
                id: -1,
                value: "",
                word: wr.value
              };
            }
            
            observer.next(ret);
            observer.complete();
          });
    
        });

  }

  createProject(name: string): Observable<any> {
    return this.http.post<any>("http://localhost:3000/translation/project", {
      name
    });
  }

  openProject(trans: TranslationProject): Observable<TranslationProject> {
    return this.http.post<TranslationProject>("http://localhost:3000/translation/project/open/", {
      id: trans.id
    });
  }

  listProjects(): Observable<TranslationProject[]> {
    
    // return this.http.get<TranslationProject[]>("http://localhost:3000/translation/project/list");

    return Observable.create((observer: Observer<TranslationProject[]>)=>{
      
      this.http.get<any>("http://localhost:3000/translation/project/list").subscribe((result) => {
        let ret:TranslationProject[] = [];

        result.data.forEach((val)=>{
          ret.push(val);
        });

        observer.next(ret);
        observer.complete();
      });

    });

  }
}
