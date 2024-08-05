import Axios from 'axios'; // 인스턴스와 구분하기 위해 대문자 사용
import { store } from '../app/store';
import { setUser, clearUser } from '../features/user/userSlice';
import { jwtDecode } from 'jwt-decode';

/*
변수 네이밍 규칙
1. 행위를 맨 앞에 쓴다.
2. 가져오는 대상을 다음에 쓴다.
3. 가져오는 대상이 리스트라면 복수형으로 쓴다.
4. 다른 변수(parameter)를 이용해서 행위를 한다면 By를 사용하여 네이밍한다.
5. 다른 변수가 여러 개라면 그냥 붙여서 쓴다.
*/

const baseURL = 'http://localhost:8080';

const axios = Axios.create({
  baseURL: baseURL,
});

const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return exp < currentTime;
};

axios.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const user = state.user;
    if (user) {
      let accessToken = user.token;

      if (accessToken && isTokenExpired(accessToken)) {
        try {
          const response = await axios.get(`${baseURL}/api/refresh`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          accessToken = response.data.accessToken;
          store.dispatch(
            setUser({
              ...user,
              token: accessToken,
            })
          );
        } catch (error) {
          store.dispatch(clearUser());
          localStorage.removeItem('refreshToken');
          // 필요에 따라 로그인 페이지로 리디렉션
          // navigate('/login'); // If using react-router
        }
      }

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.defaults.withCredentials = true;

export default axios;
