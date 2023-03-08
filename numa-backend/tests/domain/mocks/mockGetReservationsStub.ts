import { Reservation } from '../../../src/domain/entities'
import { GetReservations } from '../../../src/domain/implementations'
import { mockReservation } from './mockReservation'

export const mockGetReservationsStub = (): GetReservations => {
  class GetReservationsStub implements GetReservations {
    async execute (): Promise<Reservation[]> {
      return await Promise.resolve([mockReservation()])
    }
  }
  return new GetReservationsStub()
}
