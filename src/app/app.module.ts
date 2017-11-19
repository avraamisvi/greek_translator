import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { WordEntryComponent } from './word-entry/word-entry.component';
import { BookComponent } from './book/book.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { VerseWordComponent } from './verse-word/verse-word.component'
import {MatExpansionModule} from '@angular/material/expansion';
import { VerseRemoteServiceService } from './verse-remote-service.service';
import { BookRemoteService } from './book-remote.service';
import { TranslationRemoteService } from './translation-remote.service';
import { GrammarRemoteService } from './grammar-remote.service';

@NgModule({
  declarations: [
    AppComponent,
    WordEntryComponent,
    BookComponent,
    VerseWordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [VerseRemoteServiceService, BookRemoteService, TranslationRemoteService, GrammarRemoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
