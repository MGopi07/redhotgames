import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Widgets";

export const metadata: Metadata = {
  title: "Privacy Policy | RED HOT GAMES",
  description: "Learn how Red Hot Games collects, utilizes, and protects your corporate, user, and telemetry data in accordance with global B2B iGaming regulations.",
};

const SECTIONS = [
  { id: "introduction", label: "1. Introduction & Scope" },
  { id: "data-collection", label: "2. Information We Collect" },
  { id: "data-use", label: "3. How We Use Information" },
  { id: "data-sharing", label: "4. Sharing & Disclosure" },
  { id: "data-security", label: "5. Security & Protection" },
  { id: "compliance-rights", label: "6. Regulatory & Your Rights" },
  { id: "contact-us", label: "7. Contact & Support" },
];

export default function PrivacyPolicyPage() {
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
              Legal &amp; Compliance
            </span>
            <h1 className="font-bebas text-6xl md:text-8xl tracking-wide mb-6">
              Privacy <em className="text-brand-red not-italic">Policy</em>
            </h1>
            <p className="text-zinc-400 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
              We respect your confidentiality. This policy outlines how Red Hot Games manages, protects, and utilizes business data and system logs.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT FOR POLICY CONTENT */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* STICKY SIDEBAR (Left - Desktop Only) */}
          <aside className="lg:col-span-4 sticky top-[100px] hidden lg:block bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <h4 className="font-bebas text-2xl tracking-wider text-zinc-900 mb-6 pb-4 border-b border-zinc-100">
              Policy Sections
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
                Need a PDF copy or have questions? Get in touch with our legal department.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-red hover:text-red-700 transition-colors"
              >
                Contact Legal Desk <span>→</span>
              </Link>
            </div>
          </aside>

          {/* POLICY BODY (Right) */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Introduction */}
            <div id="introduction" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/5 text-brand-red flex items-center justify-center text-xl shrink-0">
                      <i className="ri-shield-user-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 1</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Introduction &amp; Scope</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      Red Hot Games (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a leading B2B supplier of iGaming platforms, sportsbooks, physical betting terminals (SSBT/FOBT), and regulatory compliance systems. We are fully licensed by national entities, including the <strong>Gauteng Gambling Board (GGB)</strong>.
                    </p>
                    <p>
                      This Privacy Policy explains how we process information gathered through our corporate portals, licensed software architectures, hardware telemetry servers, and support ticketing pipelines. This policy does not apply to consumer wager records unless held by our systems on behalf of certified operators under strict processing SLAs.
                    </p>
                    <p className="bg-zinc-50 border border-zinc-100 p-4 rounded-2xl text-xs font-medium text-zinc-600">
                      📅 Last Updated: May 12, 2026 | Effective Date: September 1, 2020
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Data Collection */}
            <div id="data-collection" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/5 text-brand-gold flex items-center justify-center text-xl shrink-0">
                      <i className="ri-database-2-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 2</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Information We Collect</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      As a B2B operator, we collect essential data to maintain service health, ensure national compliance, and protect system integrity. This falls into several categories:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5 mt-2">
                      <li>
                        <strong>Corporate &amp; Representative Information:</strong> Name, professional email address, telephone numbers, and betting licence credentials when partnering with us.
                      </li>
                      <li>
                        <strong>Hardware &amp; Terminal Telemetry:</strong> For physical SSBT cabinets deployed across retail venues, we record terminal uptime, bill validator status, peripheral error codes, and local thermal sensors to guarantee terminal performance.
                      </li>
                      <li>
                        <strong>Integrity and Transactional Logs:</strong> Safe, immutable recording of system handshakes, connection hashes, and regulatory audit packets ensuring bets are recorded transparently as required by national gaming acts.
                      </li>
                      <li>
                        <strong>Technical &amp; Portal Diagnostics:</strong> Web browser details, IP address logs, cookie analytics, and user navigation behavior on our marketing portals.
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* How We Use Information */}
            <div id="data-use" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/5 text-blue-600 flex items-center justify-center text-xl shrink-0">
                      <i className="ri-settings-4-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 3</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">How We Use Your Information</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      All collected information is strictly utilized under valid legal frameworks, including contract execution, regulatory compliance, and legitimate operational interests:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50">
                        <h5 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">⚙️ System Operations</h5>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          To provision cloud aggregator endpoints, dispatch remote software patches to retail cabinets, and offer 24/7 operations room helpdesk services.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50">
                        <h5 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">⚖️ Regulatory Verification</h5>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          To generate compliant transaction records, transmit legal betting logs to central state servers, and satisfy GGB and NRCS hardware audit directives.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50">
                        <h5 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">🛡️ Security &amp; Fraud Prevention</h5>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          To monitor server intrusion attempts, identify anomalous hardware manipulation, and counter unauthorized reverse-engineering.
                        </p>
                      </div>
                      <div className="p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50">
                        <h5 className="font-bold text-zinc-900 text-xs uppercase tracking-wider mb-2">📈 Analytics &amp; Optimization</h5>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          To run statistical models on game preference, system latencies, and terminal failures, ensuring our game engine remains highly optimized.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Sharing & Disclosure */}
            <div id="data-sharing" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/5 text-purple-600 flex items-center justify-center text-xl shrink-0">
                      <i className="ri-share-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 4</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Sharing &amp; Disclosure</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      Red Hot Games does not rent, sell, or trade personal or corporate data to marketing brokers. We disclose metrics strictly to trusted entities:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5 mt-2">
                      <li>
                        <strong>Regulatory &amp; State Authorities:</strong> National gambling boards (such as the GGB), compliance inspectors, tax authorities, and judicial bodies when required by law.
                      </li>
                      <li>
                        <strong>Manufacturing Partners:</strong> HC Terminals (our premier UK hardware alliance) only to coordinate physical cabinet serial allocations and hardware component warranties.
                      </li>
                      <li>
                        <strong>Independent Test Laboratories:</strong> Certified testing houses (such as GLI, BMM Testlabs) during software verification, compliance checks, or auditing routines.
                      </li>
                      <li>
                        <strong>Subprocessors:</strong> Secure cloud host providers, server logs storage nodes, and professional technical consultants acting under strict confidentiality contracts.
                      </li>
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Security & Protection */}
            <div id="data-security" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/5 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                      <i className="ri-lock-password-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 5</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Security &amp; Protection</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      Red Hot Games enforces comprehensive defense-in-depth measures to protect structural assets against theft, tampering, or loss:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                        <div className="text-2xl mb-2">🔒</div>
                        <h6 className="font-bold text-zinc-900 text-xs mb-1">AES-256 Encryption</h6>
                        <p className="text-[0.7rem] text-zinc-400 leading-relaxed">
                          Data is encrypted both in transit and at rest using industry-standard enterprise keys.
                        </p>
                      </div>
                      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                        <div className="text-2xl mb-2">👁️</div>
                        <h6 className="font-bold text-zinc-900 text-xs mb-1">Strict Access Control</h6>
                        <p className="text-[0.7rem] text-zinc-400 leading-relaxed">
                          Least-privilege operational model. Only vetted systems administrators hold production access.
                        </p>
                      </div>
                      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-center">
                        <div className="text-2xl mb-2">🛡️</div>
                        <h6 className="font-bold text-zinc-900 text-xs mb-1">Hardware Security</h6>
                        <p className="text-[0.7rem] text-zinc-400 leading-relaxed">
                          Cabinet hardware utilizes secure boot microcontrollers and physical intrusion alert circuits.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Regulatory Alignment & Rights */}
            <div id="compliance-rights" className="scroll-mt-24">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/5 text-teal-600 flex items-center justify-center text-xl shrink-0">
                      <i className="ri-government-line"></i>
                    </div>
                    <div>
                      <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block">Section 6</span>
                      <h3 className="text-xl md:text-2xl font-bold text-zinc-900">Regulatory Alignments &amp; Your Rights</h3>
                    </div>
                  </div>
                  <div className="prose prose-zinc max-w-none text-zinc-500 text-sm md:text-md leading-relaxed flex flex-col gap-4">
                    <p>
                      Red Hot Games operates globally and is committed to compliance with localized data protection laws:
                    </p>
                    <ul className="list-disc pl-5 flex flex-col gap-2.5">
                      <li>
                        <strong>Protection of Personal Information Act (POPIA):</strong> For operations inside South Africa, we store and process data in accordance with the 8 Conditions for Lawful Processing.
                      </li>
                      <li>
                        <strong>General Data Protection Regulation (GDPR):</strong> For our international B2B clients, we serve as a Data Processor, complying with strict storage limitations and cross-border transfer protections.
                      </li>
                    </ul>
                    <p className="mt-2">
                      Depending on your location, you hold legal rights regarding your information, including the right to <strong>Request Access</strong>, <strong>Rectification</strong>, <strong>Erasure / Deletion</strong>, or to <strong>Object</strong> to our processing pipelines. If you wish to execute any of these privileges, please reach out to our legal officer.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Contact & Support */}
            <div id="contact-us" className="scroll-mt-24">
              <Reveal>
                <div className="bg-[#0a0a0c] text-white rounded-3xl p-8 md:p-10 shadow-xl shadow-zinc-950/10 border border-zinc-900 relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-red/5 filter blur-[80px]" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center text-xl shrink-0">
                        <i className="ri-mail-send-line"></i>
                      </div>
                      <div>
                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider block">Section 7</span>
                        <h3 className="text-xl md:text-2xl font-bold text-white">Contact &amp; Support</h3>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      For inquiries related to our privacy framework, data transfers, GGB licensing specifications, or to file a formal request regarding your data, please contact our Compliance and Privacy Team:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-950/50 p-6 rounded-2xl border border-zinc-900">
                      <div>
                        <h5 className="text-xs font-bold uppercase text-brand-red tracking-widest mb-1">Corporate Office</h5>
                        <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
                          Red Hot Games Legal Department<br />
                          Johannesburg, Gauteng,<br />
                          South Africa
                        </p>
                      </div>
                      <div>
                        <h5 className="text-xs font-bold uppercase text-brand-red tracking-widest mb-1">Electronic Mail</h5>
                        <p className="text-xs text-zinc-300 font-semibold mb-2">
                          compliance@redhotgames.co.za
                        </p>
                        <h5 className="text-xs font-bold uppercase text-brand-red tracking-widest mb-1">Hotline Support</h5>
                        <p className="text-xs text-zinc-300 font-semibold">
                          +27 (0) 11 555 0192
                        </p>
                      </div>
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
