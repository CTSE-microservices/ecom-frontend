import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react';

const links = {
  Shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Electronics', href: '/products?category=electronics' },
    { label: 'Clothing', href: '/products?category=clothing' },
    { label: 'Home & Living', href: '/products?category=home' },
    { label: 'Sports', href: '/products?category=sports' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/about' },
    { label: 'Press', href: '/about' },
  ],
  Support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping Info', href: '/faq' },
    { label: 'Returns', href: '/faq' },
    { label: 'Track Order', href: '/faq' },
  ],
};

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter / X' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      {/* Editorial top strip */}
      <div className="border-b border-white/10 px-6 py-14 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="label mb-2">Stay in the loop</p>
            <h2 className="section-title text-4xl lg:text-5xl">
              JOIN THE COMMUNITY
            </h2>
            <p className="mt-2 max-w-md text-sm text-white/45">
              Get early access to drops, exclusive deals, and style tips.
            </p>
          </div>
          <Link
            href="/products"
            className="btn-primary group"
          >
            Shop Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-0 mb-5 group">
              <span className="font-bebas text-2xl tracking-widest text-white group-hover:text-[#FF3B30] transition-colors">LUXE</span>
              <span className="w-px h-5 bg-white/30 mx-2" />
              <span className="font-bebas text-2xl tracking-widest text-[#FF3B30]">STORE</span>
            </Link>
            <p className="mb-6 max-w-[220px] text-sm leading-relaxed text-white/40">
              Premium products for those who demand quality, design, and excellence.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-200 hover:border-[#FF3B30] hover:text-[#FF3B30]"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-5">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-white/55 transition-colors duration-150 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 px-6 py-6 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-[12px] text-white/25 font-medium">© 2025 LuxeStore, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
              <Link key={t} href="#" className="text-[12px] font-medium text-white/25 transition-colors hover:text-white/60">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
