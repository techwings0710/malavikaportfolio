# Malavika Vivek — Personal Universe V3

A creative reset of the Signal / After Dark portfolio: **Think · Build · Explore**, with a full-screen photorealistic Kerala backwaters hero and a thoughtful Fauji-values journey. Built on the existing Next.js App Router project.

## Run locally on your Mac

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. Use a recent Node.js LTS installation (Node 20+).

## What's included

- **Photorealistic Kerala hero**: locally stored, AI-generated backwaters photography fills the whole hero, including coconut palms, water reflections and a traditional kettuvallam. Large cream lettering and a directional shade keep the introduction readable. The original glass-letter illustration is retained as an unused component.
- **Automatic day/night** palette for the new scene using `Asia/Kolkata` (day 06:00–17:59, night 18:00–05:59), with a preview toggle in the hero footer.
- **Navbar easter egg**: shooting stars; quick navigation via `⌘K` / `Ctrl+K`.
- **Scroll-driven manifesto** and progress indicator.
- **React Bits CircularCarousel**: AegisQuant, Heritage Shield, DependIQ and HeatSense arranged on a curved cylinder. Supports dragging with momentum, click to focus, arrow keys, Home/End, previous/next buttons and synchronised project details. Autoplay is off for comfortable reading. Carousel cards use locally optimized project screenshots supplied by the owner for AegisQuant, Heritage Shield and HeatSense. DependIQ uses its actual GitHub repository preview, explicitly labelled. Each screenshot is shown uncropped and can be opened full size. Verified repository links appear next to the existing live-demo links. Heritage Shield has no repository link, as requested by the owner.
- **Fauji roots / life journey**: a detailed brass compass, an India map with glowing place markers and a Mauritius inset, alongside four selectable chapters. Selecting a place changes its marker and the compass bearing from Mumbai. These are geographic route bearings, not device magnetic compass readings. Mumbai, Goa, Vizag, Coonoor, Chennai, Kochi and Mauritius follow the owner’s supplied list. Goa and Mauritius use representative coordinates. The full India map uses MIT-licensed state geometry from AbhinavSwami28/india-official-geojson, including the northern territories, northeast, Lakshadweep and Andaman & Nicobar. Attribution is retained in `public/map-data-LICENSE.txt`. The Mauritius inset sits below the map so it cannot obscure Indian islands.
- **Expanding Toolkit accordion**: four categories with tool tiles, descriptions, counts and keyboard controls. Collapses vertically on smaller screens.
- **Explore** interests grid with hover lighting.
- **Portfolio navigation**: fixed active-section navigation, section rail, previous/next controls, searchable command palette, and a shortcuts overlay. `J` / `K` move between sections; `1`–`7` jump directly; `?` shows help. The carousel retains its own keyboard controls.
- **Scroll reveals**: section titles, copy, panels and cards start transparent and rise into view with staggered delays. Reduced motion displays everything immediately, and focusing hidden controls reveals their group. Without JavaScript, content remains readable.
- **Interests ticker** and a project index synchronized with the circular carousel.
- **Contact console**: real email, LinkedIn and downloadable résumé.
- Responsive layouts and `prefers-reduced-motion` support.

## Where to edit

| Goal | File |
|---|---|
| Replace hero photograph | `public/images/kerala-backwaters-small-boat.webp` |
| Edit carousel motion and appearance | `components/CircularCarousel.jsx`, `components/CircularCarousel.css` |
| Edit sections, carousel, values and links | `components/PortfolioExperience.tsx` |
| Edit toolkit categories and tools | `components/Toolkit.tsx` |
| Edit navigation, commands and shortcuts | `components/SiteNavigation.tsx` |
| Edit scroll reveal targets and timing | `components/useScrollReveals.ts`, `app/globals.css` |
| Edit map and place markers | `public/images/india-full-map.svg`, `components/JourneyCompass.tsx` |
| Change look, fonts, motion, responsiveness | `app/globals.css` |
| Update SEO metadata | `app/layout.tsx` |
| Update downloadable résumé | `public/malavika-vivek-resume.pdf` |

The previous coastal scene (`CoastalHero.tsx`) and React Bits component files remain in `components/` for reuse, but are not rendered in V3.

## Content and disclosure notes

