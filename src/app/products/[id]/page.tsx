'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Minus, Plus, Check, Shield, Truck, RefreshCcw } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getProductById, getAllProducts, UIProduct } from '@/lib/productService';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/products/ProductCard';
import { useAuth } from '@/context/AuthContext';

const tabs = ['Description', 'Reviews'];

const guarantees = [
  { icon: Shield,     label: 'Secure Payment' },
  { icon: Truck,      label: 'Free Shipping' },
  { icon: RefreshCcw, label: '30-day Return' },
];

function getChannelId(channel: string): number {
  return channel === 'WHOLESALE' ? 2 : 1;
}

export default function ProductDetailPage() {
  const params = useParams();
  const rawId = params?.id as string;
  const { user } = useAuth();
  const channelId = user ? getChannelId(user.channel) : 1;

  const [product, setProduct] = useState<UIProduct | null>(null);
  const [related, setRelated] = useState<UIProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = Number(rawId);
    if (isNaN(id)) { setNotFound(true); setIsLoading(false); return; }
    setIsLoading(true);
    getProductById(id, channelId)
      .then((p) => {
        setProduct(p);
        // Fetch related: same category, excluding this product
        return getAllProducts(channelId).then((all) =>
          setRelated(all.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 6))
        );
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawId]);

  const { addItem } = useCart();
  const [quantity, setQuantity]     = useState(1);
  const [activeTab, setActiveTab]   = useState('Description');
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded]           = useState(false);
  const [liked, setLiked]           = useState(false);

  if (isLoading) {
    return (
      <div className="page-shell flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-black pt-32 flex flex-col items-center justify-center text-center px-6">
        <p className="font-bebas text-8xl text-white/10 tracking-widest mb-4">404</p>
        <h1 className="font-bebas text-3xl text-white tracking-[0.02em] mb-2">Product not found</h1>
        <p className="text-white/40 text-sm mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/products" className="btn-primary px-8 py-3.5">Browse Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      category: product.category,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="page-shell pb-20">

      {/* ─── Breadcrumb ──────────────────────── */}
      <div className="border-b border-white/8">
        <div className="container-shell py-4">
          <div className="flex items-center gap-2 text-xs font-medium text-white/30">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors capitalize">
                  {product.category}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-white/60 truncate max-w-[160px]">{product.name}</span>
          </div>
        </div>
      </div>

      {/* ─── Main product area ───────────────── */}
      <div className="container-shell py-8 lg:py-14">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-14">

          {/* Left: Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }}>
            <div className="relative mb-4 aspect-square overflow-hidden rounded-[4px] border border-white/10 bg-[#111]">
              {product.images.length > 0 ? (
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
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShoppingBag className="w-16 h-16 text-white/10" />
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-20 overflow-hidden rounded-[4px] border-2 transition-all duration-200 ${
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
            className="space-y-6 lg:pl-8"
          >
            {/* Category + title */}
            <div>
              {product.category && <p className="label mb-2 capitalize">{product.category}</p>}
              <h1 className="font-bebas text-4xl leading-[1.02] tracking-[0.02em] text-white lg:text-5xl">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 border-y border-white/8 py-4">
              <span className="font-bebas text-4xl text-white tracking-[0.02em]">{formatPrice(product.price)}</span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-sm leading-relaxed text-white/60">{product.description}</p>
            )}

            {/* Quantity */}
            <div>
              <p className="text-xs font-semibold text-white/35 uppercase tracking-[0.04em] mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/15 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center text-white font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.stock > 0 ? (
                  <span className="text-xs text-white/30 font-medium">{product.stock} in stock</span>
                ) : (
                  <span className="text-xs text-[#E63022] font-medium">Out of stock</span>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`btn-primary flex-1 justify-center py-3.5 disabled:cursor-not-allowed disabled:opacity-50 ${
                  added ? 'bg-white text-black border-white' : ''
                }`}
              >
                {added ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                {added ? 'Added to bag' : 'Add to bag'}
              </motion.button>
              <button
                onClick={() => setLiked((l) => !l)}
                aria-label="Wishlist"
                className={`rounded-full border p-3.5 transition-all duration-200 ${
                  liked
                    ? 'border-[#E63022] bg-[#E63022]/10 text-[#E63022]'
                    : 'border-white/15 text-white/50 hover:border-white/30 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 transition-all ${liked ? 'fill-[#E63022]' : ''}`} />
              </button>
            </div>

            <Link href="/checkout" className="btn-secondary w-full justify-center py-3.5">
              Buy Now — Checkout
            </Link>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {guarantees.map(({ icon: Icon, label }) => (
                <div key={label} className="panel flex flex-col items-center gap-2 rounded-[4px] p-4 text-center">
                  <Icon className="w-4 h-4 text-white/70" />
                  <span className="text-[10px] text-white/45 font-semibold uppercase tracking-[0.04em]">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Tabs ──────────────────────────── */}
        <div className="mt-12 mb-12">
          <div className="flex gap-0 border-b border-white/10 mb-10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold tracking-[0.02em] border-b-2 transition-all -mb-px ${
                  activeTab === tab
                    ? 'border-[#E63022] text-white'
                    : 'border-transparent text-white/35 hover:text-white/70'
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
                  <p className="text-white/50 leading-relaxed">{product.description || 'No description available.'}</p>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-4 max-w-2xl">
                  {[
                    { name: 'Sarah M.', rating: 5, text: 'Absolutely love this product! Exceeded all expectations. The quality is impeccable.', date: '2 days ago' },
                    { name: 'James K.', rating: 4, text: 'Great value for money. Fast shipping and well-packaged. Would definitely recommend.', date: '1 week ago' },
                    { name: 'Emily R.', rating: 5, text: "Best purchase I've made this year. The attention to detail is remarkable.", date: '2 weeks ago' },
                  ].map((review, i) => {
                    const avatarBg = i === 0 ? 'bg-[#E63022]' : i === 1 ? 'bg-white/[0.12] border border-white/15' : 'bg-[#E63022]/55';
                    return (
                      <div key={i} className="panel p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full ${avatarBg} flex items-center justify-center text-white text-sm font-semibold text-lg`}>
                              {review.name[0]}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{review.name}</p>
                            </div>
                          </div>
                          <span className="text-xs text-white/25 font-medium">{review.date}</span>
                        </div>
                        <p className="text-sm text-white/45 leading-relaxed">{review.text}</p>
                      </div>
                    );
                  })}
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
                <h2 className="font-bebas text-4xl text-white tracking-[0.02em]">You might also like</h2>
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
