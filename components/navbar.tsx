'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  cartCount: number;
  onLogout: () => void;
}

export function Navbar({ isLoggedIn, cartCount, onLogout }: NavbarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            FitMax
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-gray-300 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-gray-300 transition">
              Products
            </Link>
            {isLoggedIn && (
              <Link href="/orders" className="hover:text-gray-300 transition">
                Orders
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn && (
              <Link
                href="/cart"
                className="relative hover:text-gray-300 transition"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="px-4 py-2 border border-white hover:bg-white hover:text-black transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-4 py-2 border border-white hover:bg-white hover:text-black transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800">
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/"
                className="px-4 py-2 hover:bg-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="px-4 py-2 hover:bg-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              {isLoggedIn && (
                <Link
                  href="/orders"
                  className="px-4 py-2 hover:bg-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Orders
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  href="/cart"
                  className="px-4 py-2 hover:bg-gray-900 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart size={20} />
                  Cart {cartCount > 0 && `(${cartCount})`}
                </Link>
              )}
              <div className="border-t border-gray-800 pt-3 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className="px-4 py-2 border border-white hover:bg-gray-900 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition font-semibold text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="px-4 py-2 border border-white hover:bg-gray-900 transition"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-2 bg-white text-black hover:bg-gray-200 transition font-semibold"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
