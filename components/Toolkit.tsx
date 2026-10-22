"use client";

import RevealHeading from "./RevealHeading";

import { useState } from "react";
import { ArrowUpRight, Bot, Code2, Compass, MessageSquare } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const groups = [
  { name:"Code", icon:Code2, note:"Building a strong engineering foundation by understanding how things work.", tools:[
    ["Python","Py","Scripting & data"],["C","C","Core programming"],["Java","Jv","Object-oriented thinking"],["MATLAB","M","Engineering & analysis"],["Arduino","∞","Hardware experiments"],["Git / GitHub","git","Version control"]
  ]},
  { name:"AI + build", icon:Bot, note:"AI-assisted development, ideation and prototyping—with the goal of understanding, not merely generating.", tools:[
    ["Claude","✳","Research & reasoning"],["Codex",">_","Development assistance"],["Google Stitch","St","Interface exploration"],["Antigravity","Ag","Building & experimenting"],["Ollama","Ol","Local model experiments"]
  ]},
  { name:"Product + data", icon:Compass, note:"Translating difficult ideas into products people can understand and use.", tools:[
    ["Problem framing","?","Find the right question"],["Technical research","↗","Test assumptions"],["Quantitative thinking","Σ","Make sense of numbers"],["Business modelling","◇","Connect value & feasibility"],["User flows","⇢","Map the experience"]
  ]},
  { name:"Communicate", icon:MessageSquare, note:"Turning complexity into a clear story people can follow.", tools:[
    ["Presentations","▤","Build a clear narrative"],["Debate","↔","Examine an argument"],["MUN","◎","Listen & negotiate"],["Stakeholder outreach","↗","Start the conversation"],["Pitching","!","Give an idea a voice"]
  ]},
];

export default function Toolkit() {
  const [active,setActive] = useState(0);
  const reduced = useReducedMotion();
  return <section className="section-block toolkit-section" id="toolkit">
    <div className="section-header"><div><span className="section-overline">03 / THE TOOLKIT</span><RevealHeading>Curiosity,<br/><em>well equipped.</em></RevealHeading></div><p className="section-aside">Different tools for different problems—and the curiosity to learn another one when the job calls for it.</p></div>
    <div className="stack-accordion">
      {groups.map((group,i)=>{const Icon=group.icon;const open=active===i;return <article key={group.name} className={`stack-panel ${open?"stack-open":""}`} data-spotlight onMouseEnter={()=>{if(matchMedia("(min-width: 761px) and (hover: hover)").matches)setActive(i);}}>
        <h3 className="stack-panel-heading"><button className="stack-trigger" id={`stack-trigger-${i}`} aria-expanded={open} aria-controls={`stack-body-${i}`} onClick={()=>setActive(i)} onKeyDown={e=>{if(["ArrowLeft","ArrowRight","Home","End"].includes(e.key)){e.preventDefault();const next=e.key==="Home"?0:e.key==="End"?groups.length-1:(i+(e.key==="ArrowRight"?1:-1)+groups.length)%groups.length;setActive(next);document.getElementById(`stack-trigger-${next}`)?.focus();}}}>
          <span className="stack-number">0{i+1}</span><Icon size={22} aria-hidden="true"/><span className="stack-title">{group.name}</span><span className="stack-total">{String(group.tools.length).padStart(2,"0")} TOOLS</span><ArrowUpRight className="stack-arrow" size={20}/>
        </button></h3>
        <div className="stack-body" id={`stack-body-${i}`} role="region" aria-labelledby={`stack-trigger-${i}`} hidden={!open}>
          <AnimatePresence mode="wait"><motion.div key={active} className="stack-content" initial={{opacity:reduced?1:0,y:reduced?0:12}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.35,delay:reduced?0:.12}}>
            <p className="stack-note">{group.note}</p>
            <ul className="stack-tool-grid">{group.tools.map(([name,mark,description],j)=><motion.li initial={{opacity:reduced?1:0,y:reduced?0:12}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.45,delay:reduced?0:.12+j*.04}} key={name} className="stack-tool" style={{"--tile-index":j} as React.CSSProperties}><span className={`stack-tool-mark mark-${i}-${j}`} aria-hidden="true">{mark}</span><span><b>{name}</b><small>{description}</small></span></motion.li>)}</ul>
            <div className="stack-bottom"><span className="beacon"/> LEARN → EXPERIMENT → APPLY</div>
          </motion.div></AnimatePresence>
        </div>
      </article>})}
    </div>
    <p className="stack-hint"><span>SELECT A PANEL TO EXPLORE</span><span>LOGIC · EXPERIMENTATION · COMMUNICATION</span></p>
  </section>;
}
