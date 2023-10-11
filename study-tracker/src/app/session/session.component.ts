import { Component } from '@angular/core';
import { Session } from '../models/session.model';
import { DataSharingSerivce } from '../services/shared.service';
import { WorkService } from '../services/letswork.service';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent {
  sessions!: Session[];
  goals: String[] = [];


  constructor(private sessionService: WorkService, private datacenter: DataSharingSerivce){

  }

  ngOnInit(){
    if(!Number.isNaN(this.datacenter.user.id))this.getSessions()   
  }

  public getSessions(): void{
    this.sessionService.getUserSessionsByID(1).subscribe({
      next:(Response: Session[]) => {this.sessions = Response;
         this.datacenter.setAllSessions(this.sessions);},
      error: () => alert("There are no sessions to return")}
    )
  }
}
