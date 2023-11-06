import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Session } from '../models/session.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  public getUserSessions(): Observable<Session[]>{
    return this.httpClient.get<any>(`${environment.apiSecuredUrls}/sessions`)
  }

  public createSession(session: Session){
    if(sessionStorage.getItem("accessToken")){
      this.httpClient.post<Session>(`${environment.apiSecuredUrls}/sessions`, session).subscribe({
          next: () => {
            this.router.navigate(["letswork"])
            this.openSnackBar("Session created successfully")
          },
          error: (error) => {
            if(error.status === 406){
              this.openSnackBar("A session with this name already exists")
              throw new Error("A session with this name already exists")
            } else {
              alert("Page will reload. Go to let's work to see your new session")
            }
          }
      })
    } else {
      this.openSnackBar("To create a session you need to login first")
    }
  }

  public trackSession(entry: {}){
    this.httpClient.post<{}>(`${environment.apiSecuredUrls}/entries`, entry).subscribe({
      next: () => this.router.navigate(["dashboard"]),
      error: () => alert("Page will reload. Go to dashboard to see your new entry")
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', { duration: 5000 });
  }

}
