import { ValidationResult } from '../types/Validation';
import { TEXTS } from '../consts/text';

export const isLessThan = (max: number) => (value: number): ValidationResult => value < max ? { status: 'success' } : {
  status: 'error',
  message: TEXTS.biggerThanError(max)
};
