'use client';

import Link from 'next/link';
import { CheckCircle, Package, MapPin, DollarSign } from 'lucide-react';

export default function OrderConfirmation() {
  const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-2">Order Confirmed!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
            {/* Order ID */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-black">{orderId}</p>
            </div>

            {/* Order Date */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Order Date</p>
              <p className="text-2xl font-bold text-black">
                {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Estimated Delivery */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
              <p className="text-lg font-semibold text-black">
                {estimatedDelivery.toLocaleDateString()}
              </p>
            </div>

            {/* Total Amount */}
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Amount Paid</p>
              <p className="text-2xl font-bold text-black">₹{Math.floor(Math.random() * 100000)}</p>
            </div>
          </div>

          {/* What to Expect */}
          <div>
            <h3 className="font-bold text-black mb-4 flex items-center gap-2">
              <Package size={20} />
              What to Expect
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="font-semibold text-black">1.</span>
                <span>You will receive a shipping confirmation email shortly</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-black">2.</span>
                <span>Track your order status anytime from your Orders page</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-black">3.</span>
                <span>Your items will be carefully packed and shipped</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-black">4.</span>
                <span>Installation support available 24/7 after delivery</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Delivery */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <MapPin size={24} className="text-blue-600 mb-3" />
            <h3 className="font-bold text-black mb-2">Free Shipping</h3>
            <p className="text-sm text-gray-600">
              Your order qualifies for free delivery
            </p>
          </div>

          {/* Support */}
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <DollarSign size={24} className="text-purple-600 mb-3" />
            <h3 className="font-bold text-black mb-2">30-Day Returns</h3>
            <p className="text-sm text-gray-600">
              Not satisfied? Full refund within 30 days
            </p>
          </div>

          {/* Warranty */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <CheckCircle size={24} className="text-green-600 mb-3" />
            <h3 className="font-bold text-black mb-2">2-Year Warranty</h3>
            <p className="text-sm text-gray-600">
              All machines come with manufacturer warranty
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/orders"
            className="flex-1 bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition text-center"
          >
            View My Orders
          </Link>
          <Link
            href="/products"
            className="flex-1 border border-black text-black py-3 rounded font-bold hover:bg-black hover:text-white transition text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 mb-4">
            Need help? Contact our support team
          </p>
          <div className="text-center">
            <p className="font-semibold text-black">support@fitmax.com</p>
            <p className="text-gray-600">+1-800-FITMAX-1</p>
            <p className="text-gray-600">Available Mon-Fri, 9AM-6PM EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
