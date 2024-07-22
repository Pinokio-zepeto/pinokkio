import React, { useState } from 'react';
import Button from '../common/Button';
import styled from 'styled-components';

const CancelledText = styled.span`
  text-decoration: line-through;
`;

const CancelledStatus = styled.span`
  color: #888;
  font-style: italic;
`;

function OrderHistoryDetail({ order, onCancelOrder }) {
  const [isCancelled, setIsCancelled] = useState(order.status === 'cancelled');

  const handleCancelOrder = () => {
    onCancelOrder(order.id);
    setIsCancelled(true);
  };

  return (
    <div className="OrderHistoryDetail">
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
          {isCancelled ? <CancelledText>{order.paymentMethod}</CancelledText> : order.paymentMethod}
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
    </div>
  );
}

export default OrderHistoryDetail;
