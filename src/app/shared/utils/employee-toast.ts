import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Employee } from '../../core/models/employee.model';

const opts = (extraClass: string): Partial<IndividualConfig> => ({
  toastClass: `ngx-toastr ${extraClass}`,
  progressBar: true,
  closeButton: true,
  timeOut: 3200,
  extendedTimeOut: 1200,
  tapToDismiss: true
});

function fullName(e: Pick<Employee, 'firstName' | 'lastName'>): string {
  return `${e.firstName} ${e.lastName}`.trim();
}

export function showEmployeeAddedToast(
  toastr: ToastrService,
  employee: Pick<Employee, 'firstName' | 'lastName'>
): void {
  toastr.success(
    `${fullName(employee)} has been added successfully.`,
    'Employee Added',
    opts('toast-add')
  );
}

export function showEmployeeUpdatedToast(
  toastr: ToastrService,
  employee: Pick<Employee, 'firstName' | 'lastName'>
): void {
  toastr.warning(
    `${fullName(employee)}'s data has been updated.`,
    'Employee Updated',
    opts('toast-edit')
  );
}

export function showEmployeeDeletedToast(
  toastr: ToastrService,
  employee: Pick<Employee, 'firstName' | 'lastName'>
): void {
  toastr.error(
    `${fullName(employee)} has been removed from the list.`,
    'Employee Deleted',
    opts('toast-delete')
  );
}
