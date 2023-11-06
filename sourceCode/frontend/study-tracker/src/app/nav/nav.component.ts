import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  
  constructor(
    private authenticationService: LoginService,
    private router : Router
  ){}
  
  public logout(){
    this.authenticationService.logout()
    this.router.navigate(["login"])
  }

}
