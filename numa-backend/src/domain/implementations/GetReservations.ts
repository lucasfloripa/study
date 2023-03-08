import { Reservation } from '../entities'

export interface GetReservations {
  execute: () => Promise<Reservation[]>
}
