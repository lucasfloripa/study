import { GetReservationByIdGateway, GetReservationsGateway, PatchReservationGateway } from '../../application/protocols'
import { Reservation } from '../../domain/entities'
import { NumaGatewayHelper } from './numa-gateway-helper'

export class NumaGateway implements GetReservationsGateway, GetReservationByIdGateway, PatchReservationGateway {
  async get (): Promise<Reservation[]> {
    const axios = await NumaGatewayHelper.getAxiosInstance()
    const reservationArray: Reservation[] = []
    const numaReservations = await axios.get('/api/reservations?limit=100').then(response => response.data.data.data)
    numaReservations.forEach(numaReservation => {
      reservationArray.push({ id: numaReservation.id, billingAddress: numaReservation.billingAddress })
    })
    return reservationArray
  }

  async getById (reservationId: string): Promise<Reservation> {
    const axios = await NumaGatewayHelper.getAxiosInstance()
    const numaReservation = await axios.get(`/api/reservations/${reservationId}`).then(response => response.data.data)
    const reservation: Reservation = { id: numaReservation.id, billingAddress: numaReservation.billingAddress }
    return reservation
  }

  async patch (reservationId: string, data: any): Promise<Reservation> {
    const axios = await NumaGatewayHelper.getAxiosInstance()
    const numaReservation = await axios.patch(`/api/reservations/${reservationId}`, data).then(response => response.data.data)
    const reservation: Reservation = { id: numaReservation.id, billingAddress: numaReservation.billingAddress }
    return reservation
  }
}
