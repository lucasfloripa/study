import { Reservation } from '../../domain/entities'
import { GetReservation } from '../../domain/implementations'
import { GetReservationByIdGateway } from '../protocols'

export class GetReservationByIdUsecase implements GetReservation {
  constructor (private readonly getReservationByIdGateway: GetReservationByIdGateway) {}

  async execute (reservationId: string): Promise<Reservation> {
    return await this.getReservationByIdGateway.getById(reservationId)
  }
}
