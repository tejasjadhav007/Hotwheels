import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductsPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);
  const { addToCart } = useCart();

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        return b.featured ? 1 : -1;
    }
  });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Products</h1>
          <p className="text-gray-600">Discover our complete collection of Hot Wheels products</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>

            <div className="hidden lg:flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white cursor-pointer transition-colors"
              >
                <option value="all">All Categories</option>
                {mockCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white cursor-pointer transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
              >
                <option value="all">All Categories</option>
                {mockCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary-500 bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          )}
        </div>

        <div className="mb-4 text-gray-600">
          Showing <span className="font-semibold text-gray-900">{sortedProducts.length}</span> products
        </div>

        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onNavigate('product-detail', { productId: product.id })}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-secondary-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                  {product.stock < 20 && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Only {product.stock} left
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
                    {product.stock > 0 ? (
                      <span className="text-green-600 text-sm font-semibold">In Stock</span>
                    ) : (
                      <span className="text-red-600 text-sm font-semibold">Out of Stock</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={product.stock === 0}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
