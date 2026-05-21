"use client";

import { useState } from "react";
import { Reveal } from "@/components/Widgets";
import { API_BASE_URL } from "@/config";
import GoogleMap from "@/components/GoogleMap";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick client-side check
    if (form.message.length < 10) {
      setErrors({ message: ["The message field must be at least 10 characters."] });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        if (data.errors) {
          setErrors(data.errors);
          return;
        }
        throw new Error(data.message || "Failed to submit contact form");
      }

      // Success
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setShowToast(true);

      // Hide toast after 5 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      alert(error.message || "Something went wrong while submitting your inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
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
              {/* <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm flex items-start gap-4 mb-3">
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
              </div> */}

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
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value });
                          if (errors.name) {
                            const newErrors = { ...errors };
                            delete newErrors.name;
                            setErrors(newErrors);
                          }
                        }}
                        placeholder="e.g. Malope"
                        required
                        className={`border bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:outline-none transition-all ${
                          errors.name ? "border-red-500 focus:border-red-500" : "border-zinc-100 focus:border-brand-red"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.name[0]}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Work Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value });
                          if (errors.email) {
                            const newErrors = { ...errors };
                            delete newErrors.email;
                            setErrors(newErrors);
                          }
                        }}
                        placeholder="e.g. contact@yourbrand.com"
                        required
                        className={`border bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:outline-none transition-all ${
                          errors.email ? "border-red-500 focus:border-red-500" : "border-zinc-100 focus:border-brand-red"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.email[0]}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={form.phone}
                        onChange={(e) => {
                          setForm({ ...form, phone: e.target.value });
                          if (errors.phone) {
                            const newErrors = { ...errors };
                            delete newErrors.phone;
                            setErrors(newErrors);
                          }
                        }}
                        placeholder="e.g. +27 11 000 0000"
                        required
                        className={`border bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:outline-none transition-all ${
                          errors.phone ? "border-red-500 focus:border-red-500" : "border-zinc-100 focus:border-brand-red"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.phone[0]}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={form.subject}
                        onChange={(e) => {
                          setForm({ ...form, subject: e.target.value });
                          if (errors.subject) {
                            const newErrors = { ...errors };
                            delete newErrors.subject;
                            setErrors(newErrors);
                          }
                        }}
                        placeholder="e.g. Inquiry about services"
                        required
                        className={`border bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:outline-none transition-all ${
                          errors.subject ? "border-red-500 focus:border-red-500" : "border-zinc-100 focus:border-brand-red"
                        }`}
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-xs font-semibold mt-1">{errors.subject[0]}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                      Detailed Inquiry Requirements
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => {
                        const val = e.target.value;
                        setForm({ ...form, message: val });
                        if (val && val.length < 10) {
                          setErrors((prev: any) => ({
                            ...prev,
                            message: ["The message field must be at least 10 characters."],
                          }));
                        } else {
                          const newErrors = { ...errors };
                          delete newErrors.message;
                          setErrors(newErrors);
                        }
                      }}
                      placeholder="Briefly summarize your regulatory jurisdiction, estimated rollout size..."
                      required
                      rows={4}
                      className={`border bg-zinc-50/50 p-3.5 rounded-xl text-sm focus:bg-white focus:outline-none transition-all resize-none ${
                        errors.message ? "border-red-500 focus:border-red-500" : "border-zinc-100 focus:border-brand-red"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs font-semibold mt-1">{errors.message[0]}</p>
                    )}
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
      {/* <section className="py-16 max-w-7xl mx-auto px-6 md:px-8 mt-12">
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
      </section> */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {/* <h2 className="mb-6 text-3xl font-bold">Our Location</h2> */}

          <GoogleMap />
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
