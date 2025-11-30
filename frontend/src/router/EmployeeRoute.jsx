import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function EmployeeRoute({ children }) {
  const { user } = useSelector(s => s.auth);
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'employee') return <Navigate to="/manager/dashboard" replace />;
  return children;
}