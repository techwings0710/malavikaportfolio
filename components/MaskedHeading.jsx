'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './MaskedHeading.css';

/** Hero-compatible JS/CSS adaptation of React Bits MaskedHeading API.
 * For the upstream registry implementation run:
 * npx shadcn@latest add @react-bits/MaskedHeading-JS-CSS
 */
export default function MaskedHeading({
  text, tag: Tag = 'span', mediaType = 'video', src = '/reel.mp4',
  poster = '/reel-poster.webp', fillScale = 1.3, parallax = 34,
  reveal = 'scale', trigger = 'view', spotlight = true, spotlightRadius = 180,
  outline = true, outlineColor = 'rgba(182,255,241,.28)',
  outlineWidth = 0.8, className = '', style = {}, ...rest
}) {
  const element = useRef(null);
  const video = useRef(null);
  const masked = useRef(null);
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const clipId = `masked-${uid}`;
  const [box, setBox] = useState({ width: 650, height: 116, font: 110, baseline: 98, spacing: -7 });
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [spotActive, setSpotActive] = useState(false);

  useEffect(() => {
    const el = element.current;
    if (!el) return;
    const measure = () => {
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize) || 100;
      const height = el.getBoundingClientRect().height;
      setBox({ width: el.clientWidth, height, font: size, baseline: (height - size * (parseFloat(cs.lineHeight) / size || .83)) / 2 + size * .83, spacing: parseFloat(cs.letterSpacing) || 0 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [text]);

  useEffect(() => {
    const el = masked.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || reveal === 'none') return;
    gsap.set(el, { autoAlpha: 0, scale: reveal === 'scale' ? .88 : 1, y: reveal === 'rise' ? 26 : 0, filter: reveal === 'blur' ? 'blur(12px)' : 'none' });
    const play = () => gsap.to(el, { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out', overwrite: true });
    if (trigger === 'hover') {
      element.current?.addEventListener('pointerenter', play);
      return () => element.current?.removeEventListener('pointerenter', play);
    }
    if (trigger === 'view') {
      const io = new IntersectionObserver(entries => { if (entries.some(e => e.isIntersecting)) { play(); io.disconnect(); } }, {threshold: .15});
      io.observe(element.current);
      return () => io.disconnect();
    }
    play();
  }, [text, reveal, trigger]);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (video.current && reduce) video.current.pause();
  }, []);

  function onPointerMove(e) {
    const b = element.current.getBoundingClientRect();
    setPointer({ x: ((e.clientX - b.left) / b.width) * 100, y: ((e.clientY - b.top) / b.height) * 100 });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && masked.current) {
      gsap.to(masked.current.querySelector('.masked-heading__media'), {
        x: (((e.clientX - b.left) / b.width) - .5) * -parallax,
        y: (((e.clientY - b.top) / b.height) - .5) * -parallax,
        duration: .65, ease: 'power2.out', overwrite: true
      });
    }
  }

  return <Tag ref={element} className={`masked-heading ${className}`.trim()} style={style} onPointerEnter={() => setSpotActive(true)} onPointerLeave={() => setSpotActive(false)} onPointerMove={onPointerMove} {...rest}>
    <span className="masked-heading__fallback" aria-hidden="true">{text}</span>
    <svg className="masked-heading__defs" aria-hidden="true" width="0" height="0"><defs>
      <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
        <text x="0" y={box.baseline} style={{fontFamily:'inherit',fontSize:box.font,fontWeight:800,letterSpacing:box.spacing}}>{text}</text>
      </clipPath>
    </defs></svg>
    <span className="masked-heading__reveal" ref={masked} aria-hidden="true">
      <span className="masked-heading__clip" style={{clipPath:`url(#${clipId})`}}>
        <span className="masked-heading__media" style={{transform:`scale(${fillScale})`}}>
          {mediaType === 'video' ? <video ref={video} src={src} poster={poster} autoPlay muted playsInline loop preload="metadata" /> : <img src={src} alt="" />}
        </span>
        {spotlight && <span className="masked-heading__spotlight" style={{background:`radial-gradient(circle ${spotlightRadius}px at ${pointer.x}% ${pointer.y}%, transparent, ${spotActive ? 'rgba(0,9,17,.36)' : 'rgba(0,9,17,.13)'})`}} />}
      </span>
      {outline && <span className="masked-heading__outline" style={{WebkitTextStroke:`${outlineWidth}px ${outlineColor}`}}>{text}</span>}
    </span>
    <span className="masked-heading__sr">{text}</span>
  </Tag>;
}
