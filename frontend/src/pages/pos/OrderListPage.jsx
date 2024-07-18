import React, { useState, useEffect } from 'react';
import OrderHistory from '../../components/pos/OrderHistory';
import OrderHistoryDetail from '../../components/pos/OrderHistoryDetail';

function OrderListPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        // 여기서 선택된 날짜에 따라 주문 내역을 가져오는 API 호출을 할 수 있습니다.
        // 지금은 더미 데이터를 사용하겠습니다.
        const dummyOrders = [
            {
                id: 1,
                paymentMethod: '카드',
                items: [{ name: '아메리카노', quantity: 2, price: 4500 }],
                totalAmount: 9000,
                status: 'completed',
                orderTime: new Date().toISOString()
            },
            {
                id: 2,
                paymentMethod: '현금',
                items: [{ name: '카페라떼', quantity: 1, price: 5000 }],
                totalAmount: 5000,
                status: 'cancelled',
                orderTime: new Date(Date.now() - 86400000).toISOString() // 1일 전
            }
        ];
        setOrders(dummyOrders);
    }, [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    };

    const handleCancelOrder = (orderId) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: 'cancelled' } : order
        ));
    };

    return (
        <div className="OrderListPage">
            <OrderHistory 
                date={selectedDate}
                onDateChange={handleDateChange}
                orders={orders}
                onOrderSelect={handleOrderSelect}
            />
            {selectedOrder && <OrderHistoryDetail order={selectedOrder} onCancelOrder={handleCancelOrder} />}
        </div>
    );
}

export default OrderListPage;