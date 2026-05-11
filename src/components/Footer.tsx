import Link from "next/link";

export default function Footer() {
  return (
    <footer id="company" className="bg-[#0a0a0c] text-white border-t border-zinc-900 py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-zinc-900">
          {/* Brand block */}
          <div className="flex flex-col gap-6">
            <h3 className="font-bebas text-4xl tracking-wider">
              <span className="text-brand-red">RED</span> HOT GAMES
            </h3>
            <p className="text-zinc-500 text-[0.95rem] leading-relaxed max-w-sm">
              Igniting the iGaming industry for over 15 years. Our technology powers the world's most successful brands.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-all duration-300"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-all duration-300"
                aria-label="YouTube"
              >
                <i className="ri-youtube-fill text-lg"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-lg"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-brand-red hover:bg-brand-red/10 transition-all duration-300"
                aria-label="Twitter"
              >
                <i className="ri-twitter-x-line text-lg"></i>
              </a>
            </div>
          </div>

          {/* Column 1: Products */}
          <div>
            <h4 className="font-bebas text-xl tracking-wider text-white mb-6">Products</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Game Aggregator
                </a>
              </li>
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Sportsbook
                </a>
              </li>
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Casino Platform
                </a>
              </li>
              <li>
                <a href="/#partnership" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Affiliate Platform
                </a>
              </li>
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Jackpot Aggregator
                </a>
              </li>
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Prediction Markets
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="font-bebas text-xl tracking-wider text-white mb-6">Solutions</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Turnkey Casino
                </a>
              </li>
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Crypto Casino
                </a>
              </li>
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Turnkey Sportsbook
                </a>
              </li>
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Sportsbook Integration
                </a>
              </li>
              <li>
                <a href="/#modules" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Casino Games API
                </a>
              </li>
              <li>
                <a href="/#crm" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Managed Services
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-bebas text-xl tracking-wider text-white mb-6">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="/#news" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Knowledge Base
                </a>
              </li>
              <li>
                <a href="/#news" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  iGaming Reports
                </a>
              </li>
              <li>
                <a href="/#playbex" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Compliance
                </a>
              </li>
              <li>
                <a href="/#playbex" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Glossary
                </a>
              </li>
              <li>
                <a href="/#news" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Events
                </a>
              </li>
              <li>
                <a href="/#cashier" className="text-zinc-500 hover:text-brand-red text-[0.92rem] transition-colors duration-300">
                  Cost Calculator
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 text-zinc-500 text-[0.85rem]">
          <div>©2026 Red Hot Games. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-brand-red transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-red transition-colors">
              Legal Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
