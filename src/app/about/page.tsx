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
  { icon: Users, title: 'Community', desc: 'We are building a global community of people who value design and quality.' },
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <section className="relative min-h-[400px] overflow-hidden border-b border-white/8">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" alt="About us" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/76 via-black/78 to-black" />
        </div>
        <div className="container-shell relative z-10 flex min-h-[400px] items-end pb-14">
          <div className="max-w-2xl">
            <p className="label mb-3">Our Story</p>
            <h1 className="section-title text-[clamp(2.8rem,7vw,5.2rem)] [text-shadow:0_8px_30px_rgba(0,0,0,0.45)]">Design-First Commerce</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60">
              LuxeStore curates premium essentials for people who care how products look, feel, and perform in real life.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-white/70 lg:text-xl">
            LuxeStore was built on one principle: premium quality should feel accessible, not intimidating.
            We work directly with trusted makers to bring products that are built to last and designed to elevate everyday life.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/45 lg:text-base">
            Since 2020, we have grown from a tiny studio team into a global brand serving 50,000+ customers across 30+ countries, while keeping our curation standards obsessively high.
          </p>
        </div>
      </section>

      <section className="border-y border-white/8 bg-[#090909] py-18 lg:py-22">
        <div className="container-shell">
          <div className="mb-10 text-center lg:mb-12">
            <p className="label mb-2">What Drives Us</p>
            <h2 className="section-title text-4xl lg:text-5xl">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="panel p-6 text-center transition-colors hover:border-white/22">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#FF3B30]/30 bg-[#FF3B30]/10">
                  <Icon className="h-5 w-5 text-[#FF3B30]" />
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell border-b border-white/8 py-16 lg:py-24">
        <div className="mb-10 text-center lg:mb-12">
          <p className="label mb-2">The People</p>
          <h2 className="section-title text-4xl lg:text-5xl">Meet The Team</h2>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {team.map((member) => (
            <div key={member.name} className="group text-center">
              <div className="relative mx-auto mb-4 h-36 w-36 overflow-hidden rounded-2xl border border-white/12 sm:h-40 sm:w-40">
                <Image src={member.img} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-sm font-bold text-white">{member.name}</h3>
              <p className="mt-1 min-h-[28px] text-xs text-white/45">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
