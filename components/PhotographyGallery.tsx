"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export const photographs = [
  {id:"taj-hotel",title:"The Taj, between sky and city",alt:"The Taj Mahal Palace Hotel's red domes and facade, with a bird above",position:"50% 78%"},
  {id:"frame-02",title:"The last light on the water",alt:"Sun setting over the sea, waves and dark shoreline rocks",position:"50% 50%"},
  {id:"frame-03",title:"A frame within a frame",alt:"A camera and its flip-out screen framing a monument on a wet day",position:"50% 50%"},
  {id:"city-at-dusk",title:"The city, after hours",alt:"Birds and overhead wires above a city street and old buildings at dusk",position:"50% 58%"},
  {id:"coastal-sunset",title:"A quieter kind of evening",alt:"A coastal sunset over the sea, dark rocks and a green lawn",position:"50% 58%"},
];
const path=(id:string,thumb=false)=>`/images/photography/${id}${thumb?"-thumb":""}.webp`;

export function PhotographyCover(){return <div className="photography-cover"><img src={path(photographs[0].id,true)} alt="" loading="lazy" style={{objectPosition:photographs[0].position}}/><span className="photography-cover-label">THE TAJ / THROUGH MY LENS</span><span className="photography-cover-count">01 / 05</span></div>;}

export default function PhotographyGallery(){
  const [selected,setSelected]=useState(0);
  const reduced=useReducedMotion();
  const photo=photographs[selected];
  const step=(by:number)=>setSelected(i=>(i+by+photographs.length)%photographs.length);
  return <div className="photography-gallery" role="region" aria-label="Photography collection" aria-roledescription="carousel" tabIndex={0} onKeyDown={event=>{
    if(event.altKey||event.ctrlKey||event.metaKey)return;
    if(event.key==="ArrowRight"){event.preventDefault();step(1);}
    else if(event.key==="ArrowLeft"){event.preventDefault();step(-1);}
    else if(event.key==="Home"){event.preventDefault();setSelected(0);}
    else if(event.key==="End"){event.preventDefault();setSelected(photographs.length-1);}
  }}>
    <div className="photography-gallery-head"><span>THROUGH MY LENS</span><span>{String(selected+1).padStart(2,"0")} / 05</span></div>
    <figure className="photography-selected"><AnimatePresence mode="wait"><motion.img key={photo.id} src={path(photo.id)} alt={photo.alt} initial={{opacity:reduced?1:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.18}}/></AnimatePresence><a className="photography-full" href={path(photo.id)} target="_blank" rel="noopener noreferrer" aria-label={`Open ${photo.title} at full size`}><ArrowUpRight size={16}/></a></figure>
    <div className="photography-caption"><p aria-live="polite">{photo.title}</p><div><button onClick={()=>step(-1)} aria-label="Previous photograph"><ArrowLeft size={16}/></button><button onClick={()=>step(1)} aria-label="Next photograph"><ArrowRight size={16}/></button></div></div>
    <div className="photography-thumbnails" aria-label="Choose a photograph">{photographs.map((p,i)=><button key={p.id} onClick={()=>setSelected(i)} aria-label={`View photograph ${i+1}: ${p.title}`} aria-pressed={selected===i}><img src={path(p.id,true)} alt="" loading="lazy" style={{objectPosition:p.position}}/><span>{String(i+1).padStart(2,"0")}</span></button>)}</div>
  </div>;
}
