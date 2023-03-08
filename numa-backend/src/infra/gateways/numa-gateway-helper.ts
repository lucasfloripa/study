import axios, { AxiosInstance } from 'axios'

export const NumaGatewayHelper = {
  token: null as unknown as string,
  axios: null as unknown as AxiosInstance,

  async createAxiosInstance (): Promise<void> {
    this.token = await axios.request({
      url: 'https://pr411-numa-core.auth.eu-central-1.amazoncognito.com/oauth2/token',
      method: 'POST',
      data: 'grant_type=client_credentials',
      auth: {
        username: '6kp90oc7nk8uthuo23ubjp1k2o',
        password: 'd4qeihkqtrqq6vbgtm8hf9ooee58nefj38bdeckq06gleg62h46'
      }
    }).then(response => response.data.access_token)

    this.axios = axios.create({
      baseURL: 'https://7syvuumsg3.execute-api.eu-central-1.amazonaws.com',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    })
  },

  async getAxiosInstance (): Promise<AxiosInstance> {
    if (!this.token) await this.createAxiosInstance()
    return this.axios
  }
}
