import { Component } from '@angular/core';
import { RegistrationModel } from '../models/registrationModel';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private service: LoginService){}

  onSubmit(form: RegistrationModel){
    console.log(form);
    this.service.register(form).subscribe({
      next: response => {console.log(response); alert("registration successful!")},
      error: () => {throw new Error("Failed to register. Email already exists. Please login");}
    })
  }

}
