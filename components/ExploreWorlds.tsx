"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Check, Film, Globe2, Music2, Play, Route, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import RevealHeading from "./RevealHeading";
import PhotographyGallery, { PhotographyCover } from "./PhotographyGallery";
import { pauseSmoothScroll } from "./useMotionEngine";

const worlds = [
  {id:"myth",name:"Mythology",tag:"STORIES THAT OUTLIVE THEIR TELLERS",icon:Sparkles,color:"#e5c68b",title:"One foot in the real world. One at Camp Half-Blood.",intro:"Ancient stories, modern questions, and a soft spot for Percy Jackson. I love how a story can make an unfamiliar world feel like somewhere you've been.",fact:"A mythology conversation can very easily turn into a Percy Jackson conversation.",teaser:"Ancient myths. Modern demigods. A very open rabbit hole."},
  {id:"geo",name:"Geopolitics",tag:"EVERY POSITION HAS A PERSPECTIVE",icon:Globe2,color:"#9ed6bb",title:"The world rarely fits into a headline.",intro:"History, borders, economics and the people behind the positions. MUNs bring those questions into the room: research a perspective, make a case, and listen to the other side.",fact:"MUNs are where this rabbit hole turns into an actual conversation.",teaser:"World affairs, MUNs, and the art of seeing another side."},
  {id:"music",name:"Music",tag:"A DIFFERENT KIND OF KEYBOARD",icon:Music2,color:"#c3b8e6",title:"Some ideas make more sense in notes.",intro:"Piano and guitar give curiosity another language. A little structure, a little feeling, and the satisfaction of getting a difficult passage to finally click.",fact:"I play piano and guitar, with Trinity College London certifications.",teaser:"Piano, guitar, and a little room to improvise."},
  {id:"pop",name:"Pop culture",tag:"ROLL THE CREDITS. KEEP TALKING.",icon:Film,color:"#e4afa0",title:"The movie ends. The analysis doesn't.",intro:"Bollywood, music, stories and fictional people I can discuss for far too long. Sometimes it's the plot. Sometimes it's the soundtrack doing all the emotional heavy lifting.",fact:"Bollywood and music occupy a very well-connected corner of my brain.",teaser:"Bollywood, soundtracks, and characters worth overthinking."},
  {id:"photo",name:"Photography",tag:"NOTICE WHAT YOU ALMOST MISSED",icon:Camera,color:"#a7c9dd",title:"A small practice in paying attention.",intro:"Photography is another way of being curious: looking for a detail, a quiet pattern, or a different way to frame something ordinary.",fact:"This is my excuse to slow down and notice the little things.",teaser:"Finding a different frame for the everyday."},
  {id:"run",name:"Running",tag:"ONE FOOT. THEN THE OTHER.",icon:Route,color:"#ced693",title:"A little less overthinking. A little more moving.",intro:"Running makes the next step wonderfully literal. My recent 5K at the Indian Air Force Sekhon Marathon is a small milestone I'm happy to have in this chapter.",fact:"Recent milestone: a 5K at the Indian Air Force Sekhon Marathon.",teaser:"The latest chapter: 5K at the IAF Sekhon Marathon."}
] as const;
type World=typeof worlds[number];

function WorldArt({id}:{id:World["id"]}) {
  return <div className={`world-art art-${id}`} aria-hidden="true">
    {id==="myth"&&<><div className="myth-orbit orbit-one"/><div className="myth-orbit orbit-two"/><svg viewBox="0 0 320 160"><g fill="none" stroke="currentColor"><path className="myth-trident" d="M160 135V30m-34 12v22q0 19 34 19t34-19V42m-42-4 8-16 8 16m-50 14 8-16 8 16m52 0 8-16 8 16" strokeWidth="2.5"/><path d="M65 113L90 54 119 94 160 22 212 111 265 65" strokeDasharray="2 7" opacity=".35"/>{[[65,113],[90,54],[119,94],[212,111],[265,65]].map(([x,y])=><circle key={x} cx={x} cy={y} r="2" fill="currentColor"/>)}</g></svg><span className="art-caption">MYTHS / MONSTERS / WHAT IFS</span></>}
    {id==="geo"&&<><svg viewBox="0 0 320 160"><g fill="none" stroke="currentColor" opacity=".6"><circle cx="160" cy="78" r="58"/><ellipse cx="160" cy="78" rx="26" ry="58"/><ellipse cx="160" cy="78" rx="58" ry="23"/><path d="M102 78h116M160 20v116"/><path className="globe-signal" d="M83 110Q144 6 236 57" strokeDasharray="4 7"/>{[[111,45],[194,105],[213,59]].map(([x,y])=><circle key={x} cx={x} cy={y} r="4" fill="currentColor"/>)}</g></svg><span className="art-caption">RESEARCH ↔ DEBATE ↔ DIPLOMACY</span></>}
    {id==="music"&&<><div className="music-bars">{[35,66,46,85,55,98,63,42,73,53,85,38,58,30,64,42,78,35].map((v,i)=><i key={i} style={{height:`${v}%`,animationDelay:`${i*-.13}s`}}/>)}</div><span className="art-caption">LOGIC, WITH A SOUNDTRACK</span></>}
    {id==="pop"&&<><div className="film-frame"><span>SCENE 04 / TAKE ∞</span><Film size={44}/><b>MAIN CHARACTER<br/>ENERGY.</b></div><span className="art-caption">BOLLYWOOD + MUSIC + TOO MANY THEORIES</span></>}
    {id==="photo"&&<PhotographyCover/>}
    {id==="run"&&<><div className="run-distance">5<span>K</span><Route size={40}/></div><div className="run-track"><i/></div><span className="art-caption">INDIAN AIR FORCE / SEKHON MARATHON</span></>}
  </div>;
}

