import { BillingAddress } from '../../../src/domain/entities'

export const mockBillingAddress = (): BillingAddress => ({
  addressLine1: 'any-address-line1',
  addressLine2: 'any-address-line2',
  city: 'any-city',
  companyName: 'any-company',
  countryCode: 'BD',
  email: 'any-email',
  firstName: 'any-first-name',
  lastName: 'any-last-name',
  postalCode: 'any-postal-code',
  regionCode: 'any-region-code',
  taxId: 'any-tax-id'
})
