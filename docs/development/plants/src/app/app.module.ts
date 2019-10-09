import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { CatsService } from './cats.service';
import { PlantsService } from './plants.service';
import { CommentsService } from './comments.service';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { PlantListComponent } from './plant-list/plant-list.component';
import { PlantDetailComponent } from './plant-detail/plant-detail.component';
import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavigationComponent,
    StaticPageComponent,
    PlantListComponent,
    PlantDetailComponent,
    PricePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthService, CatsService, PlantsService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
