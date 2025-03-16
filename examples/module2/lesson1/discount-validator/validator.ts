export function formValidator(
  firstName: string,
  lastName: string,
  age: number
) {
  const errors: string[] = [];

  if (!firstName) {
    errors.push('First name is required');
  }

  if (!lastName) {
    errors.push('Last name is required');
  }

  if (!(firstName.length > 0 || lastName.length > 0)) {
    errors.push('First name and last name should be at least 1 letter long');
  }

  if (typeof age !== 'number') {
    throw new Error('Age is not a number');
  }

  if (age < 0) {
    errors.push('Age must be a positive number');
  }

  return errors;
}
