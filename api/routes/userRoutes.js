const express = require('express')
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  topUsers,
} = require('../controllers/userController')
const router = express.Router()

// router.param('id', checkId)

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
router.route('/top-users').get(topUsers)
module.exports = router
