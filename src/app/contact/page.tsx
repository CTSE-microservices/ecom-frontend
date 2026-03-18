'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const f = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const info = [
    { icon: Mail, label: 'Email', val: 'hello@luxestore.com' },
    { icon: Phone, label: 'Phone', val: '+1 (555) 123 4567' },
    { icon: MapPin, label: 'Office', val: '12 Fifth Avenue, New York, NY 10011' },
  ];

  return (
    <div className="page-shell">
      <section className="border-b border-white/8 bg-[#090909] py-12 lg:py-14">
        <div className="container-shell">
          <p className="label mb-2">Get In Touch</p>
          <h1 className="section-title text-[clamp(2.4rem,6vw,4rem)]">Contact Us</h1>
          <p className="mt-3 max-w-xl text-sm text-white/58 lg:text-base">
            We would love to hear from you. Send us a message and our team will respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="container-shell py-10 lg:py-14">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-8">
          <aside className="space-y-4">
            <h2 className="section-title text-[2rem]">Contact Information</h2>
            <div className="space-y-3">
              {info.map(({ icon: Icon, label, val }) => (
                <div key={label} className="rounded-2xl border border-white/12 bg-white/[0.02] p-4 transition-colors hover:border-white/22">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#FF3B30]/35 bg-[#FF3B30]/12">
                      <Icon className="h-4 w-4 text-[#FF3B30]" />
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/36">{label}</p>
                      <p className="mt-1 text-sm text-white/84">{val}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-[#FF3B30]/25 bg-gradient-to-br from-[#FF3B30]/12 to-transparent p-4">
              <p className="text-sm font-semibold text-white">Support Hours</p>
              <p className="mt-1 text-xs text-white/62">Mon to Fri: 9am to 6pm EST</p>
              <p className="text-xs text-white/62">Sat to Sun: 10am to 4pm EST</p>
            </div>
          </aside>

          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="panel flex min-h-[360px] flex-col items-center justify-center px-6 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="font-outfit text-3xl font-semibold text-white">Message Sent</h3>
                <p className="mt-3 text-sm text-white/58">Thanks for reaching out. We will reply as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-white/12 bg-white/[0.02] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:p-6">
                <div className="mb-5 border-b border-white/10 pb-4">
                  <h3 className="font-outfit text-xl font-semibold text-white">Send us a message</h3>
                  <p className="mt-1 text-sm text-white/52">We usually respond within one business day.</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/45">Name</label>
                    <input required value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="Your name" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/45">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => f('email', e.target.value)} placeholder="you@example.com" className="input-field" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/45">Subject</label>
                  <input required value={form.subject} onChange={(e) => f('subject', e.target.value)} placeholder="How can we help?" className="input-field" />
                </div>

                <div className="mt-4">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-white/45">Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => f('message', e.target.value)}
                    placeholder="Tell us more..."
                    rows={7}
                    className="w-full rounded-3xl border border-white/14 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/35 focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/25"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button type="submit" className="btn-primary px-8 py-3.5">
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
