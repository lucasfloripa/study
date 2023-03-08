import { PatchBillingAddressReservationUsecase } from '../../../src/application/usecases'
import { PatchReservationGateway, GetReservationByIdGateway } from '../../../src/application/protocols'
import { mockGetReservationByIdGatewayStub, mockPatchReservationGatewayStub } from '../../application/mocks'
import { mockBillingAddress, mockReservation } from '../../domain/mocks'

interface SutTypes {
  sut: PatchBillingAddressReservationUsecase
  patchReservationGatewayStub: PatchReservationGateway
  getReservationByIdGatewayStub: GetReservationByIdGateway

}

const makeSut = (): SutTypes => {
  const getReservationByIdGatewayStub = mockGetReservationByIdGatewayStub()
  const patchReservationGatewayStub = mockPatchReservationGatewayStub()
  const sut = new PatchBillingAddressReservationUsecase(getReservationByIdGatewayStub, patchReservationGatewayStub)
  return { sut, patchReservationGatewayStub, getReservationByIdGatewayStub }
}

describe('PatchBillingAddressReservationUsecase', () => {
  test('Should call getReservationByIdGateway correctly', async () => {
    const { sut, getReservationByIdGatewayStub } = makeSut()
    const spyGetById = jest.spyOn(getReservationByIdGatewayStub, 'getById')
    await sut.execute('1', mockBillingAddress())
    expect(spyGetById).toHaveBeenCalledWith('1')
  })
  test('Should throw if getReservationByIdGateway throws', async () => {
    const { sut, getReservationByIdGatewayStub } = makeSut()
    jest.spyOn(getReservationByIdGatewayStub, 'getById').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const reservation = sut.execute('1', mockBillingAddress())
    await expect(reservation).rejects.toThrow()
  })
  test('Should call patchReservationGateway correctly', async () => {
    const { sut, patchReservationGatewayStub } = makeSut()
    const spyPatch = jest.spyOn(patchReservationGatewayStub, 'patch')
    await sut.execute('1', mockBillingAddress())
    expect(spyPatch).toHaveBeenCalledWith('1', { billingAddress: mockBillingAddress() })
  })
  test('Should throw if patchReservationGateway throws', async () => {
    const { sut, patchReservationGatewayStub } = makeSut()
    jest.spyOn(patchReservationGatewayStub, 'patch').mockImplementationOnce(async () => (await Promise.reject(new Error())))
    const reservation = sut.execute('1', mockBillingAddress())
    await expect(reservation).rejects.toThrow()
  })
  test('Should return a reservation on success', async () => {
    const { sut } = makeSut()
    const reservation = await sut.execute('1', mockBillingAddress())
    expect(reservation).toEqual(mockReservation())
  })
})
