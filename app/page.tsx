'use client';

import Link from 'next/link';
import { dummyProducts } from '@/lib/dummy-data';
import { ProductCard } from '@/components/product-card';
import { Zap, Dumbbell, Activity, Star } from 'lucide-react';

export default function Home() {
  const featuredProducts = dummyProducts.slice(0, 3);
  const reviews = [
    {
      name: 'Sarah Mitchell',
      rating: 5,
      text: 'Incredible results in just 3 months! The FitMax machines are game-changers.',
      avatar: '🏋️'
    },
    {
      name: 'James Chen',
      rating: 5,
      text: 'Best investment for my home gym. Quality and performance exceed expectations.',
      avatar: '💪'
    },
    {
      name: 'Emma Davis',
      rating: 4.8,
      text: 'Smart monitoring features help me track my progress. Highly recommended!',
      avatar: '✨'
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Hero Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Advanced Weight Loss Machines for Smart Fitness
              </h1>
              <p className="text-lg text-gray-300">
                Transform your body with our cutting-edge fitness technology. Professional-grade machines designed for maximum results.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/products"
                  className="px-8 py-3 bg-white text-black font-bold hover:bg-gray-200 transition rounded"
                >
                  Shop Now
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition rounded"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=500&fit=crop"
                alt="Hero"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 text-lg">
            Our most popular weight loss machines trusted by thousands
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="bg-black text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FitMax</h2>
            <p className="text-gray-300 text-lg">
              Experience the future of fitness technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fat Burn */}
            <div className="bg-gray-900 p-8 rounded-lg text-center hover:bg-gray-800 transition">
              <Zap size={48} className="mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Fat Burn</h3>
              <p className="text-gray-400">
                Burn up to 800 calories per session with our high-intensity machines
              </p>
            </div>

            {/* Body Shaping */}
            <div className="bg-gray-900 p-8 rounded-lg text-center hover:bg-gray-800 transition">
              <Dumbbell size={48} className="mx-auto mb-4 text-orange-400" />
              <h3 className="text-xl font-bold mb-2">Body Shaping</h3>
              <p className="text-gray-400">
                Precision targeting for muscle toning and body sculpting
              </p>
            </div>

            {/* Smart Monitoring */}
            <div className="bg-gray-900 p-8 rounded-lg text-center hover:bg-gray-800 transition">
              <Activity size={48} className="mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Smart Monitoring</h3>
              <p className="text-gray-400">
                Real-time tracking with AI coaching for optimal results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Product Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Fat Burn', 'Body Shaping', 'Smart Monitoring', 'Cardio'].map((category) => (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="bg-black text-white p-6 rounded-lg text-center hover:bg-gray-800 transition"
            >
              <h3 className="font-bold text-lg">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Reviews</h2>
            <p className="text-gray-600 text-lg">
              See what our satisfied customers are saying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-3xl">{review.avatar}</span>
                  <div>
                    <p className="font-bold text-black">{review.name}</p>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(review.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-black text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Body?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Get started with FitMax today and join thousands of satisfied customers
          </p>
          <Link
            href="/products"
            className="px-10 py-4 bg-white text-black font-bold hover:bg-gray-200 transition rounded inline-block"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  );
}
