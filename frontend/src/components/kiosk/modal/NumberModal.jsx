// import React, { useState } from 'react';
// import styled from 'styled-components';

// const ModalBg = styled.div`
//   /* display: none; */
//   background: black;
//   opacity: 0.5;
//   position: absolute;
//   display: flex;
//   top: 1rem;
//   width: 27rem;
//   height: 47rem;
// `;
// const Modal = styled.div`
//   background: white;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 54%;
//   height: 50%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// function MenuModal({ itemName, cartItems, setCartItems, setModal }) {
//   const [count, setCount] = useState(0);

//   const addCart = () => {
//     console.log(itemName);
//     for (var i = 0; i < cartItems.length; i++) {
//       if (cartItems[i].itemName === itemName) {
//         const updatedCartItems = [...cartItems];
//         updatedCartItems[i].itemCount += count;
//         setCartItems(updatedCartItems);
//         setModal(false);
//         return;
//       }
//     }

//     const updatedCartItems = [
//       ...cartItems,
//       {
//         itemName: itemName,
//         itemCount: count,
//         itemPrice: 5000,
//       },
//     ];
//     setCartItems(updatedCartItems);
//     setModal(false);

//     return;
//   };

//   return (
//     <ModalBg>
//       <Modal>
//         <h1>{itemName}</h1>
//         <div>
//           <button onClick={() => setCount(count + 1)}>+</button>
//           <li>{count}</li>
//           <button onClick={() => (count > 0 ? setCount(count - 1) : null)}>-</button>
//         </div>
//         <button onClick={addCart} disabled={!(count > 0)}>
//           담기
//         </button>
//         <button onClick={() => setModal(false)}>취소</button>
//       </Modal>
//     </ModalBg>
//   );
// }

// export default MenuModal;
