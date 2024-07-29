import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import KioskNavbar from '../../components/common/KioskNavbar';

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f9;
  padding: 20px;
`;

const SignUpForm = styled.form`
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

const SelectJob = styled.select`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
  color: #333;
`;

function SignUp() {
  const navigate = useNavigate();

  const goToLoginPage = () => {
    navigate('/');
  };

  return (
    <SignUpWrapper>
      <KioskNavbar />
      <SignUpForm id="signup-form">
        <Input type="text" className="id" placeholder="아이디" />
        <Input type="password" className="password" placeholder="패스워드" />
        <Input type="password" className="passwordConfirm" placeholder="패스워드확인" />
        <Input type="text" className="email" placeholder="이메일" />
        <Input type="text" className="email" placeholder="이메일" />
        <SelectJob>
          <option value="" disabled selected>
            직무를 선택해주세요.
          </option>
          {JobList.map((number, index) => (
            <option key={index}>{number}</option>
          ))}
        </SelectJob>
        <StyledButton type="submit" onClick={goToLoginPage}>
          회원가입
        </StyledButton>
      </SignUpForm>
    </SignUpWrapper>
  );
}

export default SignUp;

const JobList = ['상담원', '점장'];
