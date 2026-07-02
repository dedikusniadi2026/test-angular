import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { APP_ROUTES } from '../../constants/employee.constants';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly employeeService = inject(EmployeeService);

  employee: Employee | undefined;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isFinite(id)) {
      return;
    }

    this.employee = this.employeeService.getEmployee(id);
  }

  backToEmployeeList(): void {
    this.router.navigate([APP_ROUTES.employees]);
  }

  formatBasicSalary(value: number | undefined | null): string {
    const amount = typeof value === 'number' ? value : 0;

    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 2
    }).format(amount);
  }
}
