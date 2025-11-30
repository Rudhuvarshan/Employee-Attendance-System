import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todayStatusThunk } from '../../features/attendance/attendanceSlice';

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { today, loading } = useSelector(s => s.attendance);

  useEffect(() => { dispatch(todayStatusThunk()); }, [dispatch]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Dashboard</h2>
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Today</h3>
          <p><b>Status:</b> <span style={colorFor(today?.status)}>{today?.status || 'absent'}</span></p>
          <p><b>Checked In:</b> {today?.checkedIn ? 'Yes' : 'No'}</p>
          <p><b>Checked Out:</b> {today?.checkedOut ? 'Yes' : 'No'}</p>
        </div>
        <div style={styles.card}>
          <h3>Quick tips</h3>
          <p>Use Mark page to Check In/Out. Refresh updates instantly.</p>
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

const colorFor = (status) => {
  if (status === 'present') return { color: '#4caf50' };
  if (status === 'late') return { color: '#ffc107' };
  return { color: '#f44336' };
};

const styles = {
  container: { padding: 24 },
  heading: { color: '#3f51b5', marginBottom: 16 },
  grid: { display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' },
  card: { background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
};