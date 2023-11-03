import { Component, OnInit } from '@angular/core';
import { DataSharingSerivce } from '../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  sessionId: any;
  timer: number = 0;
  countdown:any;
  initialTime: number = 0;
  timeToCount: number = 0;
  timeToRest:number = 0;
  paused = false;

constructor(private session: DataSharingSerivce, private ActivatedRoute: ActivatedRoute, private router: Router){

}
ngOnInit(){
  this.session.getGoals();
  this.addGoalsToTimer();
  this.sessionId = this.ActivatedRoute.snapshot.paramMap.get("id");
  this.timer = this.session.getAllSessions().find(x => x.id == this.sessionId)!.minutes;
}

getTime(){
  if(this.initialTime==0){
    this.timeToCount = (this.timer*60);
    this.initialTime = this.timeToCount;
  }
  
}
public startTimer(): void {
  if (!this.paused) {
    this.getTime();
    this.countdown = setInterval(() => {
      if (this.timeToCount <= 0) {
        this.resetTimer();
        this.showSummary();
        return;
      }
      var minute = Math.floor(this.timeToCount / 60);
      var sec = Math.floor((this.timeToCount % 60));
      var timer_seconds = document.getElementById("timer_seconds");
      var timer_minutes = document.getElementById("timer_minutes");
      timer_minutes!.innerHTML = minute < 10 ? "0" + minute : "" + minute;
      timer_seconds!.innerHTML = sec < 10 ? "0" + sec : "" + sec;
      this.timeToCount--;
    }, 1000);
    this.updateButtons();
  }
}

  public pauseTimer(){
      clearInterval(this.countdown);
      this.paused = true
      this.updateButtons();
  }

  public resetTimer(){
    var timer_seconds =document.getElementById("timer_seconds");
    var timer_minutes =document.getElementById("timer_minutes");

    timer_minutes!.innerHTML = "00";
    timer_seconds!.innerHTML = "00";
  
    clearInterval(this.countdown);
    this.paused = true;
    this.initialTime = 0;
    //this.timeToCount = this.initialTime;
    this.updateButtons();
    //I COULD ALSO RESET THE TIMER MODE/BANNER BUT I MIGHT JUST KEEP IT FOR NOW.
  }

  public updateButtons(){
    var start_button = document.getElementById("timer-start-btn");
    var pause_button = document.getElementById("timer-pause-btn");
    if(!this.paused){
      start_button!.style.display = "none";
      pause_button!.style.display = "block"
      this.paused = true;
    }
    else{
      start_button!.style.display = "block";
      pause_button!.style.display = "none"
      this.paused = false;;
    }
  }
  
  addGoalsToTimer(){
    var goals = document.getElementById("timer-goals-list");
    var addThese = this.session.getGoals();
    addThese.forEach((goal) => {
      const liElement = document.createElement("li"); // Create a new <li> element
      liElement.textContent = <string>goal; // Set the text content of the <li> to the goal text
      goals?.appendChild(liElement);
    });
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

  
   public showSummary(){
    this.router.navigate(["summary"]);
  }

}
