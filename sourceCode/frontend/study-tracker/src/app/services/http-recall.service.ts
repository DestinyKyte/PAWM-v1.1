import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn:'root'
})
export class HttpRecallService{
    lastCall:any

    constructor(
        private httpClient : HttpClient,
        private _snackBar: MatSnackBar
    ){}

    public callAgain(req: HttpRequest<any>){
        var accessToken = sessionStorage.getItem("accessToken")
        const header = new HttpHeaders({
            'content-type':'application/json',
            'Authorization': accessToken?accessToken:""
        })
        return this.httpClient.request(req.method, req.url,{body: req.body, headers : header}).subscribe({
            next: () => {
                window.location.reload()
            }
        })
    } 

    public logoutCallAgain(req: HttpRequest<any>){
        var accessToken = sessionStorage.getItem("accessToken")
        var token = sessionStorage.getItem("token")
        const header = new HttpHeaders({
            'content-type':'application/json',
            'Authorization': accessToken?accessToken:""
        })
        this.httpClient.request(req.method, req.url,{body: {token: token}, headers : header}).subscribe({
            next: () => {
                window.sessionStorage.clear();
                this.openSnackBar("Logout successful!")
            }
        })
    }
    
    public setRequest(req: HttpRequest<any>){
        this.lastCall = req;
    }

    public getRequest(){
        return this.lastCall;
    }

    openSnackBar(message: string) {
        this._snackBar.open(message, 'Close', { duration: 5000 });
    }

}