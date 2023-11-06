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

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
  
  constructor(
    private authenticationService: LoginService,
    private redirectService: HttpRecallService,
    private loggingService: LoggingService
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
        throw error
      }) 
    )
  }

}