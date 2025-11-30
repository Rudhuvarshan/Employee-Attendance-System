import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(s => s.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginThunk(form));
    if (res.meta.requestStatus === 'fulfilled') {
      const role = res.payload?.user?.role;
      navigate(role === 'manager' ? '/manager/dashboard' : '/employee/dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Welcome back 👋</h2>
        <form onSubmit={onSubmit} style={styles.form}>
          <input style={styles.input} placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
          <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
          <button style={styles.btn} disabled={loading}>Login</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.meta}>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#e3f2fd,#fce4ec)' },
  card: { width: 340, background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 6px 24px rgba(0,0,0,0.12)' },
  heading: { color: '#3f51b5', marginBottom: 16 },
  form: { display: 'grid', gap: 12 },
  input: { padding: 10, border: '1px solid #ddd', borderRadius: 8 },
  btn: { padding: 10, border: 'none', borderRadius: 8, color: '#fff', background: 'linear-gradient(90deg,#3f51b5,#5c6bc0)', cursor: 'pointer' },
  error: { color: '#f44336', marginTop: 10 },
  meta: { marginTop: 12, fontSize: 14 }
};