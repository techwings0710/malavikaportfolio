"use client";

import { useLayoutEffect, type RefObject } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let smooth: Lenis|null=null;
export function scrollToSection(id:string) {
  const target=document.getElementById(id);if(!target)return;
  if(smooth){smooth.scrollTo(target,{offset:id==="home"?0:-105,duration:1.35,force:true});}
  else target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  history.replaceState(null,"",`#${id}`);
}
export function pauseSmoothScroll(paused:boolean){if(smooth)paused?smooth.stop():smooth.start();}

export default function useMotionEngine(root:RefObject<HTMLElement|null>) {
  useLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      const lenis=new Lenis({duration:1.1,smoothWheel:true,syncTouch:false,prevent:node=>!!node.closest("[data-lenis-prevent],.circular-carousel,.command-window")});
      smooth=lenis;
      if(document.body.style.overflow==="hidden")lenis.stop();
      lenis.on("scroll",ScrollTrigger.update);
      const tick=(time:number)=>lenis.raf(time*1000);gsap.ticker.add(tick);
      const scope=root.current;
      const cleanups:Array<()=>void>=[];
      const ctx=gsap.context(()=>{
        gsap.to(".photo-hero .hero-scene",{yPercent:12,scale:1.035,ease:"none",scrollTrigger:{trigger:"#home",start:"top top",end:"bottom top",scrub:.7}});
        gsap.to(".photo-hero .hero-main",{y:-65,opacity:0,ease:"none",scrollTrigger:{trigger:"#home",start:"top top",end:"70% top",scrub:.5}});
        const words=scope?.querySelectorAll(".manifesto-word");
        if(words?.length)gsap.fromTo(words,{opacity:.13},{opacity:1,stagger:.07,ease:"none",scrollTrigger:{trigger:".manifesto-statement",start:"top 78%",end:"bottom 55%",scrub:.5}});
        gsap.fromTo(".contact-wordmark",{y:55,opacity:.18},{y:0,opacity:1,ease:"none",scrollTrigger:{trigger:".contact-wordmark",start:"top bottom",end:"bottom bottom",scrub:.7}});
        if(matchMedia("(hover:hover) and (pointer:fine)").matches){
          scope?.querySelectorAll<HTMLElement>(".action-primary,.nav-egg").forEach(el=>{
            const x=gsap.quickTo(el,"x",{duration:.45,ease:"power3.out"}),y=gsap.quickTo(el,"y",{duration:.45,ease:"power3.out"});
            const move=(event:PointerEvent)=>{const b=el.getBoundingClientRect();x((event.clientX-b.left-b.width/2)*.12);y((event.clientY-b.top-b.height/2)*.12);};
            const reset=()=>{x(0);y(0);};el.addEventListener("pointermove",move);el.addEventListener("pointerleave",reset);
            cleanups.push(()=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerleave",reset);});
          });
        }
      },scope||undefined);
      const refresh=()=>ScrollTrigger.refresh();document.fonts.ready.then(()=>{if(smooth===lenis)refresh();});
      return()=>{cleanups.forEach(fn=>fn());ctx.revert();gsap.ticker.remove(tick);lenis.destroy();if(smooth===lenis)smooth=null;};
    },root);
    const click=(event:MouseEvent)=>{
      if(event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||event.button!==0)return;
      const a=(event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');if(!a)return;
      const id=a.hash.slice(1);if(!document.getElementById(id))return;
      event.preventDefault();scrollToSection(id);
    };
    document.addEventListener("click",click);
    return()=>{document.removeEventListener("click",click);mm.revert();};
  },[root]);
}
