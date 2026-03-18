'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SearchIcon } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3-7 business days. Express (1-2 days) is available at checkout. Free standard shipping on orders over $50.' },
      { q: 'Can I track my order?', a: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also view order status in your account dashboard.' },
      { q: 'Do you ship internationally?', a: 'We currently ship to 30+ countries. International shipping typically takes 7-14 business days. Duties and taxes may apply.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy. Items must be in original condition and packaging. Simply contact us to initiate a return.' },
      { q: 'How long do refunds take?', a: 'Refunds are processed within 3-5 business days of receiving the returned item. The amount is credited back to your original payment method.' },
      { q: 'What if my item arrives damaged?', a: 'We\'re sorry to hear that! Contact us within 48 hours with photos and we\'ll send a replacement or issue a full refund immediately.' },
    ],
  },
  {
    category: 'Products & Payments',
    items: [
      { q: 'Are your products authentic?', a: 'Absolutely. We source directly from authorized distributors and brands. Every product comes with a guarantee of authenticity.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards (Visa, Mastercard, AmEx), PayPal, Apple Pay, and Google Pay.' },
      { q: 'Is my payment information secure?', a: 'Yes. All transactions are protected by 256-bit SSL encryption. We never store your full card details.' },
      { q: 'Can I change or cancel my order?', a: 'Orders can be modified or cancelled within 2 hours of placement. After that, they may already be in processing. Contact us ASAP if needed.' },
    ],
  },
  {
    category: 'Account & Privacy',
    items: [
      { q: 'Do I need an account to shop?', a: 'You can browse and add items to your cart without an account. However, an account is required to complete checkout and track orders.' },
      { q: 'How do you use my personal data?', a: 'We only use your data to process orders and improve your experience. We never sell personal information to third parties. See our Privacy Policy for details.' },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center justify-between w-full px-6 py-4 text-left transition-colors ${open ? 'bg-amber-500/5' : 'hover:bg-white/5'}`}
        aria-expanded={open}
      >
        <span className={`text-sm font-medium pr-4 ${open ? 'text-amber-400' : 'text-white'}`}>{question}</span>
        <ChevronDown className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-300 ${open ? 'rotate-180 text-amber-400' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [query, setQuery] = useState('');

  const filtered = faqs.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) => !query || item.q.toLowerCase().includes(query.toLowerCase()) || item.a.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 text-center bg-[#0a0a12] border-b border-white/5">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Help</span>
        <h1 className="text-4xl font-black text-white font-outfit mt-2 mb-3">Frequently Asked Questions</h1>
        <p className="text-slate-400 max-w-md mx-auto mb-8">Find answers to the most common questions about LuxeStore.</p>
        {/* Search */}
        <div className="relative max-w-md mx-auto px-4">
          <SearchIcon className="absolute left-7 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions…"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400/40 transition-all text-sm"
          />
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-12">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-slate-500">No results found for &quot;{query}&quot;</p>
            </motion.div>
          ) : (
            filtered.map((cat) => (
              <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-lg font-bold text-white font-outfit mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-amber-400" />
                  {cat.category}
                </h2>
                <div className="space-y-2">
                  {cat.items.map((item) => (
                    <FAQItem key={item.q} question={item.q} answer={item.a} />
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>

        <div className="text-center py-8 border-t border-white/5">
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-sm font-medium hover:bg-amber-500/20 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
