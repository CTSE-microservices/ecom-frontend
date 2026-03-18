'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronDown, Search, User, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

const navLinks = [
  { href: '/products', label: 'All Products' },
  {
    label: 'Collections',
    children: [
      { href: '/products?category=electronics', label: 'Electronics' },
      { href: '/products?category=clothing', label: 'Clothing' },
      { href: '/products?category=home', label: 'Home & Living' },
      { href: '/products?category=beauty', label: 'Beauty' },
      { href: '/products?category=sports', label: 'Sports' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
    setCollectionsOpen(false);
  }, [pathname]);

  const openLogin = () => { setAuthTab('login'); setAuthModalOpen(true); };
  const openSignup = () => { setAuthTab('signup'); setAuthModalOpen(true); };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-black border-b border-white/10 shadow-2xl'
            : 'bg-black/95 backdrop-blur-xl border-b border-white/5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-[68px] gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-0 group shrink-0" aria-label="LuxeStore Home">
              <span className="font-bebas text-2xl tracking-widest text-white group-hover:text-[#FF3B30] transition-colors duration-200">LUXE</span>
              <span className="w-px h-5 bg-white/30 mx-2" />
              <span className="font-bebas text-2xl tracking-widest text-[#FF3B30]">STORE</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-0 flex-1 justify-center">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setCollectionsOpen(true)}
                    onMouseLeave={() => setCollectionsOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-150 uppercase ${
                        collectionsOpen ? 'text-[#FF3B30]' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {link.label}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${collectionsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {collectionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-white rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-100"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-5 py-3 text-[13px] font-semibold text-black hover:bg-gray-50 hover:text-[#FF3B30] transition-colors uppercase tracking-wide border-b border-gray-100 last:border-0"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href!}
                    className={`px-4 py-2 text-[13px] font-semibold uppercase tracking-wide transition-colors duration-150 ${
                      pathname === link.href ? 'text-white' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="block h-px bg-[#FF3B30] mt-0.5 mx-auto" />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 lg:gap-2 shrink-0">
              {/* Search */}
              <Link
                href="/products"
                className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/8 transition-all"
                aria-label="Cart"
              >
                <ShoppingBag className="w-[18px] h-[18px]" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF3B30] text-white text-[9px] font-black flex items-center justify-center"
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Auth */}
              {user ? (
                <div className="relative hidden lg:block">
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/8 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#FF3B30] flex items-center justify-center text-white text-xs font-black font-bebas tracking-wide">
                      {user.name.charAt(0)}
                    </div>
                    <ChevronDown className={`w-3 h-3 text-white/40 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl py-1 shadow-2xl border border-gray-100"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-xs font-bold text-black truncate">{user.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                        </div>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-50 hover:text-[#FF3B30] transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-2 ml-2">
                  <button
                    onClick={openLogin}
                    className="px-4 py-2 text-[13px] font-semibold text-white/60 hover:text-white uppercase tracking-wide transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={openSignup}
                    className="px-5 py-2 rounded-full bg-white text-black text-[13px] font-black uppercase tracking-wide hover:bg-[#FF3B30] hover:text-white transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/8 transition-all ml-1"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-black border-l border-white/10 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                <span className="font-bebas text-xl tracking-widest text-white">MENU</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">
                {navLinks.map((link, idx) =>
                  link.children ? (
                    <div key={link.label}>
                      <p className="px-3 pt-4 pb-2 text-[10px] font-black text-[#FF3B30] uppercase tracking-widest">
                        {link.label}
                      </p>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2.5 text-sm font-semibold text-white/70 hover:text-white uppercase tracking-wide transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        href={link.href!}
                        className={`block px-3 py-3 text-base font-black uppercase tracking-wide transition-colors ${
                          pathname === link.href ? 'text-[#FF3B30]' : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>

              <div className="px-6 py-6 border-t border-white/10 space-y-3">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FF3B30] flex items-center justify-center text-white font-black font-bebas text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{user.name}</p>
                        <p className="text-xs text-white/40">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => logout()}
                      className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition-all font-medium"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button onClick={openLogin} className="w-full py-3 rounded-full border border-white/20 text-sm font-black uppercase tracking-wide text-white hover:bg-white hover:text-black transition-all duration-200">
                      Login
                    </button>
                    <button onClick={openSignup} className="w-full py-3 rounded-full bg-[#FF3B30] text-white text-sm font-black uppercase tracking-wide hover:bg-[#CC2E25] transition-all duration-200">
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authTab}
      />
    </>
  );
}
