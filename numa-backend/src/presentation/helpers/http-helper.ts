import { HttpResponse } from '../protocols'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const notFound = (message: string): HttpResponse => ({
  statusCode: 404,
  body: new Error(message)
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const noContent = (message: string): HttpResponse => ({
  statusCode: 204,
  body: message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
