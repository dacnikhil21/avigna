# Task Tracker: Customer Login & Sign Up

- [x] Install dependencies (`next-auth@beta`, `bcryptjs`)
- [x] Update Prisma Schema (Add `passwordHash` to `Customer`)
- [x] Run `npx prisma db push` to apply schema changes
- [x] Create NextAuth configuration (`src/auth.ts`)
- [x] Create NextAuth API route handlers
- [x] Create custom Registration API endpoint
- [x] Build Luxury Login Page UI (`/login`)
- [x] Build Luxury Sign-up Page UI (`/register`)
- [x] Update Navigation Header to toggle Account/Login links based on session user types and render instant results

## 2. Search Navigation Corrections
- [x] Fix necklaces and rings categories slugs in `header.tsx` mobile drawer
- [x] Add category filter normalizations and `latest-collections` filter mapping inside `src/app/shop/page.tsx`

## 3. Replace "Boutique" Wording
- [x] Replace "Boutique" with "1 Gram Gold Jewellery" inside `header.tsx`
- [x] Replace "Boutique" inside `src/components/home/boutique-visit-section.tsx`
- [x] Replace "Boutique" inside `src/app/faq/page.tsx`
- [x] Replace "Boutique" inside `src/app/contact/layout.tsx`
- [x] Replace "Boutique" inside `src/app/bridal-salon/page.tsx`
- [x] Replace "Boutique" inside `src/app/boutique/page.tsx`
- [x] Replace "Boutique" inside `src/components/admin/website-tab.tsx`

## 4. Homepage Offer Section Transitions
- [x] Redefine `OFFERS` in `offers-section.tsx` with 3 images each
- [x] Create image cross-fade carousel timer (every 6 seconds)
- [x] Clean up hover scale transitions on image cards

## 5. Hero Slideshow Transitions
- [x] Declare 3 images array inside `hero-section.tsx`
- [x] Automate slide cross-fading every 10 seconds
- [x] Maintain layout, animations, text, and parallax scroll transforms