- Facts about school, internships, degrees, projects and certifications follow the supplied résumé. DependIQ and HeatSense are carried forward from earlier design discussions. Current carousel images use the supplied product screenshots, with a labelled GitHub repository preview for DependIQ. The earlier illustrative SVG covers are retained as unused assets.
- **Fauji roots** copy is intentionally broad and editable. It does not infer specific cities, family military ranks, postings or service history. Add your actual milestones before publishing.
- The full-screen Kerala background is AI-generated using the built-in image generation tool. Its production prompt is recorded in `public/images/kerala-backwaters-small-boat.prompt.txt`. Day/night preview adjusts the photograph’s exposure and saturation; the underlying scene remains blue hour.
- The downloadable résumé includes personal contact information; review the PDF before publishing the site publicly.

## Testing

`npx tsc --noEmit` and `npm run build` pass. Browser visual QA was unavailable in the editing session.

## Hero and React Bits Pro

`components/PhotoHero.tsx` is an original photo-based full-screen hero with a staggered blur reveal and reduced-motion support. It preserves the introduction, actions, availability status, clock and appearance controls. The background is an image edit of the original scene, with the houseboat farther away and smaller; no unrelated video replaces it.

The licensed React Bits Pro Hero 9 block was **not installed**, because no Pro license is available. `components.json` prepares the official starter and Pro registry URLs using `Bearer ${REACTBITS_LICENSE_KEY}`; no key is embedded in source. A future licensed installation may require shadcn/Tailwind setup, since the current app uses custom CSS.

The Kerala note card, Think section, experience band and voice section were removed as requested. Navigation now targets the remaining sections.

## Design reference

The expanding toolkit, command search, keyboard section navigation, hover lighting and interests ticker draw on interaction patterns observed at https://jehdadina.xyz/. The implementation, content, styling and assets are adapted for this portfolio; its personal stories and media were not copied. The existing backwaters hero and project carousel are preserved.

Map source: https://github.com/AbhinavSwami28/india-official-geojson (MIT). SVG geometry is served as a cacheable static asset so its detail does not inflate the application JavaScript.

## Motion and contact update

The motion and contact interactions were studied in https://github.com/jehdadina-jpg/jdport and implemented for this React portfolio. Lenis smooths wheel scrolling and anchor navigation, with native touch behavior, modal scroll locking and reduced-motion fallback. GSAP ScrollTrigger drives masked word headings, word-by-word manifesto opacity, hero parallax/fade and the closing wordmark. Animation effects clean up on unmount and preference changes.

The contact console includes the owner’s GitHub, https://github.com/techwings0710, alongside email/copy, LinkedIn, the downloadable résumé, back to top and quick menu. Hover and keyboard focus update a status display and waveform. The waveform pauses offscreen, in a hidden tab, and for reduced motion. Clipboard failures show the address for manual copying. There is no audio playback. The original hero photo, map, project content and carousel remain.

## Project images and source links

Project data and image paths live in `components/PortfolioExperience.tsx`. Carousel images live in `public/images/projects/`. The three product screenshots were supplied on 22 October 2026; DependIQ’s repository preview was retrieved from GitHub. No product screenshots were generated or invented.

- AegisQuant: https://github.com/techwings0710/AegisQuant
- DependIQ: https://github.com/techwings0710/DependIQ
- HeatSense: https://github.com/techwings0710/HeatSense
- Heritage Shield: screenshot only; owner confirmed no repository link is available.

## Personal interest mini worlds

`components/ExploreWorlds.tsx` replaces the pale Explore grid with six dark, animated cards and native-dialog mini sites. Mythology includes Percy Jackson tabs; geopolitics includes MUN research, debate and diplomacy; music includes an optional user-activated seven-note synth; pop culture includes Bollywood and music; photography includes a framing study; running celebrates the owner’s recent 5K at the Indian Air Force Sekhon Marathon. No race time, actual route, MUN awards, equipment ownership or favourite songs are invented.

Each world includes a personal note and a small interaction. Sound defaults off. Dialogs support Escape, focus restoration, contained scrolling and smooth-scroll pausing. Desktop section shortcuts are suspended inside the dialogs. Reduced motion disables ambient animation and completes the 5K celebration immediately. All visuals are original CSS/SVG composition studies, not photographs or event imagery.
