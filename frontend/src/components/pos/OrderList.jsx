import React from 'react';
import Button from '../common/Button';

function OrderList({ orders, onOrderSelect, onOrderComplete }) {
  return (
    <div className="OrderList">
      <h2>주문 목록</h2>
      {orders.map((order) => (
        <div key={order.id} className="OrderItem">
          <span onClick={() => onOrderSelect(order)}>
            키오스크 #{order.kioskNumber} - 주문 #{order.id} -
            {order.items.map((item) => item.name).join(', ')} -{order.totalAmount}원
          </span>
          <Button onClick={() => onOrderComplete(order.id)} text="완료" />
        </div>
      ))}
    </div>
  );
}

export default OrderList;
