"use client";
import { useId } from "react";

type Props = { mode: "day" | "night" };
const palms = [
  {x:100,y:204,s:1,delay:"-1s"},{x:258,y:194,s:.84,delay:"-3s"},
  {x:422,y:204,s:.93,delay:"-5s"},{x:972,y:197,s:1,delay:"-2s"},
  {x:1156,y:205,s:.9,delay:"-4s"}
];
function Palm({x,y,s,delay}:{x:number;y:number;s:number;delay:string}) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 0 Q-13 -70 10 -148" stroke="#504f39" strokeWidth="11" fill="none" strokeLinecap="round" />
    <path d="M0 0 Q-13 -70 10 -148" stroke="#a2a67b" strokeWidth="2" fill="none" opacity=".45" />
    <g transform="translate(10 -148)"><g className="palm-crown" style={{animationDelay:delay}}>
      {[-95,-60,-25,10,43,78,112,150,185].map((a,i)=><g key={a} transform={`rotate(${a})`}>
        <path d="M0 0 Q30 -14 80 0 Q56 13 20 7Z" fill={i%3===0?"#6d8a62":"#416e50"}/>
        <path d="M0 0 Q40 -5 78 0" stroke="#c4bb82" strokeWidth="1" fill="none" opacity=".6"/>
        {[0,1,2,3,4].map(k=><path key={k} d={`M${18+k*12} 3 q9 8 11 ${14+k*1.5}`} stroke="#75a072" strokeWidth="2" fill="none"/>) }
      </g>)}
      </g></g>
  </g>
}

export default function BackwaterName({mode}:Props) {
  const root=useId().replace(/:/g,"");
  const sky=`${root}-sky`,water=`${root}-water`,glass=`${root}-glass`,mask=`${root}-mask`;
  const day=mode==="day";
  const titleProps={fontFamily:"Arial,Helvetica,sans-serif",fontWeight:"900",letterSpacing:"-14"} as const;
  return <div className="backwater-name">
    <svg viewBox="0 0 1240 420" role="img" aria-label="MALAVIKA VIVEK, translucent glass letters revealing moving Kerala backwaters, coconut trees and a traditional houseboat">
      <defs>
        <linearGradient id={sky} x2="0" y2="1"><stop stopColor={day?"#d9e9dc":"#426774"}/><stop offset=".68" stopColor={day?"#f4dac2":"#a4a99a"}/><stop offset="1" stopColor={day?"#bac7a8":"#5b8275"}/></linearGradient>
        <linearGradient id={water} x2="0" y2="1"><stop stopColor={day?"#7fa48a":"#406969"}/><stop offset="1" stopColor={day?"#315d5c":"#183f4b"}/></linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".85"/><stop offset=".28" stopColor="#c6fff0" stopOpacity=".1"/><stop offset=".56" stopColor="#fff" stopOpacity=".46"/><stop offset=".82" stopColor="#fff" stopOpacity=".08"/><stop offset="1" stopColor="#d8fff5" stopOpacity=".6"/></linearGradient>
        <mask id={mask}><rect width="1240" height="420" fill="black"/><text x="8" y="185" fontSize="215" textLength="1220" lengthAdjust="spacingAndGlyphs" fill="white" {...titleProps}>MALAVIKA</text><text x="8" y="405" fontSize="245" textLength="700" lengthAdjust="spacingAndGlyphs" fill="white" {...titleProps}>VIVEK</text></mask>
      </defs>
      <g mask={`url(#${mask})`}>
        <rect width="1240" height="420" fill={`url(#${sky})`}/>
        <circle cx="782" cy="69" r="45" fill={day?"#ffebbd":"#eae3ca"} opacity=".82"/>
        <path d="M0 206 Q170 188 320 205 Q492 189 661 206 Q832 187 991 202 Q1100 189 1240 200 L1240 256 L0 256Z" fill={day?"#476a4b":"#365b50"}/>
        <path d="M0 229 Q260 208 450 229 Q690 207 890 227 Q1100 208 1240 223 L1240 268 L0 268Z" fill="#3b6251" opacity=".83"/>
        {palms.map((p,i)=><Palm key={i} {...p}/>)}
        <rect y="226" width="1240" height="194" fill={`url(#${water})`}/>
        <g className="backwater-ripples">{Array.from({length:33},(_,i)=><path key={i} d={`M${i*49-80} ${236+i*5.8}q40 -4 83 0t96 0`} fill="none" stroke={i%3===0?"#e9dbbd":"#a3d6c2"} strokeWidth={i%3===0?2:1} opacity={.19+(i%5)*.06}/>)}</g>
        <g className="kerala-boat">
          <ellipse cx="803" cy="342" rx="177" ry="12" fill="#e0cfaa" opacity=".25"/>
          <path d="M638 304 L971 304 Q958 341 913 344 L695 344 Q658 342 638 304Z" fill="#513c2b" stroke="#b99363" strokeWidth="4"/>
          <path d="M659 300 Q674 240 732 231 L871 231 Q925 236 952 300 Z" fill="#b99058" stroke="#725038" strokeWidth="4"/>
          <path d="M668 292 Q684 249 736 245 L871 245 Q920 249 943 292" fill="none" stroke="#e7c68b" strokeWidth="9" opacity=".7"/>
          {Array.from({length:23},(_,i)=><path key={i} d={`M${680+i*11} ${250+Math.abs(i-11)*2}v${37-Math.abs(i-11)}`} stroke="#745b3c" strokeWidth="2" opacity=".56"/>)}
          {[725,792,859].map(x=><rect key={x} x={x} y="274" width="45" height="30" rx="9" fill="#2e5147" stroke="#e2c18b" strokeWidth="4"/>)}
          <path d="M630 305 Q640 316 660 309" fill="none" stroke="#d9ad76" strokeWidth="6"/>
        </g>
        <rect width="1240" height="420" fill={`url(#${glass})`} opacity=".35"/>
        <path className="glass-sweep" d="M-240 -30h150l280 480H40Z" fill="#fff" opacity=".12"/>
      </g>
      <g fill="none" stroke={`url(#${glass})`} strokeWidth="3" opacity=".95" strokeLinejoin="round">
        <text x="8" y="185" fontSize="215" textLength="1220" lengthAdjust="spacingAndGlyphs" {...titleProps}>MALAVIKA</text>
        <text x="8" y="405" fontSize="245" textLength="700" lengthAdjust="spacingAndGlyphs" {...titleProps}>VIVEK</text>
      </g>
    </svg>
  </div>;
}
