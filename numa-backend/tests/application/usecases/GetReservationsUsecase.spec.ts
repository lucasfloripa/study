import { GetReservationsUsecase } from '../../../src/application/usecases'
import { GetReservationsGateway } from '../../../src/application/protocols'
import { mockGetReservationsGatewayStub } from '../../application/mocks'
import { mockReservation } from '../../domain/mocks'

interface SutTypes {
  sut: GetReservationsUsecase
  getReservationsGatewayStub: GetReservationsGateway
}

const makeSut = (): SutTypes => {
  const getReservationsGatewayStub = mockGetReservationsGatewayStub()
  const sut = new GetReservationsUsecase(getReservationsGatewayStub)
  return { sut, getReservationsGatewayStub }
}

describe('GetReservationsUsecase', () => {
  test('Should call getReservationsGateway correctly', async () => {
    const { sut, getReservationsGatewayStub } = makeSut()
    const spyGet = jest.spyOn(getReservationsGatewayStub, 'get')
    await sut.execute()
    expect(spyGet).toHaveBeenCalled()
  })
  test('Should throw if getReservationsGateway throws', async () => {
    const { sut, getReservationsGatewayStub } = makeSut()
    jest.spyOn(getReservationsGatewayStub, 'get').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const reservation = sut.execute()
    await expect(reservation).rejects.toThrow()
  })
  test('Should return a reservation on success', async () => {
    const { sut } = makeSut()
    const reservation = await sut.execute()
    expect(reservation).toEqual([mockReservation()])
  })
})
