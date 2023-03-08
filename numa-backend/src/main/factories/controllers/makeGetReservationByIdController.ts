import { GetReservationByIdController } from '../../../presentation/controllers'
import { makeGetReservationByIdUsecase } from '../usecases'
import { makeGetReservationByIdControllerValidation } from '../validations'

export const makeGetReservationByIdController = (): GetReservationByIdController => {
  const getReservationUsecase = makeGetReservationByIdUsecase()
  const validation = makeGetReservationByIdControllerValidation()
  return new GetReservationByIdController(getReservationUsecase, validation)
}
