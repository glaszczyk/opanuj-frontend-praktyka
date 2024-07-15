import { isIntegerNumber } from './validation/isIntegerNumber';
import { isPositiveNumber } from './validation/isPositiveNumber';
import { isLessThan } from './validation/isLessThan';
import { isEvenNumber } from './validation/isEvenNumber';
import { validateExpression } from './validation/utils';

const validate = (inputValue: string) => {
  const rules = [
    isIntegerNumber,
    isPositiveNumber,
    isLessThan(100),
    isEvenNumber
  ];

  const valueAsNumber = Number.parseFloat(inputValue);
  return validateExpression(valueAsNumber, rules);
};

const handleInputValidation = (event: MouseEvent, input: HTMLInputElement, successCallback: () => void) => {
  const isFieldValid = input.checkValidity();
  if (!isFieldValid) {
    input.reportValidity();
  } else {
    event.preventDefault();
    successCallback();
  }
};

function main() {
  const inputToCheck = document.getElementById('value-to-check');
  if (!(inputToCheck instanceof HTMLInputElement)) {
    throw new Error('There is no input element with "value-to-check" id');
  }
  const validateButton = document.getElementById('handle-validation');
  if (!validateButton) {
    throw new Error('There is no element with "handle-validation" id');
  }
  const clearButton = document.getElementById('handle-clear');
  if (!clearButton) {
    throw new Error('There is no element with "handle-clear" id');
  }
  const validationResult = document.getElementById('validation-result');
  if (!validationResult) {
    throw new Error('There is no element with "validation-result" id');
  }

  validateButton?.addEventListener('click', (event) =>
    handleInputValidation(event, inputToCheck, () => {
      validationResult.innerHTML = validate(inputToCheck.value);
    })
  );

  clearButton?.addEventListener('click', (event) => {
    event.preventDefault();
    inputToCheck.value = '';
    validationResult.innerHTML = '';
  });
}

main();
