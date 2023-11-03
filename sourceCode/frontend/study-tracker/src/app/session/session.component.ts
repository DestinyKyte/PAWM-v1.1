import { Component } from '@angular/core';
import { Session } from '../models/session.model';
import { DataSharingSerivce } from '../services/shared.service';
import { WorkService } from '../services/letswork.service';
import { AccountService } from '../services/access.service';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent{
  sessions!: Session[];
  goals: String[] = [];

  constructor(private sessionService: WorkService, private datacenter: DataSharingSerivce, private accountService: AccountService) {}

  ngOnInit(){
    if(this.accountService.getIsLoggedIn()){
      this.getSessions()   
    } else {
      alert("Please login to see your sessions")
      throw new Error("Unauthorized data access attempt")
    }
  }

  public getSessions(): void{
    this.sessionService.getUserSessions().subscribe({
      next:(Response: Session[]) => {this.sessions = Response;
         this.datacenter.setAllSessions(this.sessions);},
      error: () => {throw new Error("Unauthorized data access attempt")}
    })
  }

  /*
  public closeModal(){
    //const closeButton = document.querySelector("[data-close-modal]")
    var modal = <HTMLDialogElement> document.getElementById("modal-id")
    modal.setAttribute("open", "false")
  }
  */

}
