import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo Alanı */}
        <Link to="/" className="text-xl font-bold tracking-tighter text-white">
          Mimar<span className="text-blue-500">.Pro</span>
        </Link>

        {/* Linkler */}
        <div className="flex gap-8">
          <Link 
            to="/" 
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Ana Sayfa
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Hakkımda
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;