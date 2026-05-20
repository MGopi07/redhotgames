"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Scroll handler for sticky compact navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for current active section highlighting on homepage
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = document.querySelectorAll("section[id], div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-120px 0px -60% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => {
      sections.forEach((s) => observer.unobserve(s));
    };
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's a hash link and we are on home page, scroll smoothly
    if (href.startsWith("#") || href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace(/^\/?#/, "");

      if (pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/#${targetId}`);
      }
      setMobileMenuOpen(false);
    }
  };

  const getLinkClass = (href: string) => {
    const baseClass = "text-[0.95rem] font-semibold transition-colors duration-300 relative py-2 px-3 block after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-6 after:h-[3px] after:bg-brand-red after:rounded-full after:-translate-x-1/2 after:scale-x-0 after:transition-transform after:duration-300 hover:text-brand-red";
    const activeClass = " text-brand-red after:scale-x-100";
    const inactiveClass = " text-zinc-900";

    const isHash = href.startsWith("#") || href.startsWith("/#");
    const targetId = href.replace(/^\/?#/, "");

    if (isHash) {
      if (pathname === "/" && activeSection === targetId) {
        return `${baseClass}${activeClass}`;
      }
      return `${baseClass}${inactiveClass}`;
    }

    if (pathname === href || (href === "/blog" && pathname.startsWith("/blog"))) {
      return `${baseClass}${activeClass}`;
    }

    return `${baseClass}${inactiveClass}`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center ${scrolled
          ? "h-[72px] bg-white border-b border-zinc-100 shadow-md shadow-zinc-100/10"
          : "h-[80px] bg-white/90 backdrop-blur-md border-b border-zinc-100"
          }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/assets/img/logo/Redhotgames.png"
              alt="Red Hot Games"
              className="h-7 w-auto object-contain"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-6">
            <ul className="flex items-center gap-1">

              <li>
                <a
                  href="/#modules"
                  onClick={(e) => handleLinkClick(e, "/#modules")}
                  className={getLinkClass("/#modules")}
                >
                  Platform modules
                </a>
              </li>
              <li>
                <a
                  href="/#channels"
                  onClick={(e) => handleLinkClick(e, "/#channels")}
                  className={getLinkClass("/#channels")}
                >
                  Channels
                </a>
              </li>
              <li>
                <a
                  href="/#crm"
                  onClick={(e) => handleLinkClick(e, "/#crm")}
                  className={getLinkClass("/#crm")}
                >
                  CRM
                </a>
              </li>

              <li>
                <Link href="/about" className={getLinkClass("/about")}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/terminal" className={getLinkClass("/terminal")}>
                  Terminal
                </Link>
              </li>
              <li>
                <Link href="/blog" className={getLinkClass("/blog")}>
                  Blog
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact Action */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden xl:inline-block bg-brand-red text-white text-xs font-bold uppercase tracking-wider py-3 px-8 rounded-full hover:bg-red-700 shadow-lg hover:-translate-y-0.5 shadow-brand-red/20 transition-all duration-300"
            >
              Contact Us
            </Link>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 border border-zinc-100 rounded-lg bg-zinc-50 hover:bg-zinc-100 transition-colors z-50 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`w-6 h-[2px] bg-zinc-900 rounded-full transition-transform duration-300 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
              />
              <span
                className={`w-6 h-[2px] bg-zinc-900 rounded-full transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`w-6 h-[2px] bg-zinc-900 rounded-full transition-transform duration-300 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Offcanvas Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-2xl z-40 p-6 flex flex-col justify-between transition-transform duration-300 xl:hidden ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="mt-20">
          <h5 className="text-[0.8rem] font-extrabold uppercase tracking-widest text-zinc-400 mb-6 border-b border-zinc-100 pb-3">
            Menu
          </h5>
          <ul className="flex flex-col gap-1">
            <li>
              <a
                href="/#modules"
                onClick={(e) => handleLinkClick(e, "/#modules")}
                className="text-lg font-bold text-zinc-900 hover:text-brand-red py-3 block border-b border-zinc-50 transition-colors"
              >
                Platform Modules
              </a>
            </li>
            <li>
              <a
                href="/#channels"
                onClick={(e) => handleLinkClick(e, "/#channels")}
                className="text-lg font-bold text-zinc-900 hover:text-brand-red py-3 block border-b border-zinc-50 transition-colors"
              >
                Omnichannel
              </a>
            </li>
            <li>
              <a
                href="/#crm"
                onClick={(e) => handleLinkClick(e, "/#crm")}
                className="text-lg font-bold text-zinc-900 hover:text-brand-red py-3 block border-b border-zinc-50 transition-colors"
              >
                Intelligent CRM
              </a>
            </li>
            <li>
              <a
                href="/#partnership"
                onClick={(e) => handleLinkClick(e, "/#partnership")}
                className="text-lg font-bold text-zinc-900 hover:text-brand-red py-3 block border-b border-zinc-50 transition-colors"
              >
                Partnerships
              </a>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-bold py-3 block border-b border-zinc-50 transition-colors ${pathname === "/about" ? "text-brand-red" : "text-zinc-900 hover:text-brand-red"
                  }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-bold py-3 block border-b border-zinc-50 transition-colors ${pathname.startsWith("/blog") ? "text-brand-red" : "text-zinc-900 hover:text-brand-red"
                  }`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/terminal"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-bold py-3 block border-b border-zinc-50 transition-colors ${pathname === "/terminal" ? "text-brand-red" : "text-zinc-900 hover:text-brand-red"
                  }`}
              >
                Terminal
              </Link>
            </li>
          </ul>
        </div>

        <div className="mb-4">
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-brand-red text-white font-semibold text-center block w-full py-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-brand-red/20"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
