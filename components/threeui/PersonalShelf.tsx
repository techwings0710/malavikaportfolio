"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import source from "./sources/personal-library.html?raw";
import { photoPlates } from "./photoPlates";
import artworkSources from "../../public/images/shelf/sources.json";

export type ShelfCollection = "books" | "pop" | "photo" | "music";

type Entry = { title: string; lines: [string, string?]; color: string; note: string; image?: string };

const lists: Record<ShelfCollection, Entry[]> = {
  books: [
    { title:"Harry Potter", lines:["HARRY","POTTER"], color:"#6d303a", note:"A WORLD OF MAGIC" },
    { title:"Percy Jackson", lines:["PERCY","JACKSON"], color:"#286d83", note:"DEMIGODS & MYTHS" },
    { title:"The Swift and the Harrier", lines:["THE SWIFT","AND THE HARRIER"], color:"#826149", note:"A STORY TO RETURN TO" },
    { title:"Sparks Like Stars", lines:["SPARKS","LIKE STARS"], color:"#775570", note:"A STORY TO RETURN TO" },
    { title:"Unbroken", lines:["UNBROKEN"], color:"#4f6463", note:"A STORY TO RETURN TO" },
    { title:"Baaz", lines:["BAAZ"], color:"#966744", note:"A STORY TO RETURN TO" },
    { title:"A Walk to Remember", lines:["A WALK TO","REMEMBER"], color:"#8b6878", note:"A STORY TO RETURN TO" },
    { title:"Not a Penny More, Not a Penny Less", lines:["NOT A PENNY MORE","NOT A PENNY LESS"], color:"#466b63", note:"A STORY TO RETURN TO" },
    { title:"Pride and Prejudice", lines:["PRIDE AND","PREJUDICE"], color:"#987565", note:"A STORY TO RETURN TO" },
    { title:"Keeper of the Lost Cities", lines:["KEEPER OF THE","LOST CITIES"], color:"#547591", note:"A STORY TO RETURN TO" },
  ],
  pop: [
    { title:"Yeh Jawaani Hai Deewani", lines:["YEH JAWAANI","HAI DEEWANI"], color:"#d48072", note:"BOLLYWOOD" },
    { title:"Zindagi Na Milegi Dobara", lines:["ZINDAGI NA","MILEGI DOBARA"], color:"#558da2", note:"BOLLYWOOD" },
    { title:"Dil Chahta Hai", lines:["DIL CHAHTA","HAI"], color:"#d7a75a", note:"BOLLYWOOD" },
    { title:"Hum Tum", lines:["HUM","TUM"], color:"#ba6b83", note:"BOLLYWOOD" },
    { title:"Dilwale Dulhania Le Jayenge", lines:["DILWALE DULHANIA","LE JAYENGE"], color:"#9e514f", note:"BOLLYWOOD" },
    { title:"Ocean's Twelve", lines:["OCEAN'S","TWELVE"], color:"#456879", note:"CINEMA" },
    { title:"Avengers", lines:["AVENGERS"], color:"#655783", note:"CINEMA" },
    { title:"Notting Hill", lines:["NOTTING","HILL"], color:"#7891a9", note:"CINEMA" },
    { title:"You've Got Mail", lines:["YOU'VE GOT","MAIL"], color:"#96a476", note:"CINEMA" },
    { title:"Independence Day", lines:["INDEPENDENCE","DAY"], color:"#525f88", note:"CINEMA" },
  ],
  music: [
    { title:"Iris", lines:["IRIS"], color:"#616d96", note:"THE GOO GOO DOLLS" },
    { title:"Demons", lines:["DEMONS"], color:"#695872", note:"IMAGINE DRAGONS" },
    { title:"Tum Se Hi", lines:["TUM SE","HI"], color:"#a16b80", note:"PRITAM & MOHIT CHAUHAN" },
    { title:"Story of My Life", lines:["STORY OF","MY LIFE"], color:"#6d778a", note:"ONE DIRECTION" },
    { title:"Annie's Song", lines:["ANNIE'S","SONG"], color:"#9b7e69", note:"JOHN DENVER" },
    { title:"Take Me Home, Country Roads", lines:["TAKE ME HOME","COUNTRY ROADS"], color:"#7e927b", note:"JOHN DENVER" },
    { title:"Just the Way You Are", lines:["JUST THE WAY","YOU ARE"], color:"#777176", note:"BILLY JOEL" },
    { title:"She (Elvis Costello)", lines:["SHE"], color:"#9e6277", note:"ELVIS COSTELLO" },
    { title:"Fix You", lines:["FIX","YOU"], color:"#627f91", note:"COLDPLAY" },
    { title:"Hey Jude", lines:["HEY","JUDE"], color:"#9d8b69", note:"THE BEATLES" },
  ],
  photo: [
    { title:"Taj Mahal Palace", lines:["TAJ MAHAL","PALACE"], color:"#836c5b", note:"FRAME 01", image:photoPlates[0] },
    { title:"Sea at Sunset", lines:["SEA AT","SUNSET"], color:"#7896a1", note:"FRAME 02", image:photoPlates[1] },
    { title:"Framed View", lines:["FRAMED","VIEW"], color:"#79766e", note:"FRAME 03", image:photoPlates[2] },
    { title:"City at Dusk", lines:["CITY AT","DUSK"], color:"#746686", note:"FRAME 04", image:photoPlates[3] },
    { title:"Coastal Sunset", lines:["COASTAL","SUNSET"], color:"#ac8961", note:"FRAME 05", image:photoPlates[4] },
    { title:"Taj Detail", lines:["TAJ","DETAIL"], color:"#836c5b", note:"CLOSER LOOK", image:photoPlates[0] },
    { title:"Sea Detail", lines:["SEA","DETAIL"], color:"#7896a1", note:"CLOSER LOOK", image:photoPlates[1] },
    { title:"Framed Detail", lines:["FRAMED","DETAIL"], color:"#79766e", note:"CLOSER LOOK", image:photoPlates[2] },
    { title:"City Detail", lines:["CITY","DETAIL"], color:"#746686", note:"CLOSER LOOK", image:photoPlates[3] },
    { title:"Coast Detail", lines:["COAST","DETAIL"], color:"#ac8961", note:"CLOSER LOOK", image:photoPlates[4] },
  ],
};

