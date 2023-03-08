import { NumaGateway } from '../../../src/infra/gateways'
import { mockBillingAddress } from '../../domain/mocks'

const makeSut = (): NumaGateway => {
  return new NumaGateway()
}

describe('NumaGateway', () => {
  describe('get()', () => {
    test('should return a array of Reservations on success', async () => {
      const sut = makeSut()
      const reservations = await sut.get()
      expect(reservations.length).toBeGreaterThanOrEqual(1)
    })
  })
  describe('getById()', () => {
    test('should throw a 404 error if a invalid id is provided', async () => {
      const sut = makeSut()
      const reservation = sut.getById('invalid-id')
      await expect(reservation).rejects.toThrow()
    })
    test('should return a Reservation if a valid id is provided', async () => {
      const sut = makeSut()
      const reservation = await sut.getById('RPCGCKBT-1')
      expect(reservation.id).toBeDefined()
      expect(reservation.billingAddress).toBeDefined()
    })
  })
  describe('patch()', () => {
    test('should throw a 404 error if a invalid id is provided', async () => {
      const sut = makeSut()
      const reservation = sut.patch('invalid-id', { billingAddress: mockBillingAddress() })
      await expect(reservation).rejects.toThrow()
    })
    test('should return a Reservation updated', async () => {
      const sut = makeSut()
      const reservation = await sut.patch('RPCGCKBT-1', { billingAddress: mockBillingAddress() })
      expect(reservation.billingAddress).toEqual(mockBillingAddress())
    })
  })
})
