import { Component, OnInit } from '@angular/core';
import { DataSharingSerivce } from '../services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  goals:String[] = [];
  minutes: string = '00';
  seconds: string = '00';
  sessionId: any;
  isPaused = true;
  countdown:any;
  sessionTimer: number = 0;
  initialTime: number = 0;
  timeToCount: number = 0;
  //timeToRest:number = 0;
  playDisplay: string = "block";
  pauseDisplay: string = "none";
 

  constructor(
    private session: DataSharingSerivce, 
    private ActivatedRoute: ActivatedRoute, 
    private router: Router
  ){}

  ngOnInit(){
    this.session.getGoals();
    this.goals = this.session.getGoals();
    this.sessionId = this.ActivatedRoute.snapshot.paramMap.get("id");
    this.sessionTimer = this.session.getAllSessions().find(x => x.id == this.sessionId)!.minutes;
  }

  getTime(){
    if(this.initialTime==0){
      this.timeToCount = (this.sessionTimer*60);
      this.initialTime = this.timeToCount;
    }
  }

  public startTimer(): void {
    if (this.isPaused) {
      this.isPaused = false;
      this.getTime();
      this.countdown = setInterval(() => {
        if (this.timeToCount == 0) {
          this.resetTimer();
          this.showSummary();
          return;
        }
        var minuteValue = Math.floor(this.timeToCount / 60);
        var secValue = Math.floor((this.timeToCount % 60));
        this.minutes = (minuteValue < 10 ? "0" + minuteValue : "" + minuteValue);
        this.seconds = secValue < 10 ? "0" + secValue : "" + secValue;
        this.timeToCount--;
      }, 1000);
      this.updateButtons();
    }
  }

  public pauseTimer(){
      clearInterval(this.countdown);
      this.isPaused = true
      this.updateButtons();
  }

  public resetTimer(){
    this.minutes = "00";
    this.seconds = "00";
  
    clearInterval(this.countdown);
    this.isPaused = true;
    this.initialTime = 0;
    if(this.playDisplay == "none")
      this.updateButtons();
  }

  public updateButtons(){
    this.playDisplay = this.playDisplay == "block"? "none":"block";
    this.pauseDisplay = this.pauseDisplay == "block"? "none":"block";
    
  }

  public showSummary(){
    this.router.navigate(["summary"]);
  } 
  
}

