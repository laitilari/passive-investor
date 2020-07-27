const express = require('express');
const {getHomePage} = require('../controllers/homeController');
const authController = require('./../controllers/authController');
const router = express.Router();

router.route('/').get(authController.protect, getHomePage);

module.exports = router;
