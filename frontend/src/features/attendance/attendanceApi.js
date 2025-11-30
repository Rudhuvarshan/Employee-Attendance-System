import { api } from '../../api/axios';

export const checkInApi = async () => (await api.post('/attendance/checkin')).data;
export const checkOutApi = async () => (await api.post('/attendance/checkout')).data;
export const todayStatusApi = async () => (await api.get('/attendance/today')).data;
export const myHistoryApi = async (params = {}) => (await api.get('/attendance/my-history', { params })).data; // optional future
export const mySummaryApi = async (params = {}) => (await api.get('/attendance/my-summary', { params })).data; // optional future
export const employeeDashboardApi = async () => (await api.get('/dashboard/employee')).data; // optional future
export const managerDashboardApi = async () => (await api.get('/dashboard/manager')).data; // optional future