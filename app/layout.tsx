import type { Metadata } from "next";
import { Big_Shoulders } from "next/font/google";
import PreloaderGate from "../components/tds/image-stack-preloader/PreloaderGate";
const display = Big_Shoulders({ weight: "900", subsets: ["latin"], variable: "--tds-display", display: "swap", adjustFontFallback: false });
import "lenis/dist/lenis.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Malavika Vivek | Think. Build. Explore.",
  description: "Engineering student, curious explorer and builder. An interactive personal portfolio about problem-solving, technology, creativity and the journey behind it.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    {/* Paint the cover before hydration or font loading can reveal the page. */}
    <style>{`.tds-pre{display:block;position:fixed;inset:0;z-index:10001;isolation:isolate}.tds-pre__screen{position:fixed;inset:0;background:#0b2125}@media(prefers-reduced-motion:reduce){.tds-pre{display:none!important}}`}</style>
    <noscript><style>{`.tds-pre{display:none!important}`}</style></noscript>
  </head><body className={display.variable}><PreloaderGate>{children}</PreloaderGate></body></html>;
}
