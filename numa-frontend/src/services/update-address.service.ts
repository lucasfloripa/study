import { ApiService } from './ApiService';

export class UpdateAddressService {
  static async handle(reservationId: string, data: Partial<Address>) {
    const response = await ApiService.patch<ReservationByIdResponse>(
      `/${reservationId}/billing_address`,
      {
        billingAddress: data,
      },
    );
    return response;
  }
}
