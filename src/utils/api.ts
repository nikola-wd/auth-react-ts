import axios, { AxiosRequestConfig } from 'axios';

import { RegisterUserParams } from '../types';

const API_BASE = process.env.REACT_APP_API_BASE;

const axiosClient = axios.create({ baseURL: API_BASE });
// const config: AxiosRequestConfig = {};

// TODO: Type anotate return
export const postRegisterUser = async (
  data: RegisterUserParams,
  config?: AxiosRequestConfig
) => axiosClient.post(`/auth/local/signup`, data, config);

export const postRefreshToken = () =>
  axiosClient.post(`/auth/local/refresh`, null, {
    // withCredentials: true,
  });
