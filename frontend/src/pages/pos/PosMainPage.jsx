import React, { useState } from 'react';
import OrderList from '../../components/pos/OrderList';
import OrderDetail from '../../components/pos/OrderDetail';

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
    <div className="PosMainPage">
      <div className="order-container">
        <OrderList
          orders={orders}
          onOrderSelect={selectOrder}
          onOrderComplete={(orderId) => changeOrderStatus(orderId, '완료')}
        />
        {selectedOrder && (
          <OrderDetail
            order={selectedOrder}
            onComplete={() => changeOrderStatus(selectedOrder.id, '완료')}
          />
        )}
      </div>
    </div>
  );
}

export default PosMainPage;
