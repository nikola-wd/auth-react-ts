import axios, { AxiosRequestConfig } from 'axios';

import { LoginUserParams, RegisterUserParams } from '../types';

// TODO: remove this file when finished
// Used for independent testing on localhost:3000
// const API_BASE = process.env.REACT_APP_API_BASE;

// TODO: Move from here
let API_BASE = 'http://localhost:3001/api/v1';

// Used for testing when served by Nest.js from the dist/client/build folder
// let API_BASE = 'api/v1';

// if (process.env.REACT_APP_ENVIRONMENT === 'development') {
//   API_BASE = process.env.REACT_APP_API_BASE as string;
// }

export const axiosClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },

  // Research what with credentials does
  // withCredentials: true
});
// const config: AxiosRequestConfig = {};

/**
 * AUTH FLOW
 ******************************************************* */

// TODO: Type anotate return
// Sends the request to try and register a new user
export const postRegisterUser = async (
  data: RegisterUserParams,
  config?: AxiosRequestConfig,
) => axiosClient.post(`/auth/local/signup`, data, config);

// Sends the request to try and login an existing user
export const postLoginUser = async (
  data: LoginUserParams,
  config?: AxiosRequestConfig,
) => axiosClient.post(`/auth/local/signin`, data, config);

// Sends the refresh request to try to get a new token
/* export const postRefreshToken = async () =>
  axiosClient.post(`/auth/local/refresh`, null, {
    // withCredentials: true,
  });
 */
/** *******************************************************
 * END: AUTH FLOW
 * */

// Sends the GET request to logout the logged in user
// Expects header Authorization (or authorization): Bearer token
// TODO: Maybe remove this fn
export const getLogoutUser = async (config?: AxiosRequestConfig) =>
  axiosClient.get(`/auth/local/logout`, config);

// ________________________________________________________
// TODO: create a helper tryRequest fn that sends token first, and if it doesn't work, sends refresh req, and then if access doesn't work -> fail. Also, if token is not in memory (that may be solved with persist?), first do the refresh and then try

/**
 * POSTS API
 ******************************************************* */
// Get all posts with no authentication or authorization
export const getAllPosts = async () => axiosClient.get('/posts');

/** *******************************************************
 * END: POSTS API
 * */
