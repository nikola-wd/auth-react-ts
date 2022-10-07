import axios, { AxiosRequestConfig } from 'axios';

import { LoginUserParams, RegisterUserParams } from '../types';

const API_BASE = process.env.REACT_APP_API_BASE;

const axiosClient = axios.create({ baseURL: API_BASE });
// const config: AxiosRequestConfig = {};

/**
 * AUTH FLOW
 ******************************************************* */

// TODO: Type anotate return
// Sends the request to try and register a new user
export const postRegisterUser = async (
  data: RegisterUserParams,
  config?: AxiosRequestConfig
) => axiosClient.post(`/auth/local/signup`, data, config);

// Sends the request to try and login an existing user
export const postLoginUser = async (
  data: LoginUserParams,
  config?: AxiosRequestConfig
) => axiosClient.post(`/auth/local/signin`, data, config);

// Sends the refresh request to try to get a new access_token
/* export const postRefreshToken = async () =>
  axiosClient.post(`/auth/local/refresh`, null, {
    // withCredentials: true,
  });
 */
/** *******************************************************
 * END: AUTH FLOW
 * */

// Sends the GET request to logout the logged in user
export const postLogoutUser = async (config?: AxiosRequestConfig) =>
  axiosClient.post(`/auth/local/signin`, null, config);

// ________________________________________________________
