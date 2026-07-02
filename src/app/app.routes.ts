import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { AddEmployeeComponent } from './pages/add-employee/add-employee.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        redirectTo: 'employees',
        pathMatch: 'full'
      },
      {
        path: 'employees',
        component: EmployeeListComponent
      },
      {
        path: 'employees/add',
        component: AddEmployeeComponent
      },
      {
        path: 'employees/:id',
        component: EmployeeDetailComponent
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];