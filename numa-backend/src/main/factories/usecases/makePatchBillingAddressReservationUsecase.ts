import { PatchBillingAddressReservationUsecase } from '../../../application/usecases'
import { NumaGateway } from '../../../infra/gateways'

export const makePathBillingAddressReservationUsecase = (): PatchBillingAddressReservationUsecase => {
  const numaGateway = new NumaGateway()
  return new PatchBillingAddressReservationUsecase(numaGateway, numaGateway)
}
