const express = require('express');
const { registration, login } = require('../controllers/usersController');




const router = express.Router()

router.post("/registration", registration)
router.post("/login", login)


module.exports = router;