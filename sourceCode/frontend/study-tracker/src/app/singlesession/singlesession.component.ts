import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../models/session.model';
import { DataSharingSerivce } from '../services/shared.service';


@Component({
  selector: 'app-singlesession',
  templateUrl: './singlesession.component.html',
  styleUrls: ['./singlesession.component.scss']
})
export class SinglesessionComponent {
  session: Session|undefined;
  sessionId: any;
  goals:string[] = [];
  newGoal:string = '';

  constructor(
    private route: ActivatedRoute, 
    private dataCenter:DataSharingSerivce
  ){
    this.session = dataCenter.getSession();
  }

  ngOnInit(){
    this.sessionId = this.route.snapshot.paramMap.get("id");
    this.session = this.dataCenter.getAllSessions().find(x => x.id == this.sessionId); 
    this.dataCenter.setSession(this.session!);
    
  }

  addGoal() {
    if (this.newGoal) {
      this.goals.push(this.newGoal);
      this.newGoal = ''; // Clear the input field
    }
    this.shareGoals();
  }
  removeGoal(index: number) {
    this.goals.splice(index, 1);
  }
  shareGoals(){
    var goals = this.goals;
    this.dataCenter.setGoals(goals)
  }
}