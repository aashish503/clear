import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})

export class EmployeeCreateComponent implements OnInit {
  submitted = false;
  employeeForm: FormGroup;
  steps:any=1;

  constructor(
    public fb: FormBuilder,private router: Router,private ngZone: NgZone,private apiService: ApiService ) {
    this.mainForm();
  }

  ngOnInit() {}

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      categary: ['',[Validators.required]],
    });
  }

  // Choose designation with select dropdown

  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.steps = this.steps +1;
    if (!this.employeeForm.valid) {
      return false;
    } else {
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
