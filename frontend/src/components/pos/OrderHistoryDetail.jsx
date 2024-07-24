import React, { useState } from 'react';
import Button from '../common/Button';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const CancelledText = styled.span`
  text-decoration: line-through;
`;

const CancelledStatus = styled.span`
  color: #888;
  font-style: italic;
`;

function OrderHistoryDetail({ order, onCancelOrder, onClose }) {
  console.log('onClose:', onClose); // 디버깅을 위한 로그 추가
  const [isCancelled, setIsCancelled] = useState(order.status === 'cancelled');

  const handleCancelOrder = () => {
    onCancelOrder(order.id);
    setIsCancelled(true);
  };

  const handleClose = (e) => {
    e.preventDefault(); // 이벤트 기본 동작 방지
    e.stopPropagation(); // 이벤트 버블링 방지
    console.log('handleClose called'); // 디버깅을 위한 로그 추가
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error('onClose is not a function');
    }
  };

  return (
    <ModalBackground onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <div className="order-info">
          <h2>주문 상세</h2>
          <p>
            결제 금액:{' '}
            {isCancelled ? (
              <CancelledText>{order.totalAmount}원</CancelledText>
            ) : (
              `${order.totalAmount}원`
            )}
          </p>
          <p>결제 시간: {new Date(order.orderTime).toLocaleString()}</p>
          {isCancelled && <p>취소 시간: {new Date().toLocaleString()}</p>}
          <p>
            결제 수단:{' '}
            {isCancelled ? (
              <CancelledText>{order.paymentMethod}</CancelledText>
            ) : (
              order.paymentMethod
            )}
          </p>
          <p>승인 상태: {isCancelled ? '취소됨' : '결제완료'}</p>
        </div>
        <div className="order-actions">
          <Button text="결제 수단 변경" disabled={isCancelled} />
          {isCancelled ? (
            <CancelledStatus>취소됨</CancelledStatus>
          ) : (
            <Button text="결제 취소" onClick={handleCancelOrder} />
          )}
        </div>
        <div className="order-items">
          <h3>주문 내역</h3>
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <p>
                {item.name} {item.quantity} {item.price * item.quantity}원
              </p>
            </div>
          ))}
        </div>
      </ModalContent>
    </ModalBackground>
  );
}

export default OrderHistoryDetail;
