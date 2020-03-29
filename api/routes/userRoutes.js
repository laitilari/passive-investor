const express = require('express')
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkId,
  checkBody,
} = require('../controllers/userController')
const router = express.Router()

router.param('id', checkId)

router.route('/').get(getAllUsers).post(checkBody, createUser)
router.route('/:id').get(checkId, getUser).patch(updateUser).delete(deleteUser)

module.exports = router
