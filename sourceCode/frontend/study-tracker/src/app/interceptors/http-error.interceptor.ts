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

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private authenticationService: LoginService, private redirectService: HttpRecallService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("==> Error catching interceptor")
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 403){
          this.authenticationService.refreshToken();     
        }
        throw error
      })
      
    )
  }

}
