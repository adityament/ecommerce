'use client';

import Link from 'next/link';
import { dummyOrders } from '@/lib/dummy-data';
import { useAuth } from '@/context/auth-context';
import { Package, ArrowRight, Clock, Truck, CheckCircle } from 'lucide-react';

export default function Orders() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Package size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-bold text-black mb-2">Sign In Required</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to view your orders
          </p>
          <Link
            href="/signin"
            className="inline-block px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={20} className="text-yellow-600" />;
      case 'confirmed':
        return <CheckCircle size={20} className="text-blue-600" />;
      case 'shipped':
        return <Truck size={20} className="text-purple-600" />;
      case 'delivered':
        return <CheckCircle size={20} className="text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">My Orders</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {dummyOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package size={64} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-black mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              Start shopping to place your first order
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {dummyOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                {/* Order Header */}
                <div className="bg-gray-50 p-6 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order Number</p>
                      <p className="font-bold text-black">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Order Date</p>
                      <p className="font-bold text-black">{order.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Status</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <p className="font-bold text-black">
                          {getStatusLabel(order.status)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                      <p className="font-bold text-black text-lg">
                        ₹{order.totalPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-black mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Quantity: {item.quantity}
                        </p>
                        <p className="font-semibold text-black">
                          ₹{item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="bg-blue-50 p-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2 font-semibold">
                    Delivery Address
                  </p>
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold text-black">
                      {order.deliveryAddress.fullName}
                    </p>
                    <p>{order.deliveryAddress.address}</p>
                    <p>
                      {order.deliveryAddress.city},{' '}
                      {order.deliveryAddress.state}{' '}
                      {order.deliveryAddress.pincode}
                    </p>
                    <p className="mt-1">Ph: {order.deliveryAddress.phoneNumber}</p>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="p-6 border-t border-gray-200 flex gap-3">
                  <button className="px-6 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition font-semibold flex items-center gap-2">
                    <Package size={18} />
                    Track Order
                  </button>
                  <button className="px-6 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition font-semibold flex items-center gap-2">
                    <ArrowRight size={18} />
                    View Details
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
