import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allAttendanceThunk } from '../../features/attendance/attendanceSlice';

export default function AllAttendance() {
  const dispatch = useDispatch();
  const { allRecords, loading, error } = useSelector(s => s.attendance);

  useEffect(() => {
    dispatch(allAttendanceThunk());
  }, [dispatch]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Attendance Records</h2>
      <div style={styles.card}>
        {loading && <p>Loading...</p>}
        {error && <p style={styles.error}>{error}</p>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Status</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {allRecords?.length ? allRecords.map((row) => (
              <tr key={row._id}>
                <td>{row.user?.name || 'Unknown'}</td>
                <td>{row.date}</td>
                <td style={colorCell(row.status)}>{row.status}</td>
                <td>{row.checkInTime || '-'}</td>
                <td>{row.checkOutTime || '-'}</td>
                <td>{row.hours || 0}</td>
              </tr>
            )) : (
              <tr><td colSpan="6" style={{ textAlign: 'center', opacity: 0.7 }}>No records</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const colorCell = (status) => ({
  color: status === 'present' ? '#4caf50' : status === 'late' ? '#ffc107' : '#f44336'
});

const styles = {
  container: { padding: 24 },
  heading: { color: '#009688', marginBottom: 16 },
  card: { background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  error: { color: '#f44336' }
};