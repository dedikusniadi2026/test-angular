import { EMPLOYEE_FILTER_STORAGE_KEY } from '../constants/employee.constants';

export interface EmployeeListFilter {
  username: string;
  email: string;
}

const EMPTY_FILTER: EmployeeListFilter = {
  username: '',
  email: ''
};

export function loadEmployeeListFilter(): EmployeeListFilter {
  const storedValue = sessionStorage.getItem(EMPLOYEE_FILTER_STORAGE_KEY);
  if (!storedValue) {
    return { ...EMPTY_FILTER };
  }

  try {
    const parsed = JSON.parse(storedValue) as Partial<EmployeeListFilter>;
    return {
      username: parsed.username ?? '',
      email: parsed.email ?? ''
    };
  } catch {
    return { ...EMPTY_FILTER };
  }
}

export function saveEmployeeListFilter(filter: EmployeeListFilter): void {
  sessionStorage.setItem(EMPLOYEE_FILTER_STORAGE_KEY, JSON.stringify(filter));
}
