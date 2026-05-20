"use client";

import { useEffect, useRef, useState } from "react";

const TEXTS = [
  "Best online casino software providers",
  "World-class betting solutions",
  
];

export function TypewriterBadge() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const currentStr = TEXTS[index];
    
    if (subIndex === currentStr.length + 1 && !reverse) {
      const t = setTimeout(() => setReverse(true), 2400);
      return () => clearTimeout(t);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % TEXTS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 35 : 65);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    setText(TEXTS[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <div className="inline-flex items-center gap-2.5 bg-red-600/8 backdrop-blur-md px-4 py-2 border border-red-500/10 rounded-full text-brand-red text-xs font-bold uppercase tracking-wider mb-6 h-[34px]">
      <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse-dot flex-shrink-0" />
      <span>{text || "\u200B"}</span>
    </div>
  );
}

export function Counter({ target, suffix = "", suffixClass = "text-brand-red" }: { target: number; suffix?: string; suffixClass?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let startTime: number | null = null;
          const duration = 1800;

          const animate = (now: number) => {
            if (!startTime) startTime = now;
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // cubic easeOut
            setCount(Math.round(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const displayValue = target >= 1000
    ? (count / 1000).toFixed(count % 1000 === 0 ? 0 : 1) + "K"
    : count;

  return (
    <div ref={ref} className="font-bebas text-5xl md:text-6xl text-white">
      {displayValue}
      <span className={suffixClass}>{suffix}</span>
    </div>
  );
}

// Simple IntersectionObserver reveal hook/component
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
}
