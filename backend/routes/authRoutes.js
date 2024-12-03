const express = require('express');
const { studentLogin, adminLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/students/login', studentLogin);
router.post('/admins/login', adminLogin);

module.exports = router;
