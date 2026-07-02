import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import {
  APP_ROUTES,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS
} from '../../constants/employee.constants';
import {
  loadEmployeeListFilter,
  saveEmployeeListFilter
} from '../../utils/employee-filter.storage';
import {
  showEmployeeDeletedToast,
  showEmployeeUpdatedToast
} from '../../utils/employee-toast';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly dialog = inject(MatDialog);

  readonly displayedColumns = [
    'id',
    'username',
    'name',
    'email',
    'status',
    'group',
    'action'
  ] as const;

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  dataSource = new MatTableDataSource<Employee>();

  usernameFilter = '';
  emailFilter = '';
  pageSize = DEFAULT_PAGE_SIZE;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.restoreFilters();
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    this.connectTableHelpers();
  }

  navigateToAddEmployee(): void {
    this.router.navigate([APP_ROUTES.addEmployee]);
  }

  viewDetail(employee: Employee): void {
    this.router.navigate([APP_ROUTES.employeeDetail(employee.id)]);
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width: '900px',
      disableClose: true,
      data: { employee }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      const updatedEmployee = result as Employee;
      this.employeeService.updateEmployee(updatedEmployee);
      this.refreshTable();
      showEmployeeUpdatedToast(this.toastr, updatedEmployee);
    });
  }

  deleteEmployee(employee: Employee): void {
    Swal.fire({
      title: 'Apakah anda yakin ingin menghapus data tersebut?',
      text: `Employee: ${employee.firstName} ${employee.lastName}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Tidak',
      reverseButtons: true
    }).then(result => {
      if (!result.isConfirmed) {
        return;
      }

      this.employeeService.deleteEmployee(employee.id);
      this.refreshTable();
      showEmployeeDeletedToast(this.toastr, employee);
    });
  }

  applyFilter(): void {
    saveEmployeeListFilter({
      username: this.usernameFilter,
      email: this.emailFilter
    });

    this.dataSource.data = this.getFilteredEmployees();
    this.connectTableHelpers();
  }

  changePageSize(): void {
    if (!this.paginator) {
      return;
    }

    this.paginator.pageSize = this.pageSize;
    this.paginator.firstPage();
  }

  private restoreFilters(): void {
    const savedFilter = loadEmployeeListFilter();
    this.usernameFilter = savedFilter.username;
    this.emailFilter = savedFilter.email;
  }

  private loadEmployees(): void {
    this.dataSource.data = this.getFilteredEmployees();
  }

  private refreshTable(): void {
    this.dataSource.data = this.getFilteredEmployees();
    this.connectTableHelpers();
  }

  private getFilteredEmployees(): Employee[] {
    return this.employeeService
      .getEmployees()
      .filter(employee => this.matchesFilters(employee));
  }

  private matchesFilters(employee: Employee): boolean {
    const usernameQuery = this.usernameFilter.toLowerCase();
    const emailQuery = this.emailFilter.toLowerCase();

    const usernameMatch = employee.username
      .toLowerCase()
      .includes(usernameQuery);
    const emailMatch = employee.email.toLowerCase().includes(emailQuery);

    return usernameMatch && emailMatch;
  }

  private connectTableHelpers(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
