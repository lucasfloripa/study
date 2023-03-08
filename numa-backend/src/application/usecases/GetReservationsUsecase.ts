import { Reservation } from '../../domain/entities'
import { GetReservations } from '../../domain/implementations'
import { GetReservationsGateway } from '../protocols'

export class GetReservationsUsecase implements GetReservations {
  constructor (private readonly getReservationsGateway: GetReservationsGateway) {}

  async execute (): Promise<Reservation[]> {
    return await this.getReservationsGateway.get()
  }
}
