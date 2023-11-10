import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError} from 'rxjs';
import { LoginService } from '../services/login.service';
import { HttpRecallService } from '../services/http-recall.service';
import { LoggingService } from '../services/logging.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  
  constructor(
    private authenticationService: LoginService,
    private redirectService: HttpRecallService,
    private loggingService: LoggingService,
    private router: Router
  ) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.redirectService.setRequest(req)
        this.loggingService.log("request caught in error interceptor")
        //header without a token
        if(error.status === 403){ 
          throw new Error("From http error interceptor: header without a token")
        }
        //refresh token not in the db
        if(error.status === 401){ 
          sessionStorage.clear();
          this.router.navigate(["login"]);
          this.loggingService.log("From http-error interceptor: refresh token not in the db")    
        }
        //default refresh attempt
        if(error.status === 500 && !error.url?.includes("logout")){
          this.authenticationService.refreshToken();
          this.loggingService.log("From http-error interceptor: default refresh attempt")
        }
        //refresh for logout attempt
        if(error.status === 500 && error.url?.includes("logout")){
          this.authenticationService.refreshTokenForLogout();
          this.loggingService.log("From http-error interceptor: refresh for logout attempt")
        }
        //refresh token expired
        if(error.status === 410){
          sessionStorage.clear();
          this.loggingService.log("From http-error interceptor: refresh token expired")
          this.router.navigate(["login"]);
        }
        //user already exists in registration attempt
        if(error.status === 302){
          this.loggingService.log("From http-error interceptor: user already exists")
        }
        throw error
      }) 
    )
  }

}