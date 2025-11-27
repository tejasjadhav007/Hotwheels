import { ShoppingCart, User, LogOut, Menu, X, Home, Package, Phone, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-white rounded-full p-2">
              <Package className="w-6 h-6 text-primary-600" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Hot Wheels Shop</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all hover:bg-white/10"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-400 text-primary-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => onNavigate(user.is_staff ? 'admin' : 'orders')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">{user.username}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('home');
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="hidden md:block px-4 py-2 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'bg-white/20 font-semibold'
                    : 'hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}

            {user ? (
              <>
                <button
                  onClick={() => {
                    onNavigate(user.is_staff ? 'admin' : 'orders');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all mt-2"
                >
                  <User className="w-5 h-5" />
                  {user.username}
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 px-4 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
