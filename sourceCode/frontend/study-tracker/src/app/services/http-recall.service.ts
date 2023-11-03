import { HttpClient, HttpContext, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './access.service';
@Injectable({
    providedIn:'root'
})
export class HttpRecallService{
    lastCall:any

    constructor(private httpClient : HttpClient, private accountService: AccountService){}

    public callAgain(req: HttpRequest<any>){
        var accessToken = this.accountService.getAccessToken();
        const header = new HttpHeaders({
            'content-type':'application/json',
            'Authorization': accessToken
        })

         return this.httpClient.request(req.method, req.url,{body: req.body, headers : header}).subscribe({
            next: (Response) => {console.log(Response)}
         })
        
    } 
    
    public setRequest(req: HttpRequest<any>){
        this.lastCall = req;
    }

    public getRequest(){
        return this.lastCall;
    }

}