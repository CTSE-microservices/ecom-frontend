'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Heart, Minus, Plus, Check, Shield, Truck, RefreshCcw, Sparkles, Tag } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getProductById, getRelatedProducts } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { formatPrice, discountPercent } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';

const tabs = ['Description', 'Specifications', 'Reviews'];

const guarantees = [
  { icon: Shield,     label: 'Secure Payment' },
  { icon: Truck,      label: 'Free Shipping' },
  { icon: RefreshCcw, label: '30-day Return' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProductById(id);

  const { addItem } = useCart();
  const [quantity, setQuantity]     = useState(1);
  const [activeTab, setActiveTab]   = useState('Description');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded]           = useState(false);
  const [liked, setLiked]           = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-black pt-32 flex flex-col items-center justify-center text-center px-6">
        <p className="font-bebas text-8xl text-white/10 tracking-widest mb-4">404</p>
        <h1 className="font-bebas text-3xl text-white tracking-wider mb-2">PRODUCT NOT FOUND</h1>
        <p className="text-white/40 text-sm mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/products"
          className="px-8 py-3.5 rounded-full bg-[#FF3B30] text-white text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-200"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="page-shell pt-[68px]">

      {/* ─── Breadcrumb ──────────────────────── */}
      <div className="border-b border-white/8">
        <div className="container-shell py-4">
          <div className="flex items-center gap-2 text-xs font-medium text-white/30">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <span>/</span>
            <span className="capitalize text-white/50">{product.category}</span>
            <span>/</span>
            <span className="text-white/60 truncate max-w-[160px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ─── Main product area ───────────────── */}
      <div className="container-shell py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Main image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#111] mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {product.isNew && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-black text-white text-xs font-black uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />New
                  </span>
                )}
                {product.isSale && product.originalPrice && (
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#FF3B30] text-white text-xs font-black uppercase tracking-wider">
                    <Tag className="w-3 h-3" />
                    -{discountPercent(product.originalPrice, product.price)}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i ? 'border-white' : 'border-white/10 hover:border-white/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-7"
          >
            {/* Category + title */}
            <div>
              <p className="label mb-2">{product.category}</p>
              <h1 className="font-bebas text-4xl lg:text-5xl text-white tracking-wider leading-tight">
                {product.name.toUpperCase()}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-[#FF3B30] stroke-[#FF3B30]' : 'stroke-white/20 fill-transparent'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-black text-white">{product.rating}</span>
              <span className="text-sm text-white/35">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 py-4 border-y border-white/8">
              <span className="font-bebas text-4xl text-white tracking-wider">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-white/30 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <span className="px-3 py-1 rounded-full bg-[#FF3B30]/15 text-[#FF3B30] text-xs font-black uppercase tracking-wide border border-[#FF3B30]/25">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/50 leading-relaxed text-sm">{product.description}</p>

            {/* Quantity */}
            <div>
              <p className="text-xs font-black text-white/30 uppercase tracking-[0.18em] mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/15 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-white font-black font-bebas text-xl tracking-wider">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-white/30 font-medium">{product.stock} in stock</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2.5 rounded-full py-4 text-xs font-black uppercase tracking-[0.13em] transition-all duration-200 ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-[#FF3B30] text-white hover:bg-white hover:text-black'
                }`}
              >
                {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                {added ? 'Added to Bag!' : 'Add to Bag'}
              </motion.button>
              <button
                onClick={() => setLiked((l) => !l)}
                aria-label="Wishlist"
                className={`p-4 rounded-full border transition-all duration-200 ${
                  liked
                    ? 'border-[#FF3B30] bg-[#FF3B30]/10 text-[#FF3B30]'
                    : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 transition-all ${liked ? 'fill-[#FF3B30]' : ''}`} />
              </button>
            </div>

            <Link
              href="/checkout"
              className="btn-secondary block py-4 text-center"
            >
              Buy Now — Checkout
            </Link>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {guarantees.map(({ icon: Icon, label }) => (
                <div key={label} className="panel flex flex-col items-center gap-2 p-4 text-center">
                  <Icon className="w-4 h-4 text-[#FF3B30]" />
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Tabs ──────────────────────────── */}
        <div className="mt-20 mb-16">
          <div className="flex gap-0 border-b border-white/10 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-black uppercase tracking-wide border-b-2 transition-all -mb-px ${
                  activeTab === tab
                    ? 'border-[#FF3B30] text-white'
                    : 'border-transparent text-white/30 hover:text-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Description' && (
                <div className="max-w-2xl">
                  <p className="text-white/50 leading-relaxed">{product.description}</p>
                  <ul className="mt-6 space-y-3">
                    {['Premium quality materials', 'Carefully crafted for longevity', 'Backed by our quality guarantee', '30-day hassle-free returns'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-white/50">
                        <span className="w-5 h-5 rounded-full bg-[#FF3B30]/15 border border-[#FF3B30]/30 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-[#FF3B30]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'Specifications' && product.specs && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="panel flex items-center justify-between p-4">
                      <span className="text-sm text-white/35 font-medium">{key}</span>
                      <span className="text-sm text-white font-bold">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-4 max-w-2xl">
                  {[
                    { name: 'Sarah M.', rating: 5, text: 'Absolutely love this product! Exceeded all expectations. The quality is impeccable.', date: '2 days ago' },
                    { name: 'James K.', rating: 4, text: 'Great value for money. Fast shipping and well-packaged. Would definitely recommend.', date: '1 week ago' },
                    { name: 'Emily R.', rating: 5, text: "Best purchase I've made this year. The attention to detail is remarkable.", date: '2 weeks ago' },
                  ].map((review, i) => (
                    <div key={i} className="panel p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#FF3B30] flex items-center justify-center text-white text-sm font-black font-bebas text-xl tracking-wider">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-white">{review.name}</p>
                            <div className="flex items-center gap-0.5 mt-0.5">
                              {[...Array(5)].map((_, j) => (
                                <Star key={j} className={`w-3 h-3 ${j < review.rating ? 'fill-[#FF3B30] stroke-[#FF3B30]' : 'stroke-white/20 fill-transparent'}`} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-white/25 font-medium">{review.date}</span>
                      </div>
                      <p className="text-sm text-white/45 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Related products ──────────────── */}
        {related.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="label mb-2">Related</p>
                <h2 className="font-bebas text-4xl text-white tracking-wider">YOU MIGHT ALSO LIKE</h2>
              </div>
            </div>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1.2}
              breakpoints={{ 480: { slidesPerView: 2.2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
              className="pb-12"
            >
              {related.map((p, i) => (
                <SwiperSlide key={p.id}>
                  <ProductCard product={p} index={i} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
