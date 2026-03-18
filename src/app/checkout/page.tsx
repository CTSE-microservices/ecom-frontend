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
    <div className="mb-10 flex items-center justify-center gap-2">
      {steps.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                i < current
                  ? 'bg-emerald-500 text-white'
                  : i === current
                    ? 'bg-[#FF3B30] text-white'
                    : 'bg-white/6 text-white/45'
              }`}
            >
              {i < current ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`hidden text-sm font-medium sm:block ${i === current ? 'text-white' : 'text-white/45'}`}>{step}</span>
          </div>
          {i < steps.length - 1 && <div className={`h-px max-w-16 flex-1 ${i < current ? 'bg-emerald-500' : 'bg-white/12'}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function ShippingStep({ onNext }: { onNext: (data: { name: string; address: string; city: string; country: string; zip: string }) => void }) {
  const [form, setForm] = useState({ name: '', address: '', city: '', country: 'United States', zip: '' });
  const f = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(form); }} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Full Name</label>
        <input required value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="John Doe" className="input-field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Street Address</label>
        <input required value={form.address} onChange={(e) => f('address', e.target.value)} placeholder="123 Main Street, Apt 4B" className="input-field" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/45">City</label>
          <input required value={form.city} onChange={(e) => f('city', e.target.value)} placeholder="New York" className="input-field" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/45">ZIP / Postal Code</label>
          <input required value={form.zip} onChange={(e) => f('zip', e.target.value)} placeholder="10001" className="input-field" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Country</label>
        <select value={form.country} onChange={(e) => f('country', e.target.value)} className="input-field cursor-pointer">
          {['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore'].map((c) => (
            <option key={c} value={c} className="bg-[#0f0f10]">{c}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-primary mt-4 w-full justify-center py-3.5">
        Continue to Payment <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

function PaymentStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const f = (k: string, v: string) => setCard((prev) => ({ ...prev, [k]: v }));

  const formatCardNumber = (v: string) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
      <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/12 p-3">
        <Lock className="h-4 w-4 text-emerald-400" />
        <span className="text-xs font-medium text-emerald-300">Your payment is secured with 256-bit SSL encryption</span>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Card Number</label>
        <input required value={card.number} onChange={(e) => f('number', formatCardNumber(e.target.value))} placeholder="4242 4242 4242 4242" maxLength={19} className="input-field" />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Cardholder Name</label>
        <input required value={card.name} onChange={(e) => f('name', e.target.value)} placeholder="John Doe" className="input-field" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/45">Expiry Date</label>
          <input required value={card.expiry} onChange={(e) => f('expiry', formatExpiry(e.target.value))} placeholder="MM/YY" maxLength={5} className="input-field" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/45">CVV</label>
          <input required value={card.cvv} onChange={(e) => f('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder="***" type="password" maxLength={4} className="input-field" />
        </div>
      </div>
      <div className="mt-5 flex gap-3">
        <button type="button" onClick={onBack} className="btn-secondary px-5 py-3.5">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button type="submit" className="btn-primary flex-1 justify-center py-3.5">
          Review Order <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

function ReviewStep({ shipping, onBack, onComplete }: { shipping: { name: string; address: string; city: string; country: string; zip: string }; onBack: () => void; onComplete: () => void }) {
  const { items, totalPrice, clearCart } = useCart();
  const tax = totalPrice * 0.1;
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
    <div className="space-y-5">
      <div className="panel p-4">
        <h3 className="text-sm font-semibold text-white">Shipping Address</h3>
        <p className="mt-3 text-sm text-white/55">{shipping.name}</p>
        <p className="text-sm text-white/55">{shipping.address}</p>
        <p className="text-sm text-white/55">{shipping.city}, {shipping.zip}</p>
        <p className="text-sm text-white/55">{shipping.country}</p>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.product.id} className="panel flex items-center justify-between p-3.5">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white/45">{item.quantity}x</span>
              <span className="max-w-[220px] truncate text-sm text-white">{item.product.name}</span>
            </div>
            <span className="shrink-0 text-sm font-semibold text-white">{formatPrice(item.product.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="panel space-y-2 p-4">
        <div className="flex justify-between text-sm"><span className="text-white/45">Subtotal</span><span className="text-white">{formatPrice(totalPrice)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-white/45">Shipping</span><span className={shippingCost === 0 ? 'font-semibold text-emerald-400' : 'text-white'}>{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span></div>
        <div className="flex justify-between text-sm"><span className="text-white/45">Tax</span><span className="text-white">{formatPrice(tax)}</span></div>
        <hr className="my-2 border-white/10" />
        <div className="flex justify-between"><span className="text-sm font-semibold text-white">Total</span><span className="text-xl font-black text-white">{formatPrice(total)}</span></div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary px-5 py-3.5">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button onClick={handlePlace} disabled={loading} className="btn-primary flex-1 justify-center py-3.5 disabled:opacity-70">
          {loading ? <><div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Processing...</> : <><ShoppingBag className="h-4 w-4" />Place Order</>}
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
      <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 pt-24 text-center">
        <div className="mb-4 text-5xl">Cart</div>
        <h1 className="section-title text-4xl">Your Bag Is Empty</h1>
        <Link href="/products" className="btn-primary mt-5 px-7 py-3.5">Browse Products</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 pt-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#FF3B30]/25 bg-[#FF3B30]/10">
            <Lock className="h-8 w-8 text-[#FF3B30]" />
          </div>
          <h1 className="section-title text-4xl">Sign In To Checkout</h1>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/50">Create an account or sign in to complete your purchase securely.</p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row">
            <button onClick={() => setAuthModalOpen(true)} className="btn-primary px-8 py-3.5">
              Sign In / Sign Up
            </button>
            <Link href="/cart" className="btn-secondary px-8 py-3.5">
              <ArrowLeft className="h-4 w-4" />
              Back To Cart
            </Link>
          </div>
        </motion.div>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    );
  }

  if (orderDone) {
    return (
      <div className="page-shell flex min-h-screen flex-col items-center justify-center px-4 pt-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-2xl shadow-emerald-500/30"
          >
            <Check className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="section-title text-5xl">Order Placed</h1>
          <p className="mt-3 text-sm text-white/50">Thank you for your purchase, {user.name.split(' ')[0]}.</p>
          <p className="mt-1 text-xs text-white/40">A confirmation email will be sent to {user.email}</p>
          <Link href="/products" className="btn-primary mt-7 px-8 py-3.5">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-shell pb-16 pt-20">
      <div className="container-shell max-w-2xl">
        <div className="py-8">
          <Link href="/cart" className="btn-ghost px-0 text-xs uppercase tracking-[0.12em]">
            <ArrowLeft className="h-4 w-4" />
            Back To Cart
          </Link>
          <h1 className="section-title mt-3 text-5xl">Checkout</h1>
          <p className="mt-1 text-sm text-white/45">Logged in as {user.name}</p>
        </div>

        <StepIndicator current={step} />

        <div className="panel rounded-3xl p-5 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && <ShippingStep onNext={(data) => { setShipping(data); setStep(1); }} />}
              {step === 1 && <PaymentStep onNext={() => setStep(2)} onBack={() => setStep(0)} />}
              {step === 2 && shipping && <ReviewStep shipping={shipping} onBack={() => setStep(1)} onComplete={() => setOrderDone(true)} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