const themes = {
  books: { title:"THE READING SHELF", studio:"Malavika's reading shelf", background:"#c6ae8e", rgb:"198,174,142" },
  pop: { title:"THE SCREENING ROOM", studio:"Films to revisit", background:"#d0aaba", rgb:"208,170,186" },
  photo: { title:"THE PHOTO ARCHIVE", studio:"Photographs by Malavika", background:"#a9c0c0", rgb:"169,192,192" },
  music: { title:"THE RECORD ROOM", studio:"Songs on repeat", background:"#b7adc9", rgb:"183,173,201" },
} as const;

function makeSource(collection: ShelfCollection) {
  const theme = themes[collection];
  const entries = lists[collection];
  const volumes = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
  const books = entries.map((entry, index) => ({
    id:`${collection}-${index+1}`, kind:collection, title:entry.title, t1:entry.lines[0], t2:entry.lines[1] || "",
    sub:entry.note, year:collection === "photo" ? `FRAME ${String(index%5+1).padStart(2,"0")}` : "SELECTED",
    vol:volumes[index], shelf:Math.floor(index/5), slot:index%5,
    spine:entry.color, cloth:entry.color, edge:"#efe5d3", blurb:entry.title,
  }));
  const plates = Object.fromEntries(entries.map((entry,index) => [books[index].id, entry.image || `/images/shelf/${collection}-${String(index+1).padStart(2,"0")}.webp`]));
  const fullPhotos = Object.fromEntries(entries.map((entry,index) => [books[index].id, `/images/photography/${["taj-hotel","frame-02","frame-03","city-at-dusk","coastal-sunset"][index%5]}.webp`]));
  return source.replaceAll("__TITLE__",theme.title)
    .replace("__STUDIO__",JSON.stringify(theme.studio))
    .replace("__BOOKS__",JSON.stringify(books))
    .replace("__PLATE_SRC__",JSON.stringify(plates))
    .replace("__PHOTO_MODE__",String(collection === "photo"))
    .replace("__MUSIC_MODE__",String(collection === "music"))
    .replace("__FULL_PHOTO_SRC__",JSON.stringify(fullPhotos))
    .replaceAll("#c6ae8e",theme.background)
    .replaceAll("198,174,142",theme.rgb);
}

export default function PersonalShelf({ collection }: { collection: ShelfCollection }) {
  const html = useMemo(() => makeSource(collection), [collection]);
  const shelfFrame = useRef<HTMLIFrameElement>(null);
  const closePlayer = useRef<HTMLButtonElement>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (collection !== "music") return;
    const onMessage = (event: MessageEvent) => {
      if (event.source !== shelfFrame.current?.contentWindow) return;
      if (event.data?.type !== "personal-shelf-listen") return;
      const match = /^music-(\d+)$/.exec(String(event.data.id));
      const index = match ? Number(match[1]) - 1 : -1;
      if (index >= 0 && index < artworkSources.music.length) setPlayingIndex(index);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [collection]);

  useEffect(() => {
    if (playingIndex === null) return;
    closePlayer.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.stopPropagation(); setPlayingIndex(null); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [playingIndex]);

  const track = playingIndex === null ? null : artworkSources.music[playingIndex];
  return <div className="threeui-background personal-shelf" role="group" aria-label={`${themes[collection].title} interactive library`}>
    <iframe ref={shelfFrame} title={`${themes[collection].title} interactive library`} srcDoc={html} sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" loading="eager" />
    {track && <div className="shelf-player-backdrop" onClick={() => setPlayingIndex(null)}>
      <div className="shelf-player" role="region" aria-label={`Listen to ${track.title}`} onClick={event => event.stopPropagation()}>
        <button ref={closePlayer} className="shelf-player-close" onClick={() => setPlayingIndex(null)} aria-label="Close music player">×</button>
        <div className="shelf-player-main">
          <img src={`/images/shelf/${track.file}`} alt={`${track.title} cover artwork`} width={84} height={84}/>
          <div className="shelf-player-heading"><span>ON THE RECORD / {String(playingIndex! + 1).padStart(2,"0")}</span><strong>{track.title}</strong><small>{track.artist}</small></div>
        </div>
        <audio key={track.audio} controls preload="none" src={track.audio} aria-label={`Play ${track.title} by ${track.artist}`}>Your browser does not support MP3 playback.</audio>
      </div>
    </div>}
  </div>;
}
