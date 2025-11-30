import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
  checkInTime: { type: String },  // HH:mm:ss locale string
  checkOutTime: { type: String },
  hours: { type: Number, default: 0 }
}, { timestamps: true });

attendanceSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);