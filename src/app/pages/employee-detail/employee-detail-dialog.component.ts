import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Employee } from '../../models/employee';

export interface EmployeeDetailDialogData {
  employee: Employee;
}

@Component({
  selector: 'app-employee-detail-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './employee-detail-dialog.component.html',
  styleUrl: './employee-detail-dialog.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class EmployeeDetailDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<EmployeeDetailDialogComponent>);
  private readonly data = inject<EmployeeDetailDialogData>(MAT_DIALOG_DATA);

  readonly e = this.data.employee;

  readonly initials =
    `${this.e.firstName.charAt(0)}${this.e.lastName.charAt(0)}`.toUpperCase();

  readonly formattedSalary = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(typeof this.e.basicSalary === 'number' ? this.e.basicSalary : 0);

  readonly formattedBirthDate = (() => {
    const d = new Date(this.e.birthDate);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  })();

  close(): void {
    this.dialogRef.close();
  }
}
