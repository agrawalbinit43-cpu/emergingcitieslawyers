# Emerging Cities Lawyers LLP — website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText), the same stack as the MausBot website. It builds to a static site.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # writes the static site to out/
```

Deploy: Netlify reads `netlify.toml` (build `pnpm build`, publish `out`), or drag the `out/` folder onto Netlify.

- Copy lives in `lib/content.ts` (sections, practice, work, partners, the hero graph) and `lib/writing.ts` (commentary and journals).
- Motion: `components/Hero.tsx` (headline, graph draw-in and drift), `components/Motion.tsx` (scroll reveals). Everything settles at once for visitors who ask for reduced motion.
- Two palettes from one codebase: `/` is burgundy, cream and gold; `/green/` adds deep green (set by `Site`'s `palette`, colours in `app/globals.css`). `/green/` is kept out of search results.
- The building drawings (`components/Landmarks.tsx`) are line art traced from photographs (`public/drawings/*.png`, lines in the alpha channel) and filled with moving gold by CSS masks. They orbit slowly and can be dragged. Two are traced from CC BY-SA 4.0 photographs, credited in the footer, and share that licence.
- The Bar Council disclaimer (`components/Gate.tsx`) is required; keep it.
