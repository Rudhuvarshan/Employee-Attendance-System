import { api } from '../../api/axios';

// Employee
export const todayStatusApi = async () => (await api.get('/attendance/today')).data;
export const checkInApi = async () => (await api.post('/attendance/checkin')).data;
export const checkOutApi = async () => (await api.post('/attendance/checkout')).data;
export const myHistoryApi = async () => (await api.get('/attendance/my-history')).data;

// Manager
export const allAttendanceApi = async () => (await api.get('/attendance/all')).data;
export const calendarAttendanceApi = async () => (await api.get('/attendance/calendar')).data;
export const employeeHistoryApi = async (id) => (await api.get(`/attendance/employee/${id}/history`)).data;