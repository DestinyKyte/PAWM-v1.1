import { environment } from "src/environments/environment.development";
import { LoginModel } from "../models/login.model";
import { RegistrationModel } from '../models/registrationModel';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpRecallService } from "./http-recall.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
   providedIn: "root"
})

export class LoginService{

  constructor(
    private service: HttpClient,
    private redirectService: HttpRecallService,
    private _snackBar: MatSnackBar
  ) {}
    
  public login(form: LoginModel) {
    return this.service.post<{token: string, accessToken: string}>(environment.apiBaseUrl + "/v1/auth/authenticate", form)
  }

  public register(form: RegistrationModel) {
    return this.service.post<{ token: string }>(environment.apiBaseUrl + "/v1/auth/register", form);
  }
  
  public refreshToken(){
    var token = sessionStorage.getItem("token")
    return this.service.post<{accessToken: string, token: string }>(environment.apiBaseUrl + "/v1/auth/refresh", {token: token}).subscribe({
      next: (response: {accessToken: string, token:string}) => {
        sessionStorage.setItem("accessToken", response.accessToken)
        sessionStorage.setItem("token", response.token)
        this.recallingMethod()
      },
      error: () => {throw new Error("refresh token error");}
    })
  }

  public refreshTokenForLogout(){
    var token = sessionStorage.getItem("token")
    return this.service.post<{accessToken: string, token: string }>(environment.apiBaseUrl + "/v1/auth/refresh", {token: token}).subscribe({
      next: (response: {accessToken: string, token:string}) => {
        sessionStorage.setItem("accessToken", response.accessToken)
        sessionStorage.setItem("token", response.token)
        this.recallingLogoutMethod()
      },
      error: () => {throw new Error("refresh token error");}
    })
  }

  public logout(){
    var token = sessionStorage.getItem("token")
    this.service.post(environment.apiSecuredUrls + "/logout", {token: token}).subscribe({
      next: () => {
        window.sessionStorage.clear()
        this.openSnackBar("Logout successful!")
      }
    })
  }

  private recallingMethod(){
    var recall = this.redirectService.getRequest();
    this.redirectService.callAgain(recall); 
  }

  private recallingLogoutMethod(){
    var recall = this.redirectService.getRequest();
    this.redirectService.logoutCallAgain(recall);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', { duration: 5000 });
  }

}
