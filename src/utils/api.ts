import axios, { AxiosRequestConfig } from 'axios';

import { RegisterUserParams } from '../types';

const API_BASE = process.env.API_BASE;

const axiosClient = axios.create({ baseURL: API_BASE });
const config: AxiosRequestConfig = { withCredentials: true };

// TODO: Type anotate return
export const postRegisterUser = async (data: RegisterUserParams) =>
  axiosClient.post(`/auth/local/signup`, data, config);
