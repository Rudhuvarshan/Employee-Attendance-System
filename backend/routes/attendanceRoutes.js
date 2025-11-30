import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import {
  getTodayStatus,
  checkIn,
  checkOut
} from '../controllers/attendanceController.js';
import Attendance from '../models/Attendance.js';

const router = express.Router();

// Employee routes
router.get('/today', authMiddleware, getTodayStatus);
router.post('/checkin', authMiddleware, checkIn);
router.post('/checkout', authMiddleware, checkOut);
router.get('/my-history', authMiddleware, async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user.id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load history' });
  }
});

// Manager: all attendance
router.get('/all', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'manager') return res.status(403).json({ message: 'Access denied' });
    const records = await Attendance.find({})
      .populate('user', 'name email role')
      .sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load all attendance' });
  }
});

// Manager: calendar view
router.get('/calendar', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'manager') return res.status(403).json({ message: 'Access denied' });
    const records = await Attendance.find({})
      .populate('user', 'name email')
      .sort({ date: -1 });

    const grouped = records.reduce((acc, rec) => {
      if (!acc[rec.date]) acc[rec.date] = [];
      acc[rec.date].push(rec);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load calendar view' });
  }
});

// Manager: specific employee history
router.get('/employee/:id/history', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'manager') return res.status(403).json({ message: 'Access denied' });
    const records = await Attendance.find({ user: req.params.id }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load employee history' });
  }
});

export default router;