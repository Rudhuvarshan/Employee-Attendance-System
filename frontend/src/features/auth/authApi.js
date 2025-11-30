import { api } from '../../api/axios';

export const loginApi = async (payload) => (await api.post('/auth/login', payload)).data;
export const registerApi = async (payload) => (await api.post('/auth/register', payload)).data;
export const meApi = async () => (await api.get('/auth/me')).data;