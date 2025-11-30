import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const { user } = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => { dispatch(logout()); navigate('/login'); };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>Employee Attendance System</Link>
        {user?.role === 'employee' && (
          <>
            <Link to="/employee/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/employee/mark" style={styles.link}>Mark</Link>
            <Link to="/employee/history" style={styles.link}>History</Link>
            <Link to="/employee/profile" style={styles.link}>Profile</Link>
          </>
        )}
        {user?.role === 'manager' && (
          <>
            <Link to="/manager/dashboard" style={styles.link}>Dashboard</Link>
            <Link to="/manager/all" style={styles.link}>All</Link>
            <Link to="/manager/calendar" style={styles.link}>Calendar</Link>
            <Link to="/manager/reports" style={styles.link}>Reports</Link>
          </>
        )}
      </div>
      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.user}>{user.name} ({user.role})</span>
            <button style={styles.logout} onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '12px 20px', background: 'linear-gradient(90deg,#3f51b5,#5c6bc0)', color: '#fff', position: 'sticky', top: 0, zIndex: 10 },
  left: { display: 'flex', gap: '16px', alignItems: 'center' },
  right: { display: 'flex', gap: '16px', alignItems: 'center' },
  brand: { fontWeight: 'bold', fontSize: '18px', color: '#fff' },
  link: { color: '#fff', opacity: 0.9 },
  user: { opacity: 0.9 },
  logout: { background: '#f44336', border: 'none', padding: '6px 12px', borderRadius: '6px', color: '#fff', cursor: 'pointer' }
};