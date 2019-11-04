import { Component, ViewChild } from '@angular/core';
import {NavigationComponent} from './navigation/navigation.component';

@Component({
  selector: 'gcash-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(NavigationComponent, {static: false}) nav: NavigationComponent;
}
