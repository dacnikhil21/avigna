# AVIGHNA COLLECTIONS — LUXURY DESIGN SYSTEM
### Phase 4 — Visual Language Specifications • Version 1.0
### Classified: Design Tokens & Component Rules

---

> *"Design is the physical embodiment of our brand values.  
> We do not decorate; we frame. We do not demand attention; we invite interaction.  
> Every color, font, spacing value, and animation curve is a silent statement of quality."*  
> — Avighna Collections Creative Direction

---

## 1. Design Principles

* **Simplicity:** Eliminate the unnecessary. Allow visual silence (whitespace) to frame the product. If a line, border, or icon does not clarify or elevate the page, remove it.
* **Elegance:** Maintain graceful proportions. Use light typography weights, thin borders, and subtle drop shadows.
* **Luxury:** Recreate the physical jewellery salon digitally. Select a warm, organic color palette and implement unhurried animations that ease in and out.
* **Consistency:** Adhere strictly to the design tokens. Every space, color shade, and transition speed must match the system to prevent design clutter.

---

## 2. Color Tokens

All colors are defined in Hex format to ensure precise color matching across screens:

| Token | Hex Value | Application |
|---|---|---|
| **Primary (Slate Black)** | `#121212` | Headings, primary text, buttons, dark headers. |
| **Secondary (Warm Taupe)** | `#E8E2D9` | Section backgrounds, light buttons, secondary elements. |
| **Accent (Champagne Gold)** | `#C5A880` | Selected interactive states, highlights, premium borders, icons. |
| **Background (Bone White)** | `#FAF8F5` | Primary site background, warm and easy on the eyes. |
| **Surface (Boutique White)** | `#FFFFFF` | Card backgrounds, slide-out panels, header backgrounds. |
| **Border (Champagne Grey)** | `#EFECE7` | Clean, subtle separators and card borders. |
| **Success (Muted Emerald)** | `#2D5A27` | Transaction success states, confirmation details. |
| **Error (Muted Terracotta)** | `#A63A3A` | Validation errors, input warning states. |

---

## 3. Typography

* **Heading Fonts:** `Cormorant Garamond` (Google Font, Serif). Reserved for headings, title cards, and brand quotes.
* **Body Fonts:** `Inter` (Google Font, Sans-Serif). Used for all body copy, product details, descriptions, and structural listings.
* **Button Fonts:** `Inter` (Medium / Semibold). Tracking set to `0.05em` uppercase.

### Type Scale & Line Heights

| Element | Mobile Size | Desktop Size | Letter Spacing | Line Height | Font Family |
|---|---|---|---|---|---|
| **Hero Display** | `32px` | `64px` | `0.02em` | `1.1` | Cormorant Garamond |
| **H1 (Page Title)** | `28px` | `48px` | `0.02em` | `1.2` | Cormorant Garamond |
| **H2 (Section Heading)** | `22px` | `32px` | `0.04em` | `1.3` | Cormorant Garamond |
| **H3 (Collection Title)** | `18px` | `24px` | `0.04em` | `1.4` | Cormorant Garamond |
| **Body Large (Intro text)** | `16px` | `18px` | `0.01em` | `1.6` | Inter |
| **Body Medium (Base copy)**| `14px` | `16px` | `0.01em` | `1.6` | Inter |
| **Body Small (Specs / Help)**| `12px` | `13px` | `0.02em` | `1.5` | Inter |
| **Button / Navigation** | `13px` | `14px` | `0.08em` | `1.0` | Inter (Medium) |

---

## 4. Spacing System

We utilize a strict **8-point grid** for layout consistency:

* **Grid Increments:** `4px` (micro), `8px` (base), `16px` (small), `24px` (medium), `32px` (standard), `48px` (large), `64px` (xlarge), `96px` (xxlarge), `128px` (section spacer).
* **Container Width:** Max width `1440px` on desktop with `80px` page margins.
* **Section Spacing:** 
  * Desktop: `128px` vertical gap between sections.
  * Mobile: `80px` vertical gap between sections.
* **Card Spacing:** 
  * Grid gaps: `24px` or `32px` (desktop), `16px` (mobile).
  * Inner padding: `24px` on desktop, `16px` on mobile.

---

## 5. Grid System

To maintain clean alignment across viewports:

* **Desktop (1200px+):** 12 columns | Gutter: `24px` | Margin: `80px`
* **Tablet (768px - 1023px):** 8 columns | Gutter: `20px` | Margin: `40px`
* **Mobile (Under 768px):** 4 columns | Gutter: `16px` | Margin: `20px`

---

## 6. Border Radius

Luxury design relies on clean, sharp structures. We avoid round, bubble-like elements:

* **Buttons:** `0px` (sharp square edges) to convey high-end architectural authority.
* **Cards:** `0px` (sharp borders) or a maximum of `4px` for soft glass overlays.
* **Inputs:** `0px` (underline styling preferred).
* **Images:** `0px` (borderless frame).

---

## 7. Shadows

We use shadows sparingly to create physical depth without visual clutter:

* **Soft (Base elevation):** `0 2px 12px rgba(18, 18, 18, 0.01)` — Used for simple hover states.
* **Medium (Panels / Drawers):** `0 8px 24px rgba(18, 18, 18, 0.03)` — Used for search overlays and navigation drop-downs.
* **Premium (Velvet Drawer Tray):** `0 20px 48px rgba(18, 18, 18, 0.05)` — Used for slide-out cart drawers and modal frames.

---

## 8. Motion System

All motion must feel smooth and unhurried:

