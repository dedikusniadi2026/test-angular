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
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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

  paginatorInfo = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.restoreFilters();
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.updatePaginatorInfo();

    this.paginator.page.subscribe(() => this.updatePaginatorInfo());
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
      if (!result) return;

      const updatedEmployee = result as Employee;
      this.employeeService.updateEmployee(updatedEmployee);
      this.reloadData();
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
      if (!result.isConfirmed) return;

      this.employeeService.deleteEmployee(employee.id);
      this.reloadData();
      showEmployeeDeletedToast(this.toastr, employee);
    });
  }

  applyFilter(): void {
    saveEmployeeListFilter({
      username: this.usernameFilter,
      email: this.emailFilter
    });

    this.dataSource.data = this.getFilteredEmployees();
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.updatePaginatorInfo();
  }

  changePageSize(): void {
    if (!this.paginator) return;
    this.paginator.pageSize = this.pageSize;
    this.paginator.firstPage();
    this.updatePaginatorInfo();
  }

  private restoreFilters(): void {
    const savedFilter = loadEmployeeListFilter();
    this.usernameFilter = savedFilter.username;
    this.emailFilter = savedFilter.email;
  }

  private loadEmployees(): void {
    this.dataSource.data = this.getFilteredEmployees();
  }

  private reloadData(): void {
    const prev = this.dataSource.data.length;
    this.dataSource.data = this.getFilteredEmployees();
    const curr = this.dataSource.data.length;

    if (curr !== prev && this.paginator) {
      this.paginator.firstPage();
    }
    this.updatePaginatorInfo();
  }

  private getFilteredEmployees(): Employee[] {
    return this.employeeService
      .getEmployees()
      .filter(emp => this.matchesFilters(emp));
  }

  private matchesFilters(employee: Employee): boolean {
    const u = this.usernameFilter.toLowerCase();
    const e = this.emailFilter.toLowerCase();
    return (
      employee.username.toLowerCase().includes(u) &&
      employee.email.toLowerCase().includes(e)
    );
  }

  private updatePaginatorInfo(): void {
    if (!this.paginator) {
      this.paginatorInfo = '';
      return;
    }
    const total = this.dataSource.data.length;
    if (total === 0) {
      this.paginatorInfo = 'Tidak ada data';
      return;
    }
    const start = this.paginator.pageIndex * this.paginator.pageSize + 1;
    const end = Math.min(start + this.paginator.pageSize - 1, total);
    this.paginatorInfo = `Menampilkan ${start} – ${end} dari ${total} data`;
  }
}
