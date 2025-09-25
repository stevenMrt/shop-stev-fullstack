import { Routes, Route } from "react-router-dom";
import MainLayout from './features/share/layouts/MainLayout';
import Banner from './features/dashboard/components/Banner';
import ProductsCard from './features/products/pages/ProductsCard';
import ContactPage from './features/Contacto/pages/ContactPages';
import ProfilePage from './features/profile/pages/ProfilePage';
import AboutPage from './features/nosotros/pages/AboutPage';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import ForgotPasswordPage from './features/auth/pages/ForgotPasswordPage';
import CheckoutPage from './features/checkout/pages/CheckoutPage';
import WishlistPage from './features/wishlist/pages/WishlistPage';
import OrderHistoryPage from './features/orders/pages/OrderHistoryPage';
import AdminDashboard from './features/admin/pages/AdminDashboard';
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { authAPI, cartAPI, favoritesAPI } from './services/api';
import './App.css';
import './Components/ProductsCard.css';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('shop-stev-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('shop-stev-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('shop-stev-token');
      if (token) {
        try {
          const response = await authAPI.getMe();
          setUser(response.user);
          loadUserData();
        } catch (error) {
          localStorage.removeItem('shop-stev-token');
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const loadUserData = async () => {
    if (!localStorage.getItem('shop-stev-token')) return;
    
    try {
      const [cartData, favoritesData] = await Promise.all([
        cartAPI.get(),
        favoritesAPI.get()
      ]);
      setCartItems(cartData);
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('shop-stev-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('shop-stev-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = async (product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar al carrito', { autoClose: 2000 });
      return;
    }
    
    try {
      const updatedCart = await cartAPI.add(product._id || product.id, 1);
      setCartItems(updatedCart);
      toast.success(`${product.title || product.name} agregado al carrito 🛒`, { autoClose: 2000 });
    } catch (error) {
      toast.error('Error al agregar al carrito', { autoClose: 2000 });
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
    toast.info("Producto eliminado del carrito ❌", { autoClose: 2000 });
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
      return;
    }
    const newCart = [...cartItems];
    newCart[index].quantity = newQuantity;
    setCartItems(newCart);
  };

  const toggleFavorite = async (product) => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar a favoritos', { autoClose: 2000 });
      return;
    }
    
    try {
      const response = await favoritesAPI.toggle(product._id || product.id);
      setFavorites(response.favorites);
      toast.success(response.message, { autoClose: 2000 });
    } catch (error) {
      toast.error('Error al actualizar favoritos', { autoClose: 2000 });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Carrito vaciado 🗑️", { autoClose: 2000 });
  };

  const handleLogin = (userData) => {
    setUser(userData);
    loadUserData();
    toast.success(`¡Bienvenido ${userData.name}! 👋`, { autoClose: 2000 });
  };

  const handleLogout = () => {
    setUser(null);
    setCartItems([]);
    setFavorites([]);
    localStorage.removeItem('shop-stev-token');
    toast.info("Sesión cerrada 👋", { autoClose: 2000 });
  };

  const handleOrderComplete = () => {
    clearCart();
    toast.success("¡Pedido realizado con éxito! 🎉", { autoClose: 3000 });
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <Routes>
        {/* Rutas sin layout */}
        <Route path="/" element={
          user ? (
            <MainLayout 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity}
              clearCart={clearCart}
              onSearch={setSearchQuery}
              user={user}
              onLogout={handleLogout}
            >
              <Banner />
              <ProductsCard 
                addToCart={addToCart} 
                searchQuery={searchQuery}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </MainLayout>
          ) : (
            <LoginPage onLogin={handleLogin} />
          )
        } />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Rutas con layout */}
        <Route path="/home" element={
          <MainLayout 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            onSearch={setSearchQuery}
            user={user}
            onLogout={handleLogout}
          >
            <Banner />
            <ProductsCard 
              addToCart={addToCart} 
              searchQuery={searchQuery}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </MainLayout>
        } />
        <Route path="/contacto" element={
          <MainLayout 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            onSearch={setSearchQuery}
            user={user}
            onLogout={handleLogout}
          >
            <ContactPage />
          </MainLayout>
        } />
        <Route path="/perfil" element={
          <MainLayout 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            onSearch={setSearchQuery}
            user={user}
            onLogout={handleLogout}
          >
            <ProfilePage favorites={favorites} />
          </MainLayout>
        } />
        <Route path="/nosotros" element={
          <MainLayout 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            onSearch={setSearchQuery}
            user={user}
            onLogout={handleLogout}
          >
            <AboutPage />
          </MainLayout>
        } />
        <Route path="/checkout" element={
          <MainLayout 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            onSearch={setSearchQuery}
            user={user}
            onLogout={handleLogout}
          >
            <CheckoutPage cartItems={cartItems} total={total} onOrderComplete={handleOrderComplete} />
          </MainLayout>
        } />
        <Route path="/wishlist" element={
          <MainLayout 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            onSearch={setSearchQuery}
            user={user}
            onLogout={handleLogout}
          >
            <WishlistPage favorites={favorites} toggleFavorite={toggleFavorite} addToCart={addToCart} />
          </MainLayout>
        } />
        <Route path="/orders" element={
          <MainLayout 
            cartItems={cartItems} 
            removeFromCart={removeFromCart} 
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            onSearch={setSearchQuery}
            user={user}
            onLogout={handleLogout}
          >
            <OrderHistoryPage />
          </MainLayout>
        } />
        <Route path="/admin" element={
          user?.role === 'admin' ? (
            <MainLayout 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
              updateQuantity={updateQuantity}
              clearCart={clearCart}
              onSearch={setSearchQuery}
              user={user}
              onLogout={handleLogout}
            >
              <AdminDashboard />
            </MainLayout>
          ) : (
            <div>Acceso denegado</div>
          )
        } />
      </Routes>
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
