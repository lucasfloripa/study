
import { GetReservation } from '../../../src/domain/implementations'
import { GetReservationByIdController } from '../../../src/presentation/controllers'
import { ServerError } from '../../../src/presentation/errors'
import { badRequest, notFound, ok, serverError } from '../../../src/presentation/helpers'
import { Validation } from '../../../src/presentation/protocols'
import { mockGetReservationStub } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = { reservationId: '1' }

interface SutTypes {
  sut: GetReservationByIdController
  getReservationStub: GetReservation
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const getReservationStub = mockGetReservationStub()
  const validationStub = mockValidationStub()
  const sut = new GetReservationByIdController(getReservationStub, validationStub)
  return { sut, getReservationStub, validationStub }
}

describe('GetReservationByIdController', () => {
  test('Should call getReservations with correct params', async () => {
    const { sut, getReservationStub } = makeSut()
    const spyGetReservation = jest.spyOn(getReservationStub, 'execute')
    await sut.handle(mockRequest)
    expect(spyGetReservation).toHaveBeenCalledWith('1')
  })
  test('Should call validation with correct params', async () => {
    const { sut, validationStub } = makeSut()
    const spyValidation = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest)
    expect(spyValidation).toHaveBeenCalledWith(mockRequest)
  })
  test('Should return 400 if validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })
  test('Should return 404 if getReservation dont found a reservation', async () => {
    const { sut, getReservationStub } = makeSut()
    // eslint-disable-next-line prefer-promise-reject-errors
    jest.spyOn(getReservationStub, 'execute').mockImplementationOnce(async () => (await Promise.reject(
      {
        response: {
          data: {
            statusCode: 404,
            message: 'Cannot find reservation with id 1'
          }
        }
      }
    )))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(notFound('Cannot find reservation with id 1'))
  })
  test('Should return 500 if getReservations throws', async () => {
    const { sut, getReservationStub } = makeSut()
    jest.spyOn(getReservationStub, 'execute').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 200 on success', async () => {
    const { sut, getReservationStub } = makeSut()
    const spyExecute = jest.spyOn(getReservationStub, 'execute')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok({ reservation: await spyExecute.mock.results[0].value }))
  })
})
