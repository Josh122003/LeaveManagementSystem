const express = require('express');
const { applyLeave, getStudentLeaves, getAllLeaves, updateLeaveStatus } = require('../controllers/leaveController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, applyLeave);
router.get('/student', verifyToken, getStudentLeaves);
router.get('/admin', verifyToken, getAllLeaves);
router.post('/status', verifyToken, updateLeaveStatus);
router.delete('/leaves/:id', leaveController.cancelLeave);
module.exports = router;
