'use client';

import { useAuth } from '@/context/auth-context';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, cart, logout } = useAuth();

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        cartCount={cart.length}
        onLogout={logout}
      />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
