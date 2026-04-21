'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Address } from '@/lib/dummy-data';
import { MapPin, Plus, Check } from 'lucide-react';

export default function AddressPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || []);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState<Address>({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = () => {
    if (!formData.fullName || !formData.phoneNumber || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      alert('Please fill all fields');
      return;
    }

    const newAddress = {
      ...formData,
      id: Date.now().toString(),
    };

    setAddresses([...addresses, newAddress]);
    setSelectedAddressId(newAddress.id);
    setFormData({
      fullName: '',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    });
    setIsAddingNew(false);
  };

  const handleProceedToPayment = () => {
    if (!selectedAddressId) {
      alert('Please select an address');
      return;
    }
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Delivery Address</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Addresses List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Existing Addresses */}
            {addresses.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-black mb-4">
                  Your Addresses
                </h2>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => setSelectedAddressId(address.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                        selectedAddressId === address.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                            selectedAddressId === address.id
                              ? 'border-black bg-black'
                              : 'border-gray-300'
                          }`}
                        >
                          {selectedAddressId === address.id && (
                            <Check size={16} className="text-white" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-black">
                            {address.fullName}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {address.address}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {address.city}, {address.state} {address.pincode}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Ph: {address.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Address */}
            <div>
              <button
                onClick={() => setIsAddingNew(!isAddingNew)}
                className="flex items-center gap-2 px-4 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition font-semibold w-full"
              >
                <Plus size={20} />
                Add New Address
              </button>
            </div>

            {/* Add Address Form */}
            {isAddingNew && (
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="font-bold text-black text-lg">
                  Add New Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+91-9876543210"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-black mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street, Apartment 4B"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="NY"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="10001"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleAddAddress}
                    className="flex-1 bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
                  >
                    Add Address
                  </button>
                  <button
                    onClick={() => setIsAddingNew(false)}
                    className="flex-1 border border-black text-black py-2 rounded font-semibold hover:bg-black hover:text-white transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
              <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
                <MapPin size={24} />
                Selected Address
              </h2>

              {selectedAddressId && addresses.find(a => a.id === selectedAddressId) && (
                <div className="bg-white p-4 rounded border border-gray-200 mb-6">
                  <div className="space-y-2 text-sm">
                    <p className="font-bold text-black">
                      {addresses.find(a => a.id === selectedAddressId)?.fullName}
                    </p>
                    <p className="text-gray-600">
                      {addresses.find(a => a.id === selectedAddressId)?.address}
                    </p>
                    <p className="text-gray-600">
                      {addresses.find(a => a.id === selectedAddressId)?.city},{' '}
                      {addresses.find(a => a.id === selectedAddressId)?.state}{' '}
                      {addresses.find(a => a.id === selectedAddressId)?.pincode}
                    </p>
                    <p className="text-gray-600">
                      {addresses.find(a => a.id === selectedAddressId)?.phoneNumber}
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleProceedToPayment}
                disabled={!selectedAddressId}
                className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:opacity-50 transition"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
