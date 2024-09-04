import axios from 'axios';

export const instance = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : 'https://gpgpu-drop.vercel.app/api',
  withCredentials: import.meta.env.DEV ? false : undefined,
});
