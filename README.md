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
- The building drawings (`components/Landmarks.tsx`) are vector line art in `public/drawings/*.svg`, used as masks over moving gold, orbiting continuously. The Supreme Court and Yale are traced from photographs and refined (credited in the footer); the Juridicum and NLSIU are constructed from their geometry.
- The Bar Council disclaimer (`components/Gate.tsx`) is required; keep it.
