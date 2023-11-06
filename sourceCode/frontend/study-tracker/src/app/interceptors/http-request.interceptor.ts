import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {   
    var isApiSecuredUrls = req.url.startsWith(environment.apiSecuredUrls)
    //console.log("From http-request interceptor: secured call? " + isApiSecuredUrls)
    if(sessionStorage.getItem("accessToken") && isApiSecuredUrls){
      //console.log("From http-request interceptor: headers set")
      req = req.clone({
        setHeaders: { Authorization: "Bearer " + sessionStorage.getItem("accessToken") }
      })
    }
    return next.handle(req)
  }
}
