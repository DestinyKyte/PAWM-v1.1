import { environment } from "src/environments/environment.development";
import { LoginModel } from "../models/login.model";
import { RegistrationModel } from '../models/registrationModel';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountService } from './access.service';
import { HttpRecallService } from "./http-recall.service";

@Injectable({
   providedIn: "root"
})

export class LoginService{

constructor(private service: HttpClient, private accountService: AccountService, private redirectService: HttpRecallService) {}
    
  public login(form: LoginModel) {
    console.log(form);
    return this.service.post<{token: string, accessToken: string}>(environment.apiBaseUrl + "/v1/auth/authenticate", form)
  }

  public register(form: RegistrationModel) {
    console.log(form);
    return this.service.post<{ token: string }>(environment.apiBaseUrl + "/v1/auth/register", form);
  }
  
  public refreshToken(){
    var token = this.accountService.getRefreshToken();
    return this.service.post<{accessToken: string, token: string }>(environment.apiBaseUrl + "/v1/auth/refresh", {token: token}).subscribe({
      next: (response: {accessToken: string, token:string}) => {
        this.accountService.setAccessToken(response.accessToken)
        this.accountService.setRefreshToken(response.token)
        console.log(response)
        this.recallingMethod()
      },
      error: () => {throw new Error("refresh token error");}
      
    })
  }

  // I decided to move this call in here because of convenience. It seems to be the case that when i call it from the error handler it does not
  // receive the updated token because of some delay with the subscribe method. Perhaps because it is asynchronous. This method is then called immediately after refreshing
  // the token.
  private recallingMethod(){
    var recall = this.redirectService.getRequest();
        this.redirectService.callAgain(recall);   
        console.log(recall)
  }
   
}


