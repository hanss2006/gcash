import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Settings } from '../settings';

@Component({
  selector: 'gcash-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Главная :: ' + Settings.title);
  }

}
