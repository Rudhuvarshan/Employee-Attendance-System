import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(s => s.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerThunk(form));
    if (res.meta.requestStatus === 'fulfilled') {
      navigate(form.role === 'manager' ? '/manager/dashboard' : '/employee/dashboard');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create your account ✨</h2>
        <form onSubmit={onSubmit} style={styles.form}>
          <input style={styles.input} placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
          <input style={styles.input} placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
          <input style={styles.input} type="password" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
          <select style={styles.input} value={form.role} onChange={(e)=>setForm({...form,role:e.target.value})}>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
          <button style={styles.btn} disabled={loading}>Register</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
        <p style={styles.meta}>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#fce4ec,#e3f2fd)' },
  card: { width: 360, background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 6px 24px rgba(0,0,0,0.12)' },
  heading: { color: '#009688', marginBottom: 16 },
  form: { display: 'grid', gap: 12 },
  input: { padding: 10, border: '1px solid #ddd', borderRadius: 8 },
  btn: { padding: 10, border: 'none', borderRadius: 8, color: '#fff', background: 'linear-gradient(90deg,#009688,#26a69a)', cursor: 'pointer' },
  error: { color: '#f44336', marginTop: 10 },
  meta: { marginTop: 12, fontSize: 14 }
};