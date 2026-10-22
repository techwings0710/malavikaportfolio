import type { Metadata } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
export const metadata: Metadata = {
  title: "Malavika Vivek | Think. Build. Explore.",
  description: "Engineering student, curious explorer and builder. An interactive personal portfolio about problem-solving, technology, creativity and the journey behind it.",
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
