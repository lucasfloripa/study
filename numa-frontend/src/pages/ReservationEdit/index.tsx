import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Select,
  Toast,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import { ApiService } from '@/services/ApiService';
import { UpdateAddressService } from '@/services/update-address.service';
import { schema } from '@/validationSchemas/edit-address.schema';
import { ElseIf, Loading } from '@/components';
import { countryCodes } from '@/constants/country-code';

export function ReservationEdit() {
  const [loading, setLoading] = useState(true);

  const { reservationId } = useParams();
  const navigation = useNavigate();
  const toast = useToast();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Address>({
    resolver: joiResolver(schema),
  });

  const randomCountryCode = useMemo(() => {
    const randomNumber = Math.ceil(Math.random() * countryCodes.length);
    return countryCodes[randomNumber];
  }, []);

  async function onSubmit(formData: Address) {
    try {
      if (formData.countryCode.length === 0) {
        setValue('countryCode', randomCountryCode);
      }

      await UpdateAddressService.handle(reservationId!, formData);
      toast({
        title: 'Success',
        description: 'Billing address updated with success',
        status: 'success',
        isClosable: true,
      });
      navigation('/');
    } catch {
      toast({
        title: 'Failed',
        description: 'Something went wrong',
        status: 'error',
        isClosable: true,
      });
    }
  }

  function updateFormFields(addresses: Address) {
    setValue(
      'addressLine1',
      addresses.addressLine1.length > 0 ? addresses.addressLine1 : '',
    );
    setValue(
      'addressLine2',
      addresses.addressLine2.length > 0 ? addresses.addressLine2 : '',
    );
    setValue('city', addresses.city.length > 0 ? addresses.city : '');
    setValue(
      'companyName',
      addresses.companyName.length > 0 ? addresses.companyName : '',
    );
    setValue(
      'countryCode',
      addresses.countryCode.length > 0 ? addresses.countryCode : '',
    );
    setValue('email', addresses.email.length > 0 ? addresses.email : '');
    setValue(
      'firstName',
      addresses.firstName.length > 0 ? addresses.firstName : '',
    );
    setValue(
      'lastName',
      addresses.lastName.length > 0 ? addresses.lastName : '',
    );
    setValue(
      'postalCode',
      addresses.postalCode.length > 0 ? addresses.postalCode : '',
    );
    setValue(
      'regionCode',
      addresses.regionCode.length > 0 ? addresses.regionCode : '',
    );
    setValue('taxId', addresses.taxId.length > 0 ? addresses.taxId : '');
  }

  useEffect(() => {
    async function fetchReservationById() {
      const response = await ApiService.get<ReservationByIdResponse>(
        `/${reservationId}`,
      );
      updateFormFields(response.reservation.billingAddress);
      setLoading(false);
    }
    fetchReservationById();
  }, []);

  useEffect(() => {
    console.log('erros>>>>', errors);
  }, [errors]);

  return (
    <ElseIf
      condition={loading}
      elseComponent={
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxWidth="600px"
          height="100%"
        >
          <Card>
            <CardHeader>
              <Heading>Edit Address</Heading>
            </CardHeader>
            <CardBody>
              <Grid
                gridTemplateRows="repeat(6, 1fr)"
                gridTemplateColumns="repeat(2, 1fr)"
                columnGap={8}
              >
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.firstName}>
                      <FormLabel>First name</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.firstName && (
                        <FormErrorMessage>
                          {errors.firstName.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="lastName"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.lastName}>
                      <FormLabel>Last name</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.lastName && (
                        <FormErrorMessage>
                          {errors.lastName.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel>Email</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.email && (
                        <FormErrorMessage>
                          {errors.email.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.city}>
                      <FormLabel>City</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.city && (
                        <FormErrorMessage>
                          {errors.city.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="regionCode"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.regionCode}>
                      <FormLabel>Region Code</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.regionCode && (
                        <FormErrorMessage>
                          {errors.regionCode.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.postalCode}>
                      <FormLabel>Postal Code</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.postalCode && (
                        <FormErrorMessage>
                          {errors.postalCode.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.countryCode}>
                      <FormLabel>Country Code</FormLabel>
                      <Select placeholder="Country" {...field}>
                        {countryCodes.map(code => (
                          <option value={code} key={code}>
                            {code}
                          </option>
                        ))}
                      </Select>
                      {!!errors.countryCode && (
                        <FormErrorMessage>
                          {errors.countryCode.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.addressLine1}>
                      <FormLabel>Address line 1</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.addressLine1 && (
                        <FormErrorMessage>
                          {errors.addressLine1.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.addressLine2}>
                      <FormLabel>Address line 2</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.addressLine2 && (
                        <FormErrorMessage>
                          {errors.addressLine2.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="companyName"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.companyName}>
                      <FormLabel>Company name</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.companyName && (
                        <FormErrorMessage>
                          {errors.companyName.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  control={control}
                  name="taxId"
                  render={({ field }) => (
                    <FormControl isInvalid={!!errors.taxId}>
                      <FormLabel>Tax ID</FormLabel>
                      <Input type="text" {...field} />
                      {!!errors.taxId && (
                        <FormErrorMessage>
                          {errors.taxId.message}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            </CardBody>
            <CardFooter>
              <Button
                type="submit"
                variant="solid"
                colorScheme="blue"
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </Container>
      }
    >
      <Loading />
    </ElseIf>
  );
}
