const express = require('express')
const { getHomePage } = require('../controllers/homeController')
const router = express.Router()

router
    .route('/').get(getHomePage)

module.exports = router;