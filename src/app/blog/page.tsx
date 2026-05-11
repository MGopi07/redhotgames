"use client";

import { useState } from "react";
import Link from "next/link";
import { ARTICLES } from "@/data/blog";
import { Reveal } from "@/components/Widgets";

const CATEGORIES = [
  { id: "all", label: "All Stories" },
  { id: "Company News", label: "Company News" },
  { id: "Industry Insights", label: "Industry Insights" },
  { id: "Events", label: "Events & Webinars" },
  { id: "Regulatory Compliance", label: "Regulatory Compliance" }
];

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const articlesList = Object.entries(ARTICLES).map(([id, post]) => ({
    id,
    ...post
  }));

  const filteredArticles = selectedCategory === "all"
    ? articlesList
    : articlesList.filter(post => post.category === selectedCategory);

  // Separate featured article
  const featured = articlesList.find(post => post.id === "sbc-awards-victory");
  const gridArticles = filteredArticles.filter(post => post.id !== "sbc-awards-victory");

  const isFeaturedVisible = selectedCategory === "all" || (featured && featured.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-zinc-50 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0a0a0c] text-white py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-brand-red/10 filter blur-[120px] animate-orb-float" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-brand-gold/5 filter blur-[120px] animate-orb-float [animation-delay:-4s]" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <Reveal>
            <span className="bg-red-600/10 border border-red-500/10 px-4 py-1.5 rounded-full text-brand-red text-xs font-bold uppercase tracking-widest inline-block mb-6">
              Insights &amp; Innovation
            </span>
            <h1 className="font-bebas text-6xl md:text-8xl tracking-wide mb-6">
              The Red Hot <em className="text-brand-red not-italic">iGaming Blog</em>
            </h1>
            <p className="text-zinc-400 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
              Unlock expert research, development updates, and major announcements regarding regulation compliance, physical terminals, and digital iGaming systems.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. CATEGORIES FILTER BAR */}
      <section className="py-8 bg-white border-b border-zinc-100 sticky top-[70px] z-30 shadow-sm shadow-zinc-100/5">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-brand-red border-brand-red text-white shadow-md shadow-brand-red/20"
                  : "bg-zinc-50 border-zinc-100 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. MAIN ARTICLES SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8">
        {/* Featured Post (Always displayed at top if selected category fits) */}
        {featured && isFeaturedVisible && (
          <Reveal className="mb-12">
            <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-red-500/10 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[400px]">
                  <span className="absolute top-4 left-4 bg-brand-red text-white text-[0.65rem] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full z-10 shadow-md">
                    Featured Post
                  </span>
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                      <span className="text-brand-red">📁 {featured.category}</span>
                      <span>📅 {featured.date}</span>
                      <span>⏱️ {featured.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4 hover:text-brand-red transition-colors">
                      <Link href={`/blog/${featured.id}`}>
                        {featured.title}
                      </Link>
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                      {featured.lead}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center">
                        {featured.authorInitials}
                      </div>
                      <div>
                        <h5 className="font-bold text-zinc-900 text-xs">{featured.author}</h5>
                        <span className="text-[0.65rem] text-zinc-400 font-medium">{featured.authorRole}</span>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${featured.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-red-700 transition-colors"
                    >
                      Read Story <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Dynamic Grid for remaining articles */}
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map(post => (
              <Reveal key={post.id}>
                <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-red-500/10 transition-all duration-500 h-full flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 w-full bg-zinc-100 overflow-hidden">
                      <span className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-md text-white text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                        {post.category}
                      </span>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-[0.7rem] font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                        <span>📅 {post.date}</span>
                        <span>⏱️ {post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 mb-3 hover:text-brand-red transition-colors line-clamp-2">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                        {post.lead}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 border-t border-zinc-50 pt-4 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 text-[0.7rem] font-bold flex items-center justify-center border border-zinc-200">
                        {post.authorInitials}
                      </div>
                      <span className="text-[0.75rem] font-bold text-zinc-800">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-xs font-bold text-brand-red hover:text-red-700 transition-colors"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          !isFeaturedVisible && (
            <div className="text-center py-16">
              <p className="text-zinc-400 font-medium text-sm">No other articles matching this category found.</p>
            </div>
          )
        )}
      </section>

      {/* 4. NEWSLETTER SIGNUP */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mt-12">
        <Reveal>
          <div className="bg-[#0a0a0c] text-white rounded-3xl p-8 md:p-12 shadow-xl shadow-zinc-950/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block mb-2">
                  Stay Ahead of the Market
                </span>
                <h2 className="font-bebas text-4xl md:text-5xl text-white mb-4 leading-none">
                  Ignite Your Inbox with <em className="text-brand-red not-italic">iGaming Insights</em>
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
                  Subscribe to our newsletter to receive the latest technological breakthroughs, licensing guides, events invitations, and industry trends directly in your inbox.
                </p>
              </div>
              <div className="lg:col-span-5">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you for subscribing to Red Hot Games insights!");
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your business email"
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-red focus:bg-zinc-900/40 flex-grow"
                  />
                  <button
                    type="submit"
                    className="bg-brand-red hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors cursor-pointer text-sm shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
