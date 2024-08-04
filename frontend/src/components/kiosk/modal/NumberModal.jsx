import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBg = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  width: 80%;
  max-width: 400px;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const InputDisplay = styled.div`
  width: 100%;
  padding: 10px 0;
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
`;

const NumberPad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
`;

const Button = styled.button`
  width: 60px;
  height: 60px;
  font-size: 22px;
  border: none;
  background-color: #f7f7f7;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #e0e0e0;
  }

  &:last-child {
    background-color: #4a90e2;
    color: white;
  }
`;

function NumberModal({ setModal, onConfirm }) {
  const [number, setNumber] = useState('');

  const handleNumberClick = (num) => {
    if (number.length < 4) {
      setNumber(number + num);
    }
  };

  const handleDelete = () => {
    setNumber(number.slice(0, -1));
  };

  const handleConfirm = () => {
    if (number.length === 4) {
      onConfirm(number);
      setModal(false);
    }
  };

  return (
    <ModalBg>
      <Modal>
        <Title>전화번호 뒷 4자리를 입력해주세요.</Title>
        <InputDisplay>{number}</InputDisplay>
        <NumberPad>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Button key={num} onClick={() => handleNumberClick(num)}>
              {num}
            </Button>
          ))}
          <Button onClick={handleDelete}>지우기</Button>
          <Button onClick={() => handleNumberClick(0)}>0</Button>
          <Button onClick={handleConfirm}>확인</Button>
        </NumberPad>
      </Modal>
    </ModalBg>
  );
}

export default NumberModal;
