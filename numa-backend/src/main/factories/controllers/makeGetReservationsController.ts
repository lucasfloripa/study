import { GetReservationsController } from '../../../presentation/controllers'
import { makeGetReservationsUsecase } from '../usecases'

export const makeGetReservationsController = (): GetReservationsController => {
  const getReservationsUsecase = makeGetReservationsUsecase()
  return new GetReservationsController(getReservationsUsecase)
}
