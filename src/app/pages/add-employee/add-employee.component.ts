import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import {
  APP_ROUTES,
  EMPLOYEE_GROUPS,
  EMPLOYEE_STATUSES
} from '../../constants/employee.constants';
import {
  requiredBasicSalaryValidators,
  requiredBirthDateValidators,
  requiredEmailValidators
} from '../../validators/employee.validators';
import { filterGroups } from '../../utils/group-filter.util';
import { showEmployeeAddedToast } from '../../utils/employee-toast';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class AddEmployeeComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  readonly maxDate = new Date();
  readonly groups = EMPLOYEE_GROUPS;
  readonly statuses = EMPLOYEE_STATUSES;

  groupSearch = '';
  filteredGroups = [...this.groups];

  form = this.formBuilder.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', requiredEmailValidators],
    birthDate: ['', requiredBirthDateValidators],
    basicSalary: [null as number | null, requiredBasicSalaryValidators],
    status: ['', Validators.required],
    group: ['', Validators.required],
    description: ['', Validators.required]
  });

  onGroupSearch(searchText: string): void {
    this.groupSearch = searchText;
    this.filteredGroups = filterGroups(this.groups, searchText);
  }

  onGroupSelected(): void {
    this.groupSearch = '';
    this.filteredGroups = [...this.groups];
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const newEmployee = this.buildEmployeePayload(formValue);

    this.employeeService.addEmployee(newEmployee as Employee);
    showEmployeeAddedToast(this.toastr, newEmployee);
    this.router.navigate([APP_ROUTES.employees]);
  }

  cancel(): void {
    this.router.navigate([APP_ROUTES.employees]);
  }

  private buildEmployeePayload(
    formValue: ReturnType<typeof this.form.getRawValue>
  ): Omit<Employee, 'id'> {
    return {
      username: formValue.username!,
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
      email: formValue.email!,
      birthDate: new Date(formValue.birthDate!),
      basicSalary: Number(formValue.basicSalary),
      status: formValue.status!,
      group: formValue.group!,
      description: formValue.description!
    };
  }
}
