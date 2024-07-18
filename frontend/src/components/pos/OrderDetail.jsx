import React from 'react';
import Button from '../common/Button';

function OrderDetail({ order, onComplete }) {
    return (
        <div className="OrderDetail">
            <div className="order-header">
                <div>
                    <h2>주문 상세</h2>
                    <p>키오스크 #{order.kioskNumber}, 메뉴 {order.items.length}개, {order.totalAmount}원</p>
                </div>
                <Button onClick={onComplete} text="조리 완료" />
            </div>
            <div className="order-payment">
                <h3>결제 정보</h3>
                <p>결제 시간: {new Date(order.orderTime).toLocaleString()}</p>
                <p>결제 수단: {order.paymentMethod}</p>
                <p>총 결제 금액: {order.totalAmount}원</p>
                <Button text="결제 수단 변경" />
                <Button text="결제 취소" />
            </div>
            <div className="order-items">
                <h3>주문 내역</h3>
                {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                        <p>{item.name} - 수량 {item.quantity} - {item.price * item.quantity}원</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderDetail;