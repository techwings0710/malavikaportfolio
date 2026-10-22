"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const places = [
  { name: "Mumbai", lat: 19.076, lon: 72.8777, dx: -13, dy: -12, anchor: "end" },
  { name: "Goa", lat: 15.2993, lon: 74.124, dx: -14, dy: -3, anchor: "end" },
  { name: "Vizag", lat: 17.6868, lon: 83.2185, dx: 14, dy: -1, anchor: "start" },
  { name: "Coonoor", lat: 11.353, lon: 76.795, dx: 14, dy: -1, anchor: "start" },
  { name: "Chennai", lat: 13.0827, lon: 80.2707, dx: 15, dy: 2, anchor: "start" },
  { name: "Kochi", lat: 9.9312, lon: 76.2673, dx: -14, dy: 12, anchor: "end" },
  { name: "Mauritius", lat: -20.3484, lon: 57.5522, dx: 0, dy: 0, anchor: "middle" },
] as const;
const project = (place: typeof places[number]) => ({x:(place.lon-67)*10,y:(38-place.lat)*10});
function bearing(to: typeof places[number]) {
  const rad = Math.PI/180;
  const start = places[0];
  const delta = (to.lon-start.lon)*rad;
  return (Math.atan2(Math.sin(delta)*Math.cos(to.lat*rad), Math.cos(start.lat*rad)*Math.sin(to.lat*rad)-Math.sin(start.lat*rad)*Math.cos(to.lat*rad)*Math.cos(delta))/rad+360)%360;
}

