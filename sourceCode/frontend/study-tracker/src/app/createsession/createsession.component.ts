import { Component } from '@angular/core';
import { WorkService } from '../services/letswork.service';
import { Session } from '../models/session.model';
import { DataSharingSerivce } from '../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createsession',
  templateUrl: './createsession.component.html',
  styleUrls: ['./createsession.component.scss']
})
export class CreatesessionComponent {

  constructor(private sessionService: WorkService, private dataCenter: DataSharingSerivce, private router: Router){}

  ngOnInit(){
    //if(Number.isNaN(this.dataCenter.user.id)){
    //  this.sessionService.createUser(this.dataCenter.user);
    //  this.dataCenter.user.id = 1;
    //} 
  }

  createSession(session: Session){
    console.log(session);
    if(session.minutes > 0 && session.name != ""){
      //this.sessionService.createSession(session, 1);
      this.sessionService.createSession(session);
    }
  }
  
  navigateTo(){
    this.router.navigate(["letswork"]);
  }

}
