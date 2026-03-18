'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const f = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400/50 transition-all text-sm";

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
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 text-center bg-[#0a0a12] border-b border-white/5">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Get in Touch</span>
        <h1 className="text-4xl font-black text-white font-outfit mt-2 mb-3">Contact Us</h1>
        <p className="text-slate-400 max-w-md mx-auto">We&apos;d love to hear from you. Send us a message and we&apos;ll respond within 24 hours.</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-white font-outfit">Contact Information</h2>
            {info.map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
                  <p className="text-sm text-white mt-0.5">{val}</p>
                </div>
              </div>
            ))}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 mt-6">
              <p className="text-sm font-semibold text-white mb-1">Support Hours</p>
              <p className="text-xs text-slate-400">Mon – Fri: 9am – 6pm EST</p>
              <p className="text-xs text-slate-400">Sat – Sun: 10am – 4pm EST</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-4 shadow-2xl shadow-emerald-500/30">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white font-outfit mb-2">Message sent!</h3>
                <p className="text-slate-400 text-sm">Thanks for reaching out. We&apos;ll reply within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Name</label>
                    <input required value={form.name} onChange={(e) => f('name', e.target.value)} placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => f('email', e.target.value)} placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Subject</label>
                  <input required value={form.subject} onChange={(e) => f('subject', e.target.value)} placeholder="How can we help?" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5">Message</label>
                  <textarea required value={form.message} onChange={(e) => f('message', e.target.value)} placeholder="Tell us more…" rows={6} className={`${inputClass} resize-none`} />
                </div>
                <button type="submit" className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-black font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-amber-500/20">
                  <Send className="w-4 h-4" />Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
