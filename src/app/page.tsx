'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Truck, RefreshCcw, Headphones, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductCard from '@/components/products/ProductCard';
import { categories, getFeaturedProducts, getNewArrivals } from '@/lib/data';

/* ─── Static data ─────────────────────────────────────────────── */
const heroSlides = [
  {
    eyebrow: 'New Season 2025',
    headline: ['MADE TO', 'MOVE.'],
    sub: 'Performance meets design. Discover collections built for those who never stand still.',
    cta: 'Shop Now',
    href: '/products',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=90',
    accent: '#FF3B30',
  },
  {
    eyebrow: 'Tech Essentials',
    headline: ['LIVE', 'SMARTER.'],
    sub: 'Cutting-edge gadgets and the latest innovations for a connected lifestyle.',
    cta: 'Explore Tech',
    href: '/products?category=electronics',
    image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1400&q=90',
    accent: '#ffffff',
  },
  {
    eyebrow: 'Premium Sports',
    headline: ['PUSH YOUR', 'LIMITS.'],
    sub: 'Professional-grade gear engineered for athletes who demand the absolute best.',
    cta: 'Shop Sports',
    href: '/products?category=sports',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1400&q=90',
    accent: '#ffffff',
  },
];

const perks = [
  { icon: Truck,       title: 'Free Shipping',   desc: 'Orders over $50' },
  { icon: Shield,      title: 'Secure Payment',  desc: '100% protected' },
  { icon: RefreshCcw,  title: 'Easy Returns',    desc: '30-day hassle free' },
  { icon: Headphones,  title: '24/7 Support',    desc: 'Always here for you' },
];

const stats = [
  { val: '50K+',  label: 'Customers' },
  { val: '500+',  label: 'Products' },
  { val: '4.9★',  label: 'Avg Rating' },
  { val: '30D',   label: 'Return Policy' },
];

