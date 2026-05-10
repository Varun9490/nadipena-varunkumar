# Nadipena Varunkumar — Portfolio

A production-grade personal portfolio built with **Next.js 16**, **Tailwind CSS v4**, **Motion (Framer Motion)**, and **TypeScript**.

## Tech Stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack)
- **Styling:** Tailwind CSS v4 (CSS-first config)
- **Animations:** Motion 12.x (`motion/react`)
- **Theme:** next-themes (dark/light with system preference)
- **Icons:** Lucide React + custom SVGs for brand icons
- **Fonts:** Geist Sans + Instrument Serif via `next/font/google`
- **Language:** TypeScript (strict mode)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design tokens + Tailwind v4 @theme
│   ├── layout.tsx           # Root layout with SEO, fonts, JSON-LD
│   ├── page.tsx             # Main page composing all sections
│   └── providers.tsx        # Client-side ThemeProvider
├── components/
│   ├── Navbar.tsx           # Sticky nav with blur backdrop + mobile overlay
│   ├── Hero.tsx             # Asymmetric hero with avatar + mesh gradient
│   ├── About.tsx            # Bio + animated stat counters
│   ├── Skills.tsx           # Bento grid skill cards
│   ├── Experience.tsx       # Animated vertical timeline
│   ├── Projects.tsx         # 3D tilt project cards
│   ├── Certifications.tsx   # Badge cards + achievements
│   ├── Education.tsx        # Education cards with score pills
│   ├── Contact.tsx          # Contact links with custom brand SVGs
│   └── Footer.tsx           # Minimal footer
└── lib/
    ├── types.ts             # TypeScript interfaces
    └── data.ts              # Centralized portfolio data
```

## Customization

- **Resume data:** Edit `src/lib/data.ts` — all content is centralized here
- **Design tokens:** Edit `src/app/globals.css` — CSS variables in `:root` and `.dark`
- **Profile photo:** Search for `TODO: Replace with <Image` in `Hero.tsx`

## License

MIT
