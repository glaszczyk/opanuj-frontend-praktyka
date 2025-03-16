import { describe, expect, test } from 'vitest';
import { formValidator } from './validator';

describe('Form validation', () => {
  test('should return an error if first name is missing', () => {
    const errors = formValidator('', 'Doe', 30);
    expect(errors).toContain('First name is required');
  });

  test('should return an error if last name is missing', () => {
    const errors = formValidator('John', '', 30);
    expect(errors).toContain('Last name is required');
  });

  test('should return error if first name or last name are shorter than 1 character', () => {
    const error = formValidator('', '', 10);
    expect(error).toContain(
      'First name and last name should be at least 1 letter long'
    );
  });

  test('should throw an Error when age is not a number', () => {
    expect(() => formValidator('John', 'Doe', '21')).toThrowError(
      'Age is not a number'
    );
  });
  test('should return an error if age is negative', () => {
    const errors = formValidator('John', 'Doe', -1);
    expect(errors).toContain('Age must be a positive number');
  });

  test('should return no errors when data is correct', () => {
    const errors = formValidator('John', 'Doe', 21);
    expect(errors).toStrictEqual([]);
  });
});