/* ─── Animation variants ──────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};

/* ─── Component ───────────────────────────────────────────────── */
export default function HomePage() {
  const featured   = getFeaturedProducts();
  const newArrivals= getNewArrivals();
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'new'>('bestsellers');
  const tabProducts = activeTab === 'bestsellers' ? featured : newArrivals;

  return (
    <>
      {/* ════════════════════════════════════════
          HERO — full-screen swiper
      ════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] max-h-[960px]" aria-label="Hero">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop
          className="h-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative h-full flex items-end pb-20 lg:items-center lg:pb-0">
                {/* Background */}
                <div className="absolute inset-0">
                  <Image
                    src={slide.image}
                    alt={slide.headline.join(' ')}
                    fill
                    className="object-cover object-center"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="container-shell relative z-10 w-full">
                  <div className="max-w-xl">
                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="label mb-4"
                    >
                      {slide.eyebrow}
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.2 }}
                      className="font-bebas text-[clamp(4rem,10vw,8rem)] leading-none text-white mb-5"
                    >
                      {slide.headline.map((line, j) => (
                        <span key={j} className="block">{line}</span>
                      ))}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                      className="text-white/60 text-base leading-relaxed mb-8 max-w-sm"
                    >
                      {slide.sub}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.45 }}
                      className="flex items-center gap-4"
                    >
                      <Link
                        href={slide.href}
                        className="btn-primary group px-8 py-4"
                      >
                        {slide.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        href="/about"
                        className="text-sm font-semibold text-white/50 hover:text-white uppercase tracking-wide transition-colors"
                      >
                        Our Story →
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ════════════════════════════════════════
          PERKS BAR
      ════════════════════════════════════════ */}
      <section className="bg-[#0d0d0d] border-y border-white/8 py-5">
        <div className="container-shell">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 py-1">
                <Icon className="w-5 h-5 text-[#FF3B30] shrink-0" />
                <div>
                  <p className="text-sm font-black text-white leading-tight uppercase tracking-wide">{title}</p>
                  <p className="text-[11px] text-white/35 leading-tight mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CATEGORIES — editorial grid
      ════════════════════════════════════════ */}
      <section className="section-shell bg-black">
        <div className="container-shell">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="mb-10 flex items-end justify-between"
          >
            <motion.div variants={fadeUp}>
              <p className="label mb-2">Explore</p>
              <h2 className="font-bebas text-5xl lg:text-6xl text-white tracking-wider">SHOP BY CATEGORY</h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link
                href="/products"
                className="hidden sm:flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white uppercase tracking-wide transition-colors"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Category grid — first 2 large, rest 3 small */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-12 lg:gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                className={i < 2 ? 'lg:col-span-6' : 'lg:col-span-4'}
              >
                <Link
                  href={`/products?category=${cat.id}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/10"
                >
                  <div className={`relative ${i < 2 ? 'aspect-[5/4]' : 'aspect-square'} overflow-hidden bg-gray-900`}>
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                      <div className="inline-flex rounded-full border border-white/20 bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                        <p className="font-bebas text-2xl leading-none tracking-widest text-white">{cat.name.toUpperCase()}</p>
                      </div>
                      <div className="mt-2 flex translate-y-1 items-center gap-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-xs font-bold text-[#FF3B30] uppercase tracking-wide">Shop Now</span>
                        <ArrowRight className="w-3 h-3 text-[#FF3B30]" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FEATURED DROPS — full-width swiper
      ════════════════════════════════════════ */}
      <section className="section-shell bg-[#0a0a0a]">
        <div className="container-shell">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label mb-2">Handpicked</p>
              <h2 className="font-bebas text-5xl lg:text-6xl text-white tracking-wider">FEATURED DROPS</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white uppercase tracking-wide transition-colors"
            >
              All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1.2}
            breakpoints={{
              480:  { slidesPerView: 2.2 },
              768:  { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
              1280: { slidesPerView: 5 },
            }}
            className="pb-12 -mx-6 px-6 lg:-mx-10 lg:px-10"
          >
            {featured.map((product, i) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ════════════════════════════════════════
          PROMO BANNER — editorial full-bleed
      ════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FF3B30] py-24 lg:py-28">
        {/* Decorative large type watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span className="font-bebas text-[clamp(8rem,20vw,18rem)] text-white/10 tracking-widest whitespace-nowrap">SALE</span>
        </div>

        <div className="container-shell relative flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div>
            <p className="label text-white/70 mb-3">Limited Time Offer</p>
            <h2 className="font-bebas text-[clamp(3.5rem,8vw,7rem)] text-white leading-none">
              UP TO 50% OFF.<br />THIS WEEK ONLY.
            </h2>
            <p className="text-white/70 text-base mt-4 max-w-sm">
              Massive savings across all categories. Don&apos;t miss out on our biggest sale of the season.
            </p>
          </div>
          <Link
            href="/products?sale=true"
            className="group btn-secondary shrink-0 border-black bg-black px-10 py-5 text-white hover:border-white"
          >
            Shop the Sale
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════
          COLLECTION TABS — Best Sellers / New
      ════════════════════════════════════════ */}
      <section className="section-shell bg-black">
        <div className="container-shell">
          {/* Header + Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 mb-12">
            <div>
              <p className="label mb-2">Discover</p>
              <h2 className="font-bebas text-5xl lg:text-6xl text-white tracking-wider">OUR COLLECTION</h2>
            </div>
            <div className="flex items-center gap-1 border border-white/15 rounded-full p-1">
              {(['bestsellers', 'new'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-200 ${
                    activeTab === t
                      ? 'bg-white text-black'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {t === 'bestsellers' ? 'Best Sellers' : 'New Arrivals'}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5"
          >
            {tabProducts.slice(0, 8).map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="btn-secondary group px-10 py-4"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TRUST / STATS
      ════════════════════════════════════════ */}
      <section className="section-shell bg-black">
        <div className="container-shell">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 mb-14">
            <div>
              <p className="label text-[#FF3B30] mb-2">Why LuxeStore</p>
              <h2 className="font-bebas text-5xl lg:text-6xl text-white tracking-wider">TRUSTED BY THOUSANDS</h2>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-[#FF3B30] stroke-[#FF3B30]" />
              ))}
              <span className="ml-2 text-sm font-bold text-white/70">4.9 / 5 from 20,000+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map(({ val, label }) => (
              <div key={label} className="panel px-8 py-12 text-center">
                <p className="mb-1 font-bebas text-5xl tracking-wider text-white lg:text-6xl">{val}</p>
                <p className="text-xs font-black uppercase tracking-widest text-white/45">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          NEWSLETTER — full width strip
      ════════════════════════════════════════ */}
      <section className="border-t border-white/8 bg-[#0a0a0a] py-16">
        <div className="container-shell">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(380px,520px)]">
            <div>
              <p className="label mb-2">Newsletter</p>
              <h2 className="font-bebas text-4xl lg:text-5xl text-white tracking-wider">GET EARLY ACCESS TO DROPS</h2>
              <p className="text-white/40 text-sm mt-2">No spam. Unsubscribe anytime.</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Newsletter inline component ────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 text-white"
      >
        <div className="w-10 h-10 rounded-full bg-[#FF3B30] flex items-center justify-center text-lg font-black">✓</div>
        <div>
          <p className="font-black text-sm uppercase tracking-wide">You&apos;re in!</p>
          <p className="text-xs text-white/40 mt-0.5">Watch your inbox for exclusive drops.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="input-field flex-1 py-4"
      />
      <button
        type="submit"
        className="btn-primary px-7 py-4 sm:min-w-[160px]"
      >
        Subscribe →
      </button>
    </form>
  );
}