export default function JourneyCompass() {
  const [selected,setSelected] = useState(0);
  const reduced = useReducedMotion();
  const place = places[selected];
  const degrees = Math.round(bearing(place));
  const origin = project(places[0]);
  const destination = project(place);
  return <div className="journey-instruments">
    <div className="real-compass">
      <svg className="compass-dial" viewBox="0 0 320 320" role="img" aria-label={selected===0 ? "Compass pointing north" : `Bearing from Mumbai to ${place.name}: ${degrees} degrees`}>
        <defs>
          <linearGradient id="compass-metal" x2="1" y2="1"><stop stopColor="#edd9ab"/><stop offset=".28" stopColor="#8c7756"/><stop offset=".5" stopColor="#e5d2a4"/><stop offset=".74" stopColor="#514634"/><stop offset="1" stopColor="#c7b382"/></linearGradient>
          <radialGradient id="compass-face"><stop stopColor="#25413e"/><stop offset="1" stopColor="#081c21"/></radialGradient>
          <linearGradient id="compass-glass" x2=".8" y2="1"><stop stopColor="#fff" stopOpacity=".13"/><stop offset=".5" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#fff" stopOpacity=".03"/></linearGradient>
        </defs>
        <circle cx="160" cy="160" r="153" fill="url(#compass-metal)"/>
        <circle cx="160" cy="160" r="145" fill="#081b20" stroke="#554f3e" strokeWidth="3"/>
        <circle cx="160" cy="160" r="138" fill="url(#compass-face)" stroke="#d6bf86" strokeOpacity=".5"/>
        {Array.from({length:120},(_,i)=><line key={i} x1="160" y1={i%10===0?"35":i%5===0?"30":"25"} x2="160" y2="22" stroke={i%10===0?"#eadab6":"#829991"} strokeWidth={i%5===0?1.7:.7} transform={`rotate(${i*3} 160 160)`}/>)}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg=><text key={deg} x="160" y="49" fill="#b9bca6" fontSize="8" fontFamily="monospace" textAnchor="middle" transform={`rotate(${deg} 160 160)`}>{String(deg).padStart(3,"0")}</text>)}
        {Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${i*45} 160 160)`} opacity={i%2===0?.55:.2}><path d="M160 67L171 160H160Z" fill="#b9d1c2"/><path d="M160 67L149 160H160Z" fill="#31514c"/></g>)}
        <circle cx="160" cy="160" r="72" fill="none" stroke="#91aa95" strokeOpacity=".22"/>
        <g fontFamily="Georgia,serif" fontSize="22" textAnchor="middle" fill="#e5ddbf"><text x="160" y="83" fill="#dfac83">N</text><text x="245" y="168">E</text><text x="160" y="253">S</text><text x="75" y="168">W</text></g>
        <motion.g animate={{rotate:degrees}} transition={{type:"spring",stiffness:65,damping:13,duration:reduced?0:undefined}} style={{transformOrigin:"160px 160px"}}>
          <path d="M160 63L176 160L160 151L144 160Z" fill="#e9ad88"/>
          <path d="M160 63V151L144 160Z" fill="#b97356"/>
          <path d="M160 257L144 160L160 169L176 160Z" fill="#d9e6da"/>
          <path d="M160 257V169L176 160Z" fill="#779f95"/>
        </motion.g>
        <circle cx="160" cy="160" r="12" fill="url(#compass-metal)" stroke="#092126" strokeWidth="2"/>
        <circle cx="160" cy="160" r="4" fill="#173431"/>
        <circle cx="160" cy="160" r="136" fill="url(#compass-glass)" pointerEvents="none"/>
      </svg>
      <div className="compass-bearing" aria-live="polite"><b>{String(degrees).padStart(3,"0")}°</b><span>{selected===0?"NORTH / MUMBAI":"FROM MUMBAI TO " + place.name.toUpperCase()}</span></div>
    </div>
    <div className="places-map">
      <div className="map-eyebrow">PLACES I'VE CALLED HOME <span>07</span></div>
      <svg className="india-map" viewBox="-15 -5 350 355" role="img" aria-label="Map of India with markers for Mumbai, Goa, Vizag, Coonoor, Chennai and Kochi, and a Mauritius inset">
        <defs><pattern id="map-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#9abdaf" strokeOpacity=".07"/></pattern></defs>
        <rect x="-15" y="-5" width="350" height="355" fill="url(#map-grid)"/>
        <image href="/images/india-full-map.svg" x="-15" y="-5" width="350" height="355"/>
        <text x="155" y="135" textAnchor="middle" className="map-country-label">INDIA</text>
        {selected>0&&selected<6&&<path d={`M${origin.x} ${origin.y}Q${(origin.x+destination.x)/2-25} ${(origin.y+destination.y)/2-20} ${destination.x} ${destination.y}`} fill="none" stroke="#e8ba8c" strokeWidth="1" strokeDasharray="3 4"/>}
        {places.slice(0,6).map((p,i)=>{const {x,y}=project(p);return <g key={p.name} className={`map-pin ${selected===i?"is-active":""}`} transform={`translate(${x} ${y})`} aria-hidden="true"><circle className="pin-halo" r="10"/><circle className="pin-core" r="3.2"/><text x={p.dx} y={p.dy} textAnchor={p.anchor}>{p.name}</text></g>})}
        <g className="map-island-labels" aria-hidden="true"><text x="30" y="306">LAKSHADWEEP</text><text x="248" y="335" textAnchor="middle">ANDAMAN & NICOBAR</text></g>
      </svg>
      <button className={`mauritius-inset ${selected===6?"is-active":""}`} onClick={()=>setSelected(6)} aria-pressed={selected===6}><svg viewBox="-15 -18 55 65" aria-hidden="true"><path d="M12 -10L20 -6 24 7 19 22 8 30 -1 21 -4 9 2 -4Z"/><circle cx="10" cy="10" r="3"/></svg><span><b>Mauritius</b><small>INDIAN OCEAN / ISLAND CHAPTER</small></span><span className="inset-light"/></button>
      <div className="place-selector" aria-label="Select a place to light up its map marker and compass bearing">{places.map((p,i)=><button key={p.name} onClick={()=>setSelected(i)} aria-pressed={selected===i}><span/>{p.name}</button>)}</div>
    </div>
  </div>;
}
