import Axios from 'axios'; // 인스턴스와 구분하기 위해 대문자 사용

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

export const postRegisterTeller = (code, username, password, confirmPassword) => {
  axios
    .post('/api/register/teller', {
      id: code,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    })
    .then((response) => {
      // response

      return response;
    })
    .catch((error) => {
      // 오류발생시 실행
    })
    .then(() => {
      // 항상 실행
    });
};

export const postRegisterPos = () => {};

export const postRegisterKiosk = () => {};

export const postLoginPos = async (username, password) => {
  try {
    const response = await axios.post('/api/login/pos', {
      username: username,
      password: password,
    });
    return response.data; // 인증 토큰이 반환될 것으로 가정
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
