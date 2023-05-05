import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  isLogin$ = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:3000/signup';

  constructor(private _http: HttpClient) { }
  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data)
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees')
  }

  deleteEmployee(id:number):Observable<any>{
    return this._http.delete(`http://localhost:3000/employees/${id}`)
  }

  updateEmployee(id:number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data)
  }
  getUsers(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl);
  }

  isUsernameTaken(username: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => users.some(user => user.username === username))
    );
  }

  isEmailTaken(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => users.some(user => user.email === email))
    );
  }
  setisLoggedIn(login:boolean){debugger; this.isLogin$.next(login)}
  getisLoggedIn(){return this.isLogin$}
}

