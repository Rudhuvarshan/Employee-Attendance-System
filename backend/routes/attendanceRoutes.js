import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { getTodayStatus, checkIn, checkOut } from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/today', authMiddleware, getTodayStatus);
router.post('/checkin', authMiddleware, checkIn);
router.post('/checkout', authMiddleware, checkOut);

export default router;