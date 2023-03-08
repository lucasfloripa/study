import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../utils/validators'

export const makePathReservationControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['reservationId', 'billingAddress']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
