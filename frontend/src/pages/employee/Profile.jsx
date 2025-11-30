import { useSelector } from 'react-redux';

export default function Profile() {
  const { user } = useSelector(s => s.auth);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile</h2>
      <div style={styles.card}>
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Role:</b> {user?.role}</p>
      </div>
    </div>
  );
}

const styles = {
  container: { padding: 24 },
  heading: { color: '#e91e63', marginBottom: 16 },
  card: { background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
};