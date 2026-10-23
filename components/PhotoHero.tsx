"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { usePreloaderReady } from "./tds/image-stack-preloader/PreloaderGate";

type Props = {
  mode: "day" | "night";
  display: "auto" | "day" | "night";
  clockText: string;
  onDisplayChange: () => void;
  stars: number;
};

// Ordered Bayer dithering, adapted from the supplied React Bits Dither example
// so the pattern follows the actual photograph instead of a generated wave.
const bayer8 = [
  0,48,12,60,3,51,15,63,32,16,44,28,35,19,47,31,
  8,56,4,52,11,59,7,55,40,24,36,20,43,27,39,23,
  2,50,14,62,1,49,13,61,34,18,46,30,33,17,45,29,
  10,58,6,54,9,57,5,53,42,26,38,22,41,25,37,21,
];
const portraitPalette = [
  [9,27,32], [25,56,59], [59,105,100], [115,154,134], [172,207,177], [229,230,209],
];

// Original photo-based hero. Does not contain React Bits Pro licensed source.
export default function PhotoHero({ mode, display, clockText, onDisplayChange, stars }: Props) {
  const reduced = useReducedMotion();
  const ready = usePreloaderReady();
  const portrait = useRef<HTMLDivElement>(null);
  const pixels = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const stage = portrait.current;
    const canvas = pixels.current;
    if (!stage || !canvas) return;
    const image = new Image();
    image.src = "/images/loader/official-portrait.webp";
    const draw = () => {
      if (!image.naturalWidth) return;
      const bounds = stage.getBoundingClientRect();
      const width = Math.max(120, Math.round(bounds.width / 3.5));
      const height = Math.max(70, Math.round(bounds.height / 3.5));
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) return;
      const start = window.matchMedia("(max-width: 760px)").matches ? 0 : Math.round(width * .39);
      const photoWidth = width - start;
      const imageRatio = image.naturalWidth / image.naturalHeight;
      const boxRatio = photoWidth / height;
      const sourceWidth = imageRatio > boxRatio ? image.naturalHeight * boxRatio : image.naturalWidth;
      const sourceHeight = imageRatio > boxRatio ? image.naturalHeight : image.naturalWidth / boxRatio;
      const sourceX = (image.naturalWidth - sourceWidth) / 2;
      const sourceY = (image.naturalHeight - sourceHeight) / 2;
      // Carry the photographed wall into the reading area, preserving its
      // colour and the same Bayer pattern without repeating the face.
      if (start) context.drawImage(image, sourceX, sourceY, 1, sourceHeight, 0, 0, start, height);
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, start, 0, photoWidth, height);
      const frame = context.getImageData(0, 0, width, height);
      const pixels = frame.data;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const luminance = (pixels[i] * .2126 + pixels[i+1] * .7152 + pixels[i+2] * .0722) / 255;
          const threshold = (bayer8[(y % 8) * 8 + x % 8] / 64 - .5) / (portraitPalette.length - 1);
          const tone = Math.max(0, Math.min(portraitPalette.length - 1, Math.round((luminance * 1.12 - .07 + threshold) * (portraitPalette.length - 1))));
          const color = portraitPalette[tone];
          pixels[i] = color[0]; pixels[i+1] = color[1]; pixels[i+2] = color[2];
        }
      }
      context.putImageData(frame, 0, 0);
    };
    if (image.complete) draw();
    else image.addEventListener("load", draw);
    const observer = new ResizeObserver(draw);
    observer.observe(stage);
    return () => { observer.disconnect(); image.removeEventListener("load", draw); };
  }, []);
  const moveFocus = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const stage = portrait.current;
    if (!stage) return;
    const sharp = stage.querySelector<HTMLElement>(".portrait-sharp");
    if (!sharp) return;
    const rect = sharp.getBoundingClientRect();
    sharp.style.setProperty("--focus-x", `${event.clientX - rect.left}px`);
    sharp.style.setProperty("--focus-y", `${event.clientY - rect.top}px`);
    stage.dataset.revealing = "true";
  };
  const reveal = (delay: number) => ({
    initial: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 20, filter: reduced ? "none" : "blur(14px)" },
    animate: ready || reduced ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 20, filter: "blur(14px)" },
    transition: { duration: reduced ? 0 : 1.1, delay: reduced ? 0 : delay, ease: "easeOut" as const },
  });

  return <section className="hero-v3 photo-hero" id="home" aria-label="Introduction" onPointerMove={moveFocus} onPointerLeave={()=>{if(portrait.current)portrait.current.dataset.revealing="false";}}>
    <div className="hero-scene" aria-hidden="true">
      <div className="portrait-stage" ref={portrait}>
        <canvas className="portrait-pixels" ref={pixels}/>
        <img className="portrait-sharp" src="/images/loader/official-portrait.webp" alt="" fetchPriority="high"/>
      </div>
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
