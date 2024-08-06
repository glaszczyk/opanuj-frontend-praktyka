import { ValidationResult } from '../types/Validation';
import { TEXTS } from '../consts/text';

export const isIntegerNumber = (value: number): ValidationResult => Number.isInteger(value) ? { status: 'success' } : {
  status: 'error',
  message: TEXTS.notIntegerNumberError
};
