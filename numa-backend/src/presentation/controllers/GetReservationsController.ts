import { Reservation } from '../../domain/entities'
import { GetReservations } from '../../domain/implementations'
import { noContent, ok, serverError } from '../helpers'
import { Controller, HttpResponse } from '../protocols'

export class GetReservationsController implements Controller {
  constructor (private readonly getReservations: GetReservations) {}

  async handle (): Promise<HttpResponse<Response>> {
    try {
      const reservations = await this.getReservations.execute()
      if (reservations.length === 0) return noContent('No reservations found')
      return ok({ reservations })
    } catch (error) {
      return serverError(error)
    }
  }
}

interface Response {
  reservations: Reservation[]
}
