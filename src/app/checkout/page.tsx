'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import AuthModal from '@/components/auth/AuthModal';

const steps = ['Shipping', 'Payment', 'Review'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-2 justify-center mb-10">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              i < current ? 'bg-emerald-500 text-white' :
              i === current ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-black' :
              'bg-white/5 text-slate-500'
            }`}>
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${i === current ? 'text-white' : 'text-slate-500'}`}>{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px flex-1 max-w-16 transition-all ${i < current ? 'bg-emerald-500' : 'bg-white/10'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function ShippingStep({ onNext }: { onNext: (data: { name: string; address: string; city: string; country: string; zip: string }) => void }) {
  const [form, setForm] = useState({ name: '', address: '', city: '', country: 'United States', zip: '' });
  const f = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400/50 transition-all text-sm";

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(form); }} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Full Name</label>
        <input required value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="John Doe" className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Street Address</label>
        <input required value={form.address} onChange={(e) => f('address', e.target.value)} placeholder="123 Main Street, Apt 4B" className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">City</label>
          <input required value={form.city} onChange={(e) => f('city', e.target.value)} placeholder="New York" className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">ZIP / Postal Code</label>
          <input required value={form.zip} onChange={(e) => f('zip', e.target.value)} placeholder="10001" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Country</label>
        <select value={form.country} onChange={(e) => f('country', e.target.value)} className={`${inputClass} cursor-pointer`}>
          {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore'].map((c) => (
            <option key={c} value={c} className="bg-[#13131f]">{c}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-amber-500/20 mt-6">
        Continue to Payment <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const f = (k: string, v: string) => setCard((prev) => ({ ...prev, [k]: v }));
  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400/50 transition-all text-sm";

  const formatCardNumber = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
        <Lock className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-emerald-400 font-medium">Your payment is secured with 256-bit SSL encryption</span>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Card Number</label>
        <input required value={card.number} onChange={(e) => f('number', formatCardNumber(e.target.value))} placeholder="4242 4242 4242 4242" maxLength={19} className={inputClass} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5">Cardholder Name</label>
        <input required value={card.name} onChange={(e) => f('name', e.target.value)} placeholder="John Doe" className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Expiry Date</label>
          <input required value={card.expiry} onChange={(e) => f('expiry', formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} className={inputClass} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">CVV</label>
          <input required value={card.cvv} onChange={(e) => f('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="•••" type="password" maxLength={4} className={inputClass} />
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button type="button" onClick={onBack} className="flex items-center gap-2 px-5 py-4 rounded-2xl glass border border-white/10 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button type="submit" className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-amber-500/20">
          Review Order <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

function ReviewStep({ shipping, onBack, onComplete }: { shipping: { name: string; address: string; city: string; country: string; zip: string }; onBack: () => void; onComplete: () => void }) {
  const { items, totalPrice, clearCart } = useCart();
  const tax = totalPrice * 0.10;
  const shippingCost = totalPrice >= 50 ? 0 : 8.99;
  const total = totalPrice + tax + shippingCost;
  const [loading, setLoading] = useState(false);

  const handlePlace = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    setLoading(false);
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl glass">
        <h3 className="text-sm font-semibold text-white mb-3">Shipping Address</h3>
        <p className="text-sm text-slate-400">{shipping.name}</p>
        <p className="text-sm text-slate-400">{shipping.address}</p>
        <p className="text-sm text-slate-400">{shipping.city}, {shipping.zip}</p>
        <p className="text-sm text-slate-400">{shipping.country}</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between p-3 rounded-xl glass">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 font-medium">{item.quantity}×</span>
              <span className="text-sm text-white truncate max-w-[200px]">{item.product.name}</span>
            </div>
            <span className="text-sm font-medium text-white shrink-0">{formatPrice(item.product.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl glass space-y-2">
        <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span className="text-white">{formatPrice(totalPrice)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-slate-400">Shipping</span><span className={shippingCost === 0 ? 'text-emerald-400 font-medium' : 'text-white'}>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-slate-400">Tax</span><span className="text-white">{formatPrice(tax)}</span></div>
        <hr className="border-white/10 my-2" />
        <div className="flex justify-between font-bold"><span className="text-white">Total</span><span className="text-xl text-white">{formatPrice(total)}</span></div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-4 rounded-2xl glass border border-white/10 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all">
          <ArrowLeft className="w-4 h-4" />Back
        </button>
        <button onClick={handlePlace} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-70">
          {loading ? (
            <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Processing...</>
          ) : (
            <><ShoppingBag className="w-4 h-4" />Place Order</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { user } = useAuth();
  const { items } = useCart();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<{ name: string; address: string; city: string; country: string; zip: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);

  if (items.length === 0 && !orderDone) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-white font-outfit mb-2">Your cart is empty</h1>
        <Link href="/products" className="mt-4 px-6 py-3 rounded-xl bg-amber-400 text-black font-bold text-sm hover:opacity-90 transition-all">Browse Products</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-black text-white font-outfit mb-2">Sign in to Checkout</h1>
          <p className="text-slate-400 mb-8 max-w-sm">
            Please create an account or sign in to complete your purchase securely.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button onClick={() => setAuthModalOpen(true)} className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-amber-500/20">
              Sign In / Sign Up
            </button>
            <Link href="/cart" className="px-8 py-3.5 rounded-2xl glass border border-white/10 text-sm text-white font-medium hover:bg-white/5 transition-all">
              <ArrowLeft className="w-4 h-4 inline mr-1.5" />Back to Cart
            </Link>
          </div>
        </motion.div>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  if (orderDone) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-black text-white font-outfit mb-2">Order Placed! 🎉</h1>
          <p className="text-slate-400 mb-2">Thank you for your purchase, {user.name.split(' ')[0]}!</p>
          <p className="text-sm text-slate-500 mb-8">A confirmation email will be sent to {user.email}</p>
          <Link href="/products" className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-amber-500/20">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="py-8">
          <Link href="/cart" className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />Back to Cart
          </Link>
          <h1 className="text-3xl font-black text-white font-outfit">Checkout</h1>
          <p className="text-slate-500 text-sm mt-1">Logged in as {user.name}</p>
        </div>

        <StepIndicator current={step} />

        <div className="bg-[#0f0f1a] border border-white/5 rounded-3xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && (
                <ShippingStep onNext={(data) => { setShipping(data); setStep(1); }} />
              )}
              {step === 1 && (
                <PaymentStep onNext={() => setStep(2)} onBack={() => setStep(0)} />
              )}
              {step === 2 && shipping && (
                <ReviewStep shipping={shipping} onBack={() => setStep(1)} onComplete={() => setOrderDone(true)} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
