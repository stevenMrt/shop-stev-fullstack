const API_BASE_URL = import.meta.env.PROD 
  ? 'https://tu-app-railway.up.railway.app/api' 
  : 'http://localhost:5001/api';

const apiRequest = async (endpoint, options = {}) => {
  
  // Código original para cuando hay backend
  const token = localStorage.getItem('shop-stev-token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log('API Request:', `${API_BASE_URL}${endpoint}`);
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', response.status, errorText);
      throw new Error(`Error ${response.status}: ${errorText || 'Error en el servidor'}`);
    }
    
    const data = await response.json();
    console.log('API Success:', data);
    return data;
  } catch (error) {
    console.error('API Request Failed:', error);
    throw new Error(error.message || 'Error de conexión con el servidor');
  }
};

export const authAPI = {
  register: (userData) => apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getMe: () => apiRequest('/auth/me'),
};

export const productsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/products?${params}`);
  },
  
  getById: (id) => apiRequest(`/products/${id}`),
  
  addReview: (productId, reviewData) => apiRequest(`/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  }),
};

export const cartAPI = {
  get: () => apiRequest('/cart'),
  
  add: (productId, quantity = 1) => apiRequest('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }),
  
  update: (productId, quantity) => apiRequest('/cart/update', {
    method: 'PUT',
    body: JSON.stringify({ productId, quantity }),
  }),
  
  remove: (productId) => apiRequest(`/cart/remove/${productId}`, {
    method: 'DELETE',
  }),
  
  clear: () => apiRequest('/cart/clear', {
    method: 'DELETE',
  }),
};

export const ordersAPI = {
  create: (orderData) => apiRequest('/orders/create', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  getMyOrders: () => apiRequest('/orders/my-orders'),
  
  getById: (id) => apiRequest(`/orders/${id}`),
};

export const favoritesAPI = {
  get: () => apiRequest('/favorites'),
  
  toggle: (productId) => apiRequest('/favorites/toggle', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  }),
};