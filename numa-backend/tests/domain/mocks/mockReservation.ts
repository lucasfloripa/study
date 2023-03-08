import { Reservation } from '../../../src/domain/entities'
import { mockBillingAddress } from './mockBillingAddress'

export const mockReservation = (): Reservation => ({
  id: 'any-id',
  billingAddress: mockBillingAddress()
})
