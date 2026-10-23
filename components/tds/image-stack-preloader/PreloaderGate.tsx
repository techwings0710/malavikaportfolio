"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ImageStackPreloader } from "./ImageStackPreloader";
import { pauseSmoothScroll } from "../../useMotionEngine";

export const preloaderImages = [
  "/images/moonlit-shore.webp",
  "/images/loader/official-portrait.webp",
  "/images/kerala-backwaters.webp",
  "/images/loader/guitar-portrait.webp",
];
const ReadyContext=createContext(false);
export const usePreloaderReady=()=>useContext(ReadyContext);

export default function PreloaderGate({children}:{children:ReactNode}) {
  const pathname=usePathname();
  const preview=pathname==="/loader-preview";
  const [ready,setReady]=useState(false);
  const [finished,setFinished]=useState(false);
  const [blocked,setBlocked]=useState(false);
  const reveal=useCallback(()=>{setReady(true);setBlocked(false);},[]);
  const complete=useCallback(()=>{setFinished(true);reveal();},[reveal]);
  useLayoutEffect(()=>{
    if(preview||matchMedia("(prefers-reduced-motion: reduce)").matches){complete();return;}
    if(!ready)setBlocked(true);
    // This root survives client navigation: the intro plays once per full load.
  },[preview,complete]);
  useLayoutEffect(()=>{
    if(!blocked)return;
    const overflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    pauseSmoothScroll(true);
    return()=>{document.body.style.overflow=overflow;pauseSmoothScroll(false);};
  },[blocked]);
  return <ReadyContext.Provider value={ready||preview}>
    {!preview&&!finished&&<ImageStackPreloader name="Malavika Vivek" images={preloaderImages} onReveal={reveal} onDone={complete}/>}
    <div inert={blocked}>{children}</div>
  </ReadyContext.Provider>;
}
