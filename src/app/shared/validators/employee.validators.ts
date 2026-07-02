import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

export const BASIC_SALARY_PATTERN = /^[0-9]+(\.[0-9]+)?$/;

export const birthDateMaxTodayValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }

  const selectedDate = new Date(value);
  const today = new Date();

  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return selectedDate.getTime() > today.getTime()
    ? { maxDate: { max: today } }
    : null;
};

export const requiredEmailValidators = [
  Validators.required,
  Validators.email
];

export const requiredBasicSalaryValidators = [
  Validators.required,
  Validators.pattern(BASIC_SALARY_PATTERN)
];

export const requiredBirthDateValidators = [
  Validators.required,
  birthDateMaxTodayValidator
];
