import { PatchReservationGateway } from '../../../src/application/protocols'
import { Reservation } from '../../../src/domain/entities'
import { mockReservation } from '../../domain/mocks'

export const mockPatchReservationGatewayStub = (): PatchReservationGateway => {
  class GetPatchReservationGatewayStub implements PatchReservationGateway {
    async patch (reservationId: string, data: any): Promise<Reservation> {
      return await Promise.resolve(mockReservation())
    }
  }
  return new GetPatchReservationGatewayStub()
}
