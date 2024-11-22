type ValidationSuccess = {
  status: 'success'
}
type ValidationError = {
  status: 'error'
  message: string
}
export type ValidationResult = ValidationSuccess | ValidationError;
