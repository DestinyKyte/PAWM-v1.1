import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { AccountService } from '../services/access.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginModel: LoginModel = {email: "", password: ""};

  constructor(
    private service: LoginService, 
    private accountService: AccountService, 
    private httpService: HttpClient
  ){}

  onSubmit(form:LoginModel){  
    console.log(form);
    this.service.login(form).subscribe({
      next: (response: {accessToken: string, token:string}) => {
        var accessToken = response.accessToken
        var token = response.token
        this.accountService.setAccessToken(accessToken)
        this.accountService.setRefreshToken(token)
        console.log(response)
      },
      error: () => {throw new Error("invalid credentials");}
      
    })
  }
  
  onClick(){
    this.httpService.get(environment.apiSecuredUrls + "demo-controller").subscribe(
      (dataFromBackend: any) => console.log(dataFromBackend)
    )
  }

  onClick2(){
    throw new Error("Error thrown by the throw error button")
  }

  onClick3(){
    this.httpService.get(environment.apiSecuredUrls + "demo-controller").subscribe(
      (dataFromBackend: any) => console.log(dataFromBackend)
    )
  }

}
