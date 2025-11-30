import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { todayStatusThunk } from '../../features/attendance/attendanceSlice';

export default function EmployeeDashboard() {
  const dispatch = useDispatch();
  const { today, loading } = useSelector(s => s.attendance);
  const user = useSelector(s => s.auth?.user);

  useEffect(() => { dispatch(todayStatusThunk()); }, [dispatch]);

  const statusBgColor = (status) => {
    if (status === 'present') return '#e8f5e9';
    if (status === 'late') return '#fff3e0';
    return '#ffebee';
  };

  const getStatusIcon = (status) => {
    if (status === 'present') return '✓';
    if (status === 'late') return '⚠';
    return '✕';
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.mainHeading}>Welcome back, {user?.name || 'Employee'}!</h1>
        <p style={styles.subHeading}>Here's your attendance overview</p>
      </div>

      <div style={styles.grid}>
        <div style={{...styles.card, backgroundColor: statusBgColor(today?.status)}}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Today's Status</h3>
            <div style={{...styles.statusBadge, color: getStatusColor(today?.status)}}>
              {getStatusIcon(today?.status)}
            </div>
          </div>
          <div style={styles.statusContent}>
            <div style={styles.statusItem}>
              <span style={styles.label}>Status:</span>
              <span style={{...styles.value, color: getStatusColor(today?.status), fontWeight: 'bold'}}>
                {(today?.status || 'absent').toUpperCase()}
              </span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.label}>Check In:</span>
              <span style={{...styles.value, color: today?.checkedIn ? '#4caf50' : '#999'}}>
                {today?.checkedIn ? `${today.checkInTime}` : 'Pending'}
              </span>
            </div>
            <div style={styles.statusItem}>
              <span style={styles.label}>Check Out:</span>
              <span style={{...styles.value, color: today?.checkedOut ? '#4caf50' : '#999'}}>
                {today?.checkedOut ? `${today.checkOutTime}` : 'Pending'}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Quick Actions</h3>
          <div style={styles.actionsList}>
            <Link to="/employee/mark" style={styles.actionLink}>
              <div style={styles.actionItem}>📋 Mark Attendance</div>
            </Link>
            <Link to="/employee/history" style={styles.actionLink}>
              <div style={styles.actionItem}>📊 View History</div>
            </Link>
            <Link to="/profile" style={styles.actionLink}>
              <div style={styles.actionItem}>👤 My Profile</div>
            </Link>
          </div>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>💡 Tips</h3>
          <ul style={styles.tipsList}>
            <li>Check in within 9:00 AM for on-time attendance</li>
            <li>Mark attendance from Mark Attendance page</li>
            <li>View your complete history in Attendance History</li>
            <li>Data updates instantly upon refresh</li>
          </ul>
        </div>
      </div>

      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Loading your attendance data...</p>
        </div>
      )}
    </div>
  );
}

const getStatusColor = (status) => {
  if (status === 'present') return '#4caf50';
  if (status === 'late') return '#ffc107';
  return '#f44336';
};

const styles = {
  container: { 
    padding: '32px 24px', 
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f5f7fa',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '32px',
  },
  mainHeading: { 
    color: '#1a237e', 
    marginBottom: '8px',
    fontSize: '28px',
    fontWeight: '600',
    margin: '0 0 8px 0'
  },
  subHeading: {
    color: '#666',
    fontSize: '14px',
    margin: '0'
  },
  grid: { 
    display: 'grid', 
    gap: '24px', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    marginBottom: '32px'
  },
  card: { 
    background: '#fff', 
    padding: '24px', 
    borderRadius: '12px', 
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  cardTitle: {
    margin: '0 0 16px 0',
    color: '#1a237e',
    fontSize: '18px',
    fontWeight: '600'
  },
  statusBadge: {
    fontSize: '32px',
    lineHeight: '1'
  },
  statusContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  statusItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #eee'
  },
  label: {
    color: '#666',
    fontSize: '14px',
    fontWeight: '500'
  },
  value: {
    fontSize: '14px',
    fontWeight: '500'
  },
  actionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  actionLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  actionItem: {
    padding: '14px 16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333'
  },
  tipsList: {
    margin: '0',
    paddingLeft: '20px',
    color: '#555',
    lineHeight: '1.8'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px',
    color: '#666'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #1a237e',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px'
  }
};