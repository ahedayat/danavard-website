# Step 1.1 — React to Next.js Frontend Migration

## Goal

Migrate the Danavard company website frontend from the Magic Patterns React/Vite app in `frontend_react/` to a production-ready Next.js App Router app in `frontend/`, preserving visual parity with the Magic Pattern Preview while preparing the codebase for future backend integration.

## Source and Target Directories

| Role | Path |
|------|------|
| Source (reference, unchanged) | `frontend_react/` |
| Target (new Next.js app) | `frontend/` |

## Summary of Completed Work

- Created a new Next.js 16 App Router project with TypeScript in `frontend/`.
- Migrated the full single-page landing site: Hero, Services, Projects, About, Contact, Footer, Nav, and mobile BottomNav.
- Preserved bilingual FA/EN content, RTL/LTR switching, light/dark theme, Framer Motion animations, Three.js hero orb, Lucide icons, and all section layouts.
- Replaced React Context with a Zustand UI store for language and theme.
- Added Zod validation for the contact form (client-side only; no API submission).
- Prepared Axios API client, React Query provider, and mutation hooks for future backend wiring.
- Copied all site copy into `data/site-content.ts`.
- Build and TypeScript checks pass successfully.

## Project Structure Created in `frontend/`

```txt
frontend/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    HomePage.tsx
    providers/
      ReactQueryProvider.tsx
      ThemeLangSync.tsx
    sections/
      Nav.tsx
      BottomNav.tsx
      HeroSection.tsx
      HeroSection.module.css
      ServicesSection.tsx
      ProjectsSection.tsx
      AboutSection.tsx
      ContactSection.tsx
      FooterSection.tsx
    ui/
      SectionReveal.tsx
      SectionReveal.module.css
      ThreeOrb.tsx
      ThreeOrb.module.css
  data/
    site-content.ts
  hooks/
    useContactRequest.ts
    useNewsletterSubscription.ts
    useServiceInquiry.ts
  schemas/
    auth.schema.ts
    contact.schema.ts
  services/
    api-client.ts
  stores/
    ui-store.ts
  types/
    index.ts
  lib/
    scroll.ts
  public/
  tailwind.config.js
  postcss.config.mjs
  .env.example
```

## Styling Migration Notes

- **Global styles** (`app/globals.css`): Tailwind base/components/utilities, mesh backgrounds (`.mesh-light`, `.mesh-dark`), glassmorphism (`.glass`), glow borders (`.glow-border`), scrollbar hiding (`.no-scrollbar`), gradient text, reduced-motion overrides, and smooth scrolling.
- **Tailwind config** (`tailwind.config.js`): Ported custom palette (navy, electric, cyan, violet), fonts (`font-fa`, `font-en`), shadows, and animations (`float`, `float-slow`, `shimmer`, `pulse-ring`) from `frontend_react/`.
- **Fonts**: Loaded via `next/font/google` (Vazirmatn for Persian, Inter for English) with CSS variables wired into Tailwind `fontFamily`.
- **Component styles**: Section components use Tailwind utility classes in JSX (matching the source for visual parity). CSS Modules are used where custom CSS is required (`HeroSection.module.css` for floating-card positioning, `ThreeOrb.module.css` for orb container sizing, `SectionReveal.module.css` for reveal wrapper).
- **Inline styles**: Retained only for dynamic values (hero floating-card positions, project waveform bar heights) as in the original.

## Zustand Setup Notes

- Store: `stores/ui-store.ts`
- State: `lang` (`fa` \| `en`), `theme` (`light` \| `dark`)
- Actions: `setLang`, `setTheme`, `toggleLang`, `toggleTheme`
- Selectors used in components, e.g. `useUIStore((s) => s.lang)`
- `simple-zustand-devtools` mounted in development only
- `ThemeLangSync` client component applies `dir`, `lang`, and theme class to `<html>`

## React Query and Axios Setup Notes

