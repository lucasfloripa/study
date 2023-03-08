import { Box, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Spinner size="xl" color="blue.100" />
    </Box>
  );
}
