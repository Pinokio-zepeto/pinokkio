import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ items, isOpen, toggleNavbar }) {
  return (
    <nav className={`Navbar ${isOpen ? 'open' : ''}`}>
<<<<<<< HEAD
      <button onClick={toggleNavbar}>
        {isOpen ? '닫기' : '메뉴'}
      </button>
=======
      <button onClick={toggleNavbar}>{isOpen ? '닫기' : '메뉴'}</button>
>>>>>>> 86d398387384d8b184f5bd9ac224e8f32c1af46c
      {isOpen && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
