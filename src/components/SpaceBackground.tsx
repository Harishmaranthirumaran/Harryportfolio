import { useEffect, useRef } from "react";

/**
 * SpaceBackground
 * A premium, depth-layered canvas starfield with:
 *  - 3 parallax star layers (far / mid / near) with subtle drift
 *  - Realistic twinkle (per-star phase + speed)
 *  - Occasional shooting stars / comets with glowing tails
 *  - Soft nebula glow clouds (radial gradients, slow drift)
 *  - Mouse-reactive parallax
 *  - Fully responsive + resize aware, capped pixel ratio for perf
 */

type Star = {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  layer: 0 | 1 | 2;
  hue: number;
};

type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  length: number;
};

const LAYER_SPEED = [0.02, 0.05, 0.1];
const LAYER_COUNT_DESKTOP = [220, 120, 60];
const LAYER_COUNT_MOBILE = [90, 55, 30]; // fewer stars on small/low-power devices

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    const stars: Star[] = [];
    let comets: Comet[] = [];
    let animationId: number;
    let time = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initStars = () => {
      stars.length = 0;
      const counts = isMobile ? LAYER_COUNT_MOBILE : LAYER_COUNT_DESKTOP;
      counts.forEach((count, layerIdx) => {
        for (let i = 0; i < count; i++) {
          const layer = layerIdx as 0 | 1 | 2;
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: layer === 0 ? Math.random() * 0.6 + 0.3
                    : layer === 1 ? Math.random() * 0.9 + 0.5
                    : Math.random() * 1.4 + 0.8,
            baseAlpha: layer === 0 ? Math.random() * 0.4 + 0.2
                     : layer === 1 ? Math.random() * 0.5 + 0.3
                     : Math.random() * 0.6 + 0.4,
            twinkleSpeed: Math.random() * 0.015 + 0.003,
            phase: Math.random() * Math.PI * 2,
            layer,
            hue: Math.random() > 0.85 ? 210 + Math.random() * 40 : 0, // occasional blue-tinted stars
          });
        }
      });
    };

    const spawnComet = (offsetSeed = 0) => {
      // Enter from top-right area, exit toward bottom-left — matches requested direction
      const startX = width * (0.6 + Math.random() * 0.4);
      const startY = height * (Math.random() * 0.3) + offsetSeed * 20;
      const angle = (135 + (Math.random() * 20 - 10)) * (Math.PI / 180); // ~135deg = down-left
      const speed = 6 + Math.random() * 4;
      comets.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 70 + Math.random() * 30,
        length: 80 + Math.random() * 60,
      });
    };

    const spawnCometBurst = () => {
      // 3-4 on desktop, lighter 2-3 on mobile to save battery/perf
      const count = isMobile ? 2 + Math.floor(Math.random() * 2) : 3 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        setTimeout(() => spawnComet(i), i * 90);
      }
    };

    let nextCometAt = 200 + Math.random() * 300;

    // Scroll-triggered comet bursts, throttled so a scroll gesture fires once, not per pixel
    let scrollThrottled = false;
    const handleScroll = () => {
      if (scrollThrottled) return;
      scrollThrottled = true;
      spawnCometBurst();
      setTimeout(() => { scrollThrottled = false; }, isMobile ? 1200 : 900);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleScroll, { passive: true });

    const draw = () => {
      time += 1;

      // Deep space base gradient (radial, subtle vignette)
      const bgGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.35, 0,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.9
      );
      bgGrad.addColorStop(0, "#0d1224");
      bgGrad.addColorStop(0.4, "#080b16");
      bgGrad.addColorStop(1, "#020306");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Nebula glow clouds — slow drifting radial blobs
      const nebulae = [
        { x: width * 0.15 + Math.sin(time * 0.0006) * 60, y: height * 0.2 + Math.cos(time * 0.0005) * 40, r: width * 0.35, c: "rgba(76,90,220,0.10)" },
        { x: width * 0.85 + Math.cos(time * 0.0004) * 50, y: height * 0.6 + Math.sin(time * 0.0007) * 60, r: width * 0.3, c: "rgba(140,80,220,0.09)" },
        { x: width * 0.5 + Math.sin(time * 0.0003) * 80, y: height * 0.85 + Math.cos(time * 0.0004) * 30, r: width * 0.28, c: "rgba(40,130,200,0.08)" },
      ];
      nebulae.forEach((n) => {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
        g.addColorStop(0, n.c);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      });

      // Parallax offset from mouse
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Stars
      stars.forEach((s) => {
        const drift = LAYER_SPEED[s.layer];
        const px = s.x + mx * drift * 20;
        const py = s.y + my * drift * 20 + (time * drift * 0.15) % height;
        const wrappedY = ((py % height) + height) % height;

        const twinkle = Math.sin(time * s.twinkleSpeed + s.phase) * 0.5 + 0.5;
        const alpha = s.baseAlpha * (0.5 + twinkle * 0.5);

        ctx.beginPath();
        if (s.hue > 0) {
          ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        }
        ctx.arc(px, wrappedY, s.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow halo for bigger/near stars (skipped on mobile — costly per-star gradient)
        if (!isMobile && s.layer === 2 && s.radius > 1.1) {
          const glow = ctx.createRadialGradient(px, wrappedY, 0, px, wrappedY, s.radius * 6);
          glow.addColorStop(0, `rgba(180,200,255,${alpha * 0.35})`);
          glow.addColorStop(1, "rgba(180,200,255,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, wrappedY, s.radius * 6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Comets
      if (time > nextCometAt) {
        spawnComet();
        nextCometAt = time + 250 + Math.random() * 400;
      }

      comets = comets.filter((c) => c.life < c.maxLife);
      comets.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.life += 1;

        const fadeIn = Math.min(c.life / 10, 1);
        const fadeOut = Math.min((c.maxLife - c.life) / 15, 1);
        const alpha = Math.min(fadeIn, fadeOut);

        const tailX = c.x - c.vx * (c.length / 10);
        const tailY = c.y - c.vy * (c.length / 10);

        const grad = ctx.createLinearGradient(c.x, c.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(0.3, `rgba(180,200,255,${alpha * 0.6})`);
        grad.addColorStop(1, "rgba(140,120,255,0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Bright head
        const headGlow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 4);
        headGlow.addColorStop(0, `rgba(255,255,255,${alpha})`);
        headGlow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      mouseRef.current = {
        x: (touch.clientX / window.innerWidth - 0.5) * 2,
        y: (touch.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    // Also nudge on device tilt for a subtle mobile-native parallax feel
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      mouseRef.current = {
        x: Math.max(-1, Math.min(1, e.gamma / 30)),
        y: Math.max(-1, Math.min(1, (e.beta - 45) / 30)),
      };
    };

    const handleResize = () => {
      resize();
      initStars();
    };

    resize();
    initStars();
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    if (isMobile) window.addEventListener("deviceorientation", handleOrientation, { passive: true });
    window.addEventListener("resize", handleResize);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#020306" }}
      aria-hidden="true"
    />
  );
}
