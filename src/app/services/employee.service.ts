import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Employee } from '../models/employee';
import {
  DUMMY_EMPLOYEE_COUNT,
  EMPLOYEE_GROUPS,
  EMPLOYEE_STATUSES
} from '../constants/employee.constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private readonly employeeSubject = new BehaviorSubject<Employee[]>([]);

  employees$ = this.employeeSubject.asObservable();

  constructor() {
    this.generateDummyData();
  }

  getEmployees(): Employee[] {
    return [...this.employees];
  }

  getEmployee(id: number): Employee | undefined {
    return this.employees.find(employee => employee.id === id);
  }

  addEmployee(employee: Employee): void {
    employee.id = this.employees.length + 1;
    this.employees.unshift(employee);
    this.publishChanges();
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(employee => employee.id !== id);
    this.publishChanges();
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(item => item.id === employee.id);
    if (index >= 0) {
      this.employees[index] = employee;
      this.publishChanges();
    }
  }

  private generateDummyData(): void {
    for (let index = 1; index <= DUMMY_EMPLOYEE_COUNT; index++) {
      this.employees.push({
        id: index,
        username: `user${index}`,
        firstName: `First${index}`,
        lastName: `Last${index}`,
        email: `user${index}@gmail.com`,
        birthDate: new Date(
          1990 + (index % 15),
          index % 12,
          (index % 28) + 1
        ),
        basicSalary: 5_000_000 + index * 250_000,
        status: EMPLOYEE_STATUSES[index % EMPLOYEE_STATUSES.length],
        group: EMPLOYEE_GROUPS[index % EMPLOYEE_GROUPS.length],
        description: `Employee number ${index}`
      });
    }

    this.publishChanges();
  }

  private publishChanges(): void {
    this.employeeSubject.next([...this.employees]);
  }
}
