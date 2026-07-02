import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
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
  selector: 'app-add-employee-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './add-employee-dialog.component.html',
  styleUrl: './add-employee-dialog.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class AddEmployeeDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<AddEmployeeDialogComponent>);

  readonly maxDate = new Date();
  readonly statuses = EMPLOYEE_STATUSES;
  readonly groups = EMPLOYEE_GROUPS;

  groupSearch = '';
  filteredGroups = [...this.groups];

  form = this.fb.group({
    username:    ['', Validators.required],
    firstName:   ['', Validators.required],
    lastName:    ['', Validators.required],
    email:       ['', requiredEmailValidators],
    birthDate:   ['', requiredBirthDateValidators],
    basicSalary: [null as number | null, requiredBasicSalaryValidators],
    status:      ['', Validators.required],
    group:       ['', Validators.required],
    description: ['', Validators.required]
  });

  onGroupSearch(text: string): void {
    this.groupSearch = text;
    this.filteredGroups = filterGroups(this.groups, text);
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
    const v = this.form.getRawValue();
    const payload: Omit<Employee, 'id'> = {
      username:    v.username!,
      firstName:   v.firstName!,
      lastName:    v.lastName!,
      email:       v.email!,
      birthDate:   new Date(v.birthDate!),
      basicSalary: Number(v.basicSalary),
      status:      v.status!,
      group:       v.group!,
      description: v.description!
    };
    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }
}
