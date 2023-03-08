import { NumaGatewayHelper } from '../../../src/infra/gateways'

test('Should create an AxiosInstance with Oauth2 token', async () => {
  await NumaGatewayHelper.getAxiosInstance()
  expect(NumaGatewayHelper.token).toBeDefined()
  expect(NumaGatewayHelper.axios).toBeDefined()
})
