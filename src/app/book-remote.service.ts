import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './domain/book';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class BookRemoteService {

  constructor(private http: HttpClient) { }

  list(): Observable<Book[]> {

    return Observable.create((observer: Observer<Book[]>)=>{
      console.log("aqui");
        this.http.get<any>("http://localhost:3000/book/list").subscribe((items)=>{
          
          //console.log(items);

          let books: Book[] = [];

          items.data.forEach( (value) => {
            const val = new Book();
            val.name = value.long_name;
            val.number = value.book_number;
            books.push(val);
            return val;
          });

          observer.next(books);
          observer.complete();

        });
    });

  }

}
