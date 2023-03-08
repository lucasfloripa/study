import { Reservation } from '../../../src/domain/entities'
import { GetReservation } from '../../../src/domain/implementations'
import { mockReservation } from './mockReservation'

export const mockGetReservationStub = (): GetReservation => {
  class GetReservationStub implements GetReservation {
    async execute (reservationId: string): Promise<Reservation> {
      return await Promise.resolve(mockReservation())
    }
  }
  return new GetReservationStub()
}
