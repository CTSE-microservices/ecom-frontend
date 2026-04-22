'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, SearchIcon } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3 to 7 business days. Express shipping in 1 to 2 days is also available at checkout. Orders above $50 ship free.' },
      { q: 'Can I track my order?', a: 'Yes. As soon as your order ships, we email a tracking number. You can also view live tracking in your account dashboard.' },
      { q: 'Do you ship internationally?', a: 'We ship to 30+ countries. International delivery usually takes 7 to 14 business days. Duties and taxes may apply by destination.' },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      { q: 'What is your return policy?', a: 'You can return items within 30 days in original condition and packaging. Contact support to start a return in minutes.' },
      { q: 'How long do refunds take?', a: 'Refunds are processed within 3 to 5 business days after we receive your return, then sent to the original payment method.' },
      { q: 'What if my item arrives damaged?', a: 'Please contact us within 48 hours with photos. We will replace the item or issue a full refund right away.' },
    ],
  },
  {
    category: 'Products & Payments',
    items: [
      { q: 'Are your products authentic?', a: 'Yes. We source directly from authorized brands and distributors, and every product is covered by authenticity guarantees.' },
      { q: 'What payment methods do you accept?', a: 'We accept major credit and debit cards, PayPal, Apple Pay, and Google Pay.' },
      { q: 'Is my payment information secure?', a: 'All transactions use 256-bit SSL encryption. We do not store full card details on our platform.' },
      { q: 'Can I change or cancel my order?', a: 'Orders can be edited or cancelled within 2 hours of placement. After that, processing may already be underway.' },
    ],
  },
  {
    category: 'Account & Privacy',
    items: [
      { q: 'Do I need an account to shop?', a: 'You can browse and add items to cart without an account. You only need one to complete checkout and track orders.' },
      { q: 'How do you use my personal data?', a: 'We use your data only to process orders and improve your experience. We never sell personal information to third parties.' },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="panel overflow-hidden rounded-[4px]">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center justify-between px-5 py-4 text-left transition-colors ${open ? 'bg-[#E63022]/8' : 'hover:bg-white/6'}`}
        aria-expanded={open}
      >
        <span className={`pr-4 text-sm font-semibold ${open ? 'text-[#E63022]' : 'text-white'}`}>{question}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-white/40 transition-transform duration-300 ${open ? 'rotate-180 text-[#E63022]' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="border-t border-white/8 px-5 pb-5 pt-4 text-sm leading-relaxed text-white/55">
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

  const filtered = faqs
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) => !query || item.q.toLowerCase().includes(query.toLowerCase()) || item.a.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="page-shell">
      <section className="border-b border-white/8 bg-[#090909] py-16 text-center">
        <div className="container-shell">
          <p className="label mb-2">Help</p>
          <h1 className="section-title text-[clamp(2.4rem,6vw,4.4rem)]">Frequently Asked Questions</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/50 lg:text-base">
            Find quick answers to shipping, returns, account, and payment questions.
          </p>
          <div className="relative mx-auto mt-8 max-w-xl">
            <SearchIcon className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="input-field pl-11"
            />
          </div>
        </div>
      </section>

      <div className="container-shell py-14 lg:py-16">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
              <p className="text-white/45">No results found for &quot;{query}&quot;.</p>
            </motion.div>
          ) : (
              <div className="mx-auto max-w-4xl space-y-8">
              {filtered.map((cat) => (
                <motion.div key={cat.category} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
                    <span className="h-5 w-1.5 rounded-full bg-[#E63022]" />
                    {cat.category}
                  </h2>
                  <div className="space-y-2.5">
                    {cat.items.map((item) => (
                      <FAQItem key={item.q} question={item.q} answer={item.a} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <div className="mx-auto mt-14 max-w-3xl border-t border-white/8 pt-10 text-center">
          <p className="text-sm text-white/45">Still need help?</p>
          <Link href="/contact" className="btn-secondary mt-4 px-7 py-3.5">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
