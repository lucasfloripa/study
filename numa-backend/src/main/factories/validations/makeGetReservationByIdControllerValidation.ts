import { Validation } from '../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../utils/validators'

export const makeGetReservationByIdControllerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['reservationId']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
