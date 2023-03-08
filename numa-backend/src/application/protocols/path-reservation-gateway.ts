import { Reservation } from '../../domain/entities'

export interface PatchReservationGateway {
  patch: (reservationId: string, data: any) => Promise<Reservation>
}
