import { Reservation } from '../../../src/domain/entities'
import { PatchReservation } from '../../../src/domain/implementations'
import { mockReservation } from './mockReservation'

export const mockPathReservationStub = (): PatchReservation => {
  class PatchReservationStub implements PatchReservation {
    async execute (reservationId: string, data: any): Promise<Reservation> {
      return await Promise.resolve(mockReservation())
    }
  }
  return new PatchReservationStub()
}
