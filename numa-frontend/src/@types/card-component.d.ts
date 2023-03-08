declare type Address = {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  companyName: string;
  countryCode: string;
  regionCode: string;
  email: string;
  taxId: string;
  firstName: string;
  lastName: string;
};

declare type BillingAddressResponse = {
  id: string;
  billingAddress: Address;
};

declare type ReservationResponse = {
  reservations: BillingAddressResponse[];
};

declare type ReservationByIdResponse = {
  reservation: BillingAddressResponse;
};

declare type CardProps = {
  billingAddress: Address;
  onEditClick?: () => void;
  spaceBetween?: boolean;
};
