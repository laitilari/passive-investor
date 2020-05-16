const Test = require('../models/testModel')
const APIFeatures = require('../utils/apiFeatures')
const catchAsync = require('./../utils/catchAsync')

exports.topUsers = (req, res, next) => {
  req.query.limit = '2'
  req.query.sort = '-price'
  req.query.fields = 'name,price'
  next()
}

exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(Test.find(), req.query)
    .filter()
    .sort()
    .limit()
    .paginate()

  const tests = await features.query

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tests.length,
    data: {
      tests,
    },
  })
})

exports.getUser = catchAsync(async (req, res) => {
  const test = await Test.findById(req.params.id)
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      test,
    },
  })
})

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await Test.create(req.body)
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      user,
    },
  })
})

exports.updateUser = catchAsync(async (req, res) => {
  const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      test,
    },
  })
})

exports.deleteUser = catchAsync(async (req, res) => {
  await Test.findByIdAndDelete(req.params.id)
  res.status(204).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: null,
  })
})
