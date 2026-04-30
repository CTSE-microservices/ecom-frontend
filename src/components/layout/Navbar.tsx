'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ChevronDown, Search, LogOut } from 'lucide-react';
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

  const isProductsRoute = pathname === '/products' || pathname.startsWith('/products/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openLogin = () => { setAuthTab('login'); setAuthModalOpen(true); };
  const openSignup = () => { setAuthTab('signup'); setAuthModalOpen(true); };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/96 border-b border-[#1a1a1a] shadow-2xl shadow-black/50'
            : 'bg-black/50 backdrop-blur-xl border-b border-transparent'
        }`}
      >
        <div className="container-shell">
          <div className="grid h-[64px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 lg:h-[68px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-0 group shrink-0 justify-self-start" aria-label="LuxeStore Home">
              <span className="font-bebas text-2xl tracking-[0.12em] text-white group-hover:text-[#E63022] transition-colors duration-200">LUXE</span>
              <span className="w-px h-5 bg-white/30 mx-2" />
              <span className="font-bebas text-2xl tracking-[0.12em] text-[#E63022]">STORE</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center justify-center justify-self-center lg:flex lg:gap-2">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative px-1"
                    onMouseEnter={() => setCollectionsOpen(true)}
                    onMouseLeave={() => setCollectionsOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.02em] transition-colors duration-150 ${
                        collectionsOpen ? 'text-white' : 'text-white/70 hover:text-white'
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
                          className="absolute top-full left-1/2 mt-3 w-56 -translate-x-1/2 overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#0f0f10] shadow-2xl shadow-black/55"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block border-b border-white/8 px-5 py-3 text-[12px] font-medium tracking-[0.02em] text-white/70 transition-colors hover:bg-white/6 hover:text-white last:border-0"
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
                    className={`relative rounded-full px-5 py-2 text-[13px] font-semibold tracking-[0.02em] transition-colors duration-150 ${
                      (link.href === '/products' ? isProductsRoute : pathname === link.href)
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {(link.href === '/products' ? isProductsRoute : pathname === link.href) && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-[#E63022]" />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center justify-end justify-self-end gap-1.5 lg:gap-2">
              {/* Search */}
              <Link
                href="/products"
                className="rounded-full p-2.5 text-white/60 transition-all hover:bg-white/8 hover:text-white"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative rounded-full p-2.5 text-white/60 transition-all hover:bg-white/8 hover:text-white"
                aria-label="Cart"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E63022] text-white text-[8px] font-semibold flex items-center justify-center"
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
                    className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-white/8"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#E63022] flex items-center justify-center text-white text-xs font-semibold tracking-wide">
                      {(user.username ?? user.email).charAt(0).toUpperCase()}
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
                        className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-[#2a2a2a] bg-[#0f0f10] py-1 shadow-2xl"
                      >
                        <div className="border-b border-white/10 px-4 py-3">
                          <p className="truncate text-xs font-bold text-white">{user.username ?? user.email}</p>
                          <p className="truncate text-[11px] text-white/45">{user.email}</p>
                        </div>
                        <button
                          onClick={() => { logout(); setUserMenuOpen(false); }}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="ml-1 hidden items-center gap-1.5 lg:flex">
                  <button
                    onClick={openLogin}
                    className="rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.02em] text-white/70 transition-colors hover:bg-white/8 hover:text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={openSignup}
                    className="btn-primary px-5 py-2"
                  >
                    Sign Up
                  </button>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="ml-1 rounded-full p-2 text-white/70 transition-all hover:bg-white/8 hover:text-white lg:hidden"
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
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-black border-l border-[#1a1a1a] flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
                <span className="font-bebas text-xl tracking-[0.12em] text-white">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 text-white/60 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">
                {navLinks.map((link, idx) =>
                  link.children ? (
                    <div key={link.label}>
                      <p className="px-3 pt-4 pb-2 text-[10px] font-semibold text-[#E63022] uppercase tracking-[0.04em]">
                        {link.label}
                      </p>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white tracking-[0.02em] transition-colors"
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
                        className={`block px-3 py-3 text-base font-semibold tracking-[0.02em] transition-colors ${
                          pathname === link.href ? 'text-[#E63022]' : 'text-white/80 hover:text-white'
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
                      <div className="w-9 h-9 rounded-full bg-[#E63022] flex items-center justify-center text-white font-semibold text-lg">
                        {(user.username ?? user.email).charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{user.username ?? user.email}</p>
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
                    <button onClick={openLogin} className="w-full py-3 rounded-full border border-white/20 text-sm font-semibold tracking-[0.02em] text-white hover:bg-white hover:text-black transition-all duration-200">
                      Login
                    </button>
                    <button onClick={openSignup} className="btn-primary w-full">
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
