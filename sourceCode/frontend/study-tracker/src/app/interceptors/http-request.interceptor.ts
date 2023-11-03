import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AccountService } from '../services/access.service';
import { HttpRecallService } from '../services/http-recall.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService, private redirecService: HttpRecallService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    var isApiSecuredUrls = req.url.startsWith(environment.apiSecuredUrls)
    
    console.log("From interceptor: secured call? " + isApiSecuredUrls)
    if(this.accountService.getIsLoggedIn() && isApiSecuredUrls){
      console.log("From interceptor: headers set")
      req = req.clone({
        setHeaders: { Authorization: "Bearer " + this.accountService.getAccessToken() }
      })
      this.redirecService.setRequest(req); //set the current request for call
    }
    return next.handle(req)
  }
}
