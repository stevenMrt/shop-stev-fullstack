import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children, cartItems, removeFromCart, updateQuantity, clearCart, onSearch, user, onLogout }) {
  return (
    <>
      <Navbar 
        cartItems={cartItems} 
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
        clearCart={clearCart}
        onSearch={onSearch}
        user={user}
        onLogout={onLogout}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default MainLayout;
