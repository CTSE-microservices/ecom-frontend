import { Metadata } from 'next';
import Image from 'next/image';
import { Users, Award, Globe, Heart } from 'lucide-react';

export const metadata: Metadata = { title: 'About Us' };

const team = [
  { name: 'Alexandra Chen', role: 'Co-Founder & CEO', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80' },
  { name: 'Marcus Reid', role: 'Co-Founder & CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Sophia Park', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80' },
  { name: 'Daniel Osei', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' },
];

const values = [
  { icon: Award, title: 'Quality First', desc: 'Every product is hand-picked and tested to meet our uncompromising standards.' },
  { icon: Heart, title: 'Customer Love', desc: 'We obsess over the customer experience so you love every interaction.' },
  { icon: Globe, title: 'Sustainability', desc: 'We partner with eco-conscious suppliers and aim for carbon-neutral operations.' },
  { icon: Users, title: 'Community', desc: 'We\'re building a global community of people who value design and quality.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[340px] flex items-center">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" alt="About us" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#080810]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Our Story</span>
          <h1 className="text-4xl sm:text-6xl font-black text-white font-outfit mt-2 mb-4">About LuxeStore</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-lg">Curating the world&apos;s finest products for the discerning lifestyle since 2020.</p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-xl text-slate-300 leading-relaxed mb-6">
          LuxeStore was born from a simple belief: <span className="text-amber-400 font-semibold">premium quality should be accessible</span>. We partner directly with top brands and artisans worldwide to bring you products that last, delight, and inspire.
        </p>
        <p className="text-slate-500 leading-relaxed">
          Founded in 2020, we started as a tiny team with a big dream. Today we serve over 50,000 customers in 30+ countries, with a curated catalog of 500+ products across electronics, clothing, home, beauty, and sports.
        </p>
      </section>

      {/* Values */}
      <section className="bg-[#0a0a12] py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">What Drives Us</span>
            <h2 className="text-3xl font-black text-white font-outfit mt-2">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-2xl glass text-center hover:border-amber-400/20 transition-all border border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-base font-bold text-white font-outfit mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">The People</span>
          <h2 className="text-3xl font-black text-white font-outfit mt-2">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="group text-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden mx-auto mb-4 border-2 border-white/10 group-hover:border-amber-400/40 transition-all">
                <Image src={member.img} alt={member.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-sm font-bold text-white">{member.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
