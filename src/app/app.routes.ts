import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/pages/login/login.component';
import { EmployeeListComponent } from './features/employee/pages/employee-list/employee-list.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth-guard';

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
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];