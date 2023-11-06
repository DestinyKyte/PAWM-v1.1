import { Component } from '@angular/core';
import { WorkService } from '../services/letswork.service';
import { Session } from '../models/session.model';

@Component({
  selector: 'app-createsession',
  templateUrl: './createsession.component.html',
  styleUrls: ['./createsession.component.scss']
})
export class CreatesessionComponent {

  constructor(
    private sessionService: WorkService, 
  ){}

  createSession(session: Session){
    console.log(session);
    if(session.minutes > 0 && session.name != ""){
      this.sessionService.createSession(session);
    }
  }

}
