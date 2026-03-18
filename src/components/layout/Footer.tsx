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
    <footer className="bg-black border-t border-white/10">
      {/* Editorial top strip */}
      <div className="border-b border-white/10 py-12 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="label mb-2">Stay in the loop</p>
            <h2 className="font-bebas text-4xl lg:text-5xl text-white tracking-wider">
              JOIN THE COMMUNITY
            </h2>
            <p className="text-white/40 text-sm mt-1 max-w-md">
              Get early access to drops, exclusive deals, and style tips.
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#FF3B30] text-white text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap group"
          >
            Shop Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-0 mb-5 group">
              <span className="font-bebas text-2xl tracking-widest text-white group-hover:text-[#FF3B30] transition-colors">LUXE</span>
              <span className="w-px h-5 bg-white/30 mx-2" />
              <span className="font-bebas text-2xl tracking-widest text-[#FF3B30]">STORE</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-[200px]">
              Premium products for those who demand quality, design, and excellence.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[#FF3B30] hover:text-[#FF3B30] transition-all duration-200"
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
                      className="text-sm text-white/55 hover:text-white transition-colors duration-150 font-medium"
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
      <div className="border-t border-white/8 px-6 lg:px-10 py-6">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/25 font-medium">© 2025 LuxeStore, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
              <Link key={t} href="#" className="text-[12px] text-white/25 hover:text-white/60 transition-colors font-medium">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
