import { GetReservationByIdUsecase } from '../../../application/usecases'
import { NumaGateway } from '../../../infra/gateways'

export const makeGetReservationByIdUsecase = (): GetReservationByIdUsecase => {
  const numaGateway = new NumaGateway()
  return new GetReservationByIdUsecase(numaGateway)
}
