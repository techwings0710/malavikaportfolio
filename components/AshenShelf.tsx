"use client";

import PersonalShelf, { type ShelfCollection } from "./threeui/PersonalShelf";
import "@designcodeio/threeui/style.css";

const labels: Record<ShelfCollection,string> = { books:"THE READING SHELF", pop:"THE SCREENING ROOM", photo:"THE PHOTO ARCHIVE", music:"THE RECORD ROOM" };

export default function AshenShelf({ collection }: { collection: ShelfCollection }) {
  return <div className={`ashen-shelf shelf-${collection}`}><div className="ashen-shelf-heading"><span>{labels[collection]}</span><span>{collection === "music" ? "HOVER · SELECT · LISTEN" : "HOVER · SELECT · FLIP · DRAG"}</span></div><div className="shader-frame"><PersonalShelf collection={collection}/></div></div>;
}
