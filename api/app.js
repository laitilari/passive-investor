const express = require('express')
const app = express()
const morgan = require('morgan')
const homeRouter = require('./routes/homeRoutes')
const userRouter = require('./routes/userRoutes')
const AppError = require('./utils/appError')

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.use(express.static(`${__dirname}/public`))
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})
app.use('/api/v1/', homeRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404))
})

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  })
})

module.exports = app
