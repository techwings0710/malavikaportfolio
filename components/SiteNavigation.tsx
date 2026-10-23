"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpRight, Command, ChevronDown, Menu, Search, Sparkles, X } from "lucide-react";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { pauseSmoothScroll, scrollToSection } from "./useMotionEngine";

const sections=[{label:"Home",id:"home"},{label:"About",id:"manifesto"},{label:"Build",id:"build"},{label:"Journey",id:"journey"},{label:"Toolkit",id:"toolkit"},{label:"Explore",id:"explore"},{label:"Contact",id:"connect"}];
export default function SiteNavigation({onSurprise}:{onSurprise:()=>void}) {
  const [active,setActive]=useState("home");
  const [overlay,setOverlay]=useState<"menu"|"commands"|"shortcuts"|null>(null);
  const [hovered,setHovered]=useState(0);
  const reduced=useReducedMotion();
  const [query,setQuery]=useState("");
  const [selected,setSelected]=useState(0);
  const dialog=useRef<HTMLDivElement>(null);
  const pendingSection=useRef<string|null>(null);
  const previews=["Back to the backwaters.","The questions behind the work.","Ideas that made it into the world.","The places and people behind the story.","A few things in the toolkit.","The other tabs open in my brain.","The next conversation starts here."];
  const activeRef=useRef(active);activeRef.current=active;
  const surpriseRef=useRef(onSurprise);surpriseRef.current=onSurprise;
  const go=(id:string)=>{
    if(overlay){
      pendingSection.current=id;
      setOverlay(null);
    }else scrollToSection(id);
  };
  const step=(delta:number)=>go(sections[Math.max(0,Math.min(sections.length-1,sections.findIndex(s=>s.id===activeRef.current)+delta))].id);
  const commands=[...sections.map(s=>({label:s.label,hint:"GO TO SECTION",run:()=>go(s.id)})),{label:"Shooting stars",hint:"A LITTLE SURPRISE",run:()=>{go("home");surpriseRef.current();}},{label:"GitHub",hint:"OPEN PROFILE",run:()=>{setOverlay(null);window.open("https://github.com/techwings0710","_blank","noopener,noreferrer");}},{label:"Résumé",hint:"OPEN PDF",run:()=>{setOverlay(null);window.open("/malavika-vivek-resume.pdf","_blank","noopener,noreferrer");}}];
  const filtered=commands.filter(c=>c.label.toLowerCase().includes(query.toLowerCase().trim()));
  useEffect(()=>{
    let frame=0;
    const update=()=>{frame=0;let current="home";for(const section of sections){const el=document.getElementById(section.id);if(el&&el.getBoundingClientRect().top<=window.innerHeight*.4)current=section.id;}setActive(current);};
    const scroll=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();window.addEventListener("scroll",scroll,{passive:true});window.addEventListener("resize",scroll);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",scroll);window.removeEventListener("resize",scroll);};
  },[]);
  useEffect(()=>{
    const handle=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){setOverlay(null);return;}
      if((e.target as HTMLElement).closest("dialog[open]"))return;
      if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();setQuery("");setSelected(0);setOverlay(v=>v==="commands"?null:"commands");return;}
      const target=e.target as HTMLElement;
      if(target.closest('input,textarea,select,[contenteditable="true"],.circular-carousel')||e.metaKey||e.ctrlKey||e.altKey)return;
      if(e.key==="?"){e.preventDefault();setOverlay(v=>v==="shortcuts"?null:"shortcuts");return;}
      if(overlay)return;
      if(e.key.toLowerCase()==="j"){e.preventDefault();step(1);}
      else if(e.key.toLowerCase()==="k"){e.preventDefault();step(-1);}
      else if(/^[1-7]$/.test(e.key)){e.preventDefault();go(sections[Number(e.key)-1].id);}
    };
    window.addEventListener("keydown",handle);return()=>window.removeEventListener("keydown",handle);
  },[overlay]);
  useEffect(()=>{
    if(!overlay)return;
    const before=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;
    document.body.style.overflow="hidden";
    pauseSmoothScroll(true);
    const first=dialog.current?.querySelector<HTMLElement>("input,button");first?.focus();
    const trap=(e:KeyboardEvent)=>{
      if(e.key!=="Tab")return;
      const nodes=Array.from(dialog.current?.querySelectorAll<HTMLElement>('button,input,a[href]')||[]);
      const first=nodes[0],last=nodes[nodes.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
      if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
    };
    document.addEventListener("keydown",trap);
    return()=>{pauseSmoothScroll(false);document.body.style.overflow=previousOverflow;document.removeEventListener("keydown",trap);before?.focus({preventScroll:true});};
  },[overlay]);
  useEffect(()=>{const open=()=>{setHovered(Math.max(0,sections.findIndex(s=>s.id===activeRef.current)));setOverlay("menu");};window.addEventListener("portfolio:commands",open);return()=>window.removeEventListener("portfolio:commands",open);},[]);
  const openCommands=()=>{setQuery("");setSelected(0);setOverlay("commands");};
  return <>
    <a href="#manifesto" className="skip-content">Skip to content</a>
    <header className="site-nav"><nav aria-label="Primary navigation"><a className="logo" href="#home" aria-label="Home">MV<span>✳</span></a><span className="nav-current-section">{sections.find(s=>s.id===active)?.label}<span> / 0{sections.findIndex(s=>s.id===active)+1}</span></span><button className="nav-egg" title="Send shooting stars across the sky" aria-label="Shooting star easter egg" onClick={()=>{go("home");onSurprise();}}><Sparkles size={17}/></button><button className="cmd" aria-label="Open command palette" onClick={openCommands}><Command size={15}/> K</button><button className="curtain-menu-trigger" aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={overlay==="menu"} aria-controls={overlay==="menu"?"curtain-navigation":undefined} onClick={()=>{setHovered(Math.max(0,sections.findIndex(s=>s.id===active)));setOverlay(v=>v==="menu"?null:"menu");}}><Menu size={16}/><span>Menu</span><ChevronDown size={13}/></button></nav></header>
    <nav className="section-rail" aria-label="Section navigation">{sections.map((s,i)=><a key={s.id} href={`#${s.id}`} aria-label={`${i+1}. ${s.label}`} aria-current={active===s.id?"location":undefined}><span className="rail-tooltip">{s.label}</span><i/></a>)}</nav>
    <div className="page-controls"><button onClick={()=>setOverlay("shortcuts")} aria-label="Show keyboard shortcuts" title="Keyboard shortcuts (?)">?</button><button onClick={()=>step(-1)} disabled={active==="home"} aria-label="Previous section"><ArrowUp size={15}/></button><button onClick={()=>step(1)} disabled={active==="connect"} aria-label="Next section"><ArrowDown size={15}/></button></div>
    <AnimatePresence mode="wait" onExitComplete={()=>{
      const id=pendingSection.current;
      pendingSection.current=null;
      if(id)scrollToSection(id);
    }}>
    {overlay==="menu"?<motion.div key="curtain-menu" id="curtain-navigation" className="curtain-navigation" onAnimationComplete={target=>{if(typeof target==="object"&&!Array.isArray(target)&&target.clipPath==="inset(0 0 0 0)")dialog.current?.querySelector<HTMLElement>("button")?.focus();}} ref={dialog} role="dialog" aria-modal="true" aria-labelledby="curtain-menu-title" data-lenis-prevent initial={{clipPath:reduced?"inset(0 0 0 0)":"inset(0 0 100% 0)"}} animate={{clipPath:"inset(0 0 0 0)"}} exit={{clipPath:"inset(0 0 100% 0)",pointerEvents:"none"}} transition={{duration:reduced?0:.8,ease:[.9,0,.1,1]}}>
      <div className="curtain-menu-bar"><a href="#home" className="logo" onClick={e=>{e.preventDefault();go("home");}}>MV<span>✳</span></a><span id="curtain-menu-title">MALAVIKA VIVEK / EXPLORING THE UNIVERSE</span><button onClick={()=>setOverlay(null)} aria-label="Close navigation menu"><span>Close</span><X size={20}/></button></div>
      <div className="curtain-menu-scroll" data-lenis-prevent><div className="curtain-menu-body">
        <motion.div className="curtain-menu-note" initial={{opacity:0,y:reduced?0:20}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.4,delay:reduced?0:.35}}><span>TAKE A LOOK AROUND</span><h2>A little<br/><em>curiosity.</em><br/>A lot to explore.</h2><div className="curtain-preview" aria-live="off"><b aria-hidden="true">0{hovered+1}</b><p>{previews[hovered]}</p></div></motion.div>
        <nav className="curtain-menu-links" aria-label="All sections">{sections.map((s,i)=><motion.a key={s.id} href={`#${s.id}`} aria-current={active===s.id?"location":undefined} initial={{opacity:0,y:reduced?0:25}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.45,delay:reduced?0:.25+i*.045}} onMouseEnter={()=>setHovered(i)} onFocus={()=>setHovered(i)} onClick={e=>{e.preventDefault();go(s.id);}}><small>0{i+1}</small><span className="curtain-link-name">{s.label}</span><span className="curtain-link-active">{active===s.id?"YOU ARE HERE":"EXPLORE"}</span><ArrowUpRight size={25}/></motion.a>)}</nav>
      </div><div className="curtain-menu-footer"><a href="mailto:malavika.vivek@gmail.com">LET'S TALK <ArrowUpRight size={13}/></a><span>THINK · BUILD · EXPLORE</span><button onClick={()=>{setQuery("");setSelected(0);setOverlay("commands");}}><Command size={12}/> Search / quick commands</button></div></div>
    </motion.div>:overlay&&<motion.div key={overlay} className="command-shade" onAnimationComplete={target=>{if(typeof target==="object"&&!Array.isArray(target)&&target.opacity===1)dialog.current?.querySelector<HTMLElement>("input,button")?.focus();}} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:.15}} onClick={()=>setOverlay(null)}><div ref={dialog} className="command-window" data-lenis-prevent role="dialog" aria-modal="true" aria-label={overlay==="commands"?"Command palette":"Keyboard shortcuts"} onClick={e=>e.stopPropagation()}>

      <div className="command-head"><span><Command size={16}/> {overlay==="commands"?"MALAVIKA / QUICK NAV":"KEYBOARD SHORTCUTS"}</span><button onClick={()=>setOverlay(null)} aria-label="Close overlay"><X size={17}/></button></div>
      {overlay==="commands"?<><div className="command-search"><Search size={17}/><input value={query} onChange={e=>{setQuery(e.target.value);setSelected(0);}} aria-label="Search sections and commands" role="combobox" aria-expanded="true" aria-controls="command-results" aria-activedescendant={filtered.length?`command-${selected}`:undefined} placeholder="Jump to a section or find a command…" onKeyDown={e=>{if(e.key==="ArrowDown"){e.preventDefault();setSelected(v=>(v+1)%Math.max(1,filtered.length));}else if(e.key==="ArrowUp"){e.preventDefault();setSelected(v=>(v-1+filtered.length)%Math.max(1,filtered.length));}else if(e.key==="Enter"){e.preventDefault();filtered[selected]?.run();}}}/><kbd>esc</kbd></div><div className="command-results" id="command-results" role="listbox" aria-label="Commands">{filtered.map((c,i)=><button key={c.label} id={`command-${i}`} role="option" aria-selected={selected===i} onClick={c.run} onMouseEnter={()=>setSelected(i)}><span>{c.label}<small>{c.hint}</small></span><ArrowUpRight size={17}/></button>)}{!filtered.length&&<p className="command-empty">No matching commands.</p>}</div><div className="command-foot"><span>↑ ↓ to navigate · enter to select</span><button onClick={()=>setOverlay("shortcuts")}>All shortcuts <kbd>?</kbd></button></div></>:<div className="shortcut-list"><p><span><kbd>J</kbd> <kbd>K</kbd></span>Next / previous section</p><p><span><kbd>1</kbd>–<kbd>7</kbd></span>Jump to a section</p><p><span><kbd>⌘ / Ctrl</kbd> <kbd>K</kbd></span>Open command palette</p><p><span><kbd>?</kbd></span>Show shortcuts</p><p><span><kbd>esc</kbd></span>Close overlay</p></div>}
    </div></motion.div>}
    </AnimatePresence>
  </>;
}
