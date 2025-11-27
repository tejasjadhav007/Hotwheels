import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface OrdersPageProps {
  onNavigate: (page: string) => void;
}

const mockOrders = [
  {
    id: 'ORD-2025-001',
    date: '2025-09-28',
    status: 'delivered',
    total: 59.96,
    items: [
      { name: 'Fast & Furious Nissan Skyline GT-R', quantity: 2, price: 5.99 },
      { name: 'Super Speed Blastway Track Set', quantity: 1, price: 49.99 },
    ],
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD-2025-002',
    date: '2025-09-30',
    status: 'processing',
    total: 149.95,
    items: [
      { name: 'RLC 55th Anniversary Set', quantity: 1, price: 99.99 },
      { name: 'Tesla Cybertruck', quantity: 1, price: 6.99 },
      { name: 'Lamborghini Aventador', quantity: 1, price: 7.99 },
    ],
    trackingNumber: '',
  },
];

export function OrdersPage({ onNavigate }: OrdersPageProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Please log in</h2>
          <p className="text-gray-600 mb-8">You need to be logged in to view your orders</p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-blue-600" />;
      case 'processing':
        return <Clock className="w-6 h-6 text-secondary-600" />;
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-secondary-100 text-secondary-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">View and track your Hot Wheels orders</p>
        </div>

        {mockOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(order.status)}
                        <h3 className="text-2xl font-bold">Order {order.id}</h3>
                      </div>
                      <p className="text-white/90">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-2 ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                      <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-lg text-gray-900 mb-4">Order Items</h4>
                  <div className="space-y-3 mb-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {order.trackingNumber && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Truck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <p className="font-semibold text-blue-900 mb-1">Tracking Information</p>
                          <p className="text-sm text-blue-800">
                            Tracking Number: <span className="font-mono font-bold">{order.trackingNumber}</span>
                          </p>
                          <a
                            href={`https://tracking.example.com/${order.trackingNumber}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700 font-semibold mt-2 inline-block"
                          >
                            Track Package →
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {order.status === 'processing' && !order.trackingNumber && (
                    <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-6 h-6 text-secondary-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-secondary-900 mb-1">Order is being processed</p>
                          <p className="text-sm text-secondary-800">
                            We're preparing your items for shipment. You'll receive a tracking number soon!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button className="flex-1 border-2 border-primary-600 text-primary-600 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all">
                      Order Details
                    </button>
                    {order.status === 'delivered' && (
                      <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all">
                        Buy Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Need Help with Your Order?</h3>
          <p className="mb-6 text-lg">Our support team is ready to assist you with any questions or concerns.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
