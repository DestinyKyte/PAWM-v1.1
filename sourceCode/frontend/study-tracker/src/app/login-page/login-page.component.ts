import { Component } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginModel: LoginModel = {email: "", password: ""};

  constructor(
    private service: LoginService,
    private _snackbar: MatSnackBar,
    private router: Router
  ){}

  login(form:LoginModel){  
    this.service.login(form).subscribe({
      next: (response: {accessToken: string, token:string}) => {
        sessionStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("token", response.token);
        console.log(response);
        this.router.navigate(["letswork"]);
        //this.openSnackBar("login successful")
      },
      error: () => {this.openSnackBar("invalid credentials");}
    })
  }

  openSnackBar(message: string) {
    this._snackbar.open(message, 'x', { duration: 5000 });
  }

}
