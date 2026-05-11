"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number = 0;
  y: number = 0;
  rad: number = 0;
  vx: number = 0;
  vy: number = 0;
  a: number = 0;
  col: string = "";
  W: number;
  H: number;

  constructor(W: number, H: number) {
    this.W = W;
    this.H = H;
    this.reset();
  }

  random(a: number, b: number) {
    return a + Math.random() * (b - a);
  }

  reset() {
    this.x = this.random(0, this.W);
    this.y = this.random(0, this.H);
    this.rad = this.random(0.5, 2.2);
    this.vx = this.random(-0.3, 0.3);
    this.vy = this.random(-0.4, -0.1);
    this.a = this.random(0.1, 0.5);
    this.col = Math.random() > 0.5 ? "255,61,0" : "255,143,0";
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10 || this.x < -10 || this.x > this.W + 10) {
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.col},${this.a})`;
    ctx.fill();
  }
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    let particles: Particle[] = [];
    const maxParticles = 80;

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle(W, H));
    }

    const handleResize = () => {
      if (!canvas) return;
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particles.forEach((p) => {
        p.W = W;
        p.H = H;
      });
    };

    window.addEventListener("resize", handleResize);

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.hypot(dx, dy);

          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,61,0,${0.04 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    let animationId: number;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      drawLines();
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-50"
      id="particles"
    />
  );
}
