import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  created_at: string;
}

export interface Product {
  id: number;
  category: number;
  category_name: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  images: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  total_price: number;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  user: number;
  username: string;
  status: string;
  total_amount: number;
  shipping_address: any;
  payment_status: string;
  payment_method: string;
  tracking_number: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  product: number;
  product_name: string;
  quantity: number;
  price_at_time: number;
  total_price: number;
  created_at: string;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const categoriesAPI = {
  getAll: () => api.get<Category[]>('/categories/'),
  getBySlug: (slug: string) => api.get<Category>(`/categories/${slug}/`),
  create: (data: Partial<Category>) => api.post<Category>('/categories/', data),
  update: (slug: string, data: Partial<Category>) => api.put<Category>(`/categories/${slug}/`, data),
  delete: (slug: string) => api.delete(`/categories/${slug}/`),
};

export const productsAPI = {
  getAll: (params?: { search?: string; category?: string; featured?: boolean }) =>
    api.get<Product[]>('/products/', { params }),
  getBySlug: (slug: string) => api.get<Product>(`/products/${slug}/`),
  getFeatured: () => api.get<Product[]>('/products/featured/'),
  create: (data: Partial<Product>) => api.post<Product>('/products/', data),
  update: (slug: string, data: Partial<Product>) => api.put<Product>(`/products/${slug}/`, data),
  delete: (slug: string) => api.delete(`/products/${slug}/`),
};

export const cartAPI = {
  getAll: () => api.get<CartItem[]>('/cart/'),
  add: (productId: number, quantity: number) =>
    api.post<CartItem>('/cart/', { product_id: productId, quantity }),
  update: (id: number, quantity: number) =>
    api.put<CartItem>(`/cart/${id}/`, { quantity }),
  delete: (id: number) => api.delete(`/cart/${id}/`),
  clear: () => api.post('/cart/clear/'),
  getTotal: () => api.get<{ total_amount: number; total_items: number }>('/cart/total/'),
};

export const ordersAPI = {
  getAll: () => api.get<Order[]>('/orders/'),
  getById: (id: number) => api.get<Order>(`/orders/${id}/`),
  create: (data: Partial<Order>) => api.post<Order>('/orders/', data),
  updateStatus: (id: number, status: string) =>
    api.patch<Order>(`/orders/${id}/update_status/`, { status }),
  addTracking: (id: number, trackingNumber: string) =>
    api.patch<Order>(`/orders/${id}/add_tracking/`, { tracking_number: trackingNumber }),
};

export const contactAPI = {
  send: (data: ContactMessage) => api.post<ContactMessage>('/contact/', data),
  getAll: () => api.get<ContactMessage[]>('/contact/'),
};

export const authAPI = {
  login: (credentials: LoginCredentials) =>
    api.post<{ token: string; user: any }>('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
  signup: (data: SignupData) =>
    api.post<{ token: string; user: any }>('/auth/signup/', data),
  getCurrentUser: () => api.get<any>('/auth/user/'),
};

export default api;
