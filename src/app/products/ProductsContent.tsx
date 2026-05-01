'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getAllProducts, UIProduct } from '@/lib/productService';
import { useAuth } from '@/context/AuthContext';

const sortOptions = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest',     label: 'Newest' },
];

function getChannelId(channel: string): number {
  return channel === 'WHOLESALE' ? 2 : 1;
}

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') ?? '';
  const { user } = useAuth();

  const [products, setProducts] = useState<UIProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const loadProducts = React.useCallback(async () => {
    const channelId = user ? getChannelId(user.channel) : 1;
    setIsLoading(true);
    setError(false);
    try {
      setProducts(await getAllProducts(channelId));
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => { void loadProducts(); }, [loadProducts]);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const result: { id: string; name: string }[] = [];
    for (const p of products) {
      if (p.category && !seen.has(p.category)) {
        seen.add(p.category);
        result.push({ id: p.category, name: p.category.charAt(0).toUpperCase() + p.category.slice(1) });
      }
    }
    return result;
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase()));
    if (selectedCategory) list = list.filter((p) => p.category === selectedCategory);
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest':     list.sort((a, b) => Number(b.id) - Number(a.id)); break;
    }
    return list;
  }, [query, selectedCategory, priceRange, sortBy, products]);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('');
    setPriceRange([0, 5000]);
    setSortBy('featured');
  };

  const hasFilters = query || selectedCategory || priceRange[1] < 5000;
  const currentCat = categories.find((c) => c.id === selectedCategory);
  const rangeStyle = { '--value': `${(priceRange[1] / 5000) * 100}%` } as React.CSSProperties;

  return (
    <div className="page-shell pb-20">

      {/* ─── Page header ──────────────────────────────── */}
      <div className="border-b border-white/8 bg-black/40">
        <div className="container-shell py-10 lg:py-12">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <p className="label mb-2">Catalog</p>
            <h1 className="font-bebas text-5xl lg:text-7xl text-white tracking-[0.02em]">
              {currentCat ? currentCat.name : 'All products'}
            </h1>
            <p className="text-white/35 text-sm mt-2 font-medium">
              {isLoading ? 'Loading…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-shell mt-8">

        {/* ─── Search + Sort bar ──────────────────────── */}
        <div className="mb-8 rounded-[4px] border border-[#2a2a2a] bg-[#0f0f10]/90 p-3 shadow-[0_14px_50px_rgba(0,0,0,0.45)] backdrop-blur-sm lg:p-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                id="search-products"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="input-field border-[#2a2a2a] bg-white/[0.03] py-3 pl-11 pr-10"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:ml-auto lg:flex-nowrap">
              {/* Filter toggle */}
              <button
                onClick={() => setFiltersOpen((o) => !o)}
                className={`flex items-center gap-2 rounded-full border px-4 py-3 text-xs font-semibold uppercase tracking-[0.04em] transition-all ${
                  filtersOpen
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent border-[#2a2a2a] text-white/70 hover:border-white/40 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasFilters && <span className="w-2 h-2 rounded-full bg-[#E63022]" />}
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field min-w-[180px] cursor-pointer appearance-none border-[#2a2a2a] bg-white/[0.03] py-3 pl-5 pr-10 text-white/70"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value} className="bg-black">
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>
          </div>

          {!isLoading && categories.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
                  className={`rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'border-white bg-white text-black'
                      : 'border-[#2a2a2a] text-white/60 hover:text-white hover:border-white/40'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
          {/* ─── Sidebar ──────────────────────────────── */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.aside
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'tween', duration: 0.22 }}
                className="shrink-0 overflow-hidden w-full lg:w-[272px]"
              >
                <div className="w-full space-y-7 rounded-[4px] border border-[#2a2a2a] bg-[#0f0f10] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
                  {hasFilters && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#E63022] uppercase tracking-[0.04em]"
                    >
                      <X className="w-3 h-3" /> Clear Filters
                    </button>
                  )}

                  {/* Category */}
                  <div>
                    <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.04em] text-white/40">Category</h3>
                    <div className="space-y-1.5">
                      <button
                        onClick={() => setSelectedCategory('')}
                        className={`w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                          !selectedCategory ? 'bg-white text-black' : 'text-white/55 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id === selectedCategory ? '' : cat.id)}
                          className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition-all ${
                            selectedCategory === cat.id ? 'bg-white text-black' : 'text-white/55 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.04em] text-white/40">
                      Max Price: ${priceRange[1].toLocaleString()}
                    </h3>
                    <input
                      type="range"
                      min={0}
                      max={5000}
                      step={50}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                      style={rangeStyle}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-white/25 mt-1 font-medium">
                      <span>$0</span><span>$5,000</span>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ─── Product grid ─────────────────────────── */}
          <div className="flex-1 min-w-0">
            {error ? (
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <p className="font-bebas text-4xl text-white/20 tracking-widest mb-4">FAILED TO LOAD</p>
                <p className="text-sm text-white/30 mb-8 font-medium">Something went wrong. Please try again.</p>
                <button
                  onClick={() => void loadProducts()}
                  className="btn-primary px-7 py-3"
                >
                  Retry
                </button>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-[4px] bg-white/5" />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-28 text-center"
                  >
                    <p className="font-bebas text-4xl text-white/20 tracking-widest mb-4">NO RESULTS</p>
                    <p className="text-sm text-white/30 mb-8 font-medium">Try adjusting your filters or search query.</p>
                    <button onClick={clearFilters} className="btn-secondary px-7 py-3">
                      Clear Filters
                    </button>
                  </motion.div>
                ) : (
                  <motion.div layout className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                    {filtered.map((product, i) => (
                      <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ProductCard product={product} index={i} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
