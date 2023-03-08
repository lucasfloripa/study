import { GetReservations } from '../../../src/domain/implementations'
import { GetReservationsController } from '../../../src/presentation/controllers'
import { ServerError } from '../../../src/presentation/errors'
import { noContent, ok, serverError } from '../../../src/presentation/helpers'
import { mockGetReservationsStub } from '../../domain/mocks'

interface SutTypes {
  sut: GetReservationsController
  getReservationsStub: GetReservations
}

const makeSut = (): SutTypes => {
  const getReservationsStub = mockGetReservationsStub()
  const sut = new GetReservationsController(getReservationsStub)
  return { sut, getReservationsStub }
}

describe('GetReservationsController', () => {
  test('Should call getReservations correctly', async () => {
    const { sut, getReservationsStub } = makeSut()
    const spyExecute = jest.spyOn(getReservationsStub, 'execute')
    await sut.handle()
    expect(spyExecute).toHaveBeenCalled()
  })
  test('Should return 500 if getReservations throws', async () => {
    const { sut, getReservationsStub } = makeSut()
    jest.spyOn(getReservationsStub, 'execute').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })
  test('Should return 204 if getReservations returns nothing', async () => {
    const { sut, getReservationsStub } = makeSut()
    jest.spyOn(getReservationsStub, 'execute').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent('No reservations found'))
  })
  test('Should return 200 on success', async () => {
    const { sut, getReservationsStub } = makeSut()
    const spyGetUser = jest.spyOn(getReservationsStub, 'execute')
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok({ reservations: await spyGetUser.mock.results[0].value }))
  })
})
