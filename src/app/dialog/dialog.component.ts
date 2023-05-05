import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Intermediate',
    'Diploma',
    'Graduate',
    'Post Graduate',
    'Masters',
    'Doctrate',
    'PHD',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService:CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      ctc: '',
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }
  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
        .updateEmployee(this.data.id, this.empForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Details updated", "OK")
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err)
          }
        })

      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Employee added Successfully", "OK")
            this._dialogRef.close(true)
          },
          error: (err: any) => {
            console.log(err)
          }
        })
      }
    }
  }
}


