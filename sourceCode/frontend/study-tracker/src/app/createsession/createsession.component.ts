import { Component } from '@angular/core';
import { WorkService } from '../services/letswork.service';
import { Session } from '../models/session.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createsession',
  templateUrl: './createsession.component.html',
  styleUrls: ['./createsession.component.scss']
})
export class CreatesessionComponent {

  constructor(
    private sessionService: WorkService, 
    private _snackbar: MatSnackBar
  ){}

  createSession(session: Session){
    console.log(session);
    if(session.minutes > 0 && session.name != ""){
      this.sessionService.createSession(session);
    }
    else if(session.minutes > 0 && session.name == ""){
      this.openSnackBar("Sessions must have a name")
    }
    else if(session.minutes <= 0 && session.name != ""){
      this.openSnackBar("Sessions must be at least a minute")
    }
    else{
      this.openSnackBar("Cannot create an empty session")
    }
  }

  openSnackBar(message: string) {
    this._snackbar.open(message, 'x', { duration: 5000 });
  }

}
