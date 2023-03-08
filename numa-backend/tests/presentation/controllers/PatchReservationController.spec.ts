import { PatchReservation } from '../../../src/domain/implementations'
import { PatchReservationByIdController } from '../../../src/presentation/controllers'
import { ServerError } from '../../../src/presentation/errors'
import { badRequest, notFound, ok, serverError } from '../../../src/presentation/helpers'
import { Validation } from '../../../src/presentation/protocols'
import { mockPathReservationStub } from '../../domain/mocks'
import { mockValidationStub } from '../mocks'

const mockRequest = {
  reservationId: '1',
  billingAddress: {
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    city: '',
    companyName: '',
    countryCode: '',
    regionCode: '',
    email: '',
    taxId: '',
    firstName: '',
    lastName: ''
  }
}

interface SutTypes {
  sut: PatchReservationByIdController
  patchReservationStub: PatchReservation
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const patchReservationStub = mockPathReservationStub()
  const validationStub = mockValidationStub()
  const sut = new PatchReservationByIdController(patchReservationStub, validationStub)
  return { sut, patchReservationStub, validationStub }
}

describe('PatchReservationController', () => {
  test('Should call patchReservation with correct params', async () => {
    const { sut, patchReservationStub } = makeSut()
    const spyExecute = jest.spyOn(patchReservationStub, 'execute')
    await sut.handle(mockRequest)
    expect(spyExecute).toHaveBeenCalledWith(mockRequest.reservationId, mockRequest.billingAddress)
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
  test('Should return 500 if patchReservation throws', async () => {
    const { sut, patchReservationStub } = makeSut()
    jest.spyOn(patchReservationStub, 'execute').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 404 if patchReservation dont found a reservation', async () => {
    const { sut, patchReservationStub } = makeSut()
    // eslint-disable-next-line prefer-promise-reject-errors
    jest.spyOn(patchReservationStub, 'execute').mockImplementationOnce(async () => (await Promise.reject(
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
  test('Should return 200 on success', async () => {
    const { sut, patchReservationStub } = makeSut()
    const spyGetUser = jest.spyOn(patchReservationStub, 'execute')
    const httpResponse = await sut.handle(mockRequest)
    expect(httpResponse).toEqual(ok({ reservation: await spyGetUser.mock.results[0].value }))
  })
})
