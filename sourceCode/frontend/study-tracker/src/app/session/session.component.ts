import { Component } from '@angular/core';
import { Session } from '../models/session.model';
import { DataSharingSerivce } from '../services/shared.service';
import { WorkService } from '../services/letswork.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
})
export class SessionComponent{
  sessions!: Session[];
  goals: String[] = [];

  constructor(
    private sessionService: WorkService, 
    private datacenter: DataSharingSerivce, 
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(){
    if(sessionStorage.getItem("accessToken")){
      this.getSessions()   
    } else {
      this.openSnackBar("Please login to see your sessions")
      throw new Error("Unauthorized data access attempt")
    }
  }

  public getSessions(): void{
    this.sessionService.getUserSessions().subscribe({
      next:(Response: Session[]) => {
        this.sessions = Response;
        this.datacenter.setAllSessions(this.sessions)
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', { duration: 5000 });
  }

}
