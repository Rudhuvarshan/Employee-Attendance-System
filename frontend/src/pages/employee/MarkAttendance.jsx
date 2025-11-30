import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todayStatusThunk, checkInThunk, checkOutThunk, clearError } from '../../features/attendance/attendanceSlice';

export default function MarkAttendance() {
  const dispatch = useDispatch();
  const { today, loading, error } = useSelector(s => s.attendance);

  useEffect(() => { dispatch(todayStatusThunk()); }, [dispatch]);

  const refresh = () => dispatch(todayStatusThunk());

  const handleCheckIn = async () => {
    dispatch(clearError());
    const res = await dispatch(checkInThunk());
    if (res.meta.requestStatus === 'fulfilled') refresh();
  };

  const handleCheckOut = async () => {
    dispatch(clearError());
    const res = await dispatch(checkOutThunk());
    if (res.meta.requestStatus === 'fulfilled') refresh();
  };

  const disabledIn = loading || today?.checkedIn;
  const disabledOut = loading || !today?.checkedIn || today?.checkedOut;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🕒 Mark Attendance</h2>
      <div style={styles.card}>
        <p style={styles.status}><b>Status:</b> <span style={colorFor(today?.status)}>{today?.status || 'absent'}</span></p>
        <div style={styles.buttons}>
          <button style={{ ...styles.btn, ...(disabledIn ? styles.btnDisabled : styles.btnSuccess) }} disabled={disabledIn} onClick={handleCheckIn}>✅ Check In</button>
          <button style={{ ...styles.btn, ...(disabledOut ? styles.btnDisabled : styles.btnDanger) }} disabled={disabledOut} onClick={handleCheckOut}>⏹️ Check Out</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const colorFor = (status) => {
  if (status === 'present') return { color: '#4caf50' };
  if (status === 'late') return { color: '#ffc107' };
  return { color: '#f44336' };
};

const styles = {
  container: { padding: 24, background: 'linear-gradient(135deg,#e3f2fd,#fce4ec)', borderRadius: 12, margin: 24 },
  heading: { color: '#3f51b5', marginBottom: 16, fontWeight: 600 },
  card: { background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,0.08)' },
  status: { fontSize: 18, marginBottom: 16 },
  buttons: { display: 'flex', gap: 12 },
  btn: { padding: '10px 20px', border: 'none', borderRadius: 8, color: '#fff', fontWeight: 600, cursor: 'pointer' },
  btnSuccess: { background: 'linear-gradient(90deg,#4caf50,#81c784)' },
  btnDanger: { background: 'linear-gradient(90deg,#f44336,#e57373)' },
  btnDisabled: { background: '#bdbdbd', cursor: 'not-allowed' },
  error: { color: '#f44336', marginTop: 12 }
};