import { ValidationResult } from '../types/Validation';

const getValidationErrors = (results: ValidationResult[]): string[] => results.reduce((acc: string[], result) =>
  result.status === 'error' ? [...acc, result.message] : [...acc], []);

const joinValues = (values: string[], separator = ' ') => values.join(separator);

export const validateExpression = (value: number, rules: ((value: number) => ValidationResult)[], failFast = true) => {
  const validations = rules.map(rule => rule(value));
  const errors = getValidationErrors(validations);
  if (errors.length === 0) {
    return `Value is valid!`;
  }
  if (failFast) {
    return errors[0];
  }
  const result = joinValues(errors);
  return `Errors: ${result}`;
};
