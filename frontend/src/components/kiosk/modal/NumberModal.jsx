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
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const InputDisplay = styled.div`
  width: 100%;
  padding: 10px;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const NumberPad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 15px;
  font-size: 20px;
  border: none;
  background-color: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;

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
