const API_BASE_URL = 'http://localhost:5000/api/admin';

const adminRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('shop-stev-token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }

  return data;
};

export const adminAPI = {
  // Dashboard
  getStats: () => adminRequest('/stats'),
  
  // Productos
  getProducts: () => adminRequest('/products'),
  createProduct: (productData) => adminRequest('/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  updateProduct: (id, productData) => adminRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  deleteProduct: (id) => adminRequest(`/products/${id}`, {
    method: 'DELETE',
  }),
  
  // Usuarios
  getUsers: () => adminRequest('/users'),
  
  // Pedidos
  getOrders: () => adminRequest('/orders'),
  updateOrderStatus: (id, status) => adminRequest(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};