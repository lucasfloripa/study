import { adaptRoute } from '../../main/adapters'
import { makeGetReservationsController, makeGetReservationByIdController, makePatchReservationController } from '../factories/controllers'

import { Router } from 'express'

const reservationRouter = Router()

reservationRouter.route('/').get(adaptRoute(makeGetReservationsController()))
reservationRouter.route('/:reservationId').get(adaptRoute(makeGetReservationByIdController()))
reservationRouter.route('/:reservationId/billing_address').patch(adaptRoute(makePatchReservationController()))

export default reservationRouter
