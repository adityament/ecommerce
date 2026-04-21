'use client';

import { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { dummyProducts } from '@/lib/dummy-data';
import { useAuth } from '@/context/auth-context';
import { Star, ShoppingCart, Check, AlertCircle, Zap } from 'lucide-react';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, addToCart } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Unwrap the params Promise using React.use()
  const { id } = use(params);

  // Find product
  const product = dummyProducts.find((p) => p.id === id);

  // Handle buyNow redirect
  useEffect(() => {
    if (searchParams.get('buyNow') === 'true' && isLoggedIn) {
      addToCart({
        id: `${product?.id}-${Date.now()}`,
        productId: product?.id || '',
        quantity,
        product: product!,
      });
      router.push('/address');
    }
  }, [searchParams, isLoggedIn, product, quantity, addToCart, router]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      return;
    }

    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      quantity,
      product,
    });

    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      router.push('/signin');
      return;
    }

    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      quantity,
      product,
    });

    router.push('/address');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-black">
            Products
          </Link>
          <span>/</span>
          <span className="text-black font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <div className="bg-gray-200 rounded-lg overflow-hidden h-96 md:h-full flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Category */}
            <span className="text-sm font-semibold text-white bg-black px-3 py-1 rounded-full inline-block">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-black">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-black">
              ₹{product.price.toLocaleString()}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg">{product.description}</p>

            {/* Login Alert */}
            {showLoginAlert && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
                <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-yellow-800 font-semibold">Sign in required</p>
                  <p className="text-yellow-700 text-sm">
                    Please{' '}
                    <Link
                      href="/signin"
                      className="font-semibold hover:underline"
                    >
                      sign in
                    </Link>{' '}
                    to add items to cart
                  </p>
                </div>
              </div>
            )}

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-black font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-green-600 font-semibold">In Stock</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                  className={`py-3 rounded-lg font-bold transition flex items-center justify-center gap-2 ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <Check size={20} />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3 rounded-lg font-bold bg-black text-white hover:bg-gray-800 transition flex items-center justify-center gap-2"
                >
                  <Zap size={20} />
                  Buy Now
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="font-bold text-lg text-black mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <Check size={20} className="text-green-600 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600">{spec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-black mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyProducts
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                >
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                    <div className="h-48 bg-gray-200">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-black mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-xl font-bold text-black">
                        ₹{relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
