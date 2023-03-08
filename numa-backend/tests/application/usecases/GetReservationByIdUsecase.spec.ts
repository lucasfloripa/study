import { GetReservationByIdUsecase } from '../../../src/application/usecases'
import { GetReservationByIdGateway } from '../../../src/application/protocols'
import { mockGetReservationByIdGatewayStub } from '../../application/mocks'
import { mockReservation } from '../../domain/mocks'

const mockRequest = '1'

interface SutTypes {
  sut: GetReservationByIdUsecase
  getReservationByIdGatewayStub: GetReservationByIdGateway
}

const makeSut = (): SutTypes => {
  const getReservationByIdGatewayStub = mockGetReservationByIdGatewayStub()
  const sut = new GetReservationByIdUsecase(getReservationByIdGatewayStub)
  return { sut, getReservationByIdGatewayStub }
}

describe('GetReservationByIdUsecase', () => {
  test('Should call getReservationByIdGateway with correct params', async () => {
    const { sut, getReservationByIdGatewayStub } = makeSut()
    const spyGetById = jest.spyOn(getReservationByIdGatewayStub, 'getById')
    await sut.execute(mockRequest)
    expect(spyGetById).toHaveBeenCalledWith(mockRequest)
  })
  test('Should throw if getReservationByIdGateway throws', async () => {
    const { sut, getReservationByIdGatewayStub } = makeSut()
    jest.spyOn(getReservationByIdGatewayStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const reservation = sut.execute(mockRequest)
    await expect(reservation).rejects.toThrow()
  })
  test('Should return a reservation on success', async () => {
    const { sut } = makeSut()
    const reservation = await sut.execute(mockRequest)
    expect(reservation).toEqual(mockReservation())
  })
})
