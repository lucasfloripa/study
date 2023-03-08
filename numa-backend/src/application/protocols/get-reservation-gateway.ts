import { Reservation } from '../../domain/entities'

export interface GetReservationsGateway {
  get: () => Promise<Reservation[]>
}
