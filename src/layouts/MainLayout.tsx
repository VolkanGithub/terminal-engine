import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-white font-sans antialiased">
      {/* Üst Kısım: Navbar */}
      <Navbar />

      {/* Orta Kısım: Değişen İçerik */}
      {/* pt-16: Navbar fixed olduğu için içeriğin üstte kalmasını engeller */}
      <main className="flex-1 pt-16">
        <Outlet /> 
      </main>

      {/* Alt Kısım: Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-600">
        <p>© 2026 Mimar & Alfred Engineering. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;