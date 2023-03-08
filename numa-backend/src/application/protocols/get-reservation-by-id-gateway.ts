import { Reservation } from '../../domain/entities'

export interface GetReservationByIdGateway {
  getById: (reservationId: string) => Promise<Reservation>
}
