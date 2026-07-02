import { IndividualConfig } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';

import { Employee } from '../models/employee';

const toastOptions = (
  toastClass: string
): Partial<IndividualConfig> => ({
  toastClass: `ngx-toastr ${toastClass}`,
  progressBar: true,
  closeButton: true,
  timeOut: 3200,
  extendedTimeOut: 1200,
  tapToDismiss: true
});

function employeeName(employee: Pick<Employee, 'firstName' | 'lastName'>): string {
  return `${employee.firstName} ${employee.lastName}`.trim();
}

export function showEmployeeAddedToast(
  toastr: ToastrService,
  employee: Pick<Employee, 'firstName' | 'lastName'>
): void {
  toastr.success(
    `${employeeName(employee)} berhasil ditambahkan ke daftar karyawan.`,
    'Karyawan Ditambahkan',
    toastOptions('toast-add')
  );
}

export function showEmployeeUpdatedToast(
  toastr: ToastrService,
  employee: Pick<Employee, 'firstName' | 'lastName'>
): void {
  toastr.success(
    `Perubahan data ${employeeName(employee)} berhasil disimpan.`,
    'Data Diperbarui',
    toastOptions('toast-edit')
  );
}

export function showEmployeeDeletedToast(
  toastr: ToastrService,
  employee: Pick<Employee, 'firstName' | 'lastName'>
): void {
  toastr.success(
    `${employeeName(employee)} berhasil dihapus dari daftar karyawan.`,
    'Karyawan Dihapus',
    toastOptions('toast-delete')
  );
}
