import React from "react";

function CartPage({ cartItems, removeFromCart }) {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-page">
      <h1>Tu Carrito</h1>
      {cartItems.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.image && <img src={item.image} alt={item.title} />}
                <div>
                  <strong>{item.title}</strong> - ${item.price.toFixed(2)}
                </div>
                <button onClick={() => removeFromCart(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <hr />
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
        </>
      )}
    </div>
  );
}

export default CartPage;
