import { useState } from 'react';
import { Mail, Lock, User, Package } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = await login(email, password);
      if (success) {
        onNavigate('home');
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!fullName.trim()) {
        setError('Please enter your full name');
        return;
      }
      const success = await signup(email, password, fullName);
      if (success) {
        onNavigate('home');
      } else {
        setError('Failed to create account');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-red-500 to-red-600 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <Package className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Hot Wheels Shop</h1>
          <p className="text-white/90">
            {isLogin ? 'Welcome back!' : 'Join our community'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex mb-6">
            <button
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
              className={`flex-1 py-3 font-semibold transition-all ${
                isLogin
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-400 border-b-2 border-transparent'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
              className={`flex-1 py-3 font-semibold transition-all ${
                !isLogin
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-400 border-b-2 border-transparent'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all transform hover:scale-105"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <div className="text-sm text-blue-800 space-y-1">
                <p>
                  <span className="font-semibold">Admin:</span> admin@hotwheels.com / Admin@1234
                </p>
                <p>
                  <span className="font-semibold">Customer:</span> customer@example.com / Customer123
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-white hover:text-yellow-300 font-semibold transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
