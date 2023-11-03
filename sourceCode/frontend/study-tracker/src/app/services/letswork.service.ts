import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { environment } from 'src/environments/environment.development';
import { environment } from 'src/environments/environment.development';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {}

  public getUserSessions(): Observable<Session[]>{
    return this.httpClient.get<any>(`${environment.apiSecuredUrls}/sessions`)
  }

  public createSession(session: Session){
    this.httpClient.post<Session>(`${environment.apiSecuredUrls}/sessions`, session).subscribe({
      next:(value: Session) => console.log(value),
      error: () => alert("To create a session you need to login first")  
    })
  }

  public trackSession(entry: {}){
    this.httpClient.post<{}>(`${environment.apiSecuredUrls}/entries`, entry).subscribe();
  }

}

/*
public createSession(session: Session, id: Number){
    this.httpClient.post<Session>(`${this.apiServerUrl}/sessions/${id}`, session).subscribe({
      next:(value: Session) => console.log(value),
      error: () => alert("error from session call")  
    })
  }
*/

/*

public createUser(user: User){
    this.httpClient.post<User>(`${this.apiServerUrl}/users`, user).subscribe({
      next:(value: User) => console.log(value),
      error: () => alert("error from session call")  
    });
  }

*/
