import { Component } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginModel: LoginModel = {email: "", password: ""};

  constructor(
    private service: LoginService
  ){}

  login(form:LoginModel){  
    this.service.login(form).subscribe({
      next: (response: {accessToken: string, token:string}) => {
        sessionStorage.setItem("accessToken", response.accessToken)
        sessionStorage.setItem("token", response.token)
        console.log(response)
      },
      error: () => {throw new Error("invalid credentials");}
    })
  }

}
