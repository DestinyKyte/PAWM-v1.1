import { Component, OnInit } from '@angular/core';
import { Session } from './models/session.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'study-tracker';
  sessions: Session[] = [];


  constructor(){

  }


}
