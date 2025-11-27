import { Star, Flame, TrendingUp, ArrowRight } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import { Product, Category } from '../types';

interface HomePageProps {
  onNavigate: (page: string, params?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredProducts = mockProducts.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Flame className="w-8 h-8 text-yellow-300 animate-pulse" />
              <span className="text-yellow-300 font-bold uppercase tracking-wider">Limited Time Offer</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Rev Up Your Collection
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Discover the hottest die-cast cars, track sets, and collectibles. From classics to limited editions.
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-orange-700 transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            <h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-12">
            <TrendingUp className="w-8 h-8 text-orange-600" />
            <h2 className="text-4xl font-bold text-gray-900">Shop by Category</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Join the Hot Wheels Community</h2>
            <p className="text-xl mb-8 text-gray-300">
              Get exclusive deals, early access to new releases, and special collector tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-500"
              />
              <button className="bg-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-500 transition-all transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, onNavigate }: { product: Product; onNavigate: (page: string, params?: any) => void }) {
  return (
    <div
      onClick={() => onNavigate('product-detail', { productId: product.id })}
      className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.stock < 20 && (
          <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            Only {product.stock} left!
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-all">
            View
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category, onNavigate }: { category: Category; onNavigate: (page: string, params?: any) => void }) {
  return (
    <div
      onClick={() => onNavigate('category', { categoryId: category.id })}
      className="relative rounded-xl overflow-hidden cursor-pointer group h-64 shadow-lg hover:shadow-2xl transition-all"
    >
      <img
        src={category.imageUrl}
        alt={category.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
        <p className="text-white/90 text-sm">{category.description}</p>
      </div>
    </div>
  );
}
