import { BrowserModule } 					  from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NgModule } 						    from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
}                                   from '@angular/forms';
// 开发环境使用hash模式，生产环境去掉，改为h5mode
import {
  HashLocationStrategy,
  LocationStrategy
}                                   from '@angular/common';
import { HttpModule }               from '@angular/http';

import { WeUiModule }               from 'ngx-weui';

import { ApiService }               from './shared/api.service';
import { AppRoutingModule }         from './app-routing.module';

import { AppComponent } 					  from './app.component';
import { IndexModule }              from './index/index.module';
import { PageNotFoundComponent }    from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    WeUiModule.forRoot(),
    IndexModule,
    AppRoutingModule
  ],
  providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      ApiService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
