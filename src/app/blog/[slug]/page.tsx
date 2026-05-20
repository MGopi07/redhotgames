"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeSlug = Array.isArray(slug) ? slug[0] : slug;

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true);

        // Fetch all necessary data concurrently with individual try-catch
        let blogRes, latestRes, catRes;
        
        try { blogRes = await fetch(`${API_BASE_URL}/api/v1/blogs/${activeSlug}`); } catch (e) {}
        try { latestRes = await fetch(`${API_BASE_URL}/api/v1/latest-blogs`); } catch (e) {}
        try { catRes = await fetch(`${API_BASE_URL}/api/v1/blog-categories`); } catch (e) {}

        let fetchedPost = null;

        if (blogRes && blogRes.ok) {
          try {
            const blogData = await blogRes.json();
            if (blogData.success && blogData.data) {
               fetchedPost = Array.isArray(blogData.data) ? blogData.data[0] : blogData.data;
            }
          } catch(e) {}
        } 
        
        // Fallback
        if (!fetchedPost) {
           try {
             const allBlogsRes = await fetch(`${API_BASE_URL}/api/v1/blogs`);
             if (allBlogsRes.ok) {
               const allBlogsData = await allBlogsRes.json();
               if (allBlogsData.success && allBlogsData.data?.blogs) {
                  fetchedPost = allBlogsData.data.blogs.find((b: any) => b.slug === activeSlug);
               }
             }
           } catch(e) {}
        }

        // Mock data fallback if API totally failed
        if (!fetchedPost && activeSlug && ARTICLES[activeSlug as string]) {
           const mockArticle = ARTICLES[activeSlug as string];
           fetchedPost = {
              id: activeSlug,
              slug: activeSlug,
              title: mockArticle.title,
              short_description: mockArticle.lead,
              description: mockArticle.content,
              image_url: mockArticle.image,
              published_at: mockArticle.date,
              category: {
                  name: mockArticle.category,
                  slug: mockArticle.category.toLowerCase().replace(/\s+/g, '-')
              }
           };
        }

        if (fetchedPost) {
          setPost(fetchedPost);

          // Now fetch related blogs using the fetched post ID
          try {
             const relatedRes = await fetch(`${API_BASE_URL}/api/v1/related-blogs/${fetchedPost.id}`);
             if (relatedRes.ok) {
                const relatedData = await relatedRes.json();
                if (relatedData.success && relatedData.data) {
                   setRelatedPosts(relatedData.data.slice(0, 3));
                }
             } else {
                throw new Error("Fallback to mock");
             }
          } catch (e) {
             // Fallback to mock related posts
             const mockRelated = Object.entries(ARTICLES)
               .filter(([slug, article]) => slug !== activeSlug && article.category === fetchedPost.category?.name)
               .slice(0, 3)
               .map(([slug, article]) => ({
                 id: slug,
                 slug: slug,
                 title: article.title,
                 short_description: article.lead,
                 image_url: article.image,
                 published_at: article.date,
                 category: { name: article.category }
               }));
             // If not enough related in same category, just pad with others
             if (mockRelated.length < 3) {
               const pad = Object.entries(ARTICLES)
                 .filter(([slug]) => slug !== activeSlug && !mockRelated.find(m => m.id === slug))
                 .slice(0, 3 - mockRelated.length)
                 .map(([slug, article]) => ({
                   id: slug,
                   slug: slug,
                   title: article.title,
                   short_description: article.lead,
                   image_url: article.image,
                   published_at: article.date,
                   category: { name: article.category }
                 }));
               setRelatedPosts([...mockRelated, ...pad]);
             } else {
               setRelatedPosts(mockRelated);
             }
          }
        } else {
          setError("Article not found.");
        }

        if (latestRes && latestRes.ok) {
          try {
            const latestData = await latestRes.json();
            if (latestData.success && latestData.data) {
              setRecentPosts(latestData.data.filter((p: any) => p.slug !== activeSlug).slice(0, 4));
            }
          } catch(e) {}
        } else {
          // Fallback to mock recent posts
          const mockRecent = Object.entries(ARTICLES)
            .filter(([slug]) => slug !== activeSlug)
            .slice(0, 4)
            .map(([slug, article]) => ({
              id: slug,
              slug: slug,
              title: article.title,
              image_url: article.image,
              published_at: article.date,
              category: { name: article.category }
            }));
          setRecentPosts(mockRecent);
        }

        if (catRes && catRes.ok) {
          try {
            const catData = await catRes.json();
            if (catData.success && catData.data) {
              setCategories(catData.data);
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
                name: article.category,
                slug: slug
              });
            }
          });
          setCategories(Array.from(mockCategoriesMap.values()));
        }

      } catch (err) {
        console.warn("Error processing article:", err);
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    if (activeSlug) {
      fetchArticleData();
    }
  }, [activeSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="text-zinc-500 font-bold text-lg flex items-center gap-2">
          <i className="ri-loader-4-line animate-spin text-2xl text-brand-red" />
          <div className="w-8 h-8 border-4 border-zinc-200 border-t-brand-red rounded-full animate-spin"></div>
          Loading Article...
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">{error || "Article not found"}</h2>
        <Link href="/blog" className="px-6 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-red-700 transition-colors">
          Return to Blog Directory
        </Link>
      </div>
    );
  }

  // Parse tags safely
  const tags = post.meta_keywords ? post.meta_keywords.split(",").map((t: string) => t.trim()) : ["iGaming", "News"];

  return (
    <div className="relative min-h-screen bg-zinc-50 pb-24">
      {/* Hero Header */}
      <section className="relative bg-[#0a0a0c] text-white py-24 overflow-hidden border-b border-zinc-900">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-brand-red/10 filter blur-[120px] animate-pulse" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-brand-gold/5 filter blur-[120px] animate-pulse" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 text-center">
          <Reveal>
            <span className="bg-red-600/10 border border-red-500/10 px-4 py-1.5 rounded-full text-brand-red text-xs font-bold uppercase tracking-widest inline-block mb-6">
              {post.category?.name || "Uncategorized"}
            </span>
            <h1 className="font-bebas text-5xl md:text-7xl tracking-wide max-w-4xl mx-auto mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 border-t border-zinc-900 pt-8 max-w-xl mx-auto">
              <div className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center">
                  RH
                </div>
                <div>
                  <h5 className="font-bold text-white text-sm">Red Hot Team</h5>
                  <span className="text-[0.68rem] text-zinc-500 font-medium">Editorial</span>
                </div>
              </div>
              <div className="h-6 w-[1px] bg-zinc-800 hidden sm:block" />
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-wider">
                <span>📅 {formatDate(post.published_at || post.created_at)}</span>
                <span className="text-zinc-600">•</span>
                <span>⏱️ {calculateReadTime(post.description)}</span>
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
              {/* Widget 3: Recent articles list */}
              {recentPosts.length > 0 && (
                <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-5 border-b border-zinc-50 pb-2">
                    Recent Posts
                  </h4>
                  <div className="flex flex-col gap-4">
                    {recentPosts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/blog/${p.slug}`}
                        className="flex items-center gap-3 group border-b border-zinc-50 pb-4 last:border-0 last:pb-0"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-zinc-100 relative">
                          <img src={p.image_url} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div>
                          <h5 className="font-bold text-zinc-900 text-xs line-clamp-2 leading-snug group-hover:text-brand-red transition-colors">
                            {p.title}
                          </h5>
                          <span className="text-[0.68rem] text-zinc-400 block font-semibold uppercase mt-1">
                            {formatDate(p.published_at || p.created_at)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Widget 4: Categories list */}
              {categories.length > 0 && (
                <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm mt-6">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 border-b border-zinc-50 pb-2">
                    Categories
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {categories.map((cat) => (
                      <div
                        key={cat.id}
                        className="flex justify-between items-center text-xs font-bold border-b border-zinc-50 pb-2.5 last:border-0 last:pb-0"
                      >
                        <span className="text-zinc-600 uppercase tracking-wider">{cat.name}</span>
                        <span className="bg-zinc-100 text-brand-red py-0.5 px-2 rounded-md">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                <div className="relative h-[300px] md:h-[420px] w-full rounded-2xl overflow-hidden mb-8 shadow-sm bg-zinc-100">
                  <img src={post.image_url} alt={post.meta_alt || post.title} className="absolute inset-0 w-full h-full object-cover" />
                </div>

                <article className="prose max-w-none text-zinc-700">
                  <p className="text-lg md:text-xl font-medium leading-relaxed text-zinc-800 mb-8 border-l-4 border-brand-red pl-5 italic">
                    {post.short_description}
                  </p>

                  <div
                    dangerouslySetInnerHTML={{ __html: post.description }}
                    className="space-y-6 text-sm leading-relaxed text-zinc-600
                      [&_h2]:font-bebas [&_h2]:text-3xl [&_h2]:text-zinc-950 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:tracking-wider
                      [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-zinc-900 [&_h3]:mt-8 [&_h3]:mb-3
                      [&_blockquote]:border-l-4 [&_blockquote]:border-brand-red [&_blockquote]:bg-red-50/20 [&_blockquote]:p-6 [&_blockquote]:rounded-r-2xl [&_blockquote]:my-8
                      [&_blockquote_p]:italic [&_blockquote_p]:font-medium [&_blockquote_p]:text-zinc-800 [&_blockquote_p]:mb-2
                      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:my-6
                      [&_li]:text-zinc-600 [&_li_strong]:text-zinc-900"
                  />

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-zinc-100">
                      {tags.map((t: string, idx: number) => (
                        <span key={idx} className="bg-zinc-100 text-zinc-500 text-[0.7rem] font-bold py-1.5 px-3 rounded-full">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related insights grid */}
      {relatedPosts.length > 0 && (
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
                          {p.category?.name || "Blog"}
                        </span>
                        <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-5">
                        <span className="text-[0.68rem] text-zinc-400 font-bold block uppercase mb-2">
                          📅 {formatDate(p.published_at || p.created_at)}
                        </span>
                        <h3 className="text-md font-bold text-zinc-900 mb-2 hover:text-brand-red transition-colors line-clamp-2">
                          <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                        </h3>
                        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{p.short_description}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 mt-auto flex items-center justify-between border-t border-zinc-50 pt-3">
                      <span className="text-[0.7rem] text-zinc-700 font-bold">By Red Hot Team</span>
                      <Link href={`/blog/${p.slug}`} className="text-xs font-bold text-brand-red hover:text-red-700">
                        Read →
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
