// backend/seed.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/User.js';
import Attendance from './models/Attendance.js';
import bcrypt from 'bcryptjs';

dotenv.config();
await connectDB();

async function seed() {
  await User.deleteMany();
  await Attendance.deleteMany();

  const password = await bcrypt.hash('123456', 10);

  const alice = await User.create({
    name: 'Alice Employee',
    email: 'alice@example.com',
    password,
    role: 'employee'
  });

  const today = new Date().toISOString().split('T')[0];

  await Attendance.create([
    {
      user: alice._id,
      date: today,
      status: 'present',
      checkInTime: '09:00:00',
      checkOutTime: '17:00:00',
      hours: 8
    },
    {
      user: alice._id,
      date: '2025-11-29',
      status: 'late',
      checkInTime: '10:15:00',
      checkOutTime: '17:00:00',
      hours: 6.75
    }
  ]);

  console.log('Alice seeded with attendance ✅');
  process.exit();
}

seed();