import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';

import KioskNavbar from '../../components/common/KioskNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/user/userSlice';

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
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  color: #333;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  background-color: rgb(102, 102, 255);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #add8e6;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button {
    width: 48%;
    padding: 10px;
    background-color: lightblue;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #add8e6;
    }
  }
`;

function Login() {
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const findPassword = () => {
    navigate('/findpassword1');
  };

  const signUp = () => {
    navigate('/signup');
  };

  const handleLogin = (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    if (id === 'advisor') {
      navigate('/advisor');
      const userData = { name: id, type: 'advisor' };
      dispatch(setUser(userData));
    } else if (id === 'pos') {
      navigate('/pos');
      const userData = { name: id, type: 'pos' };
      dispatch(setUser(userData));
    } else {
      navigate('/kiosk');
      const userData = { name: id, type: 'kiosk' };
      dispatch(setUser(userData));
    }
  };

  return (
    <LoginWrapper>
      <KioskNavbar />
      <LoginForm id="login-form" onSubmit={handleLogin}>
        <Input
          type="text"
          className="id"
          placeholder="아이디"
          onChange={(e) => setId(e.target.value)}
        />
        <Input type="password" className="password" placeholder="패스워드" />
        <StyledButton type="submit">로그인</StyledButton>
      </LoginForm>
      <ButtonWrapper>
        <button onClick={findPassword}>비밀번호 찾기</button>
        <button onClick={signUp}>회원가입</button>
      </ButtonWrapper>
    </LoginWrapper>
  );
}

export default Login;
