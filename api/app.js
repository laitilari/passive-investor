const express = require('express')
const app = express()
const morgan = require('morgan')
const homeRouter = require('./routes/homeRoutes')
const userRouter = require('./routes/userRoutes')

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/v1/', homeRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
