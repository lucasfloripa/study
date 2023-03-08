import { EditIcon } from '@chakra-ui/icons';
import {
  CardHeader,
  Text,
  CardBody,
  CardFooter,
  Grid,
  GridItem,
  Button,
  Card as ChakraCard,
} from '@chakra-ui/react';

import { IF } from '..';

export function Card({
  billingAddress,
  spaceBetween = false,
  onEditClick,
}: CardProps) {
  return (
    <ChakraCard width="100%" marginBottom={spaceBetween ? '16px' : 0}>
      <CardHeader>
        <Text fontSize="1.8rem" as="b">
          Billing Address
        </Text>
      </CardHeader>
      <CardBody>
        <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(2, 1fr)">
          <IF condition={billingAddress.firstName.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">First Name: </Text>
                {billingAddress.firstName}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.lastName.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Last Name: </Text>
                {billingAddress.lastName}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.addressLine1.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Address Line 1: </Text>
                {billingAddress.addressLine1}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.addressLine2.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Address Line 2: </Text>
                {billingAddress.addressLine2}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.postalCode.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Postal Code: </Text>
                {billingAddress.postalCode}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.city.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">City: </Text>
                {billingAddress.city}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.companyName.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Company Name: </Text>
                {billingAddress.companyName}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.countryCode.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Country Code: </Text>
                {billingAddress.countryCode}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.regionCode.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Region Code: </Text>
                {billingAddress.regionCode}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.email.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Email: </Text>
                {billingAddress.email}
              </Text>
            </GridItem>
          </IF>
          <IF condition={billingAddress.taxId.length > 0}>
            <GridItem>
              <Text>
                <Text as="b">Iax ID: </Text>
                {billingAddress.taxId}
              </Text>
            </GridItem>
          </IF>
        </Grid>
      </CardBody>
      <CardFooter>
        <Button variant="solid" colorScheme="blue" onClick={onEditClick}>
          <EditIcon marginRight="8px" /> Edit
        </Button>
      </CardFooter>
    </ChakraCard>
  );
}
