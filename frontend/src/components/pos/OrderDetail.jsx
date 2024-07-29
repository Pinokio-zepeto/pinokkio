import React from 'react';

function OrderDetail({ order, onComplete }) {
  return (
    <div className="order-detail">
      <h2>주문 상세</h2>
      <p>주문 번호: {order.id.toString().padStart(4, '0')}</p>
      <p>키오스크ID: {order.kioskID}</p>
      <p>주문 수량: {order.items.length}</p>
      <h3>주문 내역</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.quantity}개 ({item.price * item.quantity}원)
          </li>
        ))}
      </ul>
      <h3>결제 정보</h3>
      <p>결제 시간: {order.orderTime}</p>
      <p>결제 수단: {order.paymentMethod}</p>
      <p>총 결제 금액: {order.totalAmount.toLocaleString()}원</p>
      <button onClick={onComplete}>결제 수단 변경</button>
      <button onClick={onComplete}>결제 취소</button>
    </div>
  );
}

export default OrderDetail;
