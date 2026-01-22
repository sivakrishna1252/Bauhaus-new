import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import logo from '@/assets/logo.png';

interface NavLink {
  href: string;
  label: string;
  isButton?: boolean;
  subLinks?: { href: string; label: string }[];
}

const leftLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Our Projects' },
  { href: '/about', label: 'About Us' },
  // { href: '/modular-kitchens', label: 'Offerings' },
  { href: '/how-it-works', label: 'How it works' },
];

const rightLinks: NavLink[] = [

  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/careers', label: 'Careers' },

];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Use both window.scrollY and pageYOffset for broad compatibility
      const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Determine if we're on a page with a dark hero
  // We explicitly want "/" and "/how-it-works" to trigger the dark hero behavior
  const hasDarkHero = [
    '/',
    '/about',
    '/portfolio',
    '/how-it-works',
    '/faq',
    '/blog',
    '/careers'
  ].includes(location.pathname) ||
    location.pathname.startsWith('/projects/') ||
    location.pathname.startsWith('/blog/');

  const isActive = (link: NavLink) => {
    if (location.pathname === link.href) return true;
    if (link.subLinks) {
      return link.subLinks.some(sub => location.pathname === sub.href);
    }
    return false;
  };

  return (
    <header
      className={
        cn(
          'fixed top-0 left-0 right-0 z-[100] transition-[background-color,backdrop-filter,height,box-shadow] duration-500 ease-in-out',
          isScrolled
            ? 'bg-neutral-900/95 backdrop-blur-md shadow-lg h-20 md:h-20'
            : hasDarkHero
              ? 'bg-transparent h-20 md:h-24'
              : 'bg-neutral-900/90 h-20 md:h-20'
        )
      }
    >
      <div className="w-full h-full px-4 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between">

        {/* 1. Logo (Left Area - Fixed Width to balance right side) */}
        <div className="flex-1 lg:flex-none lg:w-[200px] flex justify-start">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="BauHaus"
              className={cn(
                "h-6 md:h-7 lg:h-8 w-auto transition-all duration-300",
                "brightness-0 invert"
              )}
            />
          </Link>
        </div>

        {/* 2. Navigation (Center Area - Perfectly Centered) */}
        <nav className="hidden md:flex items-center justify-center gap-x-[1.5vw] lg:gap-x-[2vw] xl:gap-x-[2.5vw] flex-1">
          {[...leftLinks, ...rightLinks].map((link) => (
            <div key={link.label} className="relative group">
              <Link
                to={link.href}
                className={cn(
                  "text-[10px] lg:text-[11px] xl:text-xs font-bold tracking-[0.12em] uppercase transition-colors duration-300 relative py-1 flex items-center gap-1",
                  "text-white/90 hover:text-white",
                  isActive(link) && "text-white"
                )}
              >
                {link.label}
                {link.subLinks && <ChevronDown className="w-3 h-3 lg:w-3.5 h-3.5" />}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-full h-[2px] transition-transform duration-300 scale-x-0 group-hover:scale-x-100",
                  "bg-white",
                  isActive(link) && "scale-x-100" // Active indicator
                )} />
              </Link>

              {/* Dropdown Menu */}
              {link.subLinks && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 min-w-[180px] lg:min-w-[220px]">
                  <div className="bg-white rounded-lg shadow-2xl py-2 flex flex-col overflow-hidden">
                    {link.subLinks.map((subLink, index) => (
                      <Link
                        key={subLink.href}
                        to={subLink.href}
                        className={cn(
                          "px-4 lg:px-6 py-2.5 text-[10px] lg:text-[12px] font-bold tracking-[0.1em] uppercase transition-all duration-200 hover:text-gold text-start",
                          location.pathname === subLink.href ? "text-gold bg-gold/5" : "text-neutral-600",
                          index !== link.subLinks!.length - 1 && "border-b border-gray-100"
                        )}
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* 3. Right Area (Contact Button / Mobile Toggle) */}
        <div className="flex-1 lg:flex-none lg:w-[200px] flex justify-end items-center">
          {/* Desktop/Tablet Button */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              asChild
              className={cn(
                "rounded-full border-2 px-4 lg:px-6 tracking-[0.1em] uppercase text-[10px] lg:text-xs font-bold h-8 lg:h-10 transition-all duration-300",
                "border-white text-white hover:bg-white hover:text-black",
                location.pathname === '/contact' && "bg-white text-black border-white"
              )}
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 transition-colors duration-300",
              "text-white"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-background border-t border-border transition-all duration-60 ease-out overflow-hidden shadow-lg",
          isMobileMenuOpen ? "h-screen opacity-100 py-6 overflow-y-auto" : "h-0 opacity-0 py-0 overflow-hidden"
        )}
      >
        <nav className="container-custom flex flex-col gap-4 text-center pb-32">
          {[...leftLinks, ...rightLinks].map((link) => {
            const hasSubLinks = link.subLinks && link.subLinks.length > 0;
            const isExpanded = expandedMobileItem === link.label;

            return (
              <div key={link.label} className="flex flex-col">
                <div
                  className="flex items-center justify-center gap-2 py-2 cursor-pointer"
                  onClick={() => {
                    if (hasSubLinks) {
                      setExpandedMobileItem(isExpanded ? null : link.label);
                    } else {
                      setIsMobileMenuOpen(false);
                    }
                  }}
                >
                  <Link
                    to={hasSubLinks ? "#" : link.href}
                    className={cn(
                      "text-[15px] font-bold tracking-[0.1em] uppercase transition-colors duration-60",
                      isActive(link)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-foreground"
                    )}
                    onClick={(e) => {
                      if (hasSubLinks) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                  {hasSubLinks && (
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-foreground/60" />
                    </motion.div>
                  )}
                </div>

                {/* Mobile Sublinks */}
                <AnimatePresence>
                  {hasSubLinks && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden bg-neutral-50/50 rounded-lg mx-4"
                    >
                      <div className="flex flex-col gap-2 py-3 px-4">
                        {link.subLinks!.map(subLink => (
                          <Link
                            key={subLink.href}
                            to={subLink.href}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setExpandedMobileItem(null);
                            }}
                            className={cn(
                              "text-[13px] font-bold tracking-[0.05em] uppercase py-2 transition-colors duration-300",
                              location.pathname === subLink.href ? "text-gold" : "text-muted-foreground hover:text-primary"
                            )}
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <Button variant="default" size="lg" asChild className="mt-4 mx-auto w-fit">
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          </Button>
        </nav>
      </div>
    </header >
  );
}