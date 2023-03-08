import { BillingAddress, Reservation } from '../../domain/entities'
import { PatchReservation } from '../../domain/implementations'
import { GetReservationByIdGateway, PatchReservationGateway } from '../protocols'

export class PatchBillingAddressReservationUsecase implements PatchReservation {
  constructor (
    private readonly getReservationByIdGateway: GetReservationByIdGateway,
    private readonly patchReservationGateway: PatchReservationGateway
  ) {}

  async execute (reservationId: string, data: BillingAddress): Promise<Reservation> {
    await this.getReservationByIdGateway.getById(reservationId)
    const reservation = await this.patchReservationGateway.patch(reservationId, { billingAddress: data })
    return reservation
  }
}
