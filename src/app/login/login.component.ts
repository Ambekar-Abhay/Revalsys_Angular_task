import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      email: new FormControl ('',[Validators.required,Validators.pattern(/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]),
      password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)])
    })
  }
  login(){
    const userObj= JSON.stringify(this.loginForm.value)
  this.route.navigate(['/dashboard/products'])
  }
}
