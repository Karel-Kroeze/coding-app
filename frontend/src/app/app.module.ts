import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CodingComponent } from './coding/coding.component';

import { HypothesesService } from './hypotheses.service';
import { StatusComponent } from './status/status.component';

@NgModule({
  declarations: [
    AppComponent,
    CodingComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [HypothesesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
