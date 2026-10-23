"use client";
import { useLayoutEffect, useRef, useState } from "react";
import "./image-stack-preloader.css";

const HOP = "cubic-bezier(0.9, 0, 0.1, 1)";
const IN_OUT_3 = "cubic-bezier(0.645, 0.045, 0.355, 1)"; // power3.inOut
const IN_3 = "cubic-bezier(0.55, 0.055, 0.675, 0.19)"; // power3.in

export function ImageStackPreloader({ name, images, onDone, onReveal }: { name: string; images: string[]; onDone?: () => void; onReveal?: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  const callbacks = useRef({ onDone, onReveal });
  callbacks.current = { onDone, onReveal };

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || typeof el.animate !== "function") {
      el.style.display = "none";
      callbacks.current.onDone?.();
      return;
    }
    const anims: Animation[] = [];
    const timers: number[] = [];
    const at = (t: Element, frames: Keyframe[], start: number, dur: number, easing = HOP) =>
      anims.push(t.animate(frames, { delay: Math.max(0, start) * 1000, duration: dur * 1000, easing, fill: "forwards" }));
    let cancelled = false;
    el.classList.add("tds-pre--run");
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      preference.removeEventListener("change", onPreference);
      anims.forEach(a => a.cancel());
      timers.forEach(t => window.clearTimeout(t));
      el.style.display = "none";
      setGone(true);
      callbacks.current.onReveal?.();
      callbacks.current.onDone?.();
    };
    const onPreference = () => { if (preference.matches) finish(); };
    preference.addEventListener("change", onPreference);
    // A failed font request must never trap the visitor behind the loader.
    const watchdog = window.setTimeout(finish, 15000);
    timers.push(watchdog);

    document.fonts.ready.then(() => {
      if (cancelled) return;
      el.classList.add("tds-pre--run");
      window.clearTimeout(watchdog);
      const t0 = 0.25;
      const bar = el.querySelector(".tds-pre__bar")!;
      const frame = el.querySelector(".tds-pre__frame")!;
      const shots = Array.from(el.querySelectorAll(".tds-pre__shot"));
      const chars = Array.from(el.querySelectorAll(".tds-pre__char > span"));
      const screen = el.querySelector(".tds-pre__screen") as HTMLElement;

      at(bar, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], t0, 4, IN_OUT_3);
      at(bar, [{ transform: "scaleX(1)", transformOrigin: "right" }, { transform: "scaleX(0)", transformOrigin: "right" }], t0 + 4, 1, IN_3);

      shots.forEach((s, i) => {
        at(s, [{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }], t0 + i * 0.75, 1);
        at(s.firstElementChild!, [{ transform: "scale(2)" }, { transform: "scale(1)" }], t0 + i * 0.75 - 0.25, 1.5);
      });

      chars.forEach((c, i) => {
        const from = i % 2 === 0 ? -100 : 100;
        at(c, [{ transform: `translateY(${from}%)` }, { transform: "translateY(0%)" }], t0 + i * 0.025, 1);
        at(c, [{ transform: "translateY(0%)" }, { transform: `translateY(${-from}%)` }], t0 + 2.5 + i * 0.025, 1);
      });

      at(frame, [{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }], t0 + 3.5, 1);
      at(screen, [{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }], t0 + 4.5, 1.75);

      timers.push(window.setTimeout(() => { el.style.pointerEvents = "none"; callbacks.current.onReveal?.(); }, (t0 + 4.5) * 1000));
      timers.push(
        window.setTimeout(() => {
          finish();
        }, (t0 + 6.25) * 1000 + 100),
      );
    }).catch(finish);

    return () => {
      cancelled = true;
      preference.removeEventListener("change", onPreference);
      anims.forEach((a) => a.cancel());
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="tds-pre" aria-hidden>
      <div className="tds-pre__screen">
        <div className="tds-pre__bar" />
        <div className="tds-pre__frame">
          {images.map((src, i) => (
            <div key={i} className="tds-pre__shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="eager" decoding="async" fetchPriority={i === 0 ? "high" : "auto"} />
            </div>
          ))}
        </div>
      </div>
      <div className="tds-pre__name">
        <p>
          {[...name].map((ch, i) => (
            <span key={i} className="tds-pre__char">
              <span>{ch === " " ? " " : ch}</span>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
