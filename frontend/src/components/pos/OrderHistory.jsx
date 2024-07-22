import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

const CancelledText = styled.span`
  text-decoration: line-through;
`;

function OrderHistory({ date, onDateChange, orders, onOrderSelect }) {
  return (
    <div className="OrderHistory">
      <div className="date-picker">
        <DatePicker selected={date} onChange={onDateChange} />
      </div>
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order-item" onClick={() => onOrderSelect(order)}>
            <p>
              {order.status === 'cancelled' ? (
                <>
                  <CancelledText>{order.paymentMethod}</CancelledText> - 주문 #{order.id} - 메뉴{' '}
                  {order.items.length}개 - <CancelledText>{order.totalAmount}원</CancelledText> -
                  취소
                </>
              ) : (
                <>
                  {order.paymentMethod} - 주문 #{order.id} - 메뉴 {order.items.length}개 -{' '}
                  {order.totalAmount}원 - 완료
                </>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
