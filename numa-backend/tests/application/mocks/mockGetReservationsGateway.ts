import { GetReservationsGateway } from '../../../src/application/protocols'
import { Reservation } from '../../../src/domain/entities'
import { mockReservation } from '../../domain/mocks'

export const mockGetReservationsGatewayStub = (): GetReservationsGateway => {
  class GetReservationsGatewayStub implements GetReservationsGateway {
    async get (): Promise<Reservation[]> {
      return await Promise.resolve([mockReservation()])
    }
  }
  return new GetReservationsGatewayStub()
}
