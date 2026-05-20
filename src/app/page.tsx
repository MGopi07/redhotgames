"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TypewriterBadge, Counter, Reveal } from "@/components/Widgets";
import { ARTICLES } from "@/data/blog";
import { API_BASE_URL } from "@/config";

const MODULES_DATA = [
  {
    id: "casino",
    glow: "orange",
    icon: "🎰",
    title: "Casino Module",
    desc: "Redhotgames is recognized among the Best online casino software providers, offering 10,000+ casino games with high-performance gaming solutions. Experience premium RNG and live dealer games from leading global providers with scalable B2B casino technology.",
    footer: "RNG & Live Dealer Games"
  },
  {
    id: "sportsbook",
    glow: "red",
    icon: "⚽",
    title: "Sportsbook Module",
    desc: "Redhotgames provides reliable esports betting solutions trusted by brands searching Best online casino software providers. Access 2,000+ esports events monthly with official data integration, real-time feeds, and scalable infrastructure.",
    tags: ["Match Tracker", "Stats", "Cashout", "Freebets", "Livestream", "Oddsboost"]
  },
  {
    id: "crm",
    glow: "purple",
    icon: "📈",
    title: "Intelligent CRM",
    desc: "Boost player engagement with intelligent CRM solutions from redhotgames, one of the Best online casino software providers in the industry. Features include campaign automation, player segmentation, gamification, personalization, and advanced analytics tools.",
    footer: "Advanced Retention Engine"
  },
  {
    id: "partnership",
    glow: "teal",
    icon: "🤝",
    title: "Partnership Programs",
    desc: "Redhotgames offers advanced affiliate and referral systems designed by one of the Best online casino software providers for rapid B2B business growth. Track performance, manage commissions, and expand your gaming network with multi-tier partnership programs.",
    footer: "Referral & Affiliate Software"
  },
  {
    id: "cashier",
    glow: "mint",
    icon: "💸",
    title: "Cashier Solution",
    desc: "The secure cashier system from redhotgames helps operators manage fast and secure transactions across multiple payment channels. As one of the Best online casino software providers, redhotgames supports crypto, fiat payments, and thermal printer integration.",
    printer: "📠 Thermal Printer Support"
  }
];

const CHANNELS_DATA = [
  {
    id: "online",
    categoryClass: "casino",
    title: "Online Web App",
    desc: "Fully responsive, ultra-fast platform available across desktop, tablet, and mobile browsers operating 24/7 online.",
    features: [
      "Seamless HTML5 wallet",
      "Real-time push updates",
      "Fully cross-device responsive",
      "Native desktop & mobile wrappers"
    ],
    img: "/assets/img/one.webp"
  },
  {
    id: "retail",
    categoryClass: "sportsbook",
    title: "Traditional Retail",
    desc: "Designed for cashier desks accepting bets directly from players in traditional land-based retail shops.",
    features: [
      "Ultra-fast ticket processing",
      "Real-time risk authorization",
      "Secure land-based operations",
      "Optimized printer integrations"
    ],
    img: "/assets/img/two.webp"
  },
  {
    id: "ssbt",
    categoryClass: "aggregator",
    title: "Self-Service (SSBT)",
    desc: "SSBT units allowing customers to place bets autonomously, expanding your retail network with minimal staffing overheads.",
    features: [
      "Touch-screen optimized UI",
      "Multiple ticket slips",
      "Minimal staffing overheads",
      "Cash acceptor & coin hopper API"
    ],
    img: "/assets/img/three.webp"
  },
  {
    id: "fobt",
    categoryClass: "prediction",
    title: "Fixed Odds (FOBT)",
    desc: "Specially customized cabinet integrations for Fixed Odds Betting Terminals optimized for casino and retail floors.",
    features: [
      "Low latency visual rendering",
      "Highly engaging instant-play games",
      "Secure terminal platform",
      "Strict hardware certification"
    ],
    img: "/assets/img/one.webp"
  }
];

