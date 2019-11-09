import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './materialapp.module';
import {NavigationComponent} from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import {StaticPageComponent} from './static-page/static-page.component';
import {AuthService} from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    StaticPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialAppModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule
  ],
  providers: [AuthService],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