function MusicExperiment(){
  const [note,setNote]=useState(""),[sound,setSound]=useState(false);
  const audio=useRef<AudioContext|null>(null);
  useEffect(()=>()=>{void audio.current?.close();},[]);
  const play=(name:string,frequency:number)=>{setNote(name);if(!sound)return;const ctx=audio.current||(audio.current=new AudioContext());void ctx.resume();const oscillator=ctx.createOscillator(),gain=ctx.createGain();oscillator.type="sine";oscillator.frequency.value=frequency;gain.gain.setValueAtTime(.0001,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.16,ctx.currentTime+.015);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+.7);oscillator.connect(gain);gain.connect(ctx.destination);oscillator.start();oscillator.stop(ctx.currentTime+.75);};
  return <div className="world-experiment"><div className="experiment-label"><span>YOUR SEVEN-NOTE DETOUR</span><button className="world-sound" aria-pressed={sound} onClick={()=>setSound(!sound)}>{sound?<Volume2 size={14}/>:<VolumeX size={14}/>} Sound {sound?"on":"off"}</button></div><div className="tiny-piano">{[261.63,293.66,329.63,349.23,392,440,493.88].map((hz,i)=>{const n=["C","D","E","F","G","A","B"][i];return <button key={n} className={note===n?"note-active":""} onClick={()=>play(n,hz)} aria-label={`Play ${n}`}><span>{n}</span></button>})}</div><p className="experiment-result" aria-live="polite">{note?`${note} · A little improvisation is always allowed.`:"Try a key. No performance pressure."}</p></div>;
}
function WorldExperiment({id}:{id:World["id"]}){
  const [tab,setTab]=useState(0),[km,setKm]=useState(0),[running,setRunning]=useState(false);
  const reduced=useReducedMotion();
  useEffect(()=>{if(!running)return;if(reduced||km>=5){setKm(5);setRunning(false);return;}const t=setTimeout(()=>setKm(k=>k+1),650);return()=>clearTimeout(t);},[running,reduced,km]);
  if(id==="music")return <MusicExperiment/>;
  if(id==="photo")return <PhotographyGallery/>;
  if(id==="run")return <div className="world-experiment"><div className="experiment-label"><span>THE LITTLE VICTORY LAP</span><b>5 KILOMETRES</b></div><div className="kilometre-markers">{[1,2,3,4,5].map(k=><div key={k} className={km>=k?"km-done":""}><span>{km>=k?<Check size={16}/>:k}</span><small>{k} KM</small></div>)}</div><button className="world-action" disabled={running} onClick={()=>{setKm(0);setRunning(true);}}><Play size={14}/>{running?"One step at a time…":km===5?"Take another victory lap":"Celebrate the 5K"}</button><p className="experiment-result" aria-live="polite">{km===5?"5K. One very happy milestone.":"A tiny celebration of showing up."}</p></div>;
  const content=id==="myth"?[
    {name:"Percy Jackson",title:"The Camp Half-Blood corner",text:"A modern doorway into mythology—with enough quests, monsters and complicated gods to keep the questions coming."},
    {name:"Beyond the books",title:"Old stories. New questions.",text:"The rabbit hole keeps going: symbols, different tellings, and why the same themes keep finding their way back into our stories."}
  ]:id==="geo"?[
    {name:"Research",title:"Before the placard goes up.",text:"Understand the history and interests behind a position. A strong argument starts long before anyone takes the floor."},
    {name:"Debate",title:"Make the case. Hear the counterpoint.",text:"MUNs turn world affairs into a conversation: explain a position clearly, question an assumption, and respond to another perspective."},
    {name:"Diplomacy",title:"Find the sentence everyone can work with.",text:"The interesting part is often the negotiation—where competing priorities have to become something people can agree on."}
  ]:id==="pop"?[
    {name:"Bollywood",title:"A scene worth talking about.",text:"The characters, the drama, the tiny choices that make a scene work. The credits are rarely the end of the conversation."},
    {name:"Music",title:"And then the soundtrack takes over.",text:"Sometimes the song is the scene. Bollywood and music make a pretty good case for keeping the replay button close."}
  ]:[
    {name:"Wide",title:"Find the whole story.",text:"Step back. Let the surroundings become part of the frame."},
    {name:"Detail",title:"Find the story inside the story.",text:"Look closer. A small detail can change what the whole frame feels like."},
    {name:"Thirds",title:"Move the centre of attention.",text:"Try an off-centre composition. The subject doesn't always need to sit in the middle."}
  ];
  return <div className="world-experiment"><div className="world-tabs" aria-label={`Explore ${id}`}>{content.map((c,i)=><button key={c.name} onClick={()=>setTab(i)} aria-pressed={i===tab}>{c.name}</button>)}</div><AnimatePresence mode="wait"><motion.div key={tab} initial={{opacity:reduced?1:0,y:reduced?0:9}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.18}} className="world-tab-copy"><h4>{content[tab].title}</h4><p>{content[tab].text}</p></motion.div></AnimatePresence></div>;
}

