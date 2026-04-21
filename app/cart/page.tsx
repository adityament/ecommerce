'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useAuth();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 50000 ? 0 : 999;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag size={64} className="mx-auto text-gray-300" />
            <h1 className="text-3xl font-bold text-black">Your Cart is Empty</h1>
            <p className="text-gray-600">
              Add some weight loss machines to get started!
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 flex gap-4 hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-gray-200 rounded flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <Link
                    href={`/product/${item.product.id}`}
                    className="text-lg font-bold text-black hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-600 text-sm mb-2">
                    {item.product.category}
                  </p>
                  <p className="text-xl font-bold text-black">
                    ₹{item.product.price.toLocaleString()}
                  </p>
                </div>

                {/* Quantity & Actions */}
                <div className="flex flex-col justify-between items-end">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() =>
                        updateCartQuantity(
                          item.productId,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-black font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.productId, item.quantity + 1)
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800 transition mt-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
              <h2 className="text-2xl font-bold text-black mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-xl font-bold text-black">Total</span>
                <span className="text-2xl font-bold text-black">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <Link
                href="/address"
                className="w-full block text-center bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="w-full block text-center border border-black text-black py-3 rounded font-bold hover:bg-black hover:text-white transition"
              >
                Continue Shopping
              </Link>

              {subtotal <= 50000 && (
                <p className="text-center text-sm text-gray-600 mt-4">
                  Free shipping on orders over ₹50,000
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