* **Easing Curve:** Custom cubic-bezier `cubic-bezier(0.25, 1, 0.5, 1)` (ease-out-quad signature).
* **Hover Duration:** `350ms` transition.
* **Page Transitions:** `450ms` fade and `15px` vertical translation.
* **Scroll Reveal:** `600ms` translate-up animation trigger with opacity fade-in as elements cross the threshold.
* **Micro Interactions:** `200ms` scale transition (scales to `0.98` on touch/click).
* **Loading States:** Skeletons pulse softly using a `1.5s` opacity loop between `0.4` and `1.0`.

---

## 9. Component Rules

### 9.1 Announcement Bar
* **Behavior:** Sticky to the absolute top of the page. Messages fade in/out using a 1.2s dissolve over 8 seconds. Collapsible via a minimal close cross (`x`) on the right.
* **Layout:** Centered single-line text in `Body Small` uppercase.

### 9.2 Header
* **Behavior:** Floats transparently over content on scroll top. Shrinks height and gains a glass-morphic surface background (`#FFFFFF` with backdrop-blur) when scrolled past `50px`. Dissolves when scrolling down; reappears instantly when scrolling up.

### 9.3 Mega Menu
* **Behavior:** Slides down slowly from the header on hover, taking up the full width. Fades out gracefully when the cursor leaves the menu area.
* **Layout:** Multi-column layout separating text directories from a single prominent collection display.

### 9.4 Buttons
* **Primary:** Solid `#121212` with `#FFFFFF` text. Sharp `0px` corners. On hover, the background transitions to Accent (`#C5A880`) via a slow fade.
* **Secondary:** Outline button with `#121212` border. Sharp corners. On hover, background fills with a soft `#E8E2D9` tint.
* **Text / Links:** Underlined with a thin gold border that expands from the center out on hover.

### 9.5 Product Card
* **Behavior:** Hovering over the card switches the primary editorial image to a close-up texture/material shot. The card shifts up by `4px` with a soft shadow highlight.
* **Layout:** Product card displays a heart wishlist icon in the corner, with the title and price positioned neatly below the image.

### 9.6 Collection Card
* **Behavior:** Displays a large collection photo. On hover, the image scales slowly (`1.05x`) inside its frame, while the overlay text shifts up by `8px`.

### 9.7 Search Overlay
* **Behavior:** Clicking the search icon opens a full-screen, bone-white overlay (`#FAF8F5`) with a blurred background. The search field highlights immediately with keyboard focus.

### 9.8 Wishlist Icon
* **Behavior:** Clicking the heart icon on cards or detail pages changes its color from outline to gold (`#C5A880`) via a soft bounce fade, updating the header count instantly.

### 9.9 Cart Drawer
* **Behavior:** Slides out from the right side of the screen (`380px` wide). A dark background (`#121212` with 40% opacity) covers the rest of the site to focus attention on the checkout options.

### 9.10 Forms
* **Behavior:** Input fields are styled as clean, thin bottom lines. Floating labels shift up and shrink when the input gains focus.
* **Errors:** Invalid fields show a muted red underline (`#A63A3A`) with a clean error note positioned below.

### 9.11 Footer
* **Behavior:** Simple static footer divided into columns, separated by generous space. All social links are text-only, removing busy color icons.

---

## 10. Responsive Principles

* **Desktop:** Visual layouts are asymmetric, utilizing wide columns, grid shifts, and large editorial spreads.
* **Tablet:** The menu collapses into a clean side drawer. Multi-column grids adjust from 4 columns to 2, keeping filters in a slide-out panel.
* **Mobile:** Interactions are optimized for touch, with bottom utility nav bars, horizontal scroll carousels for collections, and full-width card layouts.

---

## 11. Accessibility Rules

* **Text Contrast:** Ensure all body copy meets a minimum contrast ratio of `4.5:1` against backgrounds.
* **Focus States:** Highlighting focus states using a subtle, clean outline in Accent gold (`#C5A880`).
* **Keyboard Navigation:** Mega menus, cart drawers, search bars, and checkout forms must be fully navigable using the `Tab` and `Enter` keys.
* **Aria Attributes:** Implement standard aria attributes (`aria-expanded`, `aria-hidden`) on all drawer components and dropdown menus.

---

## 12. Performance Rules

* **Image Optimization:** All visual assets must be served in WebP or AVIF formats.
* **Visual Stability:** Set explicit widths and heights on images and layout blocks to prevent layout shifts (CLS) during load.
* **Font Loading:** Use font subsets and `font-display: swap` to ensure text renders immediately in sans-serif if the web fonts are loading.
* **Animation Overhead:** Ensure hardware-accelerated properties (transform, opacity) are used for all transitions to prevent frame drops.

---

## 13. Design Review Checklist

Before any visual components or code can be merged into production, developers and designers must verify the following checklist:

* [ ] Does the color palette align strictly with the hex values defined in the token sheet?
* [ ] Is the spacing between sections exactly matching the 8-point system (e.g. 128px on desktop, 80px on mobile)?
* [ ] Do all page buttons feature sharp borders (`0px` border-radius) and use uppercase Inter typography?
* [ ] Are there any flashing or fast animations? (Confirm all easing follows the custom ease-out-quad curve).
* [ ] Does the font hierarchy preserve Cormorant Garamond exclusively for headers and Inter for technical details?
* [ ] Is the website completely free of generic emojis, countdown timers, and discount badges?
* [ ] Are all image sizes specified to prevent layout shifts during page loading?
* [ ] Does the mobile view support swipe gestures on cart drawers and lookbooks?
* [ ] Do all key interface actions work correctly via keyboard-only navigation?

---

**Design System Status:** Awaiting Client Feedback and Approval.
