"use client";

import RevealHeading from "./RevealHeading";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Command, Copy, FileText, Github, Linkedin, Mail } from "lucide-react";
import { scrollToSection } from "./useMotionEngine";

const email="malavika.vivek@gmail.com";
function SignalScope({signal}:{signal:number}) {
  const canvas=useRef<HTMLCanvasElement>(null);
  const signalRef=useRef(signal);signalRef.current=signal;
  useEffect(()=>{
    const el=canvas.current,ctx=el?.getContext("2d");if(!el||!ctx)return;
    const reduced=matchMedia("(prefers-reduced-motion: reduce)");
    let frame=0,visible=false,width=0,height=0,phase=0;
    const draw=()=>{
      ctx.clearRect(0,0,width,height);ctx.strokeStyle="#a4f2ce";ctx.lineWidth=1.5;ctx.shadowBlur=8;ctx.shadowColor="#8de9bd";ctx.beginPath();
      const frequency=signalRef.current?signalRef.current+1:1.6;
      for(let x=0;x<=width;x+=2){const y=height/2+Math.sin(x/Math.max(width,1)*Math.PI*2*frequency+phase)*height*(signalRef.current?.28:.1);if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();
      if(visible&&!document.hidden&&!reduced.matches){phase+=.045;frame=requestAnimationFrame(draw);}
    };
    const start=()=>{cancelAnimationFrame(frame);draw();};
    const resize=new ResizeObserver(()=>{const rect=el.getBoundingClientRect(),dpr=Math.min(devicePixelRatio,2);width=rect.width;height=rect.height;el.width=width*dpr;el.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);start();});resize.observe(el);
    const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;start();});io.observe(el);
    document.addEventListener("visibilitychange",start);reduced.addEventListener("change",start);
    return()=>{cancelAnimationFrame(frame);io.disconnect();resize.disconnect();document.removeEventListener("visibilitychange",start);reduced.removeEventListener("change",start);};
  },[]);
  return <div className="signal-scope" aria-hidden="true"><canvas ref={canvas}/><span>SIGNAL / {signal?"CONNECTED":"IDLE"}</span></div>;
}

export default function ContactConsole({time}:{time:Date|null}) {
  const [hover,setHover]=useState(-1),[message,setMessage]=useState("");
  const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  const copy=async()=>{try{await navigator.clipboard.writeText(email);setMessage("Email copied — ready for your next idea.");}catch{setMessage(`Copy this address: ${email}`);}if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>setMessage(""),4500);};
  const keys=[
    {label:"Let's talk",detail:email,icon:Mail,href:`mailto:${email}`,tone:"mint",wide:true},
    {label:"Copy email",detail:"Copy address to clipboard",icon:Copy,action:copy,tone:"cream"},
    {label:"GitHub",detail:"github.com/techwings0710",icon:Github,href:"https://github.com/techwings0710",tone:"dark"},
    {label:"LinkedIn",detail:"Connect on LinkedIn",icon:Linkedin,href:"https://www.linkedin.com/in/malavikavivek07/",tone:"blue"},
    {label:"Résumé",detail:"Open my résumé / PDF",icon:FileText,href:"/malavika-vivek-resume.pdf",tone:"cream"},
    {label:"Back to top",detail:"Back to the backwaters",icon:ArrowUp,action:()=>scrollToSection("home"),tone:"dark"},
    {label:"Quick menu",detail:"Open the command palette",icon:Command,action:()=>window.dispatchEvent(new Event("portfolio:commands")),tone:"violet"}
  ];
  const clock=time?new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(time):"--:--:--";
  return <section className="contact-section console-contact" id="connect">
    <div className="contact-halo"/>
    <div className="contact-top"><span className="section-overline">05 / THE NEXT CONVERSATION</span><span><span className="beacon"/> OPEN TO INTERNSHIPS & IDEAS</span></div>
    <RevealHeading>Have something<br/><em>interesting in mind?</em></RevealHeading>
    <p>Engineering, product, AI, entrepreneurship—or simply a question worth discussing. I'd love to hear about it.</p>
    <div className="contact-console" data-spotlight>
      <i className="console-screw screw-tl"/><i className="console-screw screw-tr"/><i className="console-screw screw-bl"/><i className="console-screw screw-br"/>
      <div className="console-display"><span className="beacon"/><span>IST <b>{clock}</b></span><span className="console-location">MUMBAI, IN</span><span className="console-readout">{hover>=0?keys[hover].detail:"STATUS / OPEN TO COLLABORATIONS"}</span></div>
      <div className="console-deck"><div className="console-keys">{keys.map((key,i)=>{const Icon=key.icon;const content=<><small>{String(i+1).padStart(2,"0")}</small><span className="console-key-face"><Icon size={25}/><b>{key.label}</b><ArrowUpRight className="key-corner" size={13}/></span></>;const props={className:`console-key key-${key.tone} ${key.wide?"key-wide":""}`,onMouseEnter:()=>setHover(i),onMouseLeave:()=>setHover(-1),onFocus:()=>setHover(i),onBlur:()=>setHover(-1)};return key.href?<a key={key.label} {...props} href={key.href} target={key.href.startsWith("mailto:")?undefined:"_blank"} rel={key.href.startsWith("mailto:")?undefined:"noopener noreferrer"}>{content}</a>:<button key={key.label} {...props} type="button" onClick={key.action}>{content}</button>;})}</div><div className="console-instruments"><div className="console-grille" aria-hidden="true"/><SignalScope signal={hover+1}/><span className="console-model">MV / CONVERSATION ENGINE<br/>THINK · BUILD · EXPLORE</span></div></div>
      <div className="console-feedback" role="status">{message?<><Check size={12}/>{message}</>:"SELECT A KEY. START A CONVERSATION."}</div>
    </div>
    <div className="contact-wordmark" aria-hidden="true">Malavika <em>Vivek.</em></div>
    <footer><span>© 2026 MALAVIKA VIVEK</span><span>THOUGHT THROUGH. BUILT WITH CURIOSITY.</span><a href="#home">BACK TO THE TOP ↑</a></footer>
  </section>;
}
