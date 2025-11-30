import Attendance from '../models/Attendance.js';

const todayStr = () => new Date().toISOString().split('T')[0];

export const getTodayStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const record = await Attendance.findOne({ user: userId, date: todayStr() });

    if (!record) return res.json({ status: 'absent', checkedIn: false, checkedOut: false });

    res.json({
      status: record.status,
      checkedIn: Boolean(record.checkInTime),
      checkedOut: Boolean(record.checkOutTime)
    });
  } catch {
    res.status(500).json({ message: 'Failed to load status' });
  }
};

export const checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const date = todayStr();
    const now = new Date().toLocaleTimeString();
    const existing = await Attendance.findOne({ user: userId, date });

    if (existing?.checkInTime) return res.status(400).json({ message: 'Already checked in' });

    const hour = new Date().getHours();
    const status = hour >= 10 ? 'late' : 'present';

    const record = await Attendance.findOneAndUpdate(
      { user: userId, date },
      { $set: { checkInTime: now, status } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(record);
  } catch {
    res.status(500).json({ message: 'Check-in failed' });
  }
};

export const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const date = todayStr();
    const now = new Date().toLocaleTimeString();
    const record = await Attendance.findOne({ user: userId, date });

    if (!record?.checkInTime) return res.status(400).json({ message: 'Not checked in yet' });
    if (record?.checkOutTime) return res.status(400).json({ message: 'Already checked out' });

    const checkIn = new Date(`${date}T${record.checkInTime}`);
    const checkOut = new Date(`${date}T${now}`);

    const hours = Math.max(0, Number(((checkOut - checkIn) / 36e5).toFixed(2)));

    record.checkOutTime = now;
    record.hours = hours;
    await record.save();

    res.json(record);
  } catch {
    res.status(500).json({ message: 'Check-out failed' });
  }
};