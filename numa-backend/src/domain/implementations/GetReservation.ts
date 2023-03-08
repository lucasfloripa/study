import { Reservation } from '../entities'

export interface GetReservation {
  execute: (input: any) => Promise<Reservation>
}
