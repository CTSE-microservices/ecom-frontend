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
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Email</label>
        <input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className="input-field rounded-2xl"
        />
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            className="input-field rounded-2xl pr-10"
          />
          <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70">
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
      </div>
      {error && <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full justify-center rounded-2xl py-3.5 text-xs disabled:opacity-70"
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
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Full Name</label>
        <input {...register('name')} placeholder="John Doe" className="input-field rounded-2xl" />
        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Email</label>
        <input {...register('email')} type="email" placeholder="you@example.com" className="input-field rounded-2xl" />
        {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Password</label>
        <div className="relative">
          <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-field rounded-2xl pr-10" />
          <button type="button" onClick={() => setShowPass(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70">
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-white/45">Confirm Password</label>
        <input {...register('confirmPassword')} type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-field rounded-2xl" />
        {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">{errors.confirmPassword.message}</p>}
      </div>
      {error && <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center rounded-2xl py-3.5 text-xs disabled:opacity-70">
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Create Account
      </button>
    </form>
  );
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login', onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);

  // Sync tab when initialTab changes
  React.useEffect(() => { setTab(initialTab); }, [initialTab]);

  const handleSuccess = () => {
    onClose();
    onSuccess?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/12 bg-[#0e0e0f] shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 pb-0">
                <div>
                  <h2 className="section-title text-3xl text-white">
                    {tab === 'login' ? 'Welcome back' : 'Create account'}
                  </h2>
                  <p className="mt-1 text-sm text-white/45">
                    {tab === 'login' ? 'Sign in to your account' : 'Join LuxeStore today'}
                  </p>
                </div>
                <button onClick={onClose} className="rounded-full p-2 text-white/45 transition-colors hover:bg-white/8 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="mx-6 mt-6 flex rounded-full border border-white/10 bg-white/5 p-1">
                {(['login', 'signup'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 rounded-full py-2.5 text-xs font-black uppercase tracking-[0.12em] transition-all ${
                      tab === t
                        ? 'bg-[#FF3B30] text-white'
                        : 'text-white/45 hover:text-white'
                    }`}
                  >
                    {t === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              {/* Form */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                  >
                    {tab === 'login' ? (
                      <LoginForm onSuccess={handleSuccess} />
                    ) : (
                      <SignupForm onSuccess={handleSuccess} />
                    )}
                  </motion.div>
                </AnimatePresence>

                <p className="mt-4 text-center text-xs text-white/40">
                  {tab === 'login' ? (
                    <>Don&apos;t have an account?{' '}
                      <button onClick={() => setTab('signup')} className="font-medium text-[#FF3B30] hover:text-[#ff796f]">Sign up</button>
                    </>
                  ) : (
                    <>Already have an account?{' '}
                      <button onClick={() => setTab('login')} className="font-medium text-[#FF3B30] hover:text-[#ff796f]">Sign in</button>
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
