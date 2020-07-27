const User = require('../models/userModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

exports.topUsers = (req, res, next) => {
  req.query.limit = '2'
  req.query.sort = '-price'
  req.query.fields = 'name,price'
  next()
}

exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate()

  const users = await features.query

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  })
})

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      user,
    },
  })
})

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body)
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      user,
    },
  })
})

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      user,
    },
  })
})

exports.deleteUser = catchAsync(async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: null,
  })
})
