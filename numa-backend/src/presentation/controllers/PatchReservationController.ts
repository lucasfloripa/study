import { BillingAddress, Reservation } from '../../domain/entities'
import { PatchReservation } from '../../domain/implementations'
import { badRequest, notFound, ok, serverError } from '../helpers'
import { Controller, HttpResponse, Validation } from '../protocols'

export class PatchReservationByIdController implements Controller {
  constructor (private readonly patchReservation: PatchReservation, private readonly validation: Validation) {}

  async handle (request: Request): Promise<HttpResponse<Output>> {
    try {
      const { reservationId, billingAddress } = request
      const error = this.validation.validate(request)
      if (error != null) return badRequest(error)
      const reservation = await this.patchReservation.execute(reservationId, billingAddress)
      return ok({ reservation })
    } catch (error) {
      if (error.response?.data.statusCode === 400) return badRequest(new Error(error.response.data.message))
      if (error.response?.data.statusCode === 404) return notFound(error.response.data.message)
      return serverError(error)
    }
  }
}

interface Request {
  reservationId: string
  billingAddress: BillingAddress
}

interface Output {
  reservation: Reservation
}
