"use client";

import { Reveal, Counter } from "@/components/Widgets";

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative bg-[#0a0a0c] text-white py-24 overflow-hidden">
        {/* Glowing floating orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-red/10 filter blur-[120px] animate-orb-float" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-brand-gold/5 filter blur-[120px] animate-orb-float [animation-delay:-4s]" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <Reveal>
            <span className="bg-red-600/10 border border-red-500/10 px-4 py-1.5 rounded-full text-brand-red text-xs font-bold uppercase tracking-widest inline-block mb-6">
              Our Legacy
            </span>
            <h1 className="font-bebas text-6xl md:text-8xl tracking-wide mb-6">
              Igniting B2B <em className="text-brand-red not-italic">iGaming</em>
            </h1>
            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We specialize in state-of-the-art gaming cabinet hardware, high-volume compliance software, and comprehensive support ecosystems for operators worldwide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Strategic Evolution & Compliance */}
      <section className="py-24 bg-white text-zinc-900">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            {/* Left: Incorporation & Partnerships (Cards) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Reveal>
                <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:border-red-500/10 flex flex-col items-start gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/5 text-brand-red flex items-center justify-center text-2xl">
                    🏛️
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">National Accreditation</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Red Hot Games was incorporated in <strong>2019</strong> and awarded a national gaming licence by the prestigious <strong>Gauteng Gambling Board</strong> in September <strong>2020</strong>, ensuring full regulatory alignment and secure betting architectures.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-500 hover:border-amber-500/10 flex flex-col items-start gap-4 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/5 text-brand-orange flex items-center justify-center text-2xl">
                    🤝
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Global Alliance</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    RHG is strategically partnered with <strong>HC Terminals</strong>, a leading UK-based company specializing in both used and new gaming hardware. This synergy provides RHG with immediate access to a massive inventory of premium gaming parts and state-of-the-art terminal components.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right: Strategic Evolution & BBBEE Level 1 */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <Reveal>
                <span className="text-brand-red text-xs font-extrabold uppercase tracking-widest block mb-4">
                  Market Leadership
                </span>
                <h2 className="font-bebas text-5xl md:text-6xl text-zinc-950 mb-6 leading-none">
                  Driven by the Rapidly Rising <em className="text-brand-red not-italic">Sports Betting Era</em>
                </h2>

                <div className="flex flex-col gap-5 text-zinc-600 text-[0.95rem] leading-relaxed">
                  <p>
                    Our journey initiated with a goal to supply top-tier gambling hardware to the Limited Pay-out Machines (LPM) market via licensed Route Operators. Additionally, we set out to empower operator ecosystems, Casinos, Bingos, and Betting companies across the African continent.
                  </p>
                  <p>
                    Fuelled by the explosive growth of the Sports Betting industry, Red Hot Games dynamically narrowed its focus. Today, we supply premium, fully integrated <strong>Self Service Betting Terminals (SSBT)</strong> and <strong>Fixed Odds Betting Terminals (FOBT)</strong> alongside refurbished units and vital replacement parts.
                  </p>
                  {/* <p>
                    We persistently strive to live up to our name, delivering the absolute hottest and most reliable games to physical and digital venues in South Africa and growing gaming jurisdictions throughout the continent.
                  </p> */}
                </div>

                {/* B-BBEE Level 1 Contributor Highlight */}
                <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6 mt-8">
                  <div className="w-24 h-24 shrink-0 flex items-center justify-center bg-white rounded-2xl border border-zinc-100 p-3 shadow-sm">
                    <img
                      src="/assets/img/B-BBEE-stamp.png"
                      alt="B-BBEE Level 1 Contributor Badge"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-zinc-900 text-[1.05rem] mb-1">Empowering South Africa</h4>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      Red Hot Games is proud to be certified as a <strong>B-BBEE Level 1 Contributor</strong>. We are committed to inclusive economic transformation, local skill acquisition, and sustainable black economic empowerment principles across all operations.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Global Inventory & Delivery (Bento layout) */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red text-xs font-extrabold uppercase tracking-widest block mb-4">
              Logistics & Infrastructure
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl text-zinc-950 mb-6">
              Our Global <em className="text-brand-red not-italic">Inventory & Delivery</em>
            </h2>
            <p className="text-zinc-500 text-md leading-relaxed">
              Backed by heavy UK partnerships and massive localized stock, we ensure rapid deployments and robust support contracts for operators worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Card 1: Terminals */}
            <Reveal>
              <div className="bg-white border border-zinc-100 rounded-3xl p-8 hover:shadow-xl hover:border-red-500/10 transition-all duration-500 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
                    <img src="/assets/img/icon-1.png" alt="Terminals Inventory" className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">Terminals</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    We currently maintain a physical inventory of over 5,000 used terminals in our South African and partner warehouses, offering single and twin screen configurations to maximize retail performance.
                  </p>
                </div>
                <div className="bg-red-50 text-brand-red font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-2 self-start">
                  💻 5,000+ Units Ready
                </div>
              </div>
            </Reveal>

            {/* Bento Card 2: Spare Parts */}
            <Reveal>
              <div className="bg-white border border-zinc-100 rounded-3xl p-8 hover:shadow-xl hover:border-red-500/10 transition-all duration-500 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
                    <img src="/assets/img/icon-2.png" alt="Spare Parts Stock" className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">Spare Parts</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    We stock substantial quantities of brand-new and certified used replacement components, including touch monitors of various aspect ratios, ticket printers, bill validators, and coin acceptors.
                  </p>
                </div>
                <div className="bg-amber-50 text-brand-orange font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-2 self-start">
                  ⚙️ Comprehensive Spares
                </div>
              </div>
            </Reveal>

            {/* Bento Card 3: Delivery */}
            <Reveal>
              <div className="bg-white border border-zinc-100 rounded-3xl p-8 hover:shadow-xl hover:border-red-500/10 transition-all duration-500 h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
                    <img src="/assets/img/icon-3.png" alt="Worldwide Logistics" className="w-8 h-8 object-contain" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">Worldwide Delivery</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    With scheduled maritime and air cargo shipments operating globally, no order is too small and no distance is too far. Our logistics framework ensures direct-to-door retail cabinet delivery.
                  </p>
                </div>
                <div className="bg-blue-50 text-blue-700 font-bold text-xs py-2.5 px-4 rounded-xl inline-flex items-center gap-2 self-start">
                  🌐 Global Shipping
                </div>
              </div>
            </Reveal>
          </div>

          {/* Core metrics bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-[#0a0a0c] text-white rounded-3xl p-8 md:p-12 mt-12 shadow-xl shadow-zinc-950/10">
            <div className="text-center">
              <Counter target={5000} suffix="+" />
              <div className="text-zinc-500 text-[0.8rem] font-bold uppercase tracking-widest mt-1">Terminals Stocked</div>
            </div>
            <div className="text-center">
              <div className="font-bebas text-5xl md:text-6xl text-white">Level 1</div>
              <div className="text-zinc-500 text-[0.8rem] font-bold uppercase tracking-widest mt-1">B-BBEE Rating</div>
            </div>
            <div className="text-center">
              <div className="font-bebas text-5xl md:text-6xl text-white">2019</div>
              <div className="text-zinc-500 text-[0.8rem] font-bold uppercase tracking-widest mt-1">Incorporated</div>
            </div>
            <div className="text-center">
              <div className="font-bebas text-5xl md:text-6xl text-white">100%</div>
              <div className="text-zinc-500 text-[0.8rem] font-bold uppercase tracking-widest mt-1">NRCS & GGB Compliant</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
