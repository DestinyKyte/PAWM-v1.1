import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Session } from '../models/session.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { 

  }

  public getUserSessionsByID(id: number): Observable<Session[]>{

    return this.httpClient.get<any>(`${this.apiServerUrl}/sessions/${id}`)

  }

  public createSession(session: Session, id: Number){
    this.httpClient.post<Session>(`${this.apiServerUrl}/sessions/${id}`, session).subscribe({
      next:(value: Session) => console.log(value),
      error: () => alert("error from session call")  
    })
  }

  public trackSession(entry: {}){
    this.httpClient.post<{}>(`${this.apiServerUrl}/entries`, entry).subscribe();
  }

  public createUser(user: User){
  
    this.httpClient.post<User>(`${this.apiServerUrl}/users`, user).subscribe({
      next:(value: User) => console.log(value),
      error: () => alert("error from session call")  
    });
  }

}
