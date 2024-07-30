import React, { useState } from 'react';
import styled from 'styled-components';
import OrderList from '../../components/pos/OrderList';
import OrderDetail from '../../components/pos/OrderDetail';

const PosMainPageWrapper = styled.div`
  font-family: 'Arial', sans-serif;
`;

const OrderContainer = styled.div`
  display: flex;
  margin: 20px;
`;

const OrderDetailWrapper = styled.div`
  margin-left: 20px;
  padding: 10px;
  border: 1px solid #ddd;
`;

const OrderListContainer = styled.div`
  width: 1000px;
  border: 1px solid #ddd;
`;

function PosMainPage() {
  const initialOrders = [
    {
      id: 1,
      kioskID: 'kiosk1',
      amount: 14000,
      items: [
        { name: '아메리카노', quantity: 1, price: 4500 },
        { name: '카페라떼', quantity: 2, price: 10000 },
      ],
      status: '완료',
      orderTime: '2024-07-29T11:15:47',
      paymentMethod: '카드',
      totalAmount: 14500,
    },
    {
      id: 2,
      kioskID: 'kiosk3',
      amount: 15000,
      items: [
        { name: '바닐라라떼', quantity: 1, price: 5000 },
        { name: '아이스아메리카노', quantity: 1, price: 10000 },
      ],
      status: '완료',
      orderTime: '2024-07-29T11:15:47',
      paymentMethod: '카드',
      totalAmount: 15000,
    },
    {
      id: 3,
      kioskID: 'kiosk4',
      amount: 15000,
      items: [
        { name: '바닐라라떼', quantity: 1, price: 5000 },
        { name: '아이스아메리카노', quantity: 1, price: 10000 },
      ],
      status: '완료',
      orderTime: '2024-07-29T11:15:47',
      paymentMethod: '카드',
      totalAmount: 15000,
    },
    {
      id: 4,
      kioskID: 'kiosk4',
      amount: 15000,
      items: [
        { name: '바닐라라떼', quantity: 1, price: 5000 },
        { name: '아이스아메리카노', quantity: 1, price: 10000 },
      ],
      status: '완료',
      orderTime: '2024-07-29T11:15:47',
      paymentMethod: '카드',
      totalAmount: 15000,
    },
    {
      id: 5,
      kioskID: 'kiosk1',
      amount: 14000,
      items: [
        { name: '아메리카노', quantity: 1, price: 4500 },
        { name: '카페라떼', quantity: 2, price: 10000 },
      ],
      status: '완료',
      orderTime: '2024-07-29T11:15:47',
      paymentMethod: '카드',
      totalAmount: 14500,
    },
    {
      id: 6,
      kioskID: 'kiosk3',
      amount: 15000,
      items: [
        { name: '바닐라라떼', quantity: 1, price: 5000 },
        { name: '아이스아메리카노', quantity: 1, price: 10000 },
      ],
      status: '미완',
      orderTime: '2024-07-29T11:15:47',
      paymentMethod: '카드',
      totalAmount: 15000,
    },
    {
      id: 7,
      kioskID: 'kiosk4',
      amount: 15000,
      items: [
        { name: '바닐라라떼', quantity: 1, price: 5000 },
        { name: '아이스아메리카노', quantity: 1, price: 10000 },
      ],
      status: '미완',
      orderTime: '2024-07-29T11:15:47',
      paymentMethod: '카드',
      totalAmount: 15000,
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(initialOrders[0]);

  const changeOrderStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
  };

  const selectOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <PosMainPageWrapper>
      <OrderContainer>
        <OrderListContainer>
          <OrderList
            orders={orders}
            onOrderSelect={selectOrder}
            onOrderComplete={(orderId) => changeOrderStatus(orderId, '완료')}
          />
        </OrderListContainer>
        {selectedOrder && (
          <OrderDetailWrapper>
            <OrderDetail
              order={selectedOrder}
              onComplete={() => changeOrderStatus(selectedOrder.id, '완료')}
            />
          </OrderDetailWrapper>
        )}
      </OrderContainer>
    </PosMainPageWrapper>
  );
}

export default PosMainPage;
