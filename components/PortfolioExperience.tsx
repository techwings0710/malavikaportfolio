"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight,
  ExternalLink, Github, ImageIcon
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import CircularCarousel from "./CircularCarousel";
import JourneyCompass from "./JourneyCompass";
import PhotoHero from "./PhotoHero";
import Toolkit from "./Toolkit";
import SiteNavigation from "./SiteNavigation";
import useScrollReveals from "./useScrollReveals";
import useMotionEngine from "./useMotionEngine";
import ContactConsole from "./ContactConsole";
import RevealHeading from "./RevealHeading";
import ExploreWorlds from "./ExploreWorlds";

const projectData = [
  { id:"01", title:"AegisQuant", line:"When cybersecurity becomes a business decision.", group:"AI / CYBERSECURITY / PRODUCT", desc:"A decision-support experience connecting vulnerabilities, estimated financial exposure, scenario analysis and investment prioritisation.", details:["Risk quantification and what-if workflows","Budget-aware security investment thinking","Product flows designed for clear decision-making"], style:"risk", image:"aegisquant-screenshot.webp", imageAlt:"AegisQuant Command Centre landing page", repo:"https://github.com/techwings0710/AegisQuant", imageBackground:"#f4f0e7", imageKind:"screenshot", link:"https://aegisquant-seven.vercel.app/", cta:"Live demo" },
  { id:"02", title:"Heritage Shield", line:"Preserving yesterday with the tools of tomorrow.", group:"COMPUTER VISION / DIGITAL TWINS", desc:"An AI-assisted heritage conservation concept combining digital-twin workflows, condition monitoring and preservation-risk assessment.", details:["Research and technical workflow development","Digital-twin reconstruction concepts","Team ranked 12th among 350 in SIH internal selection"], style:"heritage", image:"heritage-shield-screenshot.webp", imageAlt:"Heritage Shield landing page and platform entry", repo:"", imageBackground:"#190d07", imageKind:"screenshot", link:"", cta:"" },
  { id:"03", title:"DependIQ", line:"Understanding the systems underneath the software.", group:"LOCAL AI / DEVELOPER TOOLS", desc:"A local-AI-focused dependency intelligence project exploring how developers understand complex repository relationships.", details:["Graph-oriented dependency exploration","Experimentation with Gemma and Ollama","Developer experience and product design"], style:"dependency", image:"dependiq-repository.webp", imageAlt:"DependIQ GitHub repository preview", repo:"https://github.com/techwings0710/DependIQ", imageBackground:"#ffffff", imageKind:"repository preview", link:"", cta:"" },
  { id:"04", title:"HeatSense", line:"Making climate data more understandable.", group:"DATA / CLIMATE TECH", desc:"A Streamlit-based exploration of heat-wave risk, turning weather information into an interpretable public-facing application.", details:["Python and interactive data presentation","Heat-risk interpretation and communication","Lightweight deployed web experience"], style:"heat", image:"heatsense-screenshot.webp", imageAlt:"HeatSense AI forecast controls and heat-risk dashboard", repo:"https://github.com/techwings0710/HeatSense", imageBackground:"#08111e", imageKind:"screenshot", link:"https://heatsense-nss-miniproject.streamlit.app/", cta:"Live demo" },
];

const journeyData = [
  {num:"01", era:"EARLY INFLUENCES", title:"Fauji roots", line:"The values before the résumé.", body:"Discipline, adaptability, resilience, service and learning to feel at home in unfamiliar places. Mumbai, Goa, Vizag, Coonoor, Chennai, Kochi and Mauritius are all part of that story.", stamp:"ADAPTABILITY"},
  {num:"02", era:"SCHOOL YEARS", title:"A voice takes shape", line:"Navy Children School", body:"School Captain, quiz representative, debate and MUN experiences. A chapter in finding the confidence to lead, ask questions and speak up.", stamp:"COURAGE"},
  {num:"03", era:"2025 — 2029", title:"Engineering, plus the bigger picture", line:"KJ Somaiya × IIT Madras", body:"Electronics & Computer Engineering alongside Management & Data Science. FinTech, DevOps and MLOps broaden the questions I get to explore.", stamp:"CURIOSITY"},
  {num:"04", era:"2026 AND BEYOND", title:"Building with people", line:"BloomBox · Internships · Hackathons", body:"From stakeholder conversations and operations to ambitious software ideas, I keep discovering that communication and execution are intertwined.", stamp:"INITIATIVE"},
];

const projectItems = projectData.map(p => ({ src: `/images/projects/${p.image}`, alt: p.imageAlt, title: p.title, subtitle: p.group, fit: "contain" as const, background: p.imageBackground }));

