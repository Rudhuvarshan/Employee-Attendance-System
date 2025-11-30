import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ManagerRoute({ children }) {
  const { user } = useSelector(s => s.auth);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'manager') return <Navigate to="/employee/dashboard" replace />;
  return children;
}