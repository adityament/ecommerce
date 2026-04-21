'use client';

import { useRouter } from 'next/navigation';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import { Product } from '@/lib/dummy-data';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { isLoggedIn, addToCart } = useAuth();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/signin');
      return;
    }
    router.push(`/product/${product.id}?buyNow=true`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/signin');
      return;
    }

    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      quantity: 1,
      product,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Product Image */}
      <div 
        className="w-full h-64 bg-gray-100 overflow-hidden relative cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category Badge */}
        <span className="text-xs font-bold text-white bg-black px-3 py-1 rounded-full inline-block mb-3 w-fit">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 
          className="font-bold text-base text-black mb-2 line-clamp-2 min-h-[3rem] cursor-pointer hover:text-gray-700"
          onClick={() => router.push(`/product/${product.id}`)}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-black">
            ₹{product.price.toLocaleString()}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`flex-1 py-2 rounded font-semibold transition flex items-center justify-center gap-2 text-sm ${
              addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-black hover:bg-gray-200'
            }`}
          >
            <ShoppingCart size={16} />
            {addedToCart ? 'Added' : 'Cart'}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 py-2 bg-black text-white rounded font-semibold hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm"
          >
            <Zap size={16} />
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
