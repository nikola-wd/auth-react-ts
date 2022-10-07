// import jwt_decode from 'jwt-decode';

// import { postRefreshToken } from '../utils/api';
// import useAuth from './useAuth';

// const useRefreshToken = () => {
//   const { setAuth } = useAuth();

//   const refresh = async () => {
//     // XXX: should sen a cookie with the response access_token, that we should never see in our JS. Should be stored from Nest.js
//     const response = await postRefreshToken();

//     setAuth((prev: any) => {
//       console.log(JSON.stringify(prev));
//       console.log(response.data.access_token);
//       return { ...prev, access_token: response.data.access_token };
//     });
//     return response.data.access_token;
//   };

//   return refresh;
// };

// export default useRefreshToken;

export default {};
