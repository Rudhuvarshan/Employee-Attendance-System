import User from '../models/User.js';

router.get('/employees', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const employees = await User.find({ role: 'employee' }).select('name email');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load employees' });
  }
});