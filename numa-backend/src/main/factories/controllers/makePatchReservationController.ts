import { PatchReservationByIdController } from '../../../presentation/controllers'
import { makePathBillingAddressReservationUsecase } from '../usecases'
import { makePathReservationControllerValidation } from '../validations'

export const makePatchReservationController = (): PatchReservationByIdController => {
  const getReservationsUsecase = makePathBillingAddressReservationUsecase()
  const validation = makePathReservationControllerValidation()
  return new PatchReservationByIdController(getReservationsUsecase, validation)
}
