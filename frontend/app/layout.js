import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import DishModal from '@/components/DishModal';
import AddressModal from '@/components/AddressModal';
import LiveTrackingBar from '@/components/LiveTrackingBar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'FoodRush — Premium Food Delivery UI',
  description: 'Ultra-modern restaurant and food delivery app UI built with Next.js, Tailwind CSS, and React.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="bg-[#090B0E] text-[#F8FAFC] antialiased min-h-screen flex flex-col font-sans selection:bg-[#FF5A1F]/30 selection:text-white">
          <Navbar />
          <CartDrawer />
          <DishModal />
          <AddressModal />
          <LiveTrackingBar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}