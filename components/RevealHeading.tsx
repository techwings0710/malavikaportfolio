"use client";
import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, type ReactElement, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function split(node:ReactNode,path="word"):ReactNode {
  return Children.map(node,(child,i)=>{
    if(typeof child==="string")return child.split(/(\s+)/).map((word,j)=>/\S/.test(word)?<span className="word-mask" key={`${path}-${i}-${j}`}><span className="heading-word">{word}</span></span>:word);
    if(isValidElement(child)&&child.type!=="br"){const element=child as ReactElement<{children:ReactNode}>;return cloneElement(element,{},split(element.props.children,`${path}-${i}`));}
    return child;
  });
}
export default function RevealHeading({children}:{children:ReactNode}) {
  const ref=useRef<HTMLHeadingElement>(null);
  useLayoutEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);const mm=gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)",()=>{
      const ctx=gsap.context(()=>{gsap.from(".heading-word",{yPercent:115,rotation:3,duration:1.05,stagger:.045,ease:"power4.out",scrollTrigger:{trigger:ref.current,start:"top 90%",once:true}});},ref);
      return()=>ctx.revert();
    });return()=>mm.revert();
  },[]);
  return <h2 ref={ref}>{split(children)}</h2>;
}
