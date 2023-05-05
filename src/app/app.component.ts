import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeService } from './services/employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-application';
  public isLogin !:any
  
  constructor(private employeeService:EmployeeService){}


  ngOnInit(): void {
    this.isLogin = this.employeeService.getisLoggedIn();
    // this.employeeService.getisLoggedIn().subscribe((value:any)=>{
    //   this.isLogin = value;
    //   console.log(this.isLogin)
    // })
  }
}
