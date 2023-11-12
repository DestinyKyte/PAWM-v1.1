import { Component } from '@angular/core';
import { RegistrationModel } from '../models/registrationModel';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  //i won’t call the function immediately after every keystroke
  //when the user types quickly, we should wait until a pause occurs
  //so, instead of checking the strength immediately, we’ll set a timeout
  timeout: any
  //for storing the Regex conditions
  strongPassword: any
  mediumPassword: any
  //result of the evaluation
  passwordStrength: string = "weak"
  //if the badge is visible or not
  isVisible: any;

  //if the passwrod is weak
  passwordIsUnsecure: boolean = true
  //if the username is empty
  usernameIsEmpty: boolean = true
  
/*
CHARACTERS MEANING IN REGULAR EXPRESSIONS
- \d	=> Checks for a digit match e.g: it returns 2 in “U2”.
- \W	=> Checks for a special character e.g: returns % in “2%”.
- x{n,}	=> Checks for at least n terms from the preceding term x e.g: O{2,} does not return anything in “BOY” but returns all Os in GOOOOOAL!.
- xIy	=> Matches either x or y in a string
- [^vet]	=> A negated set. Doesn’t check for anything included in the range ie Does not check for vet in “veterinary”
- [A-Za-z0-9]	=> Checks all alphanumeric characters
- [a-z]	=> Checks for lowercase letters
- [A-Z]	=> Checks for uppercase letters
- x(?=y)	=> Returns x if and only if it is followed by y
- .	=> Checks for any single character except line terminators
- x*	=> Checks for x 0 or more times
*/
  
  constructor(
    private service: LoginService,
    private _snackbar: MatSnackBar
    ){
    //if the password has at least:
    //- one lowercase letter (?=.*[a-z]), 
    //- one uppercase letter (?=.*[A-Z]), 
    //- one digit (?=.*[0-9]), 
    //- one special character (?=.*[^A-Za-z0-9]), 
    //- and is at least eight characters long(?=.{8,})
    this.strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    //if the password is:
    //- at least six characters long and meets all the other requirements, 
    //- or has no digit but meets the rest of the requirements
    this.mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    //if the password entered does not meet the strong or medium-level requirements, then it is deemed weak
  }

  register(form: RegistrationModel) {
    if (this.IsEmail(form.email)) {
      console.log(form);
      this.service.register(form).subscribe({
        next: response => {
          console.log(response);
          this.openSnackBar("registration successful!")
        },
        error: () => { this.openSnackBar("Failed to register. Email already exists. Please login") }
      })
    }
    else {
      this.openSnackBar("invalid email syntax");
    }
  }

  strengthChecker(passwordParameter: any) {
    //this method returns true if there is a match between the string with which strongPassword was build and the given string
    if(this.strongPassword.test(passwordParameter)) {
      this.passwordStrength = "strong"
      this.passwordIsUnsecure = false
    } else if(this.mediumPassword.test(passwordParameter)) {
      this.passwordStrength = "medium"
      this.passwordIsUnsecure = false
    } else {
      this.passwordStrength = "weak"
      this.passwordIsUnsecure = true
    }
  }

  checkStrength(password: string){
    //when the events occur closer together than our timeout duration, 
    //the timeout from the preceding input event should be canceled
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.strengthChecker(password), 500);
    //if the user clears the text, the badge is hidden again
    if(password.length !== 0) {
      this.isVisible = true
    } else {
      this.isVisible = false
    }
  }

  onInput(username: any){
    if(username.length === 0){
      this.usernameIsEmpty = true
    } else {
      this.usernameIsEmpty = false
    }
  }
   IsEmail(email: string) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

  openSnackBar(message: string) {
    this._snackbar.open(message, 'x', { duration: 5000 });
  }

}