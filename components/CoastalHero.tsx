"use client";

import { useEffect, useMemo, useState } from "react";
import MaskedHeading from "./MaskedHeading";
import { ArrowDown, ArrowUpRight, Command, Moon, Sparkles, Sun, X } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const sections = ["Home", "About", "Work", "Journey", "Toolkit", "Contact"] as const;
const IST = "Asia/Kolkata";

function getMumbaiHour(d: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  return Number(parts.find((p) => p.type === "hour")?.value ?? 0) + Number(parts.find((p) => p.type === "minute")?.value ?? 0) / 60;
}

function formatClock(d: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: IST,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(d);
}

export default function CoastalHero() {
  const [now, setNow] = useState<Date | null>(null);
  const [shooting, setShooting] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [override, setOverride] = useState<"auto" | "day" | "night">("auto");
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 0.55], [0, prefersReducedMotion ? 0 : 115]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, prefersReducedMotion ? 0 : -95]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.24], [1, 0]);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const currentHour = now ? getMumbaiHour(now) : 21;
  const mode = useMemo<"day" | "night">(() => {
    if (override !== "auto") return override;
    return currentHour >= 6 && currentHour < 18 ? "day" : "night";
  }, [currentHour, override]);

  const progress = useMemo(() => {
    if (mode === "day") return Math.min(1, Math.max(0, (currentHour - 6) / 12));
    return currentHour >= 18 ? (currentHour - 18) / 12 : (currentHour + 6) / 12;
  }, [mode, currentHour]);

  const orbX = `${22 + progress * 58}%`;
  const orbY = `${20 - Math.sin(progress * Math.PI) * 10}%`;

  const launchStars = () => setShooting((previous) => previous + 1);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setMenuOpen((open) => !open);
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!shooting) return;
    const timer = window.setTimeout(() => setShooting(0), 4300);
    return () => window.clearTimeout(timer);
  }, [shooting]);

  return (
    <div className={`site mode-${mode}`}>
      <section id="home" className="hero" aria-label="Malavika Vivek introduction">
        <motion.div className="scenery" style={{ y: bgY }} aria-hidden="true">
          <div className="sky" />
          <div className="auric-haze" />
          <div className="starfield" />
          <div className="cloud-bank" />
          <div className="celestial" style={{ left: orbX, top: orbY }}>
            <span className="orb" />
            <span className="orb-detail" />
          </div>
          <div className="ocean-photo" />
          <div className="ocean-depth" />
          <div className="surface-glimmer" />
          <div className="reflection" style={{ left: orbX }} />
          <div className="beach-sheen" />
          <div className="shore-foam shore-foam-back" />
          <div className="shore-foam shore-foam-front" />
          <div className="glass-reflection glass-reflection-left" />
          <div className="glass-reflection glass-reflection-right" />
          <div className="glass-frame frame-left" />
          <div className="glass-frame frame-right" />
          <div className="lounge-silhouette" />
          <div className="vignette" />
          {shooting > 0 && !prefersReducedMotion && (
            <div key={shooting} className="meteor-shower">
              {[
                ["8%", "16%", "0s", "1.08s"],
                ["36%", "10%", ".25s", "1.18s"],
                ["67%", "20%", ".52s", "1.04s"],
                ["21%", "30%", ".8s", "1.16s"],
                ["84%", "12%", "1.1s", "1.18s"],
                ["51%", "27%", "1.42s", "1.16s"],
                ["12%", "40%", "1.74s", "1.2s"],
                ["75%", "33%", "2.05s", "1.1s"],
                ["33%", "21%", "2.36s", "1.23s"],
                ["91%", "36%", "2.58s", "1.1s"],
                ["56%", "13%", "2.84s", "1.22s"],
              ].map(([left, top, delay, duration], index) => (
                <div
                  key={index}
                  className="shooting-star"
                  style={{ left, top, animationDelay: delay, animationDuration: duration }}
                />
              ))}
            </div>
          )}
        </motion.div>

        <header className="nav-wrap">
          <nav className="nav" aria-label="Primary navigation">
            <a href="#home" className="monogram">MV</a>
            <div className="nav-links">
              {sections.slice(1).map((item) => (
                <a key={item} href={item === "About" ? "#about" : "#coming-next"}>{item}</a>
              ))}
            </div>
            <button className="star-button" onClick={launchStars} title="A little surprise" aria-label="Show shooting stars"><Sparkles size={18} /></button>
            <button className="command-button" onClick={() => setMenuOpen(true)} aria-label="Open quick navigation"><Command size={15} /> K</button>
          </nav>
        </header>

        <motion.div className="hero-copy" style={{ y: textY, opacity: textOpacity }}>
          <h1 className="hero-name" aria-label="Malavika Vivek">
            <MaskedHeading text="MALAVIKA" mediaType="video" src="/reel.mp4" poster="/reel-poster.webp" fillScale={1.3} parallax={34} reveal="scale" trigger="view" spotlight spotlightRadius={180} outline />
            <MaskedHeading text="VIVEK" mediaType="video" src="/reel.mp4" poster="/reel-poster.webp" fillScale={1.3} parallax={34} reveal="scale" trigger="view" spotlight spotlightRadius={180} outline className="mint-name" />
          </h1>
          <p className="statement">I like turning ambitious ideas<br className="desktop-break" /> into things people can actually use.</p>
          <p className="description">Engineering student and curious explorer<br className="desktop-break" /> (deep diving into mythology, geopolitics, and pop-culture)</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#coming-next">Explore My Work <ArrowUpRight size={17} /></a>
            <a className="btn btn-secondary" href="#about">Get to Know Me <ArrowUpRight size={17} /></a>
          </div>
        </motion.div>

        <div className="hero-bottom hero-bottom-minimal">
          <span className="hero-signal"><span className="live-dot" /> STATUS · BUILDING <span className="signal-separator">—</span> {now ? formatClock(now) : "--:--"} IST</span>
          <a className="hero-scroll-link" href="#about">SCROLL TO ENTER <ArrowDown size={16} /></a>
        </div>

        <div className="mode-switcher" aria-label="Appearance settings">
          <button
            onClick={() =>
              setOverride(
                override === "auto" ? (mode === "night" ? "day" : "night") : override === "night" ? "day" : "auto"
              )
            }
            title="Preview day/night modes"
          >
            {mode === "night" ? <Moon size={15} /> : <Sun size={15} />} <span>{override === "auto" ? "AUTO" : `${override.toUpperCase()} · PREVIEW`}</span>
          </button>
        </div>
      </section>

      <section className="manifesto" id="about">
        <p className="section-index">01 / THE MANIFESTO</p>
        <h2>ENGINEER BY<br /> EDUCATION.<br /><span>CURIOUS BY NATURE.</span></h2>
        <p>Somewhere between technology, big ideas, stories, and an ever-growing list of things worth exploring.</p>
        <div className="next-note" id="coming-next">The next chapter is coming together. <a href="#home">Back to the ocean ↑</a></div>
      </section>

      {menuOpen && (
        <div className="modal-backdrop" onClick={() => setMenuOpen(false)} role="presentation">
          <div className="command-modal" role="dialog" aria-modal="true" aria-label="Quick navigation" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title"><span><Command size={16} /> SIGNAL / QUICK NAV</span><button onClick={() => setMenuOpen(false)} aria-label="Close"><X size={18} /></button></div>
            {[...sections, "Shooting stars"].map((item) => (
              <button
                className="modal-item"
                key={item}
                onClick={() => {
                  setMenuOpen(false);
                  if (item === "Shooting stars") launchStars();
                  else document.getElementById(item === "Home" ? "home" : item === "About" ? "about" : "coming-next")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {item}<ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
