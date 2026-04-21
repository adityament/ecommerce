'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { CreditCard, Smartphone, Building2, Truck, Check } from 'lucide-react';

export default function Payment() {
  const router = useRouter();
  const { cart, clearCart } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 50000 ? 0 : 999;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Order placed
    setOrderPlaced(true);
    clearCart();

    setTimeout(() => {
      router.push('/order-confirmation');
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-black mb-2">Order Placed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Redirecting to order confirmation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Payment</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-4">
                Select Payment Method
              </h2>

              <div className="space-y-3">
                {/* Credit Card */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition"
                  style={{borderColor: paymentMethod === 'card' ? '#000' : '#e5e7eb'}}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-4"
                  />
                  <CreditCard size={24} className="mr-3" />
                  <div>
                    <p className="font-bold text-black">Credit / Debit Card</p>
                    <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                  </div>
                </label>

                {/* UPI */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition"
                  style={{borderColor: paymentMethod === 'upi' ? '#000' : '#e5e7eb'}}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-4"
                  />
                  <Smartphone size={24} className="mr-3" />
                  <div>
                    <p className="font-bold text-black">UPI</p>
                    <p className="text-sm text-gray-600">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                </label>

                {/* Net Banking */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition"
                  style={{borderColor: paymentMethod === 'netbanking' ? '#000' : '#e5e7eb'}}>
                  <input
                    type="radio"
                    name="payment"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-4"
                  />
                  <Building2 size={24} className="mr-3" />
                  <div>
                    <p className="font-bold text-black">Net Banking</p>
                    <p className="text-sm text-gray-600">
                      All major banks supported
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition"
                  style={{borderColor: paymentMethod === 'cod' ? '#000' : '#e5e7eb'}}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-4"
                  />
                  <Truck size={24} className="mr-3" />
                  <div>
                    <p className="font-bold text-black">Cash on Delivery</p>
                    <p className="text-sm text-gray-600">
                      Pay when you receive your order
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Card Form (only for card payment) */}
            {paymentMethod === 'card' && (
              <form onSubmit={handlePayment} className="space-y-4">
                <h3 className="font-bold text-lg text-black">Card Details</h3>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:opacity-50 transition mt-6"
                >
                  {processing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                </button>
              </form>
            )}

            {/* Other Payment Methods */}
            {paymentMethod !== 'card' && (
              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:opacity-50 transition"
              >
                {processing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
              </button>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
              <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 max-h-72 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.product.name}</span>
                    <span className="font-semibold text-black">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-black">Total</span>
                <span className="text-2xl font-bold text-black">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-gray-600">
                All transactions are secure and encrypted. Your data is protected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
