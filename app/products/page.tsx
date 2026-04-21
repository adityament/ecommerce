'use client';

import { Suspense } from 'react';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { dummyProducts, categories } from '@/lib/dummy-data';
import { ProductCard } from '@/components/product-card';
import { Search, Sliders } from 'lucide-react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 60000]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = dummyProducts;

    if (selectedCategory !== 'All') {
      products = products.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      products = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    const sorted = [...products];
    if (sortBy === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      sorted.reverse();
    }

    return sorted;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-gray-300">
            Browse our collection of advanced weight loss machines
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Search Products
                </label>
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3 flex items-center gap-2">
                  <Sliders size={18} />
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === category
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-black hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Price Range
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="60000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600">
                    ₹{priceRange[0].toLocaleString()} - ₹
                    {priceRange[1].toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSortBy('popular');
                  setPriceRange([0, 60000]);
                }}
                className="w-full py-2 border border-black text-black rounded hover:bg-black hover:text-white transition"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {dummyProducts.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSortBy('popular');
                    setPriceRange([0, 60000]);
                  }}
                  className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}