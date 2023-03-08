import serverless from 'serverless-http'
import cors from 'cors'
import express from 'express'

import reservationRouter from './routes/reservationRouter'

const app = express()
app.use(express.json())
app.use(cors({
  methods: 'GET, PATCH',
  origin: '*'
}))
app.use(reservationRouter)

export const handler = serverless(app)
