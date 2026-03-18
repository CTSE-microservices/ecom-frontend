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
    <div className="page-shell pt-[68px]">
      <section className="border-b border-white/8 bg-[#090909] py-16 text-center">
        <div className="container-shell">
          <p className="label mb-2">Get In Touch</p>
          <h1 className="section-title text-[clamp(2.5rem,6vw,4rem)]">Contact Us</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/50 lg:text-base">
            Have a question or need support? Send a message and our team will get back within 24 hours.
          </p>
        </div>
      </section>

      <div className="container-shell py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="space-y-5 lg:col-span-2">
            <h2 className="section-title text-3xl">Contact Information</h2>
            {info.map(({ icon: Icon, label, val }) => (
              <div key={label} className="panel flex items-start gap-3 p-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#FF3B30]/30 bg-[#FF3B30]/10">
                  <Icon className="h-5 w-5 text-[#FF3B30]" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/35">{label}</p>
                  <p className="mt-1 text-sm text-white/80">{val}</p>
                </div>
              </div>
            ))}

            <div className="panel border-[#FF3B30]/25 bg-[#FF3B30]/8 p-5">
              <p className="text-sm font-bold text-white">Support Hours</p>
              <p className="mt-1 text-xs text-white/55">Mon to Fri: 9am to 6pm EST</p>
              <p className="text-xs text-white/55">Sat to Sun: 10am to 4pm EST</p>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="panel flex min-h-[340px] flex-col items-center justify-center px-6 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="section-title text-3xl">Message Sent</h3>
                <p className="mt-3 text-sm text-white/55">Thanks for reaching out. We will reply as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="panel space-y-4 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/45">Name</label>
                    <input required value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="Your name" className="input-field" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-white/45">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => f('email', e.target.value)} placeholder="you@example.com" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/45">Subject</label>
                  <input required value={form.subject} onChange={(e) => f('subject', e.target.value)} placeholder="How can we help?" className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-white/45">Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => f('message', e.target.value)}
                    placeholder="Tell us more..."
                    rows={6}
                    className="w-full rounded-3xl border border-white/14 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/34 focus:border-white/35 focus:outline-none"
                  />
                </div>
                <button type="submit" className="btn-primary px-8 py-3.5">
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
