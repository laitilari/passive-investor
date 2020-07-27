const express = require('express');
const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    topUsers,
} = require('../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

// router.param('id', checkId)

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/top-users').get(topUsers);
module.exports = router;
