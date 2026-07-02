export const EMPLOYEE_GROUPS = [
  'IT',
  'Finance',
  'HR',
  'Sales',
  'Marketing',
  'Support',
  'QA',
  'Security',
  'Legal',
  'Operation'
] as const;

export const EMPLOYEE_STATUSES = ['Active', 'Inactive'] as const;

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [5, 10, 25, 50] as const;

export const EMPLOYEE_FILTER_STORAGE_KEY = 'employee-filter';

export const APP_ROUTES = {
  employees: '/employees',
  addEmployee: '/employees/add',
  employeeDetail: (id: number) => `/employees/${id}`
} as const;

export const DUMMY_EMPLOYEE_COUNT = 100;
