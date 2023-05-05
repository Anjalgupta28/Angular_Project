import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup
  public isLogin !:boolean

  constructor(private formBuilder: FormBuilder,  private http : HttpClient, private router:Router, private employeeService:EmployeeService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailAddress:[''],
      password:[''],
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/signup")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.emailAddress === this.loginForm.value.emailAddress && a.password === this.loginForm.value.password
      });
      if(user){
        // alert("Login Successful");
        this.loginForm.reset();
        this.employeeService.setisLoggedIn(true);
        this.router.navigate(['dashboard'])
      }else{
        alert("User not found");
      }
    },err=>{
      alert("Something went wrong");
    })
  }
}
