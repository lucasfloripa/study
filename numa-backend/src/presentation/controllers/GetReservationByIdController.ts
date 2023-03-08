import { Reservation } from '../../domain/entities'
import { GetReservation } from '../../domain/implementations'
import { badRequest, notFound, ok, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class GetReservationByIdController implements Controller {
  constructor (private readonly getReservation: GetReservation, private readonly validation: Validation) {}

  async handle (request: Request): Promise<HttpResponse<Output>> {
    try {
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const reservation = await this.getReservation.execute(request.reservationId)
      return ok({ reservation })
    } catch (error) {
      if (error.response?.data.statusCode === 404) return notFound(error.response.data.message)
      return serverError(error)
    }
  }
}

interface Request {
  reservationId: string
}

interface Output {
  reservation: Reservation
}
