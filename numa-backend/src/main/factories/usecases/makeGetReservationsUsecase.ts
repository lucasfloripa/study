import { GetReservationsUsecase } from '../../../application/usecases'
import { NumaGateway } from '../../../infra/gateways'

export const makeGetReservationsUsecase = (): GetReservationsUsecase => {
  const numaGateway = new NumaGateway()
  return new GetReservationsUsecase(numaGateway)
}
