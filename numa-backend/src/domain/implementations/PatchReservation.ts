import { Reservation } from '../entities'

export interface PatchReservation {
  execute: (reservationId: string, data: any) => Promise<Reservation>
}