const SECURITY_SLIDES = [
  {
    tag: "1.Infrastructure",
    title: "Security",
    desc: "Cloudflare-protected enterprise solutions with multi-layered DDoS mitigation and real-time threat detection.",
    icon: "🛡️"
  },
  {
    tag: "2.Regulatory",
    title: "Compliance",
    desc: "Fully GLI & BMM certified iGaming software, ensuring adherence to the strictest global regulatory standards.",
    icon: "⚖️"
  },
  {
    tag: "3.Certification",
    title: "ISMS",
    desc: "Information Security Management System (ISMS) implementation providing world-class data encryption and privacy controls.",
    icon: "🔐"
  }
];

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

export default function HomePage() {
  const [activeChannelTab, setActiveChannelTab] = useState("all");
  const [securityIndex, setSecurityIndex] = useState(0);
  const [recentArticles, setRecentArticles] = useState<any[]>([]);

  useEffect(() => {
    // Initial mock data load
    const initialMock = Object.entries(ARTICLES).slice(0, 3).map(([id, post]) => ({
      id,
      slug: id,
      title: post.title,
      category: post.category,
      image: post.image,
      date: post.date,
      readTime: post.readTime,
      lead: post.lead,
      author: post.author,
      authorInitials: post.authorInitials
    }));
    setRecentArticles(initialMock);

    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/v1/blogs`);
        if (res.ok) {
          const body = await res.json();
          if (body.success && body.data && Array.isArray(body.data.blogs)) {
            // Take the first 3 blogs (latest)
            const apiBlogs = body.data.blogs.slice(0, 3).map((blog: any) => ({
              id: blog.slug,
              slug: blog.slug,
              title: blog.title,
              category: blog.category?.name || "Blog",
              image: blog.image_url,
              date: formatDate(blog.published_at || blog.created_at),
              readTime: calculateReadTime(blog.description),
              lead: blog.short_description,
              author: "Red Hot Team",
              authorInitials: "RH"
            }));
            setRecentArticles(apiBlogs);
          }
        }
      } catch (e) {
        // Silent catch
      }
    };
    fetchRecentBlogs();
  }, []);

  const filteredChannels = activeChannelTab === "all"
    ? CHANNELS_DATA
    : CHANNELS_DATA.filter(item => item.id === activeChannelTab);

  const handleNextSecurity = () => {
    setSecurityIndex((prev) => (prev + 1) % SECURITY_SLIDES.length);
  };

  const handlePrevSecurity = () => {
    setSecurityIndex((prev) => (prev - 1 + SECURITY_SLIDES.length) % SECURITY_SLIDES.length);
  };

  return (
    <div className="relative">
      {/* 1. HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-white" id="home">
        <div className="hero-orb orb1 animate-orb-float bg-brand-red top-[-10%] right-[-5%]" />
        <div className="hero-orb orb2 animate-orb-float [animation-delay:-5s] bg-brand-gold bottom-[-10%] left-[-5%]" />
        <div className="hero-grid" />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <TypewriterBadge />
              <h1 className="font-bebas text-7xl md:text-8xl tracking-tight leading-[0.95] text-zinc-950 mb-6">
                iGaming <em className="text-brand-red not-italic block">Technology</em>
              </h1>
              <p className="text-zinc-500 text-lg md:text-xl max-w-xl leading-relaxed mb-8">
                Choose the best online casino software providers for your gaming business. Get reliable casino platforms, engaging games, API integration, and world-class betting solutions.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="bg-brand-red text-white font-bold uppercase tracking-wider py-4 px-10 rounded-full hover:bg-red-700 shadow-xl shadow-brand-red/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get Started
                </Link>
                <a
                  href="#channels"
                  className="flex items-center gap-2 font-bold text-zinc-900 hover:text-brand-red text-[0.95rem] py-3 px-6 transition-colors group"
                >
                  View Products <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-md md:max-w-xl animate-float-hero duration-500">
                <img
                  src="/assets/img/solutions/sportsbook.png"
                  alt="iGaming Technology"
                  className="w-full h-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LOC COMPLIANCE (PLAYBEX SYSTEM) */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden" id="playbex">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-red-500/5 filter blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-amber-500/5 filter blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex flex-wrap gap-3 items-center mb-6">
                  <span className="inline-flex items-center gap-1.5 bg-red-600/10 border border-red-500/10 px-3 py-1 rounded-full text-brand-red text-xs font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                    NRCS COMPLIANT
                  </span>
                  <span className="bg-zinc-200 text-zinc-700 px-3 py-1 rounded-full text-xs font-semibold">
                    LOC Certified
                  </span>
                </div>
                <h2 className="font-bebas text-5xl md:text-6xl tracking-wide text-zinc-950 mb-6">
                  <em className="text-brand-red not-italic">Redhotgames</em>
                </h2>
                <h4 className="text-lg md:text-xl font-bold text-zinc-800 mb-6">
                  Develops innovative iGaming software solutions
                </h4>
                <p className="text-zinc-600 text-md md:text-lg leading-relaxed mb-8">
                  Online casinos and other digital gaming businesses. Our advanced solutions can operate independently or fully integrated into a single powerful ecosystem.Best online casino software providers.
                </p>
                <div className="quote-card mb-6">
                  <p className="text-zinc-800 font-medium italic text-[1.05rem] leading-relaxed mb-4">
                    "Our platform is built for flexibility and seamless customization, enabling clients to launch their iGaming business in weeks, not months, with our advanced White Label Solution.Best online casino software providers."
                  </p>
                  <div className="text-[0.9rem]">
                    <strong className="text-zinc-900 block font-bold">Managing Director</strong>
                    <span className="text-zinc-500">Red Hot Games</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <div className="cert-card-inner group hover:shadow-2xl transition-all duration-500 hover:border-red-500/10">
                  <div className="cert-stamp">✓</div>
                  <div className="border-b border-zinc-100 pb-6 mb-6">
                    <div className="text-xs font-bold tracking-widest text-brand-red mb-1">RED HOT GAMES</div>
                    <h3 className="text-xl font-bold text-zinc-900">Letter of Compliance</h3>
                    <span className="text-[0.75rem] font-bold tracking-widest text-zinc-400 block mt-1 uppercase">
                      Regulatory Compliant
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-zinc-50">
                      <span className="font-bold text-zinc-400 uppercase tracking-wider">Regulator:</span>
                      <span className="font-semibold text-zinc-800 text-right">NRCS (South Africa)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-zinc-50">
                      <span className="font-bold text-zinc-400 uppercase tracking-wider">System:</span>
                      <span className="font-semibold text-zinc-800 text-right">Playbex Wagering System</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-3 border-b border-zinc-50">
                      <span className="font-bold text-zinc-400 uppercase tracking-wider">Deployment:</span>
                      <span className="font-semibold text-zinc-800 text-right">Online, Retail, SSBT, FOBT</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pb-3">
                      <span className="font-bold text-zinc-400 uppercase tracking-wider">Solution:</span>
                      <span className="font-semibold text-zinc-800 text-right">White Label iGaming</span>
                    </div>
                  </div>
                  <div className="bg-emerald-50 text-emerald-700 text-center text-xs font-bold py-3.5 rounded-xl mt-6">
                    Certified & Approved Platform
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM MODULES */}
      <section className="py-24 bg-[#0a0a0c] text-white" id="modules">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-gold text-xs font-extrabold uppercase tracking-widest block mb-4">
              Core Ecosystem
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl text-white mb-6">
              Platform <em className="text-brand-red not-italic">Modules</em>
            </h2>
            <p className="text-zinc-400 text-md leading-relaxed">
              Redhotgames is one of Best online casino software providers, offering advanced casino, sportsbook, esports, CRM, affiliate, cashier solutions for modern iGaming businesses worldwide.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {MODULES_DATA.map((module, i) => (
              <Reveal key={module.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] flex">
                <div className="playbex-module-card group flex flex-col w-full">
                  <div className={`module-glow ${module.glow}`} />
                  <div className="text-4xl mb-6">{module.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                    {module.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: module.desc }} />
                  {module.footer && (
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest border-t border-zinc-900 pt-4 mt-auto">
                      {module.footer}
                    </div>
                  )}
                  {module.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {module.tags.map(t => (
                        <span key={t} className="bg-zinc-900 text-zinc-400 text-[0.65rem] font-bold py-1 px-2.5 rounded-full uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {module.printer && (
                    <div className="bg-zinc-900/60 text-zinc-300 text-xs font-semibold py-2 px-3 rounded-lg inline-block border border-zinc-800/50 mt-2">
                      {module.printer}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OMNICHANNEL SWITCHER */}
      <section className="py-24 bg-[#fcfcfd]" id="channels">
        <div className="product-tabs-container">
          <div className="product-tabs">
            <button
              onClick={() => setActiveChannelTab("all")}
              className={`tab-btn ${activeChannelTab === "all" ? "active" : ""}`}
            >
              All Channels
            </button>
            {CHANNELS_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChannelTab(tab.id)}
                className={`tab-btn ${activeChannelTab === tab.id ? "active" : ""}`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-36 lg:self-start z-10 flex flex-col items-start">
              <span className="text-brand-red text-xs font-extrabold uppercase tracking-widest mb-4">
                Omnichannel Deployment
              </span>
              <h2 className="font-bebas text-5xl md:text-6xl text-zinc-950 mb-6 leading-none">
                Play Anywhere, <em className="text-brand-red not-italic">Anytime</em>
              </h2>
              <p className="text-zinc-500 text-md leading-relaxed mb-8">
                The Playbex platform provides a complete solution for operators, operating seamlessly across digital web interfaces and physical terminal hardware.
              </p>
              <div className="bg-red-50/50 p-6 rounded-2xl border-l-4 border-brand-red shadow-sm shadow-zinc-100">
                <p className="text-zinc-800 font-bold text-sm leading-relaxed mb-0">
                  As the biggest terminal provider in South Africa, Red Hot Games will tailor make deals for a rapid rollout of the terminal solution.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="products-showcase">
                {filteredChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`product-tile ${channel.categoryClass}`}
                  >
                    <div className="tile-header">
                      <h3>{channel.title}</h3>
                      <button className="tile-arrow">
                        <span>→</span>
                      </button>
                    </div>
                    <div className="tile-body">
                      {/* Initial State Content */}
                      <div className="tile-static">
                        <p className="tile-desc">{channel.desc}</p>
                        <button className="tile-plus">+</button>
                      </div>
                      {/* Hover State Content */}
                      <ul className="tile-features">
                        {channel.features.map((feat, idx) => (
                          <li key={idx}>
                            <span>✓</span> {feat}
                          </li>
                        ))}
                      </ul>
                      <img
                        src={channel.img}
                        alt={channel.title}
                        className="tile-visual"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTELLIGENT CRM */}
      <section className="py-24 bg-[#0a0a0c] text-white" id="crm">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="text-brand-gold text-xs font-extrabold uppercase tracking-widest mb-4 block">
                  Player Intelligence
                </span>
                <h2 className="font-bebas text-5xl md:text-6xl text-white mb-6">
                  Intelligent <em className="text-brand-red not-italic">CRM Engine</em>
                </h2>
                <p className="text-zinc-400 text-md leading-relaxed mb-8">
                  Keep players highly engaged, loyal, and active. Our platform integrates deep player behavior analytics to automate personalized retention campaigns.
                </p>

                <ul className="flex flex-col gap-5">
                  <li className="flex gap-4 items-start">
                    <span className="text-brand-red text-xl font-bold leading-none">✓</span>
                    <div>
                      <strong className="text-white block font-bold text-sm mb-1">Multi-Channel Campaigns:</strong>
                      <span className="text-zinc-400 text-xs">Reach players via SMS, email, push notifications, and in-app alerts.</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-brand-red text-xl font-bold leading-none">✓</span>
                    <div>
                      <strong className="text-white block font-bold text-sm mb-1">Flexible Player Segmentation:</strong>
                      <span className="text-zinc-400 text-xs">Target users by betting behavior, volume, game preferences, and loyalty levels.</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-brand-red text-xl font-bold leading-none">✓</span>
                    <div>
                      <strong className="text-white block font-bold text-sm mb-1">Gamification & Free-to-Play:</strong>
                      <span className="text-zinc-400 text-xs">Build excitement with tournaments, spins, and interactive engagement tools.</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-brand-red text-xl font-bold leading-none">✓</span>
                    <div>
                      <strong className="text-white block font-bold text-sm mb-1">Automation & Analysis:</strong>
                      <span className="text-zinc-400 text-xs">Schedule automated triggers to reactivate lapsed players and optimize marketing spend.</span>
                    </div>
                  </li>
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 p-8 rounded-3xl">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-widest mb-2 block">
                    Full Player Lifecycle
                  </span>
                  <h4 className="text-lg font-bold text-white mb-3">Onboarding to Re-activation</h4>
                  <p className="text-zinc-400 text-xs mb-6">Our automated systems monitor and stimulate the entire player lifespan:</p>

                  <div className="flex flex-col gap-3">
                    <div className="lifecycle-step-card d-flex align-items-center gap-3 p-4 mb-1 rounded-2xl border-l-[3px] border-brand-red flex">
                      <div className="text-3xl">🚀</div>
                      <div>
                        <h6 className="text-sm font-bold text-white mb-0.5">Onboarding</h6>
                        <span className="text-[0.75rem] text-zinc-500">Smooth registration & custom welcome gifts</span>
                      </div>
                    </div>

                    <div className="lifecycle-step-card d-flex align-items-center gap-3 p-4 mb-1 rounded-2xl border-l-[3px] border-amber-500 flex">
                      <div className="text-3xl">🎯</div>
                      <div>
                        <h6 className="text-sm font-bold text-white mb-0.5">Engagement</h6>
                        <span className="text-[0.75rem] text-zinc-500">Daily tournaments & real-time betting updates</span>
                      </div>
                    </div>

                    <div className="lifecycle-step-card d-flex align-items-center gap-3 p-4 mb-1 rounded-2xl border-l-[3px] border-emerald-500 flex">
                      <div className="text-3xl">🔒</div>
                      <div>
                        <h6 className="text-sm font-bold text-white mb-0.5">Retention</h6>
                        <span className="text-[0.75rem] text-zinc-500">Loyalty progression tiers & customized cashbacks</span>
                      </div>
                    </div>

                    <div className="lifecycle-step-card d-flex align-items-center gap-3 p-4 rounded-2xl border-l-[3px] border-blue-500 flex">
                      <div className="text-3xl">🔄</div>
                      <div>
                        <h6 className="text-sm font-bold text-white mb-0.5">Re-activation</h6>
                        <span className="text-[0.75rem] text-zinc-500">Automated reminder offers & lapsed promo codes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>


      {/* 7. HARDWARE SOLUTIONS */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100" id="cashier">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-red text-xs font-extrabold uppercase tracking-widest block mb-4">
              Retail & Hardware Solutions
            </span>
            <h2 className="font-bebas text-5xl md:text-6xl text-zinc-950 mb-6">
              Cashier & <em className="text-brand-red not-italic">Terminals</em>
            </h2>
            <p className="text-zinc-500 text-md leading-relaxed">
              Maximize your street presence and retail shop profitability with physical self-service terminals and cashier systems.
            </p>
          </div>

          {/* PC Operator platform */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-16">
            <div className="order-2 lg:order-1">
              <Reveal>
                <span className="inline-block bg-brand-red text-white text-[0.7rem] font-bold tracking-widest uppercase py-1.5 px-4 rounded-full mb-4">
                  PC OPERATOR PLATFORM
                </span>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">Betplace: Accepting Bets on PC</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Betplace is our powerful, ultra-secure platform designed for accepting bets in land-based retail shops. It gives cashiers absolute ease of navigation to enter client tickets within milliseconds, maintaining maximum safety and system throughput.
                </p>
                <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className="text-4xl text-brand-red">📠</div>
                  <div>
                    <h5 className="font-bold text-zinc-900 text-sm mb-1">Thermal Ticket Printer</h5>
                    <p className="text-zinc-500 text-xs">Designed to output a receipt/ticket instantly upon accepting bets at the retail counter.</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2 text-center">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm flex flex-col items-center">
                  <div className="text-7xl mb-4">💻</div>
                  <h4 className="font-bold text-zinc-900 mb-1">Betplace PC Setup</h4>
                  <p className="text-zinc-400 text-xs">Clean Cashier POS interface with Thermal Printer integrations</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Autonomous self service */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-16 border-t border-zinc-100">
            <div className="text-center">
              <Reveal>
                <div className="bg-white border border-zinc-100 rounded-3xl p-8 shadow-sm flex flex-col items-center">
                  <div className="text-7xl mb-4">🖥️</div>
                  <h4 className="font-bold text-zinc-900 mb-1">SSBT Terminal Unit</h4>
                  <p className="text-zinc-400 text-xs">Autonomous Touch-Screen Betting Stand for Retail Floors</p>
                </div>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <span className="inline-block bg-brand-gold text-zinc-950 text-[0.7rem] font-bold tracking-widest uppercase py-1.5 px-4 rounded-full mb-4">
                  AUTONOMOUS SELF-SERVICE
                </span>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">SSBT: Modern Self-Service Betting Terminals</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  SSBT (Self-Service Betting Terminals) allow customers to place bets autonomously, without the involvement of a cashier. This is the ideal solution for expanding your retail sports betting network rapidly with minimal staff overheads.
                </p>
                <ul className="flex flex-col gap-2.5 text-zinc-600 text-xs font-semibold">
                  <li className="flex items-center gap-2">
                    <span className="text-brand-red text-sm">📌</span> Autocomplete touch-screen wagering slip
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-red text-sm">📌</span> Integrated cash acceptors and thermal printers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-brand-red text-sm">📌</span> Expanding retail footprints at zero added staffing cost
                  </li>
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PARTNERS WALL */}
      <section className="bg-zinc-950 overflow-hidden relative" id="partners">
        <div className="max-w-7xl mx-auto py-20 md:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="font-bebas text-4xl md:text-5xl text-white mb-6">
              Hundreds of Partners and Counting
            </h2>
            <p className="text-zinc-400 text-md max-w-2xl mx-auto leading-relaxed">
              Over the years, Red Hot Games has helped power hundreds of brands with iGaming software. Our clients get industry-proven products and exceptional service, supported by experienced teams.
            </p>
          </Reveal>
        </div>

        {/* Marquee Wrapper */}
        <div className="w-full relative h-[180px] mt-8 flex items-center">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div
            className="w-full h-[180px] animate-scroll-seamless bg-repeat-x"
            style={{
              backgroundImage: "url('/assets/img/partner_composition_x1.5.webp')",
              backgroundSize: "auto 100%",
            }}
          />
        </div>
      </section>

      {/* 9. FACTS & FIGURES & SECURITY SLIDER */}
      <section className="py-24" id="company">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-bebas text-5xl md:text-6xl text-zinc-950 mb-6">Facts &amp; Figures</h2>
            <p className="text-zinc-500 text-md leading-relaxed">
              Red Hot Games is a leading iGaming software provider, offering powerful solutions for managing online casinos and sports-focused gaming businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Stats Block (RED METRICS) */}
            <div className="lg:col-span-7 bg-[#e31e24] rounded-3xl p-10 md:p-12 flex flex-col justify-center shadow-xl shadow-red-900/10 relative overflow-hidden">
              {/* High-Tech Grid Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                  backgroundSize: "40px 40px"
                }}
              />
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full filter blur-[60px] translate-x-12 -translate-y-12 pointer-events-none" />

              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 relative z-10">
                <div className="flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                  <Counter target={1400} suffix="+" suffixClass="text-white" />
                  <span className="text-[0.68rem] font-bold text-red-100 uppercase tracking-widest mt-1">BRANDS USE RHG</span>
                </div>

                <div className="flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                  <Counter target={40000} suffix="+" suffixClass="text-white" />
                  <span className="text-[0.68rem] font-bold text-red-100 uppercase tracking-widest mt-1">CASINO GAMES</span>
                </div>

                <div className="flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                  <Counter target={300} suffix="+" suffixClass="text-white" />
                  <span className="text-[0.68rem] font-bold text-red-100 uppercase tracking-widest mt-1">GAME PROVIDERS</span>
                </div>

                <div className="flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="font-bebas text-5xl md:text-6xl text-white">#1</div>
                  <span className="text-[0.68rem] font-bold text-red-100 uppercase tracking-widest mt-1">IN CRYPTO GAMBLING</span>
                </div>

                <div className="flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                  <Counter target={2000} suffix="+" suffixClass="text-white" />
                  <span className="text-[0.68rem] font-bold text-red-100 uppercase tracking-widest mt-1">HARDWORKING STAFF</span>
                </div>

                <div className="flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                  <div className="font-bebas text-5xl md:text-6xl text-white">4</div>
                  <span className="text-[0.68rem] font-bold text-red-100 uppercase tracking-widest mt-1">OFFICES WORLDWIDE</span>
                </div>
              </div>
            </div>

            {/* Slider Block */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-3xl p-10 flex flex-col justify-between shadow-sm min-h-[300px] relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

              <div className="transition-opacity duration-300">
                <span className="text-zinc-500 text-[0.75rem] font-bold tracking-widest block mb-2 uppercase">
                  {SECURITY_SLIDES[securityIndex].tag}
                </span>

                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  {SECURITY_SLIDES[securityIndex].title}
                  <span className="text-3xl">{SECURITY_SLIDES[securityIndex].icon}</span>
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed">
                  {SECURITY_SLIDES[securityIndex].desc}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 border-t border-zinc-900 pt-6 z-10 relative">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSecurity}
                    className="w-10 h-10 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-brand-red flex items-center justify-center transition-colors cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextSecurity}
                    className="w-10 h-10 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white hover:border-brand-red flex items-center justify-center transition-colors cursor-pointer"
                  >
                    ›
                  </button>
                </div>
                <Link
                  href="/about"
                  className="text-xs font-bold text-zinc-400 hover:text-brand-red flex items-center gap-1.5 transition-colors"
                >
                  ABOUT US <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. NEWS SECTION */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-100" id="news">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-8">
              <span className="text-brand-red text-xs font-extrabold uppercase tracking-widest block mb-4">
                Stay Updated
              </span>
              <h2 className="font-bebas text-5xl md:text-6xl text-zinc-950 mb-6 leading-none">
                Latest News & <em className="text-brand-red not-italic">Insights</em>
              </h2>
              <p className="text-zinc-500 text-md leading-relaxed">
                Stay updated with our latest company news, SBC award announcements, and deep research compliance updates. Visit our blog directory to unlock valuable knowledge base guides for modern iGaming operators.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 bg-zinc-950 hover:bg-brand-red text-white font-semibold py-4.5 px-10 rounded-full transition-all duration-300 shadow-xl shadow-zinc-950/15 hover:-translate-y-1"
              >
                Go to Blog Directory
                <span className="text-lg">→</span>
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map((post) => (
              <Reveal key={post.id}>
                <div className="group bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-red-500/10 transition-all duration-500 h-full flex flex-col justify-between hover:-translate-y-1.5">
                  <div>
                    <div className="relative h-56 w-full bg-zinc-100 overflow-hidden">
                      <span className="absolute top-4 left-4 bg-zinc-950/70 backdrop-blur-md text-white text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full z-10">
                        {post.category}
                      </span>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 text-[0.7rem] font-bold text-zinc-400 mb-4 uppercase tracking-wider">
                        <span>📅 {post.date}</span>
                        <span>⏱️ {post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-zinc-950 mb-3 group-hover:text-brand-red transition-colors duration-300 line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                        {post.lead}
                      </p>
                    </div>
                  </div>

                  <div className="px-8 pb-8 border-t border-zinc-100/50 pt-5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-700 text-[0.7rem] font-bold flex items-center justify-center border border-zinc-200">
                        {post.authorInitials}
                      </div>
                      <span className="text-xs font-bold text-zinc-800">{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-xs font-bold text-brand-red hover:text-red-700 transition-colors flex items-center gap-1"
                    >
                      Read <span>→</span>
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
