import React, { useState } from 'react';
import OrderList from '../../components/pos/OrderList';
import OrderDetail from '../../components/pos/OrderDetail';
import Button from '../../components/common/Button';

function PosMainPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const addNewOrder = () => {
    const newOrder = {
      id: orders.length + 1,
      kioskNumber: Math.floor(Math.random() * 5) + 1,
      items: [
        { name: '아메리카노', quantity: 2, price: 4500 },
        { name: '카페라떼', quantity: 1, price: 5000 },
      ],
      status: '준비 중',
      totalAmount: 14000,
      paymentMethod: '카드',
      orderTime: new Date().toISOString(),
    };
    setOrders([...orders, newOrder]);
  };

  const changeOrderStatus = (orderId, newStatus) => {
    if (newStatus === '완료') {
      setOrders(orders.filter((order) => order.id !== orderId));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(null);
      }
    } else {
      setOrders(
        orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
      );
    }
  };

  const selectOrder = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="PosMainPage">
      <Button onClick={addNewOrder} text="새 주문 추가" />
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
