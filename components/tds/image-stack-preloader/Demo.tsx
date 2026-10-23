"use client";
import { useState } from "react";
import { ImageStackPreloader } from "./ImageStackPreloader";
import { preloaderImages } from "./PreloaderGate";

export function ImageStackPreloaderDemo() {
  const [run,setRun]=useState(0);
  return <>
    <ImageStackPreloader key={run} name="Malavika Vivek" images={preloaderImages}/>
    <main className="tds-predemo">
      <a href="/">MV / BACK TO THE PORTFOLIO ↗</a>
      <h2>Think.<br/>Build.<br/>Explore.</h2>
      <button type="button" onClick={()=>setRun(n=>n+1)}>Replay intro ↗</button>
    </main>
  </>;
}
