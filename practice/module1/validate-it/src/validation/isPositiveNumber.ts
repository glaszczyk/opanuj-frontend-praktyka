import { ValidationResult } from '../types/Validation';
import { TEXTS } from '../consts/text';

export const isPositiveNumber = (value: number): ValidationResult => value > 0 ? { status: 'success' } : {
  status: 'error',
  message: TEXTS.zeroOrNegativeError
};
