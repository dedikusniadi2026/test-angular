import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { Employee } from '../../models/employee';
import {
  EMPLOYEE_GROUPS,
  EMPLOYEE_STATUSES
} from '../../constants/employee.constants';
import {
  requiredBasicSalaryValidators,
  requiredBirthDateValidators,
  requiredEmailValidators
} from '../../validators/employee.validators';
import { filterGroups } from '../../utils/group-filter.util';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
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
export class EditEmployeeComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<EditEmployeeComponent>);
  private readonly dialogData = inject(MAT_DIALOG_DATA) as { employee: Employee };

  readonly maxDate = new Date();
  readonly groups = EMPLOYEE_GROUPS;
  readonly statuses = EMPLOYEE_STATUSES;

  groupSearch = '';
  filteredGroups = [...this.groups];

  form = this.formBuilder.group({
    id: [this.dialogData.employee.id, Validators.required],
    username: [this.dialogData.employee.username, Validators.required],
    firstName: [this.dialogData.employee.firstName, Validators.required],
    lastName: [this.dialogData.employee.lastName, Validators.required],
    email: [this.dialogData.employee.email, requiredEmailValidators],
    birthDate: [
      this.dialogData.employee.birthDate,
      requiredBirthDateValidators
    ],
    basicSalary: [
      this.dialogData.employee.basicSalary,
      requiredBasicSalaryValidators
    ],
    status: [this.dialogData.employee.status, Validators.required],
    group: [this.dialogData.employee.group, Validators.required],
    description: [this.dialogData.employee.description, Validators.required]
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
    const updatedEmployee: Employee = {
      id: Number(formValue.id),
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

    this.dialogRef.close(updatedEmployee);
  }

  close(): void {
    this.dialogRef.close();
  }
}