export default function PortfolioExperience() {
  const [time,setTime]=useState<Date|null>(null);
  const [display,setDisplay]=useState<"auto"|"day"|"night">("auto");
  const [stars,setStars]=useState(0);
  const [project,setProject]=useState(0);
  const [navigationRequest,setNavigationRequest]=useState<{index:number}|undefined>();
  const [journey,setJourney]=useState(0);
  const {scrollYProgress}=useScroll();
  const scrollScale=useTransform(scrollYProgress,[0,1],["0%","100%"]);
  useEffect(()=>{const update=()=>setTime(new Date()); update();const clock=window.setInterval(update,1000);return()=>window.clearInterval(clock)},[]);
  const hour=time?Number(new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",hour12:false}).format(time)):21;
  const mode=display==="auto"?(hour>=6&&hour<18?"day":"night"):display;
  const clockText=time?new Intl.DateTimeFormat("en-US",{hour:"numeric",minute:"2-digit",timeZone:"Asia/Kolkata"}).format(time):"--:--";

  const step=(delta:number)=>setNavigationRequest({index:(project+delta+projectData.length)%projectData.length});
  const selectedProject=projectData[project];



  const root=useRef<HTMLElement>(null);
  useScrollReveals(root);
  useMotionEngine(root);

  return <main ref={root} className={`universe ${mode}`} onPointerMove={event=>{const card=(event.target as HTMLElement).closest<HTMLElement>("[data-spotlight]");if(card){const box=card.getBoundingClientRect();card.style.setProperty("--spot-x",`${event.clientX-box.left}px`);card.style.setProperty("--spot-y",`${event.clientY-box.top}px`);}}}>
    <motion.div className="read-progress" style={{width:scrollScale}} aria-hidden="true"/>
    <SiteNavigation onSurprise={()=>setStars(v=>v+1)}/>

    <PhotoHero mode={mode} display={display} clockText={clockText} onDisplayChange={()=>setDisplay(display==="auto"?"day":display==="day"?"night":"auto")} stars={stars}/>

    <section className="manifesto-v3" id="manifesto"><div className="section-overline">00 / AN INTRODUCTION</div><div className="manifesto-statement">{["I don't just want to know how things work.","I want to ask why, imagine what if, and figure out how."].map((line,i)=><span key={line} className={i?"manifesto-second":"manifesto-first"}>{line.split(" ").map((word,j)=><span key={j} className="manifesto-word">{word}{" "}</span>)}</span>)}</div><div className="manifesto-bottom"><span>THINK <b>↗</b> BUILD <b>↗</b> EXPLORE</span><p>A little logic. A little audacity. A lot of curiosity.</p></div></section>

    <div className="curiosity-ticker" aria-hidden="true">{[0,1].map(n=><div key={n}>{["THINK","BUILD","EXPLORE","TECHNOLOGY","MYTHOLOGY","GEOPOLITICS","POP CULTURE"].map(t=><span key={t}>{t}<i>✳</i></span>)}</div>)}</div>

    <section className="section-block build-section" id="build"><div className="section-header"><div><span className="section-overline">01 / BUILD</span><RevealHeading>Made it out<br/>of <em>my head.</em></RevealHeading></div><p className="section-aside">Projects are most interesting when you can explain the problem, the decisions, and what actually works.</p></div><div className="showcase"><div className="carousel-stage"><CircularCarousel items={projectItems} preset="cylinder" intro="rise" cardWidth={480} aspectRatio={1.6} gap={36} speed={8} autoplay="off" captions fadeColor="#f0ede5" depthFade={0.35} cornerRadius={18} onChange={setProject} navigationRequest={navigationRequest}/></div><div className="showcase-content"><div className="showcase-count">SELECTED WORK <span>{selectedProject.id} / 04</span></div><AnimatePresence mode="wait"><motion.div key={selectedProject.id} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:.26}}><p className="project-category">{selectedProject.group}</p><h3>{selectedProject.title}</h3><p className="project-line">{selectedProject.line}</p><p className="project-description">{selectedProject.desc}</p><ul>{selectedProject.details.map(d=><li key={d}>{d}</li>)}</ul><div className="project-links">{selectedProject.link&&<a className="project-link" href={selectedProject.link} target="_blank" rel="noopener noreferrer">{selectedProject.cta} <ExternalLink size={16}/></a>}{selectedProject.repo&&<a className="project-link" href={selectedProject.repo} target="_blank" rel="noopener noreferrer"><Github size={16}/> GitHub repo <ArrowUpRight size={15}/></a>}<a className="project-image-link" href={`/images/projects/${selectedProject.image}`} target="_blank" rel="noopener noreferrer"><ImageIcon size={15}/> View {selectedProject.imageKind}</a></div></motion.div></AnimatePresence><div className="carousel-actions"><button onClick={()=>step(-1)} aria-label="Previous project"><ArrowLeft size={19}/></button><span>DRAG THE IDEA FORWARD</span><button onClick={()=>step(1)} aria-label="Next project"><ArrowRight size={19}/></button></div></div></div><div className="project-index" aria-label="Select a project">{projectData.map((p,i)=><button key={p.id} aria-pressed={project===i} onClick={()=>setNavigationRequest({index:i})}><small>{p.id}</small><span>{p.title}</span><ArrowUpRight size={15}/></button>)}</div></section>

    <section className="section-block journey-section" id="journey"><div className="section-header"><div><span className="section-overline">02 / THE JOURNEY</span><RevealHeading>Not a straight line.<br/><em>A compass.</em></RevealHeading></div><p className="section-aside">The places, people and experiences that taught me how to adapt, take responsibility and find my voice.</p></div><div className="journey-layout"><JourneyCompass/><div className="journey-rail">{journeyData.map((j,i)=><button key={j.num} onClick={()=>setJourney(i)} className={journey===i?"journey-active":""}><span className="rail-dot"/><small>{j.num} · {j.era}</small><strong>{j.title}</strong><span>{j.line}</span></button>)}</div><div className="journey-feature" data-spotlight><AnimatePresence mode="wait"><motion.div key={journey} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-10}} transition={{duration:.25}}><span className="journey-stamp">{journeyData[journey].stamp}</span><h3>{journeyData[journey].title}</h3><p>{journeyData[journey].body}</p><span className="journey-small">CHAPTER {journeyData[journey].num} / 04</span></motion.div></AnimatePresence></div></div><div className="resume-proof"><span><b>9.41</b> B.Tech CGPA</span><span><b>12/350</b> SIH internal rank</span><span><b>School Captain</b> Navy Children School</span><span><b>International Rank 1</b> English Olympiad</span></div></section>

    <Toolkit/>

    <ExploreWorlds/>

    <ContactConsole time={time}/>


  </main>;
}
