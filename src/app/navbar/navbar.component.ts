import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input()
  isloggedIn:any;
  constructor(private http: HttpClient, private router: Router, private employeeService:EmployeeService ) {}

  showFiller = false;

  logout() {
    // debugger;
    this.employeeService.setisLoggedIn(false);
    this.router.navigate(['login']);
    // setTimeout(() => {
    // this.employeeService.setisLoggedIn(false)
    // }, 500);
    // this.http.delete<any>('http://localhost:3000/session').subscribe(() => {
    //   sessionStorage.removeItem('currentUser');
    //   this.router.navigate(['/login']);
    // });
  }
}
