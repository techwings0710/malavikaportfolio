"use client";

import { ArrowDown, ArrowRight, ArrowUpRight, Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  mode: "day" | "night";
  display: "auto" | "day" | "night";
  clockText: string;
  onDisplayChange: () => void;
  stars: number;
};

// Original photo-based hero. Does not contain React Bits Pro licensed source.
export default function PhotoHero({ mode, display, clockText, onDisplayChange, stars }: Props) {
  const reduced = useReducedMotion();
  const reveal = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20, filter: reduced ? "none" : "blur(14px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: reduced ? 0 : 1.1, delay: reduced ? 0 : delay, ease: "easeOut" as const },
  });

  return <section className="hero-v3 photo-hero" id="home" aria-label="Introduction">
    <div className="hero-scene" aria-hidden="true">
      <img className="backwaters-photo" src="/images/kerala-backwaters-small-boat.webp" alt="" fetchPriority="high"/>
      <div className="hero-photo-shade"/>
    </div>
    <div className="hero-side-index">A STORY IN PROGRESS <span>—</span> 2026</div>
    <div className="hero-main">
      <motion.div className="hero-little" {...reveal(.1)}><span className="beacon"/> HELLO, I'M</motion.div>
      <h1 className="name-heading" aria-label="Malavika Vivek">
        <motion.span aria-hidden="true" {...reveal(.25)}>MALAVIKA</motion.span>
        <motion.span aria-hidden="true" {...reveal(.45)}>VIVEK<span className="name-period">.</span></motion.span>
      </h1>
      <motion.div className="hero-intro-grid" {...reveal(.65)}><div className="hero-intro">
        <p className="hero-statement">I like turning ambitious ideas into things people can actually use.</p>
        <p className="hero-description">Engineering student and curious explorer. Usually deep-diving into technology, mythology, geopolitics or pop culture—and almost always asking another question.</p>
        <div className="hero-buttons"><a href="#build" className="action-primary">See what I've built <ArrowUpRight size={18}/></a><a href="#journey" className="action-link">Get to know me <ArrowRight size={18}/></a></div>
      </div></motion.div>
    </div>
    <div className="hero-foot"><div className="foot-status"><span className="beacon"/> OPEN TO INTERNSHIPS & COLLABORATIONS</div><div className="foot-tools"><button onClick={onDisplayChange} aria-label={`Appearance: ${display}. Change appearance.`}>{mode==="day"?<Sun size={14}/>:<Moon size={14}/>} {display==="auto"?"AUTO":display.toUpperCase()}</button><span>{clockText} IST</span></div><a href="#manifesto">SCROLL TO ENTER <ArrowDown size={15}/></a></div>
    {stars>0&&!reduced&&<div key={stars} className="star-event" aria-hidden="true">{Array.from({length:9},(_,i)=><i key={i} style={{left:`${7+i*10}%`,top:`${8+(i%4)*13}%`,animationDelay:`${i*.19}s`}}/>)}</div>}
  </section>;
}
