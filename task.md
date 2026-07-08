# Sprint 7 Task Tracker

## 1. Search Experience Redesign
- [x] Create search overlay backdrop (dark blurred background) inside `header.tsx`
- [x] Implement centered sliding search panel layout
- [x] Add Search input, Search icon, and Close buttons
- [x] Build Recent Searches feature inside overlay (integrating with `localStorage`)
- [x] Build Popular Categories list
- [x] Build Trending Searches list
- [x] Query `/api/products?search=...` live as the user types and render instant results

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
