import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Widgets";

export const metadata: Metadata = {
  title: "Terms & Conditions | RED HOT GAMES",
  description: "Read the B2B licensing, software, hardware, and system SLA terms of service governing partnership agreements with Red Hot Games.",
};

const SECTIONS = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "licensing", label: "2. B2B Software Licensing" },
  { id: "hardware", label: "3. Hardware & Spares Supply" },
  { id: "uptime-sla", label: "4. Wagering SLA & Integrity" },
  { id: "limitation", label: "5. Limitation of Liability" },
  { id: "intellectual", label: "6. Intellectual Property" },
  { id: "governing-law", label: "7. Governing Law & Dispute" },
];

export default function TermsConditionsPage() {
  return (
    <div className="relative min-h-screen bg-zinc-50 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0a0a0c] text-white py-24 overflow-hidden">
        {/* Floating gradient decorative orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-red/10 filter blur-[120px] animate-orb-float" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-brand-gold/5 filter blur-[120px] animate-orb-float [animation-delay:-4s]" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <Reveal>
            <span className="bg-red-600/10 border border-red-500/10 px-4 py-1.5 rounded-full text-brand-red text-xs font-bold uppercase tracking-widest inline-block mb-6">
              Legal Framework
            </span>
            <h1 className="font-bebas text-6xl md:text-8xl tracking-wide mb-6">
              Terms &amp; <em className="text-brand-red not-italic">Conditions</em>
            </h1>
            <p className="text-zinc-400 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
              These terms govern the delivery of our physical terminals, compliance software licences, and sportsbook aggregation systems.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT FOR TERMS CONTENT */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* STICKY SIDEBAR (Left - Desktop Only) */}
          <aside className="lg:col-span-4 sticky top-[100px] hidden lg:block bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h4 className="font-bebas text-2xl tracking-wider text-zinc-900 mb-6 pb-4 border-b border-zinc-100">
              Terms Outline
            </h4>
            <nav className="flex flex-col gap-3">
              {SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="text-zinc-500 hover:text-brand-red font-semibold text-sm transition-all duration-300 hover:pl-2 flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-brand-red transition-all" />
                  {sec.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-zinc-100">
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Have specific SLA questions or require customized enterprise terms? Contact our accounts team.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-red-700 transition-colors"
              >
                Connect with Accounts <span>→</span>
              </Link>
            </div>
          </aside>

          {/* POLICY BODY (Right) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Acceptance */}
            <div id="acceptance" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/5 text-brand-red flex items-center justify-center text-xl shrink-0">
                      <i className="ri-hand-coin-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 1</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Acceptance of Terms</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      By accessing our platform, purchasing our hardware configurations, integrating our API endpoints, or signing a Service Level Agreement (SLA) with Red Hot Games, you represent that you act on behalf of a legally incorporated gaming operator and agree to be bound by these Terms and Conditions.
                    </p>
                    <p>
                      These terms constitute a legally binding agreement between your organization (&ldquo;the Operator&rdquo;) and Red Hot Games. If you do not agree with any of these stipulations, you are strictly prohibited from utilizing our software engines or deploying our physical betting terminals (SSBT/FOBT).
                    </p>
                    <p className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl text-xs font-medium text-zinc-600">
                      ⚠️ Legal Notice: Red Hot Games strictly operates under B2B principles. We supply licensed sportsbooks, casino platforms, and physical terminals solely to licensed B2C operations. Consumers under 18 or those outside legal gambling jurisdictions are prohibited from placing wagers.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* B2B Software Licensing */}
            <div id="licensing" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/5 text-brand-gold flex items-center justify-center text-xl shrink-0">
                      <i className="ri-code-box-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 2</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">B2B Software Licensing</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      Subject to full fee payment and valid regulatory certification, Red Hot Games grants the Operator a limited, non-exclusive, non-transferable, revocable licence to run our iGaming suite:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5 mt-2">
                      <li>
                        <strong>Operator Restrictions:</strong> The Operator shall not modify, decompile, reverse-engineer, translate, or attempt to extract source files from our compiled game aggregator engines or terminal operating software.
                      </li>
                      <li>
                        <strong>Regulatory Splicing:</strong> The Operator is solely responsible for obtaining and maintaining valid operating licences from their respective jurisdiction (e.g., Gauteng Gambling Board) before putting our software into live service.
                      </li>
                      <li>
                        <strong>Audit Access:</strong> The Operator agrees to allow Red Hot Games&rsquo; compliance team and national inspectors to perform security audits on cloud servers running our software components when directed by compliance rules.
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Hardware & Spares Supply */}
            <div id="hardware" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/5 text-blue-600 flex items-center justify-center text-xl shrink-0">
                      <i className="ri-computer-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 3</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Hardware &amp; Spares Supply</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      Our hardware solutions, including dual-screen betting cabinets, bill validators, and coin acceptors, are supplied in partnership with HC Terminals (UK):
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5">
                      <li>
                        <strong>Delivery Terms:</strong> Unless otherwise specified in the purchase order, hardware is shipped on EXW (Ex Works) or FOB (Free on Board) terms. The risk of damage or loss transfers to the Operator immediately upon leaving our warehouse loading docks.
                      </li>
                      <li>
                        <strong>Spares Integrity:</strong> We warrant that all replacement screens, thermal printers, and validators are certified and compliant with National Regulator for Compulsory Specifications (NRCS) safety protocols.
                      </li>
                      <li>
                        <strong>Warranty Periods:</strong> New physical equipment is covered by a standard 12-month manufacturer&rsquo;s warranty. Refurbished units are covered by a 3-month limited depot warranty, covering structural electronic failure but excluding damage from patron vandalism.
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Wagering SLA & Integrity */}
            <div id="uptime-sla" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/5 text-purple-600 flex items-center justify-center text-xl shrink-0">
                      <i className="ri-pulse-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 4</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Wagering SLA &amp; Integrity</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      Red Hot Games operates high-availability wagering recording servers and betting feeds:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50">
                        <h5 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">⚡ 99.9% Core Uptime</h5>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          We strive to maintain 99.9% uptime on our API integrations and central wagering recording feeds, excluding scheduled off-peak maintenance windows announced 48 hours in advance.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50">
                        <h5 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">🎯 Audit Feed Logging</h5>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          Every single transaction is logged immutably, ensuring full compliance with national security rules and preventing discrepancies during regulatory reviews.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Limitation of Liability */}
            <div id="limitation" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                      <i className="ri-error-warning-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 5</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Limitation of Liability</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      To the maximum extent permitted by applicable law, Red Hot Games, its directors, and partner entities (including HC Terminals) shall not be liable for:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5 mt-2">
                      <li>
                        Any loss of revenue, profit, gambling income, or corporate reputation resulting from system outages, incorrect sports odds feeds, or terminal hardware failure.
                      </li>
                      <li>
                        Fines, penalties, or compliance sanctions imposed on the Operator by national gambling boards (including the GGB) due to operator-side server misconfiguration, illegal location routing, or unverified staff practices.
                      </li>
                      <li>
                        Force majeure events, including grid load shedding, municipal telecommunication cable theft, or international cargo delays affecting shipping schedules.
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Intellectual Property */}
            <div id="intellectual" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/5 text-teal-600 flex items-center justify-center text-xl shrink-0">
                      <i className="ri-creative-commons-by-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 6</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Intellectual Property Rights</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      The layout, graphic engines, custom casino games, sportsbook integration layers, mathematical models, physical cabinet chassis drawings, and corporate assets remain the absolute property of Red Hot Games or its respective licensors:
                    </p>
                    <p>
                      Nothing in these terms or subsequent B2B supply agreements transfers ownership of any patent, source code, trademark, or copyright. All promotional usage of &ldquo;RED HOT GAMES&rdquo; logos or game thumbnails by the Operator must follow our official brand guidelines.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Governing Law & Dispute Resolution */}
            <div id="governing-law" className="scroll-mt-24">
              <Reveal>
                <div className="bg-[#0a0a0c] text-white rounded-3xl p-8 md:p-10 shadow-xl shadow-zinc-950/10 border border-zinc-900 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-red/5 filter blur-[80px]" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center text-xl shrink-0">
                        <i className="ri-scales-line"></i>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block">Section 7</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white">Governing Law &amp; Dispute Resolution</h3>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      These Terms &amp; Conditions and any operational agreement shall be governed by, and construed in accordance with, the laws of the Republic of South Africa.
                    </p>
                    
                    <div className="bg-zinc-950/50 p-6 rounded-2xl border border-zinc-900 flex flex-col gap-3">
                      <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
                        🏛️ <strong>Jurisdiction:</strong> Any dispute arising from our services, hardware orders, or compliance engines shall be referred to and final settled under the rules of the Arbitration Foundation of Southern Africa (AFSA), with arbitration taking place in Johannesburg, Gauteng.
                      </p>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Operators agree to first seek amicable resolution through designated corporate representatives for at least 30 days before initiating arbitration proceedings.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
