import { ValidationResult } from '../types/Validation';
import { TEXTS } from '../consts/text';

export const isEvenNumber = (value: number): ValidationResult => value % 2 === 0 ? { status: 'success' } : {
  status: 'error',
  message: TEXTS.isOddError
};
