import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accessToken: any
  private token: string = "";
  private isLoggedIn: boolean = false

  constructor() {}

  setAccessToken(token: any){
    this.accessToken = token
    this.isLoggedIn = true
  }

  getAccessToken(){
    return this.accessToken
  }

  setRefreshToken(token: any){
    this.token = token
    this.isLoggedIn = true
  }

  getRefreshToken(){
    return this.token;
  }

  getIsLoggedIn(){
    return this.isLoggedIn
  }

}
