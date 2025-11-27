import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, Package, Shield, Truck } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useCart } from '../contexts/CartContext';

interface ProductDetailPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function ProductDetailPage({ onNavigate }: ProductDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const product = mockProducts.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-8 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 lg:h-full object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 bg-secondary-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
                  Featured Product
                </div>
              )}
            </div>

            <div className="p-8 lg:p-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
                {product.stock > 0 ? (
                  <span className="bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-semibold">
                    {product.stock} in stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-4 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-gray-700 text-lg mb-8 leading-relaxed">{product.description}</p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <Package className="w-5 h-5 text-primary-600" />
                  <span>Premium die-cast metal construction</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Shield className="w-5 h-5 text-primary-600" />
                  <span>Authentic Hot Wheels quality guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Truck className="w-5 h-5 text-primary-600" />
                  <span>Fast shipping available</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-5 h-5 text-gray-700" />
                    </button>
                    <span className="px-6 py-3 font-bold text-lg text-gray-900">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      disabled={quantity >= product.stock}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>
                  <span className="text-gray-600">
                    Total: <span className="font-bold text-primary-600 text-xl">${(product.price * quantity).toFixed(2)}</span>
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-3 ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {addedToCart ? 'Added to Cart!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>

                {addedToCart && (
                  <button
                    onClick={() => onNavigate('cart')}
                    className="w-full mt-3 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-bold hover:bg-primary-50 transition-all"
                  >
                    View Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
              <ul className="space-y-2">
                <li>Scale: 1:64</li>
                <li>Material: Die-cast metal body</li>
                <li>Recommended age: 3 years and up</li>
                <li>Authentic Hot Wheels design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Information</h3>
              <ul className="space-y-2">
                <li>Free shipping on orders over $50</li>
                <li>Standard shipping: 3-5 business days</li>
                <li>Express shipping available</li>
                <li>International shipping options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
