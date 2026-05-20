"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Widgets";
import { API_BASE_URL } from "@/config";
import { ARTICLES } from "@/data/blog";

// Helper function to calculate read time from HTML content
const calculateReadTime = (htmlContent: string) => {
  if (!htmlContent) return "3 min read";
  const text = htmlContent.replace(/<[^>]+>/g, "");
  const wordCount = text.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200); // Average 200 words per minute
  return `${readTime} min read`;
};

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function BlogListPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([{ id: "all", label: "All Stories", slug: "all" }]);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        
        let catRes, blogRes;
        
        try {
          catRes = await fetch(`${API_BASE_URL}/api/v1/blog-categories`);
        } catch (e) {
          // Silent catch to prevent terminal spam
        }

        try {
          blogRes = await fetch(`${API_BASE_URL}/api/v1/blogs`);
        } catch (e) {
          // Silent catch to prevent terminal spam
        }

        if (catRes && catRes.ok) {
          try {
            const catData = await catRes.json();
            if (catData.success && Array.isArray(catData.data)) {
              setCategories([
                { id: "all", label: "All Stories", slug: "all" },
                ...catData.data.map((c: any) => ({
                  id: c.id,
                  label: c.name,
                  slug: c.slug
                }))
              ]);
            }
          } catch(e) {}
        } else {
          // Fallback to mock categories
          const mockCategoriesMap = new Map();
          Object.values(ARTICLES).forEach(article => {
            const slug = article.category.toLowerCase().replace(/\s+/g, '-');
            if (!mockCategoriesMap.has(slug)) {
              mockCategoriesMap.set(slug, {
                id: slug,
                label: article.category,
                slug: slug
              });
            }
          });
          setCategories([
            { id: "all", label: "All Stories", slug: "all" },
            ...Array.from(mockCategoriesMap.values())
          ]);
        }

        if (blogRes && blogRes.ok) {
          try {
            const blogData = await blogRes.json();
            if (blogData.success && blogData.data && Array.isArray(blogData.data.blogs)) {
              setArticles(blogData.data.blogs);
            }
          } catch(e) {}
        } else {
          // Fallback to mock articles
          const mockArticles = Object.entries(ARTICLES).map(([slug, article]) => ({
              id: slug,
              slug: slug,
              title: article.title,
              short_description: article.lead,
              description: article.content,
              image_url: article.image,
              published_at: article.date,
              category: {
                  name: article.category,
                  slug: article.category.toLowerCase().replace(/\s+/g, '-')
              }
          }));
          setArticles(mockArticles);
        }
      } catch (err) {
        console.warn("Error in fetchBlogData", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, []);

  const filteredArticles = selectedCategory === "all"
    ? articles
    : articles.filter(post => post.category?.slug === selectedCategory);

  // Separate featured article (the newest one)
  const featured = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

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
      <section className="py-4 bg-white border-b border-zinc-100 sticky top-[70px] z-30 shadow-sm shadow-zinc-100/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex overflow-x-auto gap-2 pb-2 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`snap-start whitespace-nowrap shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-brand-red border-brand-red text-white shadow-md shadow-brand-red/20"
                    : "bg-zinc-50 border-zinc-100 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAIN ARTICLES SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-10 h-10 border-4 border-zinc-200 border-t-brand-red rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <Reveal className="mb-12">
                <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-red-500/10 transition-all duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                    <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[400px]">
                      <span className="absolute top-4 left-4 bg-brand-red text-white text-[0.65rem] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full z-10 shadow-md">
                        Featured Post
                      </span>
                      <img
                        src={featured.image_url}
                        alt={featured.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                          <span className="text-brand-red">📁 {featured.category?.name || "Uncategorized"}</span>
                          <span>📅 {formatDate(featured.published_at || featured.created_at)}</span>
                          <span>⏱️ {calculateReadTime(featured.description)}</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 mb-4 hover:text-brand-red transition-colors">
                          <Link href={`/blog/${featured.slug}`}>
                            {featured.title}
                          </Link>
                        </h2>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                          {featured.short_description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center">
                            RH
                          </div>
                          <div>
                            <h5 className="font-bold text-zinc-900 text-xs">Red Hot Team</h5>
                            <span className="text-[0.65rem] text-zinc-400 font-medium">Editorial</span>
                          </div>
                        </div>
                        <Link
                          href={`/blog/${featured.slug}`}
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
                            {post.category?.name || "Blog"}
                          </span>
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-3 text-[0.7rem] font-bold text-zinc-400 mb-3 uppercase tracking-wider">
                            <span>📅 {formatDate(post.published_at || post.created_at)}</span>
                            <span>⏱️ {calculateReadTime(post.description)}</span>
                          </div>
                          <h3 className="text-lg font-bold text-zinc-900 mb-3 hover:text-brand-red transition-colors line-clamp-2">
                            <Link href={`/blog/${post.slug}`}>
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                            {post.short_description}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-6 border-t border-zinc-50 pt-4 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 text-[0.7rem] font-bold flex items-center justify-center border border-zinc-200">
                            RH
                          </div>
                          <span className="text-[0.75rem] font-bold text-zinc-800">Red Hot Team</span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
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
              !featured && (
                <div className="text-center py-16">
                  <p className="text-zinc-400 font-medium text-sm">No articles matching this category found.</p>
                </div>
              )
            )}
          </>
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
