import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { ContactPage } from './pages/ContactPage';
import { HelpPage } from './pages/HelpPage';
import { OrdersPage } from './pages/OrdersPage';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user || !user.is_staff) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const navigate = useNavigate();

  const handleNavigate = (page: string, params?: any) => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'products':
        navigate('/products');
        break;
      case 'product-detail':
        navigate(`/products/${params?.productId}`);
        break;
      case 'cart':
        navigate('/cart');
        break;
      case 'checkout':
        navigate('/checkout');
        break;
      case 'login':
        navigate('/login');
        break;
      case 'admin':
        navigate('/admin');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'help':
        navigate('/help');
        break;
      case 'orders':
        navigate('/orders');
        break;
      default:
        navigate('/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<LoginPage onNavigate={handleNavigate} />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar onNavigate={handleNavigate} />
              <Routes>
                <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
                <Route path="/products" element={<ProductsPage onNavigate={handleNavigate} />} />
                <Route path="/products/:slug" element={<ProductDetailPage onNavigate={handleNavigate} />} />
                <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
                <Route path="/help" element={<HelpPage onNavigate={handleNavigate} />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage onNavigate={handleNavigate} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage onNavigate={handleNavigate} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage onNavigate={handleNavigate} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminPage onNavigate={handleNavigate} />
                    </AdminRoute>
                  }
                />
              </Routes>
              <Footer onNavigate={handleNavigate} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Hot Wheels Shop</h3>
            <p className="text-gray-400 text-sm">
              Your ultimate destination for Hot Wheels collectibles, track sets, and die-cast cars.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors">
                  Shop Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('orders')} className="hover:text-white transition-colors">
                  Track Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-white transition-colors">
                  Help Center
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-white transition-colors">
                  Shipping Info
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('help')} className="hover:text-white transition-colors">
                  Returns
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                F
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                T
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                I
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Hot Wheels Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
