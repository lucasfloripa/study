import { GetReservationByIdGateway } from '../../../src/application/protocols'
import { Reservation } from '../../../src/domain/entities'
import { mockReservation } from '../../domain/mocks'

export const mockGetReservationByIdGatewayStub = (): GetReservationByIdGateway => {
  class GetReservationByIdGatewayStub implements GetReservationByIdGateway {
    async getById (reservationId: string): Promise<Reservation> {
      return await Promise.resolve(mockReservation())
    }
  }
  return new GetReservationByIdGatewayStub()
}
