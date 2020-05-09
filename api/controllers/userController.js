const Test = require('../models/testModel')
const APIFeatures = require('../utils/apiFeatures')

exports.topUsers = (req, res, next) => {
  req.query.limit = '2'
  req.query.sort = '-price'
  req.query.fields = 'name,price'
  next()
}

exports.getAllUsers = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.getUser = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id)
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        test,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.createUser = async (req, res) => {
  try {
    const test = await Test.create(req.body)
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        test,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    })
  }
}
