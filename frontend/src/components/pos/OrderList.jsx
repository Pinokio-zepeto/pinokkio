import React from 'react';

function OrderList({ orders, onOrderSelect, onOrderComplete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>주문 번호</th>
          <th>키오스크ID</th>
          <th>판매 금액</th>
          <th>주문 내역</th>
          <th>완료 여부</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} onClick={() => onOrderSelect(order)}>
            <td>{order.id.toString().padStart(4, '0')}</td>
            <td>{order.kioskID}</td>
            <td>{order.amount.toLocaleString()}원</td>
            <td>{order.items.map((item) => item.name).join(', ')}</td>
            <td>{order.status === '완료' ? '완료' : '미완'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderList;
