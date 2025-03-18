import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import SearchBar from './SearchBar';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSearchOverlayOpen(false);
  };

  const toggleSearchOverlay = () => {
    setSearchOverlayOpen(!searchOverlayOpen);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOverlayOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`bg-dark-900/95 backdrop-blur-md sticky top-0 z-50 ${scrolled ? 'shadow-md' : 'border-b border-dark-800/60'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <div className="relative flex items-center">
                <span className="text-xl md:text-2xl font-bold">
                  <span className="text-primary">9</span>
                  <span className="bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">Anime</span>
                </span>
                <div className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-grow max-w-2xl mx-8">
              <SearchBar />
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Mobile Search Toggle */}
              <button
                className="md:hidden p-2 text-white hover:text-primary transition-colors rounded-full hover:bg-dark-800/50"
                onClick={toggleSearchOverlay}
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/">
                  <div className={`flex items-center gap-2 ${location === '/' ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}>
                    <i className="fas fa-home text-sm mr-2 text-primary"></i>
                    <span>Home</span>
                  </div>
                </Link>
                <Link href="/genre/all">
                  <div className={`flex items-center gap-2 ${location.startsWith('/genre') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}>
                    <i className="fas fa-tags text-sm mr-2 text-primary"></i>
                    <span>Genres</span>
                  </div>
                </Link>
                <Link href="/recently-watched">
                  <div className={`flex items-center gap-2 ${location === '/recently-watched' ? 'text-white font-medium' : 'text-slate-300 hover:text-white'}`}>
                    <i className="fas fa-history text-sm mr-2 text-primary"></i>
                    <span>Recently Watched</span>
                  </div>
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-white hover:text-primary transition-colors rounded-full hover:bg-dark-800/50"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              mobileMenuOpen ? "max-h-48 py-3" : "max-h-0"
            )}
          >
            <nav className="flex flex-col space-y-3">
              <Link href="/">
                <div className={`flex items-center gap-2 ${location === '/' ? 'text-white font-medium' : 'text-slate-300 hover:text-white'} py-2`}>
                  <i className="fas fa-home text-sm mr-3 text-primary"></i>
                  <span>Home</span>
                </div>
              </Link>
              <Link href="/genre/all">
                <div className={`flex items-center gap-2 ${location.startsWith('/genre') ? 'text-white font-medium' : 'text-slate-300 hover:text-white'} py-2`}>
                  <i className="fas fa-tags text-sm mr-3 text-primary"></i>
                  <span>Genres</span>
                </div>
              </Link>
              <Link href="/recently-watched">
                <div className={`flex items-center gap-2 ${location === '/recently-watched' ? 'text-white font-medium' : 'text-slate-300 hover:text-white'} py-2`}>
                  <i className="fas fa-history text-sm mr-3 text-primary"></i>
                  <span>Recently Watched</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-lg z-50 transition-all duration-300",
          "md:hidden flex flex-col",
          searchOverlayOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="sticky top-0 border-b border-border/50">
          <div className="container mx-auto px-4 h-14 flex items-center gap-3">
            <div className="flex-1">
              <SearchBar autoFocus />
            </div>
            <button
              className="p-2 text-white hover:text-primary transition-colors rounded-full hover:bg-dark-800/50"
              onClick={toggleSearchOverlay}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;