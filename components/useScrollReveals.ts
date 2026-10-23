"use client";

import { useLayoutEffect, type RefObject } from "react";

export default function useScrollReveals(root: RefObject<HTMLElement | null>) {
  useLayoutEffect(()=>{
    const scope=root.current;
    if(!scope) return;
    const targets=Array.from(scope.querySelectorAll<HTMLElement>([
      ".manifesto-v3 > .section-overline", ".manifesto-statement", ".manifesto-bottom",
      ".section-header > div", ".section-aside", ".showcase", ".project-index",
      ".journey-instruments", ".journey-rail > button", ".journey-feature", ".resume-proof > span", ".academic-heading", ".academic-score", ".academic-degree",
      ".stack-panel", ".stack-hint", ".explore-item", ".interests-card", ".worlds-intro", ".worlds-foot", ".contact-top", ".contact-section > h2",
      ".contact-section > p", ".contact-deck > *", ".contact-console", ".contact-section footer"
    ].join(",")));
    const query=window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver|undefined;
    const showAll=()=>targets.forEach(el=>{el.removeAttribute("data-reveal");el.style.removeProperty("--reveal-delay");});
    const setup=()=>{
      observer?.disconnect();
      if(query.matches||!("IntersectionObserver" in window)){showAll();return;}
      observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
        if(entry.isIntersecting){entry.target.setAttribute("data-reveal","visible");observer?.unobserve(entry.target);}
      }),{threshold:.08,rootMargin:"0px 0px -36px 0px"});
      targets.forEach(el=>{
        const rect=el.getBoundingClientRect();
        const position=Array.from(el.parentElement?.children||[]).indexOf(el);
        el.style.setProperty("--reveal-delay",`${Math.min(position,3)*65}ms`);
        // Anything already passed remains readable when restoring a scrolled page.
        el.setAttribute("data-reveal",rect.bottom<0?"visible":"pending");
        observer?.observe(el);
      });
    };
    setup();query.addEventListener("change",setup);
    const onFocus=(event: FocusEvent)=>{
      const el=(event.target as HTMLElement).closest<HTMLElement>('[data-reveal="pending"]');
      el?.setAttribute("data-reveal","visible");
    };
    scope.addEventListener("focusin",onFocus);
    return()=>{observer?.disconnect();query.removeEventListener("change",setup);scope.removeEventListener("focusin",onFocus);showAll();};
  },[root]);
}
