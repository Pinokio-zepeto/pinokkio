import React, { useState } from 'react';
import OrderHistory from '../../components/pos/OrderHistory';
import OrderHistoryDetail from '../../components/pos/OrderHistoryDetail';

function PosOrderMainPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 여기에 주문 내역을 가져오는 로직을 추가해야 합니다.
    // 예를 들어, useEffect를 사용하여 선택된 날짜에 따라 주문 내역을 가져올 수 있습니다.

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // 여기에서 새로운 날짜에 대한 주문 내역을 가져와야 합니다.
    };

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    };

    return (
        <div className="PosOrderMainPage">
            <OrderHistory 
                date={selectedDate}
                onDateChange={handleDateChange}
                orders={orders}
                onOrderSelect={handleOrderSelect}
            />
            {selectedOrder && <OrderHistoryDetail order={selectedOrder} />}
        </div>
    );
}

export default PosOrderMainPage;