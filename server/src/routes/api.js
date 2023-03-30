const express = require('express');
const { registration, login, profileUpdate, profileDetails } = require('../controllers/usersController');
const { protect } = require('../middleware/authUser');




const router = express.Router()

router.post("/registration", registration)
router.post("/login", login)

router.post("/profileUpdate", protect, profileUpdate)
router.get("/profileDetails", protect, profileDetails);
module.exports = router;