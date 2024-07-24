import React from 'react';
import styled from 'styled-components';
import CartItem from './CartItem';
import CartTotal from './CartTotal';

const Ct = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: green;
  height: 500px;
  padding: 10px;
`;

function Cart({ cartItems, setCartItems }) {
  return (
    <Ct>
      <div>
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} cartItems={cartItems} setCartItems={setCartItems} />
        ))}
      </div>
      <CartTotal cartItems={cartItems} />
    </Ct>
  );
}

export default Cart;
