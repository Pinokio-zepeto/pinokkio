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

// accessToken, refreshToken을 사용하려면 withCredential = true 해주어야 한다.
// 이렇게 하면 전역에서 withCredential = true가 된다.
axios.defaults.withCredentials = true;

export default axios;
