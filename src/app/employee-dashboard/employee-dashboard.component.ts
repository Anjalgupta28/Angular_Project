import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss'],
})
export class EmployeeDashboardComponent implements OnInit {
  loading = false;

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'ctc',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private http : HttpClient
  ) { }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(DialogComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList()
        }
      },
    })
  }


  getEmployeeList() {
    this.loading = true;
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        console.log(res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        this.loading=false;
      },
      error: (err) => {
        console.log(err)
        this.loading=false;
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee (id: number){
    this._empService.deleteEmployee(id).subscribe({
      next:(res)=>{
        this._coreService.openSnackBar("Details deleted successfully", "Done")
        this.getEmployeeList();
      },
      error:console.log,
    })
  }
  openEditForm(data:any){
    const dialogRef = this._dialog.open(DialogComponent,{
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) =>{
        if (val) {
          this.getEmployeeList()
        }
      },
    })
    
  }
}


