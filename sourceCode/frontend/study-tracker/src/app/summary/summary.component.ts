import { Component, OnInit } from '@angular/core';
import { DataSharingSerivce as DataSharingService } from '../services/shared.service';
import { Router } from '@angular/router';
import { Session } from '../models/session.model';
import { WorkService } from '../services/letswork.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
[x: string]: any;
  goals: String[] = [];
  completedGoals:String[] = [];
  currentSession!: Session;
  focusValue:number = 0;
  distractions: string[] = ['phone', 'people', 'other'];

  constructor(
    private dataCenter: DataSharingService, 
    private sessionService: WorkService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.currentSession = this.dataCenter.getSession()!;
    this.goals = this.dataCenter.getGoals();    
  }

  getFocusInput(): number{
    return this.focusValue;
  }
//Gets the values from checkboxes.
  verifyBoxChecked(event: any, goal: String, index: number) {
    if (event.target.checked) {
      this.completedGoals.splice(index, 0, goal);
    } else if (!event.target.checked && this.completedGoals.includes(goal)) {
      this.completedGoals.splice(this.completedGoals.indexOf(goal), 1);
    }
  }

 
  track() {  
    var goalsPercentage: number = (this.completedGoals.length/this.goals.length)*100;
    var focusLevel = this.getFocusInput();  // focus value 1-10
    var minutes = this.dataCenter.getAllSessions().find(session => session.id === this.currentSession.id)?.minutes // work minutes this session

    var entry = {
      completedTasks: goalsPercentage,
      quantity: minutes!,
      quality: focusLevel
    }
    if (minutes != undefined) {
      this.sessionService.trackSession(entry)
    }
    return entry;
  }

}


 