import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Card, ElseIf, Loading } from '@/components';
import { ApiService } from '@/services/ApiService';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const [reservaTionResponse, setReservationResponse] = useState(
    {} as ReservationResponse,
  );
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  function navigateToEditAddress(reservationId: string) {
    navigation(`/reservation/${reservationId}`);
  }

  useEffect(() => {
    const fetchBillingAddresses = async () => {
      const response = await ApiService.get<ReservationResponse>('/');
      setReservationResponse(response);
      setLoading(false);
    };
    fetchBillingAddresses();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ElseIf
      condition={loading}
      elseComponent={
        <Container maxWidth="600px" height="100%" padding="32px 0">
          {reservaTionResponse.reservations.map(item => (
            <Card
              key={item.id}
              billingAddress={item.billingAddress}
              spaceBetween
              onEditClick={() => navigateToEditAddress(item.id)}
            />
          ))}
        </Container>
      }
    >
      <Loading />
    </ElseIf>
  );
}
