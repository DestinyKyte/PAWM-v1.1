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
  goals:string[] = []

  constructor(private route: ActivatedRoute, private dataCenter:DataSharingSerivce){
    this.session = dataCenter.getSession();
    
  }
  ngOnInit(){
    this.sessionId = this.route.snapshot.paramMap.get("id");
    this.session = this.dataCenter.getAllSessions().find(x => x.id == this.sessionId); 
    this.dataCenter.setSession(this.session!);
  }


  public addGoal() {
    var ul = document.getElementById("dynamic-list");
    var session_goal = document.getElementById("session-goal-input");

    if (session_goal instanceof HTMLInputElement) {
        var li = document.createElement("li");
        li.setAttribute("id", session_goal.value);
        li.appendChild(document.createTextNode(session_goal.value));
        ul?.appendChild(li);
    }
    this.shareGoals();
    
  }
  public removeGoal(){
    var ul = document.getElementById("dynamic-list");
    var sessionGoal = document.getElementById("session-goal-input");

    if (sessionGoal instanceof HTMLInputElement) {
        var goal = document.getElementById(sessionGoal.value);
        ul?.removeChild(goal!);
    }
  }

  getGoalsList(): string[] {
    var goals: string[] = []; // empty string to store goals
    const ulElement = document.getElementById("dynamic-list"); // get the ul element

    if (ulElement) { // if it's present then proceed
      const liElements = Array.from(ulElement.querySelectorAll("li")); // generate an array from it's children
      liElements.forEach((li) => { // for each child:
        // Access individual <li> element and its content
        goals.push(li.textContent!=null? li.textContent: "")
      });
    }
    return goals;
  }
  shareGoals(){
    var goals = this.getGoalsList();
    this.dataCenter.setGoals(goals)
  }
}
