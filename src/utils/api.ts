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
// Expects header Authorization (or authorization): Bearer access_token
// TODO: Take into account that at might expire, so always first try to refresh it.
// If it throws exception, logout anyway?
export const getLogoutUser = async (config?: AxiosRequestConfig) =>
  axiosClient.get(`/auth/local/logout`, config);

// ________________________________________________________
// TODO: create a helper tryRequest fn that sends access_token first, and if it doesn't work, sends refresh req, and then if access doesn't work -> fail. Also, if access_token is not in memory (that may be solved with persist?), first do the refresh and then try