- **API client** (`services/api-client.ts`): Generic `APIClient<T>` class using Axios with `NEXT_PUBLIC_API_BASE_URL` from environment.
- **Provider** (`components/providers/ReactQueryProvider.tsx`): Client Component wrapping the app with `QueryClientProvider`, sensible query/mutation defaults, and `ReactQueryDevtools` in development.
- **Hooks** (prepared, not wired to UI):
  - `hooks/useContactRequest.ts` — `useMutation` for `/contact-requests`
  - `hooks/useNewsletterSubscription.ts` — `useMutation` for `/newsletter-subscriptions`
  - `hooks/useServiceInquiry.ts` — `useMutation` for `/service-inquiries`
- Errors are logged via `onError` handlers; the app does not crash on failed mutations.

## Zod Validation Notes

- **Contact form** (`schemas/contact.schema.ts`): Validates name, phone (`^09\d{9}$`), email, subject, and message.
- **Auth schemas** (`schemas/auth.schema.ts`): `phoneSchema` and `otpSchema` (6-digit OTP) prepared for future auth flows.
- Contact form validates on submit and shows field-level errors; successful validation shows a local success message without calling the backend.

## Backend Integration Status

**Intentionally not connected:**

- Contact form submission (validates locally only)
- Newsletter subscription
- Service inquiry mutations
- Any read APIs (`useQuery` hooks not yet created)

**Prepared for future integration:**

- `NEXT_PUBLIC_API_BASE_URL` in `.env.example`
- Axios client and mutation hooks
- React Query provider in root layout
- Typed payloads in `types/index.ts`

## How to Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Production build:**

```bash
npm run build
npm start
```

**Lint:**

```bash
npm run lint
```

## How to Verify Visual Parity

1. Run `frontend_react` (`npm run dev` in `frontend_react/`) and `frontend` (`npm run dev` in `frontend/`) side by side.
2. Compare sections: Hero (3D orb + floating cards), Services grid, Projects carousel/grid, About stats, Contact form, Footer.
3. Toggle **language** (FA ↔ EN) and confirm RTL/LTR, font switch, and translated copy.
4. Toggle **theme** (light ↔ dark) and confirm mesh background, glass cards, and color tokens.
5. Resize to mobile and verify bottom navigation and horizontal project carousel.
6. Scroll through the page and confirm Framer Motion section reveals and hero entrance animations.
7. Submit the contact form with invalid then valid data to confirm Zod validation UI.

## Known Assumptions

- No image assets existed in `frontend_react/`; project mockups remain CSS/SVG-style abstractions.
- Social links remain placeholder `#` URLs as in the source.
- Default language is Persian (`fa`), default theme is light — matching the source.
- `lucide-react` is pinned to `0.522.0` to match icon exports used in the source (Twitter, Linkedin, Github, Instagram).
- `frontend/` was initialized with its own git repo by `create-next-app`; it may need to be integrated into the monorepo root if desired.
- Privacy Policy and Terms links remain English placeholders as in the source footer.

## Remaining TODOs

- [ ] Wire `useContactRequest` into `ContactSection` when backend endpoint is ready.
- [ ] Add `useQuery` hooks for dynamic content when CMS/API is available.
- [ ] Add favicon and Open Graph images to `public/`.
- [ ] Connect real social media URLs.
- [ ] Add Persian translations for Privacy Policy / Terms of Service links.
- [ ] Optionally extract more repeated Tailwind patterns into CSS Modules once stable.
- [ ] Set `NEXT_PUBLIC_API_BASE_URL` when backend is deployed.
- [ ] Add E2E visual regression tests for parity checks.

## Suggested Commit Message

```
feat(frontend): migrate Danavard landing page from React to Next.js

Port Magic Patterns Vite SPA to Next.js App Router with visual parity,
Zustand state, Zod form validation, and React Query/Axios scaffolding
for future backend integration.
```
