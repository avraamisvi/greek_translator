import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translation, GrammarTag } from './domain/translation';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class GrammarRemoteService {

  constructor(private http: HttpClient) { }

  list(tr: Translation): Observable<GrammarTag[]> {

        console.log("GrammarRemoteService");

        let q = "http://localhost:3000/grammar/"+tr.id+"/list";

        return Observable.create((observer: Observer<GrammarTag[]>)=>{
          
          this.http.get<any>(q).subscribe((result) => {

            let res: GrammarTag[] = [];

            result.data.forEach((val)=>{
              res.push({
                name: val.definition,
                description: ""
              });

            });

            observer.next(res);
            observer.complete();
          });
      });
  }
}
