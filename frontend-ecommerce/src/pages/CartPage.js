import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

function CartPage() {
  const { cartItems } = useContext(ProductContext);

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {cartItems?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.title} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPage;
