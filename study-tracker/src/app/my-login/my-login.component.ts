import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-my-login',
  templateUrl: './my-login.component.html',
  styleUrls: ['./my-login.component.scss']
})
export class MyLoginComponent implements OnInit{
   
  constructor(){}
  
  ngOnInit(): void {}

  onSubmit(f: NgForm){    
    let input = <HTMLInputElement>document.getElementById("input1")
    console.log(input.value)
  }

}
