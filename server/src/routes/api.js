const express = require('express');
const { ProductList } = require('../controllers/productController');
const { createTask, updateTask, listTaskByStatus, taskStatusCount, deleteTask } = require('../controllers/taskController');
const { registration, login, profileUpdate, profileDetails } = require('../controllers/usersController');
const { protect } = require('../middleware/authUser');




const router = express.Router()

// Authentication
router.post("/registration", registration)
router.post("/login", login)

// User Profile
router.post("/profileUpdate", protect, profileUpdate)
router.get("/profileDetails", protect, profileDetails);

// TASk API 
router.post("/createTask", protect, createTask);
router.get("/updateTask/:id/:status", protect, updateTask)
router.get("/listTaskByStatus/:status", protect, listTaskByStatus);
router.get("/taskStatusCount", protect, taskStatusCount);
router.get("/deleteTask/:id", protect, deleteTask)

router.get('/productList/:pageNo/:perPage/:searchKey?', ProductList)

module.exports = router;