function WorldDialog({index,onClose,onSelect}:{index:number;onClose:()=>void;onSelect:(i:number)=>void}){
  const ref=useRef<HTMLDialogElement>(null);
  const world=worlds[index];
  const reduced=useReducedMotion();
  useLayoutEffect(()=>{const before=document.activeElement as HTMLElement|null;const dialog=ref.current;const overflow=document.body.style.overflow;dialog?.showModal();document.body.style.overflow="hidden";pauseSmoothScroll(true);return()=>{dialog?.close();document.body.style.overflow=overflow;pauseSmoothScroll(false);before?.focus({preventScroll:true});};},[]);
  return <dialog ref={ref} className={`world-dialog world-${world.id}`} style={{"--world-color":world.color} as CSSProperties} aria-labelledby="world-dialog-title" onCancel={onClose} onClick={e=>{if(e.target===ref.current)onClose();}} data-lenis-prevent>
    <div className="world-window"><div className="world-window-bar"><span className="window-lights" aria-hidden="true"><i/><i/><i/></span><span>malavika / {world.name.toLowerCase()}</span><button onClick={onClose} aria-label="Close this world" autoFocus><X size={18}/></button></div>
      <div className="world-dialog-scroll" data-lenis-prevent><AnimatePresence mode="wait"><motion.div key={world.id} initial={{opacity:reduced?1:0,y:reduced?0:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}>
        <div className="world-detail-art"><WorldArt id={world.id}/><span className="world-detail-index">0{index+1} / 06</span></div>
        <div className="world-detail-copy"><span className="world-eyebrow">{world.tag}</span><h3 id="world-dialog-title">{world.title}</h3><p>{world.intro}</p><WorldExperiment key={world.id} id={world.id}/><div className="world-fact"><Sparkles size={17}/><div><small>A LITTLE ABOUT ME</small><p>{world.fact}</p></div></div></div>
      </motion.div></AnimatePresence><div className="world-next"><button onClick={()=>onSelect((index+5)%6)}><ArrowLeft size={14}/> Previous world</button><button onClick={()=>onSelect((index+1)%6)}>Next: {worlds[(index+1)%6].name}<ArrowRight size={14}/></button></div></div>
    </div>
  </dialog>;
}

export default function ExploreWorlds(){
  const [active,setActive]=useState<number|null>(null);
  return <section className="section-block curiosity-section" id="explore"><div className="section-header"><div><span className="section-overline">04 / OFF THE CLOCK</span><RevealHeading>A few other<br/><em>open tabs.</em></RevealHeading></div><p className="section-aside">Not everything needs to become a project.<br/>Some things are just worth getting lost in.</p></div><div className="worlds-intro"><span className="beacon"/><span>SIX LITTLE WORLDS. PICK A DOOR.</span><span>CURIOUS, EVEN OFFLINE.</span></div>
    <div className="interest-worlds">{worlds.map((world,i)=>{const Icon=world.icon;return <button key={world.id} className={`interests-card world-${world.id}`} style={{"--world-color":world.color} as CSSProperties} data-spotlight onClick={()=>setActive(i)} aria-haspopup="dialog"><div className="world-card-top"><span>0{i+1} / PERSONAL UNIVERSE</span><Icon size={16}/></div><WorldArt id={world.id}/><div className="world-card-copy"><h3>{world.name}<ArrowUpRight size={20}/></h3><p>{world.teaser}</p><div className="world-card-fact"><span>SMALL FACT</span><p>{world.fact}</p></div></div><div className="world-card-bottom"><span>STEP INSIDE</span><span>↗</span></div></button>})}</div>
    <div className="worlds-foot"><span>THE CURIOSITY DOESN'T CLOCK OUT.</span><span>THINK · BUILD · WANDER</span></div>
    {active!==null&&<WorldDialog index={active} onClose={()=>setActive(null)} onSelect={setActive}/>}
  </section>;
}
