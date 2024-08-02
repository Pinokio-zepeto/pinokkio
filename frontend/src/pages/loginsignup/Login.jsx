import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

import LOGO from '../../components/common/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/user/userSlice';
import { postLoginKiosk, postLoginPos, postLoginAdvisor } from '../../apis/Auth';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  color: #333;
  &:focus {
    outline: 1px solid #7392ff;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: #7392ff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    background-color: #d8ff75;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;

  margin-top: 20px;

  div {
    color: #7392ff;
    font-size: 12px;
    cursor: pointer;
    margin: 0 3px;

    &:hover {
      color: #d8ff75;
    }
  }
`;

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUserType] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const findPassword = () => {
    navigate('/findpassword1');
  };

  const signUp = () => {
    navigate('/signup');
  };

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지

    if (usertype === 'advisor') {
      const res = await postLoginAdvisor(id, password);
      navigate('/advisor');
      const userData = { name: id, type: 'advisor' };
      dispatch(setUser(userData));
    } else if (usertype === 'pos') {
      const res = await postLoginPos(id, password);
      navigate('/pos');
      const userData = { name: id, type: 'pos' };
      dispatch(setUser(userData));
    } else if (usertype === 'kiosk') {
      const res = await postLoginKiosk(id, password);
      navigate('/kiosk');
      const userData = { name: id, type: 'kiosk' };
      dispatch(setUser(userData));
    } else {
      console.log('user type을 선택하지 않았습니다.');
    }

    // if (id === 'advisor') {
    //   navigate('/advisor');
    //   const userData = { name: id, type: 'advisor' };
    //   dispatch(setUser(userData));
    // } else if (id === 'pos') {
    //   navigate('/pos');
    //   const userData = { name: id, type: 'pos' };
    //   dispatch(setUser(userData));
    // } else {
    //   navigate('/kiosk');
    //   const userData = { name: id, type: 'kiosk' };
    //   dispatch(setUser(userData));
    // }
  };

  return (
    <LoginWrapper>
      <LOGO />
      <LoginForm id="login-form" onSubmit={handleLogin}>
        <Input
          type="text"
          className="id"
          placeholder="아이디"
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          type="password"
          className="Password"
          placeholder="패스워드"
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={usertype} onChange={handleUserType}>
          <option value="" selected disabled>
            선택하세요
          </option>
          <option value="kiosk">키오스크</option>
          <option value="pos">포스</option>
          <option value="advisor">상담원</option>
        </select>
        <StyledButton type="submit">로그인</StyledButton>
      </LoginForm>
      <ButtonWrapper>
        <div onClick={findPassword}>비밀번호 찾기 </div>
        <div>|</div>
        <div onClick={signUp}>회원가입</div>
      </ButtonWrapper>
    </LoginWrapper>
  );
}

export default Login;
