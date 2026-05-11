"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ARTICLES, BlogArticle } from "@/data/blog";
import { Reveal } from "@/components/Widgets";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogArticle | null>(null);
  const [postId, setPostId] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load article based on slug parameter
  useEffect(() => {
    const activeSlug = Array.isArray(slug) ? slug[0] : slug;
    if (activeSlug && ARTICLES[activeSlug]) {
      setPost(ARTICLES[activeSlug]);
      setPostId(activeSlug);
    } else {
      // Fallback
      setPost(ARTICLES["sbc-awards-victory"]);
      setPostId("sbc-awards-victory");
    }
  }, [slug]);

  // Reading progress tracker scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-zinc-500 font-bold text-lg flex items-center gap-2">
          <i className="ri-loader-4-line animate-spin text-2xl text-brand-red" />
          Loading Article...
        </div>
      </div>
    );
  }

  // Get other keys for Recent Posts sidebar
  const otherPostKeys = Object.keys(ARTICLES).filter(k => k !== postId);
  const recentPosts = otherPostKeys.slice(0, 4).map(k => ({
    id: k,
    ...ARTICLES[k]
  }));

  // Get 3 related posts for bottom grid (stable, category-matched, non-random)
  const relatedPosts = Object.entries(ARTICLES)
    .filter(([id]) => id !== postId)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category) return -1;
      if (a.category !== post.category && b.category === post.category) return 1;
      return 0;
    })
    .slice(0, 3);

  // Count category frequency
  const categoryCounts: Record<string, number> = {};
  Object.values(ARTICLES).forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <div className="relative min-h-screen bg-zinc-50 pb-24">
      {/* Scroll Reading Progress Bar */}
      {/* <div
        className="fixed top-[70px] left-0 h-[3.5px] bg-brand-red z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      /> */}

      {/* Hero Header */}
      <section className="relative bg-[#0a0a0c] text-white py-24 overflow-hidden border-b border-zinc-900">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-brand-red/10 filter blur-[120px] animate-orb-float" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-brand-gold/5 filter blur-[120px] animate-orb-float [animation-delay:-4s]" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <Reveal>
            <span className="bg-red-600/10 border border-red-500/10 px-4 py-1.5 rounded-full text-brand-red text-xs font-bold uppercase tracking-widest inline-block mb-6">
              {post.category}
            </span>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide max-w-4xl mx-auto mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 border-t border-zinc-900 pt-8 max-w-xl mx-auto">
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center">
                  {post.authorInitials}
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">{post.author}</h5>
                  <span className="text-[0.68rem] text-zinc-500 font-medium">{post.authorRole}</span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-zinc-800 hidden sm:block" />
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                <span>📅 {post.date}</span>
                <span className="text-zinc-600">•</span>
                <span>⏱️ {post.readTime}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main content layout with Sidebar */}
      <section className="py-16 max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block: Sharing & Widgets Sidebar */}
          <div className="lg:col-span-4 order-2 lg:order-1 flex flex-col gap-8">
            <Reveal>
              {/* Widget 2: Reading progress */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-50 pb-2">
                  Reading Progress
                </h4>
                <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-red h-full rounded-full transition-all duration-75"
                    style={{ width: `${scrollProgress}%` }}
                  />
                </div>
              </div>

              {/* Widget 3: Recent articles list */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm mt-6">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-5 border-b border-zinc-50 pb-2">
                  Recent Posts
                </h4>
                <div className="flex flex-col gap-4">
                  {recentPosts.map(p => (
                    <Link
                      key={p.id}
                      href={`/blog/${p.id}`}
                      className="flex items-center gap-3 group border-b border-zinc-50 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-100 relative">
                        <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div>
                        <h5 className="font-bold text-zinc-900 text-xs line-clamp-2 leading-snug group-hover:text-brand-red transition-colors">
                          {p.title}
                        </h5>
                        <span className="text-[0.68rem] text-zinc-400 block font-semibold uppercase mt-1">{p.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Widget 4: Categories list with counters */}
              <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm mt-6">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-50 pb-2">
                  Categories
                </h4>
                <div className="flex flex-col gap-2.5">
                  {Object.entries(categoryCounts).map(([catName, count]) => (
                    <div
                      key={catName}
                      className="flex justify-between items-center text-xs font-bold border-b border-zinc-50 pb-2.5 last:border-0 last:pb-0"
                    >
                      <span className="text-zinc-600 uppercase tracking-wider">{catName}</span>
                      <span className="bg-zinc-100 text-zinc-500 py-0.5 px-2.5 rounded-full">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 5: Return to directory link */}
              <div className="mt-6">
                <Link
                  href="/blog"
                  className="bg-zinc-950 hover:bg-brand-red text-white text-xs font-bold text-center block w-full py-4 rounded-xl shadow-md transition-colors uppercase tracking-widest"
                >
                  ← Back to Blog Directory
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Block: Article Content Card */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <Reveal>
              <div className="bg-white border border-zinc-100 rounded-3xl p-6 md:p-10 shadow-sm overflow-hidden">
                <div className="relative h-[300px] md:h-[420px] w-full rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>

                <article className="prose max-w-none text-zinc-700">
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-zinc-800 mb-8 border-l-4 border-brand-red pl-5 italic">
                    {post.lead}
                  </p>

                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="space-y-6 text-sm leading-relaxed text-zinc-600
                      [&_h2]:font-bebas [&_h2]:text-3xl [&_h2]:text-zinc-950 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-wider
                      [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-zinc-900 [&_h3]:mt-8 [&_h3]:mb-3
                      [&_blockquote]:border-l-4 [&_blockquote]:border-brand-red [&_blockquote]:bg-red-50/20 [&_blockquote]:p-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:my-8
                      [&_blockquote_p]:italic [&_blockquote_p]:font-medium [&_blockquote_p]:text-zinc-800 [&_blockquote_p]:mb-2
                      [&_blockquote_cite]:text-xs [&_blockquote_cite]:font-bold [&_blockquote_cite]:text-zinc-400 [&_blockquote_cite]:uppercase [&_blockquote_cite]:tracking-widest
                      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-6
                      [&_li]:text-zinc-600 [&_li_strong]:text-zinc-900
                      [&_div.article-callout-box]:bg-zinc-50 [&_div.article-callout-box]:border [&_div.article-callout-box]:border-zinc-100 [&_div.article-callout-box]:p-6 [&_div.article-callout-box]:rounded-2xl [&_div.article-callout-box]:my-8
                      [&_div.article-callout-box_h4]:font-bold [&_div.article-callout-box_h4]:text-zinc-950 [&_div.article-callout-box_h4]:text-sm [&_div.article-callout-box_h4]:mb-3
                      [&_div.article-callout-box_p]:text-xs [&_div.article-callout-box_p]:leading-relaxed"
                  />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-zinc-100">
                    {post.tags.map(t => (
                      <span key={t} className="bg-zinc-100 text-zinc-500 text-[0.7rem] font-bold py-1.5 px-3 rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related insights grid */}
      <section className="py-16 bg-zinc-100 border-y border-zinc-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-red text-xs font-bold uppercase tracking-widest block mb-2">Read Next</span>
            <h2 className="font-bebas text-4xl text-zinc-950">Related Insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map(p => (
              <Reveal key={p.id}>
                <div className="bg-white border border-zinc-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-red-500/10 transition-all duration-500 h-full flex flex-col justify-between">
                  <div>
                    <div className="relative h-40 w-full bg-zinc-100 overflow-hidden">
                      <span className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-md text-white text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                        {p.category}
                      </span>
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <span className="text-[0.68rem] text-zinc-400 font-bold block uppercase mb-2">📅 {p.date}</span>
                      <h3 className="text-md font-bold text-zinc-900 mb-2 hover:text-brand-red transition-colors line-clamp-2">
                        <Link href={`/blog/${p.id}`}>{p.title}</Link>
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{p.lead}</p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 mt-auto flex items-center justify-between border-t border-zinc-50 pt-3">
                    <span className="text-[0.7rem] text-zinc-700 font-bold">By {p.author}</span>
                    <Link href={`/blog/${p.id}`} className="text-xs font-bold text-brand-red hover:text-red-700">
                      Read →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
