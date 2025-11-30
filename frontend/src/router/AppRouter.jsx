import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../pages/Login';
import Register from '../pages/Register';
import EmployeeRoute from './EmployeeRoute';
import ManagerRoute from './ManagerRoute';
import EmployeeDashboard from '../pages/employee/EmployeeDashboard';
import MarkAttendance from '../pages/employee/MarkAttendance';
import AttendanceHistory from '../pages/employee/AttendanceHistory';
import Profile from '../pages/employee/Profile';
import ManagerDashboard from '../pages/manager/ManagerDashboard';
import AllAttendance from '../pages/manager/AllAttendance';
import TeamCalendar from '../pages/manager/TeamCalendar';
import Reports from '../pages/manager/Reports';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/employee/dashboard" element={<EmployeeRoute><EmployeeDashboard /></EmployeeRoute>} />
        <Route path="/employee/mark" element={<EmployeeRoute><MarkAttendance /></EmployeeRoute>} />
        <Route path="/employee/history" element={<EmployeeRoute><AttendanceHistory /></EmployeeRoute>} />
        <Route path="/employee/profile" element={<EmployeeRoute><Profile /></EmployeeRoute>} />

        <Route path="/manager/dashboard" element={<ManagerRoute><ManagerDashboard /></ManagerRoute>} />
        <Route path="/manager/all" element={<ManagerRoute><AllAttendance /></ManagerRoute>} />
        <Route path="/manager/calendar" element={<ManagerRoute><TeamCalendar /></ManagerRoute>} />
        <Route path="/manager/reports" element={<ManagerRoute><Reports /></ManagerRoute>} />
      </Routes>
    </BrowserRouter>
  );
}