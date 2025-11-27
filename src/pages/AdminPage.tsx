import { useState } from 'react';
import { Plus, CreditCard as Edit, Trash2, Package, Users, ShoppingBag, MessageSquare, Save, X } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product } from '../types';

interface AdminPageProps {
  onNavigate: (page: string) => void;
}

export function AdminPage({ onNavigate }: AdminPageProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'messages'>('products');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your Hot Wheels store</p>
        </div>

        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'products' && (
              <ProductsTab
                products={products}
                setProducts={setProducts}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
                isAdding={isAdding}
                setIsAdding={setIsAdding}
              />
            )}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'messages' && <MessagesTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductsTabProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
}

function ProductsTab({
  products,
  setProducts,
  editingProduct,
  setEditingProduct,
  isAdding,
  setIsAdding,
}: ProductsTabProps) {
  const [formData, setFormData] = useState<Partial<Product>>({});

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      stock: 0,
      categoryId: mockCategories[0].id,
      imageUrl: '',
      featured: false,
    });
  };

  const handleSave = () => {
    if (isAdding) {
      const newProduct: Product = {
        id: `product-${Date.now()}`,
        slug: formData.name?.toLowerCase().replace(/\s+/g, '-') || '',
        ...formData as Product,
      };
      setProducts([...products, newProduct]);
    } else if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        )
      );
    }
    setEditingProduct(null);
    setIsAdding(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAdding(false);
    setFormData({});
  };

  if (editingProduct || isAdding) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isAdding ? 'Add New Product' : 'Edit Product'}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-600 hover:text-gray-900 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock || 0}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={formData.categoryId || ''}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              >
                {mockCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={formData.imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured || false}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 text-primary-600 rounded focus:ring-orange-500"
            />
            <label htmlFor="featured" className="text-sm font-semibold text-gray-700">
              Featured Product
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
            >
              <Save className="w-5 h-5" />
              Save Product
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Featured</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-600 line-clamp-1">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 font-semibold text-primary-600">${product.price.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`font-semibold ${product.stock > 20 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-4 px-4">
                  {product.featured ? (
                    <span className="bg-secondary-100 text-secondary-800 px-2 py-1 rounded text-xs font-semibold">
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">No</span>
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OrdersTab() {
  const mockOrders = [
    { id: '1', customer: 'John Doe', total: 59.96, status: 'processing', date: '2025-09-28' },
    { id: '2', customer: 'Jane Smith', total: 149.95, status: 'shipped', date: '2025-09-27' },
    { id: '3', customer: 'Mike Johnson', total: 29.97, status: 'delivered', date: '2025-09-25' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-mono text-sm text-gray-900">#{order.id}</td>
                <td className="py-4 px-4 font-semibold text-gray-900">{order.customer}</td>
                <td className="py-4 px-4 font-semibold text-primary-600">${order.total.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MessagesTab() {
  const mockMessages = [
    {
      id: '1',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      subject: 'Question about shipping',
      status: 'new',
      date: '2025-09-30',
    },
    {
      id: '2',
      name: 'Tom Brown',
      email: 'tom@example.com',
      subject: 'Product inquiry',
      status: 'in_progress',
      date: '2025-09-29',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-secondary-100 text-secondary-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Messages</h2>

      <div className="space-y-4">
        {mockMessages.map((message) => (
          <div key={message.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{message.subject}</h3>
                <p className="text-sm text-gray-600">
                  From: {message.name} ({message.email})
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(message.status)}`}>
                {message.status.replace('_', ' ')}
              </span>
            </div>
            <div className="text-sm text-gray-600">{message.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
