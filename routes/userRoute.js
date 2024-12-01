const express = require('express');
const { registerUser, loginuser, currentUser } = require('../controllers/userController');
const validateToken = require("../middleware/validateToken")
const router = express.Router();
router.post('/register' ,registerUser)
router.post("/login", loginuser)
router.get("/current",validateToken ,currentUser)

module.exports = router