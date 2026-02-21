import { useEffect, useState } from 'react';
import { Package, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { ordersAPI, Order } from '../services/api';

interface OrdersPageProps {
  onNavigate: (page: string) => void;
}

export function OrdersPage({ onNavigate }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await ordersAPI.getAll();
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to load orders', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-300" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-blue-300" />;
      case 'processing':
        return <Clock className="w-6 h-6 text-yellow-300" />;
      default:
        return <AlertCircle className="w-6 h-6 text-orange-300" />;
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 py-12 text-center">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <button onClick={() => onNavigate('products')} className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 text-white flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">{getStatusIcon(order.status)}<h3 className="text-2xl font-bold">Order #{order.id}</h3></div>
                    <p className="text-white/90">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <p className="text-2xl font-bold">${Number(order.total_amount).toFixed(2)}</p>
                </div>
                <div className="p-6 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between border-b border-gray-100 pb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{item.product_name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-primary-600">${Number(item.total_price).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
