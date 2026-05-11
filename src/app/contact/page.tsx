"use client";

import { useState } from "react";
import { Reveal } from "@/components/Widgets";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    model: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission delay
    setTimeout(() => {
      setLoading(false);
      setForm({
        name: "",
        email: "",
        company: "",
        phone: "",
        model: "",
        interest: "",
        message: "",
      });
      setShowToast(true);

      // Hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="relative bg-zinc-50 min-h-screen py-16">
      {/* 1. HERO HEADER */}
      <section className="py-16 text-center max-w-4xl mx-auto px-6">
        <Reveal>
          <span className="bg-red-600/10 border border-red-500/10 px-4 py-1.5 rounded-full text-brand-red text-xs font-bold uppercase tracking-widest inline-block mb-4">
            Partner With Us
          </span>
          <h1 className="font-bebas text-5xl md:text-7xl text-zinc-950 mb-4 leading-none">
            Launch Your Brand <em className="text-brand-red not-italic">With Us</em>
          </h1>
          <p className="text-zinc-500 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
            Have inquiries about our White Label Software Solutions, terminal systems, or hardware contracts? Get in touch with our operations team today.
          </p>
        </Reveal>
      </section>

      {/* 2. FORM & INFO CARDS */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Block: Corporate Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal>
              <span className="text-brand-red text-xs font-extrabold uppercase tracking-widest block mb-1">
                Corporate Relations
              </span>
              <h2 className="font-bebas text-4xl text-zinc-950 mb-6">Get in Touch</h2>

              {/* Address */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-brand-red flex items-center justify-center text-xl shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm mb-1">Headquarters</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Red Hot Games SA, JSE Building Complex, Sandton, Johannesburg, 2196, South Africa
                  </p>
                </div>
              </div>

              {/* Emails */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-orange flex items-center justify-center text-xl shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm mb-1">Email Inquiries</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-1">
                    <strong>General:</strong> <a href="mailto:info@redhotgames.co.za" className="text-brand-red font-medium">info@redhotgames.co.za</a>
                  </p>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-1">
                    <strong>Sales:</strong> <a href="mailto:sales@redhotgames.co.za" className="text-brand-red font-medium">sales@redhotgames.co.za</a>
                  </p>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    <strong>Support:</strong> <a href="mailto:support@redhotgames.co.za" className="text-brand-red font-medium">support@redhotgames.co.za</a>
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl shrink-0">
                  🕒
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm mb-1">Business Hours</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-1">
                    Monday – Friday: 08:30 AM – 05:00 PM (GMT+2)
                  </p>
                  <p className="text-zinc-500 text-xs leading-relaxed">
                    Saturday – Sunday: Closed (Emergency technical lines active 24/7)
                  </p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm mt-2">
                <h4 className="font-bold text-zinc-900 text-sm mb-4">Follow Our Channels</h4>
                <div className="flex gap-2.5">
                  <a href="#" className="w-10 h-10 border border-zinc-100 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-600 hover:text-white hover:bg-brand-red transition-all duration-300">
                    <i className="ri-linkedin-fill" />
                  </a>
                  <a href="#" className="w-10 h-10 border border-zinc-100 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-600 hover:text-white hover:bg-brand-red transition-all duration-300">
                    <i className="ri-facebook-fill" />
                  </a>
                  <a href="#" className="w-10 h-10 border border-zinc-100 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-600 hover:text-white hover:bg-brand-red transition-all duration-300">
                    <i className="ri-youtube-fill" />
                  </a>
                  <a href="#" className="w-10 h-10 border border-zinc-100 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-600 hover:text-white hover:bg-brand-red transition-all duration-300">
                    <i className="ri-instagram-line" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Block: Stateful Contact Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Send Us a Message</h3>
                <p className="text-zinc-500 text-xs mb-8">
                  Fill out the brief inquiry profile below and a B2B product manager will respond to you within one business day.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Malope"
                        required
                        className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Work Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. contact@yourbrand.com"
                        required
                        className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="company" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Phoenix Play"
                        required
                        className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. +27 11 000 0000"
                        required
                        className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="model" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Business Model
                      </label>
                      <select
                        id="model"
                        value={form.model}
                        onChange={(e) => setForm({ ...form, model: e.target.value })}
                        required
                        className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                      >
                        <option value="" disabled>Select Model</option>
                        <option value="Licensed Operator">Licensed Operator</option>
                        <option value="Retail Betting Lounge">Retail Betting Lounge</option>
                        <option value="Casino Floor Owner">Casino Floor Owner</option>
                        <option value="Affiliate Network">Affiliate / Agent Network</option>
                        <option value="Startup">Startup / Tech Entrepreneur</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="interest" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Primary Interest
                      </label>
                      <select
                        id="interest"
                        value={form.interest}
                        onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        required
                        className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                      >
                        <option value="" disabled>Select Product</option>
                        <option value="Wagering Recording">Wagering Recording (Playbex LOC)</option>
                        <option value="Full White Label">Full White Label Platform</option>
                        <option value="Sportsbook Module">B2B Sportsbook Module</option>
                        <option value="SSBT Cabinet Hardware">SSBT Terminal Hardware</option>
                        <option value="FOBT Cabinet Hardware">FOBT Terminal Hardware</option>
                        <option value="Replacements Spares">Replacements & Spares Contracts</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                      Detailed Inquiry Requirements
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly summarize your regulatory jurisdiction, estimated rollout size..."
                      required
                      rows={4}
                      className="border border-zinc-100 bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:border-brand-red focus:outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-zinc-950 hover:bg-brand-red text-white font-bold py-4.5 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-800 disabled:cursor-not-allowed mt-4"
                  >
                    <span>{loading ? "Processing Inquiry..." : "Request Consultation"}</span>
                    {!loading && <i className="ri-arrow-right-line" />}
                    {loading && <i className="ri-loader-4-line animate-spin" />}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. COMPLIANCE BARS */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal className="h-full">
            <div className="bg-white border border-zinc-100 border-l-4 border-brand-red rounded-2xl p-6 flex items-center gap-5 shadow-lg shadow-zinc-100/40 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 h-full group">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center text-2xl shrink-0 border border-red-100 group-hover:scale-110 transition-transform duration-300">
                🛡️
              </div>
              <div>
                <h4 className="font-extrabold text-zinc-900 text-sm tracking-tight mb-1 font-outfit">Gauteng Gambling Board</h4>
                <p className="text-zinc-500 text-xs font-medium">National Regulatory Licensed Operator</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="h-full">
            <div className="bg-white border border-zinc-100 border-l-4 border-amber-500 rounded-2xl p-6 flex items-center gap-5 shadow-lg shadow-zinc-100/40 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 h-full group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shrink-0 border border-amber-100 group-hover:scale-110 transition-transform duration-300">
                🏛️
              </div>
              <div>
                <h4 className="font-extrabold text-zinc-900 text-sm tracking-tight mb-1 font-outfit">NRCS Approved</h4>
                <p className="text-zinc-500 text-xs font-medium">Letter of Compliance SANS 1718 Standards</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="h-full">
            <div className="bg-white border border-zinc-100 border-l-4 border-emerald-500 rounded-2xl p-6 flex items-center gap-5 shadow-lg shadow-zinc-100/40 hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 h-full group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform duration-300">
                ⭐
              </div>
              <div>
                <h4 className="font-extrabold text-zinc-900 text-sm tracking-tight mb-1 font-outfit">B-BBEE Contributor</h4>
                <p className="text-zinc-500 text-xs font-medium">Level 1 Empowered SA Business Status</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. SUCCESS TOAST */}
      <div
        className={`fixed bottom-8 right-8 bg-zinc-900 text-white rounded-2xl p-5 shadow-2xl border border-zinc-800 flex items-start gap-4 max-w-sm z-50 transition-all duration-500 ${showToast ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
          }`}
      >
        <div className="text-2xl text-emerald-500">✓</div>
        <div>
          <h5 className="font-bold text-sm mb-1">Inquiry Profile Sent!</h5>
          <p className="text-zinc-400 text-xs">A B2B Product Director will contact you within 24 hours.</p>
        </div>
      </div>
    </div>
  );
}
