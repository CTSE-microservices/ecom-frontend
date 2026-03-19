'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'signup';
  onSuccess?: () => void;
}

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Min 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-black uppercase tracking-[0.14em] text-white/35">{label}</label>
      {children}
      {error && <p className="text-[11px] font-medium text-[#FF3B30]">{error}</p>}
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setError('');
      await login(data.email, data.password);
      onSuccess();
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Email" error={errors.email?.message}>
        <input {...register('email')} type="email" placeholder="you@example.com" className="input-field" />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <div className="relative">
          <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-field pr-11" />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/70"
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </Field>
      {error && (
        <div className="rounded-2xl border border-[#FF3B30]/20 bg-[#FF3B30]/8 px-4 py-3 text-xs font-medium text-[#FF3B30]/80">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center py-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Sign In
      </button>
    </form>
  );
}

function SignupForm({ onSuccess }: { onSuccess: () => void }) {
  const { signup } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      setError('');
      await signup(data.name, data.email, data.password);
      onSuccess();
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Full Name" error={errors.name?.message}>
        <input {...register('name')} placeholder="John Doe" className="input-field" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input {...register('email')} type="email" placeholder="you@example.com" className="input-field" />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <div className="relative">
          <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-field pr-11" />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/70"
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </Field>
      <Field label="Confirm Password" error={errors.confirmPassword?.message}>
        <input {...register('confirmPassword')} type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-field" />
      </Field>
      {error && (
        <div className="rounded-2xl border border-[#FF3B30]/20 bg-[#FF3B30]/8 px-4 py-3 text-xs font-medium text-[#FF3B30]/80">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center py-4 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Create Account
      </button>
    </form>
  );
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login', onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);

  React.useEffect(() => { setTab(initialTab); }, [initialTab]);

  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-[430px] overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0b] shadow-[0_40px_120px_rgba(0,0,0,0.9)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Brand header */}
              <div className="relative overflow-hidden px-7 pt-7 pb-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,59,48,0.14),transparent_58%)]" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF3B30]/40 to-transparent" />

                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    {/* Wordmark */}
                    <div className="mb-5 flex items-center gap-2">
                      <span className="font-bebas text-base tracking-widest text-white">LUXE</span>
                      <span className="h-3.5 w-px bg-white/20" />
                      <span className="font-bebas text-base tracking-widest text-[#FF3B30]">STORE</span>
                    </div>

                    <h2 className="font-outfit text-[1.7rem] font-bold leading-tight tracking-tight text-white">
                      {tab === 'login' ? 'Welcome back' : 'Join LuxeStore'}
                    </h2>
                    <p className="mt-1.5 text-sm text-white/42">
                      {tab === 'login'
                        ? 'Sign in to your account to continue'
                        : 'Create your account in seconds'}
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="ml-3 shrink-0 rounded-full p-1.5 text-white/30 transition-all hover:bg-white/8 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Tab toggle */}
                <div className="mt-6 flex gap-1 rounded-2xl border border-white/8 bg-white/[0.03] p-1">
                  {(['login', 'signup'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      className={`flex-1 rounded-xl py-2.5 text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-200 ${
                        tab === t
                          ? 'bg-[#FF3B30] text-white shadow-[0_4px_14px_rgba(255,59,48,0.28)]'
                          : 'text-white/38 hover:text-white/65'
                      }`}
                    >
                      {t === 'login' ? 'Sign In' : 'Sign Up'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.06] mx-7" />

              {/* Form body */}
              <div className="px-7 pb-7 pt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, x: tab === 'signup' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    {tab === 'login' ? (
                      <LoginForm onSuccess={handleSuccess} />
                    ) : (
                      <SignupForm onSuccess={handleSuccess} />
                    )}
                  </motion.div>
                </AnimatePresence>

                <p className="mt-5 text-center text-xs text-white/32">
                  {tab === 'login' ? (
                    <>
                      Don&apos;t have an account?{' '}
                      <button
                        onClick={() => setTab('signup')}
                        className="font-semibold text-[#FF3B30] transition-colors hover:text-[#ff6b61]"
                      >
                        Sign up free
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        onClick={() => setTab('login')}
                        className="font-semibold text-[#FF3B30] transition-colors hover:text-[#ff6b61]"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
