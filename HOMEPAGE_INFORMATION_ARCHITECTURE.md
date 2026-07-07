# AVIGHNA COLLECTIONS
## HOMEPAGE INFORMATION ARCHITECTURE
### Phase 3 — Creative Direction Document · Version 1.0

---

> *"The homepage is not a storefront. It is a first conversation.  
> Like any great conversation, it begins by listening — not selling."*

---

**Source of Truth:** AVIGHNA_COLLECTIONS_DESIGN_BIBLE.md  
**Status:** Awaiting Client Approval Before Implementation  
**Created By:** Avighna Creative Leadership Team  
**Applies To:** Desktop (1440px reference) + Mobile (375px reference)

---

---

# PART I — STRATEGIC FRAMEWORK

---

## The Narrative Thesis

The Avighna homepage tells a single, unbroken story.

It is not a list of sections. It is not an ecommerce template. It is not a product catalogue.

It is the story of a woman — her desire for beauty, her need to feel celebrated, her search for something that feels genuinely worth owning. The homepage exists to be the answer to that search before she even knows she was looking.

The story moves through five emotional beats:

```
INTRIGUE → DESIRE → TRUST → DISCOVERY → BELONGING
```

Every section is one movement in this five-beat symphony.

| Beat | Emotion | Homepage Chapter |
|---|---|---|
| **INTRIGUE** | "This is different" | Hero + Brand Statement |
| **DESIRE** | "I want to live in this world" | Collections + Featured Editorial |
| **TRUST** | "These people know what they are doing" | Craftsmanship + Testimonials |
| **DISCOVERY** | "I need to find my piece" | Curated Products + Occasions |
| **BELONGING** | "I am the kind of woman who shops here" | Services + Newsletter |

---

## Proposed Section Order — With Rationale

```
01. THE HERO                    — The Welcome
02. THE BELIEF STATEMENT        — The Philosophy
03. THE COLLECTIONS MAP         — The Orientation
04. THE FEATURED EDITORIAL      — The Desire
05. THE CRAFT STORY             — The Trust
06. THE CURATED SELECTION       — The Discovery
07. THE OCCASION CONTEXT        — The Personalisation
08. THE VOICES                  — The Social Proof
09. THE PROMISE                 — The Commitment
10. THE JOURNAL                 — The Community
11. THE INVITATION              — The Relationship
```

*Each section earns the right to exist by answering the question:  
"Why does this come NOW — at this exact moment in the customer's journey?"*

---

---

# PART II — SECTION-BY-SECTION ARCHITECTURE

---

## SECTION 01 — THE HERO
### *"The Welcome"*

---

### 1. Section Name
**The Hero — A World of Her Own**

### 2. Business Goal
Establish immediate brand premium positioning. Arrest attention within 3 seconds. Prevent bounce. Direct traffic into the collection or the shop. Create a first impression powerful enough that the visitor bookmarks the page, shares it, or returns.

### 3. Emotional Goal
**INTRIGUE + AWE**

The visitor must feel — in the first 3 seconds — that this is not a website they have seen before. She must think: *"This brand takes itself seriously. This is worth my time."*

The feeling is: entering a jewellery showroom with warm lighting, marble floors, and the faint scent of roses. Nothing loud. Nothing cheap. Just presence.

### 4. User Questions Being Answered
- *"What is this brand?"*
- *"Is this for someone like me?"*
- *"Is this worth my attention?"*
- *"Where do I go first?"*

### 5. Why This Section Exists
The hero is the brand's one opportunity to make an irreversible first impression. Everything that follows — trust, desire, purchase — depends on whether the visitor decides to stay. This is the door. If the door is wrong, nothing inside matters.

### 6. Visual Direction
**Full-viewport editorial image or silent video loop.**

- Desktop: A full-viewport cinematic composition. A woman's adorned neck and collarbone in warm, directional light. The jewellery catches the light. Champagne and ivory tones throughout. The face is never visible — this is intentional. The viewer becomes the woman.
- Mobile: Portrait 9:16 crop of the same image, focusing tightly on the jewellery detail.
- Overlay: No dark overlay. The image speaks for itself. Text is positioned in the lower-left quarter of the screen on a transparent area of the image.
- Color: The image must use warm gold-champagne tones consistent with `#C9A96E` palette.

### 7. Layout Type
**FULL BLEED — 100vw × 100vh**

No grid. No container. The image fills the entire viewport, edge to edge, top to bottom.

### 8. Content Hierarchy

```
[EYEBROW LABEL]         — 11px DM Sans, uppercase, letter-spacing 0.3em
                          Color: #C9A96E
                          Text: "AVIGHNA COLLECTIONS"
                          Position: lower-left, 80px from bottom

[HEADLINE]              — 80px Cormorant Garamond, weight 300, italic
                          Color: #FAF8F3 (Ivory White)
                          Text: "Adorned in Gold.
                                 Made for You."
                          Line height: 1.0
                          Max-width: 600px

[SUB-HEADLINE]          — 16px DM Sans, weight 300
                          Color: rgba(250, 248, 243, 0.75)
                          Text: "Curated 1 gram gold jewellery
                                 for every celebration of your life."
                          Margin-top: 24px
                          Max-width: 400px

[PRIMARY CTA]           — Primary button (Dark charcoal, white text)
                          Text: "EXPLORE THE COLLECTIONS"
                          Margin-top: 40px

[SECONDARY CTA]         — Ghost CTA (gold underline text)
                          Text: "Shop All Jewellery"
                          Margin-top: 16px
                          Below primary CTA

[SCROLL INDICATOR]      — A thin vertical line, 60px tall, gold (#C9A96E)
                          Below text block, animated: opacity pulses slowly
                          Text below: "SCROLL" in 10px DM Sans, uppercase, tracked
```

### 9. Motion & Animation Direction

**Page Entry Sequence** (total duration: 1800ms)

```
0ms     — Image fades in from opacity 0, no motion (1200ms ease)
400ms   — Eyebrow label appears: y: 10px → 0, opacity: 0 → 1 (800ms easeOutExpo)
600ms   — Headline appears: y: 20px → 0, opacity: 0 → 1 (1000ms easeOutExpo)
900ms   — Sub-headline appears: y: 15px → 0, opacity: 0 → 1 (800ms easeOutExpo)
1100ms  — Primary CTA appears: y: 10px → 0, opacity: 0 → 1 (600ms easeOutExpo)
1300ms  — Secondary CTA appears: opacity: 0 → 1 (400ms ease)
1600ms  — Scroll indicator appears and begins slow pulse animation
```

**Parallax:** The hero image moves at 25% scroll rate (slower than the viewport) as the user scrolls down — creating depth and cinematic weight.

**Scroll Fade:** Hero text fades out between 0%–30% of the hero section height as user scrolls.

### 10. CTA Strategy
**Two CTAs — One decision.**

The primary CTA directs to `/collections` — the editorial view of all collections. This is the luxury path — browse by story, not by catalogue.

The secondary CTA directs to `/shop` — for the customer who already knows what she wants. She is given access without disrupting the premium brand journey.

**There is no third CTA.** Fewer choices = more confident brand.

### 11. Transition Into Section 02
The hero does not end with a clear border. As the user scrolls, the hero image fades gently into the ivory background of Section 02. The transition is dissolve-like — the editorial image seems to melt away, leaving the brand statement on clean, quiet parchment.

**Estimated Viewport Height:** 100vh (desktop) / 100vh (mobile)
**Section Type:** FULL-BLEED

---

---

## SECTION 02 — THE BELIEF STATEMENT
### *"The Philosophy"*

---

### 1. Section Name
**The Belief Statement — Why We Exist**

### 2. Business Goal
Differentiate Avighna from every other jewellery brand the customer has seen. Establish emotional resonance. Plant the idea that this brand has a point of view — not just a product catalogue. Create the desire to know more before showing a single product.

### 3. Emotional Goal
**CONNECTION + RECOGNITION**

The customer reads the belief statement and thinks: *"This is written for me. This brand understands something about me that most brands do not."*

The feeling is: reading the first page of a letter that was written specifically for you.

### 4. User Questions Being Answered
- *"What is this brand's philosophy?"*
- *"Do they understand who I am?"*
- *"Is this more than just another jewellery shop?"*

### 5. Why This Section Comes Here
After the hero creates intrigue and visual arrest, the brand must speak. Not about products — about beliefs. Luxury brands do not open with a product catalogue. They open with a statement of values. This section earns the right to show products in subsequent sections by first establishing that this brand thinks differently.

Cartier does not open its website with a grid of rings. It opens with a story about love.

### 6. Visual Direction
**Minimal. Almost silent.**

- Background: `#FAF8F3` — Ivory Canvas. Full width. Generous white space.
- Left side: A single, quiet vertical image — a detail shot of jewellery being held in a woman's hand. Warm light. Soft focus background. 4:5 portrait ratio. No frame, no border.
- Right side: The brand statement text. Large. Quiet. Confident.
- A single gold hairline divider (1px, `#C9A96E`, 40px wide) above the headline — like a typographic pause.

### 7. Layout Type
**SPLIT EDITORIAL — 45/55 split**

Left column (45%): A full-bleed tall image, slightly offset vertically (extends 40px above and below the text column)
Right column (55%): Text, aligned to a narrow inner column within the 55%, creating generous right margin

**NOT center-aligned.** This is the first moment we break the predictable center-alignment pattern.

### 8. Content Hierarchy

```
[GOLD HAIRLINE]         — 1px × 40px, #C9A96E, opacity 0.6
                          Margin-bottom: 24px

[HEADLINE — LARGE]      — 56px Cormorant Garamond, weight 300, italic
                          Color: #1A1A1A
                          Text: "Every woman deserves
                                 to feel adorned."
                          Line height: 1.1

[BODY PARAGRAPH]        — 17px DM Sans, weight 300
                          Color: #5C5C5C
                          Max-width: 440px
                          Line height: 1.75
                          Text: "At Avighna, we believe jewellery is
                                 not a luxury for a few. It is a birthright
                                 for every woman who has ever wanted to
                                 feel precious, celebrated, and seen."
                          Margin-top: 32px

[GHOST CTA]             — Ghost button style (gold underline text)
                          Text: "Our Story"
                          Margin-top: 48px
                          Links to /about
```

### 9. Motion & Animation Direction
This section must feel unhurried. As if the page has exhaled.

```
On scroll-reveal:
Image:     opacity: 0 → 1, x: -30px → 0, duration: 1000ms, easeOutExpo
Hairline:  width: 0 → 40px, duration: 600ms, ease, delay: 200ms
Headline:  opacity: 0 → 1, y: 30px → 0, duration: 900ms, easeOutExpo, delay: 300ms
Body:      opacity: 0 → 1, y: 20px → 0, duration: 800ms, easeOutExpo, delay: 500ms
CTA:       opacity: 0 → 1, duration: 600ms, ease, delay: 700ms
```

### 10. CTA Strategy
A single, low-pressure ghost CTA: *"Our Story"* → `/about`

This is not a purchase CTA. We are still in the trust-building phase. The customer who clicks here wants to know more about the brand before buying. We reward that curiosity.

### 11. Transition Into Section 03
The Belief Statement ends with generous bottom padding. The Collections Map begins with a different background — `#F2EDE4` (Warm Parchment) — creating a natural, warm section break. A very subtle horizontal hairline divider (1px, #C9A96E, 20% opacity) signals the transition.

**Estimated Viewport Height:** 80vh–90vh (desktop) / 100vh+ (mobile, stacked vertically)
**Section Type:** EDITORIAL SPLIT

---

---

## SECTION 03 — THE COLLECTIONS MAP
### *"The Orientation"*

---

### 1. Section Name
**The Collections — Worlds Within Our World**

### 2. Business Goal
Orient the customer to the collection architecture. Guide her into the right collection for her need or occasion. Surface the most commercially important categories. Create desire for multiple categories simultaneously.

### 3. Emotional Goal
**DISCOVERY + ORIENTATION**

The customer feels: *"I want to explore all of these. I don't know where to start — but I want to go deeper."*

Like a museum foyer with five beautiful archways leading to different galleries — each one calling to her differently.

### 4. User Questions Being Answered
- *"What kinds of jewellery does Avighna carry?"*
- *"Which collection is right for me?"*
- *"Is there something for my wedding / festival / daily wear?"*
- *"Where do I go to find my piece?"*

### 5. Why This Section Comes Here
After establishing brand identity (Sections 01–02), the customer is ready to enter the store. This section is the architectural map of the showroom. Before showing individual products, we show the rooms. This creates a hierarchical mental model — collections first, then pieces — which mirrors how luxury boutiques work.

### 6. Visual Direction
**Asymmetric editorial tile layout.** Not a uniform grid. Not a Shopify-style category row.

- 5 Collection tiles, arranged in an intentionally asymmetric composition
- Large tile (spanning 2 rows or 7 columns): Bridal Collection — the highest-value, most emotional category
- 2 medium tiles: Temple Jewellery + Diamond Dreams
- 2 smaller tiles: Everyday Luxe + Festival Edition
- Each tile: full-bleed editorial photography with text in the lower section
- No dark overlay gradient — the text sits in a clear area of the image or in a clean box below
- Background of the section: `#F2EDE4` — Warm Parchment

### 7. Layout Type
**ASYMMETRIC EDITORIAL GRID**

Desktop:
```
[ LARGE TILE — Bridal           ]  [ Medium — Temple     ]
[ 7 columns, 2 rows             ]  [ 5 columns, 1 row    ]
                                   [ Medium — Diamond    ]
                                   [ 5 columns, 1 row    ]
[ Small — Everyday Luxe ]  [ Small — Festival ]
[ 6 columns, 1 row      ]  [ 6 columns, 1 row ]
```

Mobile: Horizontal scroll carousel. 1.2 tiles visible at a time to create a natural "peek" indicating more content.

### 8. Content Hierarchy

**Each tile contains:**
```
[COLLECTION LABEL]      — 11px DM Sans, uppercase, letter-spacing 0.3em
                          Color: #C9A96E
                          Example: "BRIDAL COLLECTION"

[COLLECTION NAME]       — 24px (large tile: 36px) Cormorant Garamond
                          Color: #1A1A1A (or #FAF8F3 if on dark image area)
                          Example: "Bridal Heritage"

[PIECE COUNT]           — 12px DM Sans
                          Color: #8A8A8A
                          Example: "18 Pieces"

[HOVER CTA]             — Ghost button, appears on tile hover
                          Text: "Explore →"
```

**Section Header (above tiles):**
```
[SECTION LABEL]         — 11px DM Sans, uppercase, tracking 0.3em, #C9A96E
                          "THE COLLECTIONS"

[SECTION TITLE]         — 48px Cormorant Garamond, weight 300
                          "Five Worlds. One Brand."

[SECTION BODY]          — 16px DM Sans, #5C5C5C, max-width 480px
                          "From bridal heritage to everyday luxury —
                          find the collection that tells your story."
```

### 9. Motion & Animation Direction

```
Section header:  Standard scroll reveal — y: 30px → 0, opacity: 0→1, 800ms, easeOutExpo
Large tile:      Appears first — opacity: 0→1, y: 40px→0, 1000ms, easeOutExpo
Medium tiles:    Staggered — 150ms delay after large tile
Small tiles:     Staggered — 150ms delay after medium tiles

Tile hover:
  Image: scale 1.0 → 1.04, 800ms ease
  Collection name: y: 0 → -4px, 300ms ease
  "Explore →" ghost CTA: opacity: 0 → 1, y: 10px → 0, 400ms easeOutExpo
```

### 10. CTA Strategy
**No section-level CTA.** Each tile is itself a CTA — clicking anywhere on the tile navigates to the collection page. This is intentional. We do not need a "Browse All Collections" button because the tiles together ARE the browsing experience.

The section creates six micro-decisions — each tile is an invitation. The customer chooses the world she wants to enter.

### 11. Transition Into Section 04
After the Collections Map creates broad orientation, Section 04 narrows focus — going deep into ONE collection, editorially. The transition is from panoramic to intimate. The background shifts from Warm Parchment `#F2EDE4` to a deeper, darker editorial tone — signaling that we are entering something more immersive.

**Estimated Viewport Height:** 130vh–150vh (desktop) / 250vh (mobile with carousel)
**Section Type:** EDITORIAL GRID

---

---

## SECTION 04 — THE FEATURED EDITORIAL
### *"The Desire"*

---

### 1. Section Name
**Featured Collection — This Season's Story**

### 2. Business Goal
Drive traffic and conversion to the highest-priority collection for the current season (Bridal during wedding season, Festival during Navratri/Diwali, etc.). Create a sense of editorial curation. Surface specific products while maintaining the story-first approach.

### 3. Emotional Goal
**DESIRE + ASPIRATION**

The customer feels: *"I need to see everything in this collection. I can already imagine myself wearing this."*

Like opening a magazine editorial and seeing jewellery that is made for your life.

### 4. User Questions Being Answered
- *"What is Avighna's signature look this season?"*
- *"What would I actually wear from this brand?"*
- *"Are these pieces as beautiful up close as they look here?"*

### 5. Why This Section Comes Here
After orienting the customer to the breadth of the collection universe (Section 03), this section goes deep — into one world, fully. Breadth then depth. This is how great storytelling works. By the time the customer arrives at this section, they know the brand has values and they know the range exists. Now we show them the crown jewel of the season. This is the emotional high point of the first half of the homepage.

### 6. Visual Direction
**Full magazine editorial layout.**

- Background: `#1A1A1A` (Deep Charcoal) — a dramatic, intentional shift from the ivory tones of the previous sections. This creates maximum visual impact and signals: *"something important is about to happen."*
- Left half: A tall, full-bleed editorial image — a lifestyle photograph of the featured collection (e.g., a bride in soft morning light, adorned with Bridal Heritage pieces)
- Right half: Editorial text + 3 featured products in a vertical stack
- Section feels like a double-page magazine spread that has come to life

### 7. Layout Type
**FULL-BLEED DARK EDITORIAL — 50/50 split**

Left (50%): Full-bleed image, extends to the very edge of the viewport, no padding
Right (50%): Dark background `#1A1A1A`, editorial text + product stack, generous padding (60px–80px inner)

### 8. Content Hierarchy

**Left side — Image only:**  
No text on the image. The image is pure.

**Right side — Editorial content:**
```
[SEASON LABEL]          — 11px DM Sans, uppercase, tracking 0.3em
                          Color: #C9A96E
                          Example: "THIS SEASON · BRIDAL HERITAGE"

[EDITORIAL HEADLINE]    — 56px Cormorant Garamond, weight 300, italic
                          Color: #FAF8F3
                          Text: "Made for the
                                 most beautiful
                                 day of your life."
                          Line height: 1.05

[EDITORIAL BODY]        — 15px DM Sans, weight 300
                          Color: rgba(250, 248, 243, 0.65)
                          Max-width: 380px
                          Text: 2–3 sentences about the collection story

[HAIRLINE DIVIDER]      — 1px, #C9A96E, 40px, opacity 0.4
                          Margin: 40px 0

[PRODUCT STACK]         — 3 featured products, horizontal mini-cards:
                          Each: 80×100px image (3:4) + product name + price
                          Image: left-aligned
                          Name: 14px Cormorant Garamond
                          Price: 13px DM Sans, weight 500, #FAF8F3
                          Spacing between products: 20px

[PRIMARY CTA]           — Primary button (inverted: ivory background, dark text)
                          Text: "EXPLORE BRIDAL HERITAGE"
                          Margin-top: 40px
```

### 9. Motion & Animation Direction

```
On section entry:
Left image:    x: -40px → 0, opacity: 0→1, 1200ms, easeOutExpo
Season label:  opacity: 0→1, y: 10px→0, 600ms, ease, delay: 300ms
Headline:      y: 40px→0, opacity: 0→1, 1000ms, easeOutExpo, delay: 500ms
Body text:     opacity: 0→1, 800ms, ease, delay: 800ms
Hairline:      width: 0→40px, 600ms, ease, delay: 900ms
Product stack: Each product fades in with 100ms stagger, delay: 1000ms
CTA:           opacity: 0→1, y: 10px→0, 600ms, ease, delay: 1300ms
```

**Hover on product mini-card:** Image scales 1.02, gold hairline border appears around image, product name shifts to gold.

### 10. CTA Strategy
**One primary CTA** — takes the customer to the featured collection page. No secondary CTA in this section. The featured editorial is singular and confident. One invitation. One direction.

### 11. Transition Into Section 05
The dark editorial section ends. A deliberate pause. The next section — Craftsmanship — begins in warm ivory, creating an emotional cooldown from the high-intensity desire moment. The contrast between deep charcoal and warm ivory makes both sections stronger.

**Estimated Viewport Height:** 100vh (desktop) / 150vh (mobile, stacked)
**Section Type:** FULL-BLEED EDITORIAL (DARK)

---

---

## SECTION 05 — THE CRAFT STORY
### *"The Trust"*

---

### 1. Section Name
**The Craft — The Hands Behind the Gold**

### 2. Business Goal
Build deep trust in the quality and authenticity of the jewellery. Differentiate Avighna from mass-market jewellery brands. Justify the purchase decision before the customer reaches the product listings. Address the silent objection: *"Is this actually quality jewellery?"*

### 3. Emotional Goal
**TRUST + RESPECT**

The customer feels: *"These people care. They know what they are talking about. They take the craft seriously."*

Like meeting an expert — a master jeweller — who explains their art with calm, precise pride.

### 4. User Questions Being Answered
- *"Is this jewellery actually well-made?"*
- *"Why should I trust Avighna over another brand?"*
- *"What makes 1 gram gold jewellery worth buying?"*
- *"What do I get that I can't get elsewhere?"*

### 5. Why This Section Comes Here
The customer has felt desire (Section 04). Now they face the moment of rational hesitation — *"But can I actually trust this brand?"* This section answers that question before it becomes a barrier. It is placed here — before the product grid — because trust must precede discovery. A customer who does not trust will not buy, no matter how beautiful the product grid is.

### 6. Visual Direction
**Warm, intimate, handcrafted feel.**

- Background: `#FAF8F3` (Ivory Canvas) — the return to warmth after the dark editorial
- A large, cinematic close-up: artisan hands working gold wire. Extreme macro. Bokeh background.
- This image is positioned off-center — slightly to the right, large, bleeding off the right edge of the viewport
- The text lives on the left, in a narrow, thoughtful column
- A single pull-quote in large, italic Cormorant Garamond sits between the body paragraphs

### 7. Layout Type
**ASYMMETRIC EDITORIAL — TEXT-HEAVY LEFT**

Left column (45%): Text content — label, headline, body, pull quote, CTA  
Right column (55%): Large editorial image, bleeding off the right edge

The image occupies more space than the text — communicating: *"Show, don't tell."*

### 8. Content Hierarchy

```
[SECTION LABEL]         — 11px DM Sans, uppercase, tracking 0.3em, #C9A96E
                          "THE CRAFT"

[HEADLINE]              — 48px Cormorant Garamond, weight 300
                          Color: #1A1A1A
                          Text: "Gold is not made.
                                 It is coaxed into beauty."
                          Line height: 1.1

[BODY PARAGRAPH 1]      — 16px DM Sans, weight 300, #5C5C5C
                          Max-width: 420px, line-height: 1.75
                          2–3 sentences about the 1-gram gold process

[PULL QUOTE]            — 28px Cormorant Garamond, italic, weight 400
                          Color: #C9A96E (gold)
                          Border-left: 2px solid #C9A96E, padding-left: 24px
                          Text: "Each piece passes through fourteen
                                 hands before it reaches yours."
                          Margin: 40px 0

[BODY PARAGRAPH 2]      — 16px DM Sans, weight 300, #5C5C5C
                          Craftsmanship detail — finishing, quality testing

[GHOST CTA]             — Ghost style
                          Text: "The Avighna Difference"
                          Links to /about
```

### 9. Motion & Animation Direction

```
Text column:   y: 40px→0, opacity: 0→1, 900ms, easeOutExpo
Image:         x: 60px→0, opacity: 0→1, 1200ms, easeOutExpo, delay: 200ms
Pull quote:    opacity: 0→1, x: -20px→0, 800ms, ease, delay: 600ms
               Left border line draws: height 0→100%, 600ms, ease
```

Subtle parallax on the image: scrolls at 85% of viewport speed, creating gentle depth.

### 10. CTA Strategy
A single ghost CTA — *"The Avighna Difference"* — pointing to the About page. This is not a purchase CTA. This section's purpose is trust. Pushing to a purchase here would undermine the authenticity of the moment.

### 11. Transition Into Section 06
After building trust, the customer is ready to discover products. The Curated Selection begins with the same ivory background, creating a seamless continuation. But it introduces the product grid — signaling that the editorial phase is giving way to the discovery phase. This is intentional: the first half of the homepage is all story. The second half is all discovery.

**Estimated Viewport Height:** 80vh (desktop) / 120vh (mobile)
**Section Type:** EDITORIAL (ASYMMETRIC TEXT-HEAVY)

---

---

## SECTION 06 — THE CURATED SELECTION
### *"The Discovery"*

---

### 1. Section Name
**Curated Picks — Selected for You**

### 2. Business Goal
Surface top-selling or editorially chosen products. Drive product discovery. Encourage add-to-cart or add-to-wishlist. Expose the breadth of the product range in a curated, non-overwhelming format.

### 3. Emotional Goal
**DISCOVERY + DESIRE**

The customer feels: *"I want to stop scrolling and look at each of these properly."*

Like pausing in a jewellery showroom in front of a perfectly arranged display case — each piece calling for attention.

### 4. User Questions Being Answered
- *"What are the most beautiful pieces in the collection?"*
- *"What would I actually buy?"*
- *"Is there something for my budget?"*
- *"Can I save something to decide later?"*

### 5. Why This Section Comes Here
The customer now trusts the brand (Section 05). She has seen the brand's philosophy, its craftsmanship, its editorial vision. She is ready to be shown products. This is the first true product section — but it is curated, not catalogued. 8 products maximum. Hand-selected. Presented with breathing room.

### 6. Visual Direction
**Elegant product grid — editorial composition.**

- Background: `#FAF8F3` — Ivory Canvas
- Products are not in a standard rigid grid. They are in a staggered layout — alternating card heights by 20px to break the horizontal line
- Above the grid: a narrow editorial header — minimal, confident
- Each product card follows the Design Bible product card specification exactly

### 7. Layout Type
**STAGGERED 4-COLUMN PRODUCT GRID (desktop) / 2-COLUMN (tablet) / HORIZONTAL CAROUSEL (mobile)**

Desktop: 4 columns × 2 rows = 8 products  
Row 1: cards at standard height  
Row 2: cards positioned 20px lower than row 1 (stagger)  

Mobile: Horizontal scroll carousel — 1.5 cards visible at a time

### 8. Content Hierarchy

**Section Header:**
```
[SECTION LABEL]         — 11px DM Sans, uppercase, tracking 0.3em, #C9A96E
                          "CURATED FOR YOU"

[SECTION TITLE]         — 48px Cormorant Garamond, weight 300
                          "Pieces Worth Pausing For"

[PRODUCT COUNT]         — 13px DM Sans, #8A8A8A, float right
                          "Showing 8 of 247 pieces"
```

**Each Product Card** (per Design Bible spec):
```
[IMAGE]                 — 3:4 ratio, ivory background
                          Primary + secondary image (crossfade on hover)
[CATEGORY LABEL]        — 11px DM Sans, uppercase, tracking 0.2em, #8A8A8A
[PRODUCT NAME]          — 20px Cormorant Garamond, #1A1A1A
[PRICE]                 — 15px DM Sans, weight 500, #2D2D2D
[ADD TO COLLECTION]     — Rises from below on hover, ghost button
[WISHLIST ICON]         — Appears top-right of image on hover
```

**Section Footer:**
```
[VIEW ALL CTA]          — Primary button (centered below grid)
                          Text: "DISCOVER ALL PIECES"
                          Links to /shop
```

### 9. Motion & Animation Direction

```
Section header:   Standard scroll reveal, 800ms
Product cards:    Staggered reveal — each card with 60ms delay
                  y: 40px→0, opacity: 0→1, 800ms, easeOutExpo
Card hover:       Image crossfade (600ms), name shifts up 4px (300ms)
                  Wishlist icon fades in (300ms)
                  "Add to Collection" rises (500ms easeOutExpo)
View all CTA:     Appears after all cards, 200ms delay, fade in
```

### 10. CTA Strategy
**Section-level CTA:** *"DISCOVER ALL PIECES"* → `/shop`

This is the first strong purchase-intent CTA on the homepage. The customer is now ready. She has been through 5 sections of brand-building. This CTA does not feel like a sales push — it feels like a natural extension of the journey.

**Card-level CTAs:**  
- *"Add to Collection"* (cart) — for the decisive customer  
- Wishlist heart — for the browser who wants to save and return

### 11. Transition Into Section 07
After the product grid, the customer may feel decision fatigue if immediately pushed to buy. Section 07 — The Occasion Context — reframes the products through the lens of *when* and *why* — giving her permission to explore further without pressure. It is an editorial palette-cleanser between two product-heavy zones.

**Estimated Viewport Height:** 140vh (desktop) / 200vh+ (mobile)
**Section Type:** PRODUCT-FOCUSED (EDITORIAL GRID)

---

---

## SECTION 07 — THE OCCASION CONTEXT
### *"The Personalisation"*

---

### 1. Section Name
**The Occasions — Jewellery for Every Chapter**

### 2. Business Goal
Increase average order value by expanding the customer's sense of purchase occasions. Capture gift-givers. Surface the right product subcategory based on the customer's life moment. Reduce decision paralysis by providing a context-driven entry point.

### 3. Emotional Goal
**PERSONALISATION + RECOGNITION**

The customer feels: *"They understand my life. This isn't just about one piece — this is about every moment that matters."*

Like a personal stylist who asks: *"What's the occasion? Let me show you exactly what you need."*

### 4. User Questions Being Answered
- *"Is there something specific for my wedding?"*
- *"What should I gift for Diwali?"*
- *"Do they have something I can wear every day?"*
- *"Is there something for my daughter's occasion?"*

### 5. Why This Section Comes Here
The product grid (Section 06) showed the customer what exists. This section shows her *why she needs it*. Occasion-based shopping dramatically increases conversion because it gives the customer a reason to buy beyond aesthetics. It also surfaces the gifting use-case — a major revenue driver for jewellery brands.

### 6. Visual Direction
**Split editorial cards — occasion-driven.**

- Background alternates: first occasion on `#F2EDE4` (Parchment), second on `#FAF8F3` (Ivory)
- 4 occasion cards, displayed in a horizontal editorial row
- Each card: a tall editorial image (lifestyle photography) + occasion name + short descriptor + CTA
- Cards are NOT equal-width — the first card (Wedding) is wider, communicating priority

### 7. Layout Type
**HORIZONTAL EDITORIAL CARD ROW — UNEQUAL COLUMNS**

```
Desktop: 4 cards, widths: 32% | 24% | 24% | 20%
Mobile: Horizontal scroll, 1 full card visible + peek of next
```

### 8. Content Hierarchy

**Section Header:**
```
[SECTION LABEL]         — "SHOP BY OCCASION"
[SECTION TITLE]         — "Jewellery for Every Chapter of Your Story"
```

**Each Occasion Card:**
```
[IMAGE]                 — Full-bleed editorial lifestyle photo
                          Height: 60vh (first card), 50vh (others)

[OCCASION NAME]         — 28px Cormorant Garamond (first), 22px (others)
                          Color: #1A1A1A or #FAF8F3 depending on image

[DESCRIPTOR]            — 13px DM Sans, #8A8A8A
                          Example: "14 Collections · 180 Pieces"

[CTA]                   — Ghost button, appears on hover
                          "Explore →"
```

**Occasions:**
1. **Weddings & Celebrations** → `/collections/bridal-heritage`
2. **Festival Season** → `/collections/temple-gold`
3. **Daily Elegance** → `/collections/everyday-luxe`
4. **The Art of Gifting** → `/shop?occasion=gifting`

### 9. Motion & Animation Direction

```
Cards:     Staggered horizontal entry
           opacity: 0→1, x: 30px→0, 800ms, easeOutExpo
           Stagger: 100ms between cards

Card hover:
  Image: scale 1.0→1.04, 800ms ease
  Occasion name: y: 0→-4px, 300ms ease
  CTA: opacity: 0→1, y: 10px→0, 400ms easeOutExpo
```

### 10. CTA Strategy
Each card is its own CTA. There is no section-level button. The cards themselves create navigation — clicking any card takes the customer deeper into the relevant collection.

### 11. Transition Into Section 08
Social proof (testimonials) follows naturally after the customer has mentally shortlisted products by occasion. At this point, her internal voice asks: *"But has anyone else actually loved this brand?"* Section 08 answers that question.

**Estimated Viewport Height:** 70vh (desktop) / 200vh (mobile)
**Section Type:** EDITORIAL CARDS

---

---

## SECTION 08 — THE VOICES
### *"The Social Proof"*

---

### 1. Section Name
**The Voices — Words From Our Community**

### 2. Business Goal
Build social proof through customer testimonials. Reduce purchase anxiety. Validate the brand's quality claims through peer voices rather than brand claims. Increase conversion rate by addressing the final hesitation: *"Can I really trust this brand?"*

### 3. Emotional Goal
**VALIDATION + BELONGING**

The customer feels: *"Other women like me have loved this brand. I am not taking a risk — I am joining something real."*

### 4. User Questions Being Answered
- *"Have real customers been happy with this brand?"*
- *"What is the quality actually like when it arrives?"*
- *"Do other women feel the way I feel about this jewellery?"*

### 5. Why This Section Comes Here
The customer has been moved from intrigue through desire and trust (brand-led). Now she needs peer validation. Testimonials placed too early feel like desperation. Placed here — after genuine brand story-building — they feel like confirmation of something already suspected.

### 6. Visual Direction
**Editorial testimonial layout — NOT a review carousel.**

- Background: `#1A1A1A` (Deep Charcoal) — the second dark moment on the homepage, creating a visual rhythm: light (01–05), dark (04, 08), creating a visual heartbeat
- 3 testimonials displayed simultaneously in a 3-column layout
- Each testimonial: a single, large pull-quote in Cormorant Garamond italic, customer name and city below in small DM Sans
- Optional: a small customer photo (1:1 circle) — but ONLY if the photo is high-quality and well-lit. Never use pixelated photos.
- No star ratings. No review scores. Just words.

### 7. Layout Type
**3-COLUMN TESTIMONIAL GRID (dark background)**

Mobile: Vertical stack of 3 testimonials (no carousel — carousels hide content)

### 8. Content Hierarchy

**Section Header:**
```
[SECTION LABEL]         — 11px DM Sans, uppercase, tracking 0.3em
                          Color: #C9A96E
                          "FROM OUR COMMUNITY"

[HEADLINE]              — 42px Cormorant Garamond, weight 300, italic
                          Color: #FAF8F3
                          "Words we hold close."
```

**Each Testimonial:**
```
[OPEN QUOTE MARK]       — Large decorative " in Cormorant Garamond
                          Color: #C9A96E, opacity 0.4
                          Font-size: 80px, position: absolute, above text

[TESTIMONIAL TEXT]      — 22px Cormorant Garamond, italic, weight 300
                          Color: #FAF8F3
                          Line-height: 1.6
                          Max 3–4 lines

[CUSTOMER NAME]         — 12px DM Sans, uppercase, tracking 0.2em
                          Color: #C9A96E
                          "— Meera S., Hyderabad"

[OCCASION TAG]          — 11px DM Sans, #8A8A8A
                          "Wore it to her wedding"
```

### 9. Motion & Animation Direction

```
Section header:   y: 30px→0, opacity: 0→1, 800ms, easeOutExpo
Testimonials:     Staggered: opacity: 0→1, y: 20px→0, 600ms, ease
                  Stagger: 150ms between columns
Quote marks:      opacity: 0→0.4, scale: 1.2→1.0, 1000ms, ease
```

### 10. CTA Strategy
**No CTA in this section.** This is a trust-building pause. Adding a CTA here would make the testimonials feel transactional — engineered to sell, not to validate. Let the words stand alone.

### 11. Transition Into Section 09
The dark testimonial section transitions into the bright, clean Services section — a visual exhale into warmth and light. This contrast makes both sections more powerful.

**Estimated Viewport Height:** 60vh–70vh (desktop) / 100vh (mobile)
**Section Type:** EDITORIAL (DARK)

---

---

## SECTION 09 — THE PROMISE
### *"The Commitment"*

---

### 1. Section Name
**Our Promise — The Standard We Hold**

### 2. Business Goal
Communicate the brand's service commitments without resorting to badge-bar design. Address practical purchase hesitations: delivery, quality, packaging, returns. Convert browsers who have reached this point but have not yet added to cart.

### 3. Emotional Goal
**REASSURANCE + CONFIDENCE**

The customer feels: *"They have thought of everything. I don't need to worry about anything. I can simply buy."*

### 4. User Questions Being Answered
- *"How will my order arrive?"*
- *"What if I'm not happy with the product?"*
- *"Is delivery safe and insured?"*
- *"Is this a brand I can count on?"*

### 5. Why This Section Comes Here
After social proof (Section 08), the customer may still have practical objections. This section addresses them — not with generic badges, but with confident, elegant prose statements. The timing is intentional: we do not address practical hesitations until after the emotional journey is complete. Logic follows emotion in luxury purchase decisions.

### 6. Visual Direction
**Clean, minimal, typographic.**

- Background: `#FAF8F3` — Ivory Canvas
- 4 service pillars arranged horizontally with generous spacing
- Each pillar: a minimal line-icon (1px stroke, 24px), a service name, a 1-line description
- No boxes, no cards, no shadows, no badges — just clean text and icons
- A thin gold hairline (1px) runs horizontally above the section as a separator

### 7. Layout Type
**4-COLUMN SERVICE PILLARS (horizontal)**

Mobile: 2 columns × 2 rows

### 8. Content Hierarchy

**Section Header:**
```
[SECTION LABEL]         — "OUR PROMISE"
[HEADLINE]              — 42px Cormorant Garamond
                          "Beauty. Delivered with care."
```

**Four Service Pillars:**

| Icon | Title | Description |
|---|---|---|
| Package icon (1px stroke) | Complimentary Delivery | On every order, always |
| Shield icon (1px stroke) | Fully Insured Shipments | Your jewellery, protected |
| Gift icon (1px stroke) | Luxury Packaging | Every piece, gift-ready |
| Refresh icon (1px stroke) | Satisfaction Guarantee | We make it right |

### 9. Motion & Animation Direction

```
Hairline divider: width: 0→100%, 800ms, ease
Header:           y: 20px→0, opacity: 0→1, 800ms, easeOutExpo
Icons:            Each icon draws in (stroke animation), 600ms, stagger 100ms
Service text:     Staggered fade-in, 150ms delay between pillars
```

### 10. CTA Strategy
**No section-level CTA.** The services section is informational. Adding a CTA would cheapen the moment.

### 11. Transition Into Section 10
The promise section transitions into the Journal — a shift from *what we do* to *what we believe in and talk about*. This builds brand depth beyond commerce.

**Estimated Viewport Height:** 50vh–60vh (desktop) / 80vh (mobile)
**Section Type:** EDITORIAL (TYPOGRAPHIC)

---

---

## SECTION 10 — THE JOURNAL
### *"The Community"*

---

### 1. Section Name
**The Journal — Stories From the World of Avighna**

### 2. Business Goal
Build brand depth beyond commerce. Position Avighna as a cultural voice, not just a product seller. Create reasons to return to the website. Support SEO with high-quality editorial content. Plant the seed of brand loyalty.

### 3. Emotional Goal
**BELONGING + CURIOSITY**

The customer feels: *"This brand has interesting things to say. I want to come back. I want to read more."*

### 4. User Questions Being Answered
- *"Is this brand a part of my cultural world?"*
- *"Can I learn something here beyond shopping?"*
- *"Does Avighna understand Indian celebrations and traditions?"*

### 5. Why This Section Comes Here
At this point, the customer has been on a complete journey. She has felt intrigue, desire, trust, discovery, and validation. If she is still scrolling, she is deeply engaged. The Journal rewards that engagement with content — not another product push.

### 6. Visual Direction
**Magazine layout — two editorial articles side by side.**

- Background: `#F2EDE4` — Warm Parchment
- 2 journal articles, large editorial images, clean text below
- First article: larger (70% of available width on desktop)
- Second article: smaller (30%), with slightly different image orientation

### 7. Layout Type
**ASYMMETRIC 70/30 EDITORIAL PAIR**

Mobile: Full-width stacked articles

### 8. Content Hierarchy

**Section Header:**
```
[SECTION LABEL]         — "THE JOURNAL"
[HEADLINE]              — 42px Cormorant Garamond
                          "Stories Worth Reading"
[CTA — right-aligned]   — Ghost: "View All Stories →"
```

**Each Article Card:**
```
[IMAGE]                 — 16:9 ratio for primary, 4:3 for secondary
[ARTICLE CATEGORY]      — 11px DM Sans, uppercase, tracking 0.2em, #C9A96E
[ARTICLE TITLE]         — 22px Cormorant Garamond
[DATE]                  — 12px DM Sans, #8A8A8A
[READ MORE]             — Ghost CTA: "Read →"
```

**Example Article Topics:**
- *"How to Style Temple Jewellery for a Modern Wedding"*
- *"The Art of 1 Gram Gold: What You Should Know Before You Buy"*

### 9. Motion & Animation Direction

```
Articles:  x: ±30px → 0, opacity: 0→1, 900ms, easeOutExpo, staggered 200ms
Images:    gentle scale 1.04→1.0 over 1200ms on hover
```

### 10. CTA Strategy
Two levels: a section-level ghost CTA (*"View All Stories"* → `/journal`) and a per-article *"Read →"* link. Appropriately low-pressure for a content section.

### 11. Transition Into Section 11
The Journal creates intellectual engagement. The Newsletter invitation follows naturally — *"You liked what you found here? Stay connected."*

**Estimated Viewport Height:** 70vh (desktop) / 100vh (mobile)
**Section Type:** EDITORIAL

---

---

## SECTION 11 — THE INVITATION
### *"The Relationship"*

---

### 1. Section Name
**The Invitation — Join the World of Avighna**

### 2. Business Goal
Capture email addresses for the marketing database. Build a long-term relationship with browsers who are not ready to purchase today. Create a touchpoint for seasonal campaigns, new collection launches, and personalised recommendations.

### 3. Emotional Goal
**BELONGING + EXCLUSIVITY**

The customer feels: *"I want to be part of this. I want to know about new collections before anyone else. This is a world I want access to."*

### 4. User Questions Being Answered
- *"Will I miss the next collection launch?"*
- *"How do I stay connected with Avighna?"*
- *"Is there something exclusive for people who follow the brand?"*

### 5. Why This Section Comes Here
This is the final section. The customer has completed the full emotional journey. She either bought something, wishlisted something, or is a warm prospect. In all cases, the email subscription converts: buyers want to know about new arrivals, wishlisters want restocking alerts, browsers want to return with intent.

### 6. Visual Direction
**Full-width, dark, intimate.**

- Background: `#1A1A1A` (Deep Charcoal) — the homepage's third dark moment, creating the final dramatic act
- A full-bleed editorial image fills the right 40% of the section: a beautifully composed flat-lay of Avighna jewellery on champagne fabric, shot from above
- The left 60% is pure dark background with the invitation text
- Centered in the text area: the headline, one line of body copy, the email input, and the CTA

### 7. Layout Type
**FULL-BLEED DARK — 60/40 SPLIT**

Mobile: Stacked — image above (50vw tall), text below (full width)

### 8. Content Hierarchy

```
[SECTION LABEL]         — 11px DM Sans, uppercase, tracking 0.3em
                          Color: #C9A96E
                          "THE AVIGHNA CIRCLE"

[HEADLINE]              — 56px Cormorant Garamond, italic, weight 300
                          Color: #FAF8F3
                          "First to know.
                          First to wear."

[BODY]                  — 15px DM Sans, weight 300
                          Color: rgba(250,248,243, 0.6)
                          "New collections. Exclusive previews.
                          Stories from the world of Avighna."

[EMAIL INPUT]           — Full-width, bottom border only (1px #C9A96E)
                          Placeholder: "Your email address"
                          Background: transparent
                          Text: #FAF8F3

[CTA BUTTON]            — Primary (ivory background, dark text)
                          Text: "JOIN THE CIRCLE"
                          Full-width of input above

[FINE PRINT]            — 11px DM Sans, #5C5C5C
                          "We honour your privacy. No spam, ever."
```

### 9. Motion & Animation Direction

```
Text elements: Standard staggered reveal, 800ms easeOutExpo
Email input:   width: 0→100%, 600ms, ease (draws in from left)
Image:         x: 40px→0, opacity: 0→1, 1200ms, easeOutExpo
CTA:           opacity: 0→1, y: 10px→0, 600ms, ease, delay: 800ms
```

### 10. CTA Strategy
**One CTA. One Input. One Action.** The most focused section on the homepage.

### 11. Transition
The homepage ends. The Footer follows — minimal, structured, dark background continuing the visual tone of this section.

**Estimated Viewport Height:** 60vh (desktop) / 90vh (mobile)
**Section Type:** FULL-BLEED (DARK EDITORIAL)

---

---

# PART III — EXPERIENCE ANALYSIS

---

## Desktop Scroll Experience

### Complete Scroll Journey

| Section | Background | Type | Est. Height | Cumulative |
|---|---|---|---|---|
| 01 Hero | Dark image overlay | Full-bleed | 100vh | 100vh |
| 02 Belief Statement | #FAF8F3 Ivory | Editorial Split | 85vh | 185vh |
| 03 Collections Map | #F2EDE4 Parchment | Editorial Grid | 140vh | 325vh |
| 04 Featured Editorial | #1A1A1A Dark | Full-bleed Dark | 100vh | 425vh |
| 05 Craft Story | #FAF8F3 Ivory | Editorial Split | 80vh | 505vh |
| 06 Curated Selection | #FAF8F3 Ivory | Product Grid | 140vh | 645vh |
| 07 Occasion Context | #F2EDE4 Parchment | Editorial Cards | 70vh | 715vh |
| 08 Voices | #1A1A1A Dark | Editorial Dark | 65vh | 780vh |
| 09 The Promise | #FAF8F3 Ivory | Typographic | 55vh | 835vh |
| 10 The Journal | #F2EDE4 Parchment | Editorial | 70vh | 905vh |
| 11 The Invitation | #1A1A1A Dark | Full-bleed Dark | 60vh | 965vh |
| Footer | #1A1A1A Dark | Structural | 40vh | 1005vh |

**Total estimated desktop scroll depth: ~10 viewport heights**

### Background Color Rhythm

The homepage alternates between three background tones in a deliberate rhythm:

```
Ivory → Parchment → Dark → Ivory → Ivory → Parchment → Dark → Ivory → Parchment → Dark
```

This rhythm prevents visual monotony while maintaining brand cohesion. The dark sections (04, 08, 11) act as dramatic pauses — moments of heightened visual intensity.

### The Three Dark Moments Strategy

Dark sections appear at three specific emotional high-points:
- **Section 04**: The peak of desire (Featured Collection)
- **Section 08**: The validation (Testimonials — other women's voices)
- **Section 11**: The invitation (The final relationship)

These are the three most emotionally charged moments. Dark backgrounds signal: *"Pay attention. This matters."*

---

## Mobile Scroll Experience

### Key Differences from Desktop

| Element | Desktop | Mobile |
|---|---|---|
| Hero | Full viewport landscape | Full viewport portrait (9:16) |
| Belief Statement | 45/55 split | Stacked (image top, text below) |
| Collections Map | Asymmetric grid | Horizontal scroll carousel |
| Featured Editorial | 50/50 split | Full-width stacked |
| Craft Story | 45/55 split | Stacked (text top, image below) |
| Curated Products | 4-column staggered grid | Horizontal scroll carousel |
| Occasions | 4-column editorial | Horizontal scroll carousel |
| Testimonials | 3-column | Vertical stack (all 3 visible) |
| The Promise | 4-column | 2×2 grid |
| Journal | 70/30 split | Full-width stacked |
| Newsletter | 60/40 split | Image above, form below |

**Mobile Total Scroll Depth: ~18–20 viewport heights** (due to vertical stacking)

### Mobile Critical Decisions
1. **Hero CTA placement**: The hero CTAs must be fully visible without scrolling on any mobile device — position them at maximum 65% of viewport height
2. **Carousel snap**: All mobile carousels use CSS scroll-snap with 100% snap alignment
3. **Peek design**: Carousels show 1.2 items — the 20% of the next item signals "more content"
4. **Touch areas**: Every interactive element minimum 48×48px
5. **Bottom navigation bar**: Persists across all sections — Home, Collections, Search, Wishlist, Cart

---

## Attention Map

*Where does the user look first on each section?*

### Desktop Attention Map

| Section | First Fixation | Second Fixation | Third Fixation |
|---|---|---|---|
| Hero | Center image (the jewellery) | Headline (lower-left) | Primary CTA |
| Belief Statement | Large headline | Editorial image | Body paragraph |
| Collections Map | Large featured tile (Bridal) | Remaining tiles | Section headline |
| Featured Editorial | Editorial image (left half) | Large headline | Product mini-stack |
| Craft Story | Close-up artisan image | Headline | Pull quote |
| Curated Products | First product (top-left) | Product grid sweep | Section headline |
| Occasions | Largest card (Wedding) | Other occasion cards | Section headline |
| Testimonials | Largest quote text | Customer names | Middle testimonial |
| The Promise | Section headline | Four service pillars | Icons |
| Journal | Large article image | Article title | Section label |
| Newsletter | Headline | Email input | CTA button |

### F-Pattern Awareness
The left side of the page receives disproportionate attention. Key brand messages (headlines, CTAs) are positioned in the left half of the viewport on sections that use split layouts — not centered. This is a deliberate departure from the common luxury brand center-alignment trap.

---

## Scroll Rhythm Analysis

Luxury scroll rhythm must alternate between:
- **Wide, expansive moments** (sections that make the customer slow down)
- **Efficient, navigational moments** (sections that help the customer orient quickly)

```
Section 01 — Hero           : SLOW (full engagement, ~8s)
Section 02 — Belief         : SLOW (reading, ~6s)
Section 03 — Collections    : MEDIUM (scanning, ~5s)
Section 04 — Featured       : SLOW (emotional peak, ~8s)
Section 05 — Craft          : SLOW (reading, ~6s)
Section 06 — Products       : MEDIUM-SLOW (discovery, ~10s)
Section 07 — Occasions      : MEDIUM (scanning, ~4s)
Section 08 — Testimonials   : SLOW (reading, ~6s)
Section 09 — Promise        : FAST (scanning, ~3s)
Section 10 — Journal        : MEDIUM (~4s)
Section 11 — Newsletter     : FAST (action, ~3s)
```

**Total engaged scroll time estimate: 60–75 seconds** for a fully engaged visitor.

Brands in our reference set (Cartier, Tiffany) average 55–80 seconds of engaged homepage scroll time. We are within the correct range.

---

## Section Classification

### Full-Width Sections
- Section 01 — Hero
- Section 04 — Featured Editorial
- Section 11 — The Invitation

### Editorial Sections (Story-Driven)
- Section 02 — Belief Statement
- Section 05 — Craft Story
- Section 07 — Occasion Context
- Section 08 — Voices
- Section 10 — Journal

### Product-Focused Sections
- Section 06 — Curated Selection

### Navigation/Orientation Sections
- Section 03 — Collections Map

### Informational Sections
- Section 09 — The Promise

---

---

# PART IV — CREATIVE DIRECTOR REVIEW

---

## Self-Critique — Before Implementation

*In the tradition of honest creative leadership: this review is unsentimental. No compliments. Only the truth.*

---

### What Is Working Well

**1. The Narrative Arc is Coherent**
The 5-beat emotional journey (Intrigue → Desire → Trust → Discovery → Belonging) is correctly structured. Each section earns the right to exist through the previous one. This is not accidental.

**2. The Dark Section Strategy**
Placing dark backgrounds at emotional peaks (Sections 04, 08, 11) is correct and sophisticated. It creates genuine visual drama without resorting to cheap tricks.

**3. The Absence of Product Rush**
The first three sections show zero products. This is correct. It matches how Cartier, Van Cleef, and Dior operate. Brand story before product listing.

**4. The Occasions Section**
This is the most strategically underrated section on the homepage. It unlocks multiple buyer journeys simultaneously: brides, gift-givers, festival shoppers. Its placement after the product grid is correct.

---

### Areas of Concern

**⚠ Concern 1 — The Homepage May Be Too Long**

At ~10 viewport heights (desktop), the homepage is at the edge of what luxury brands typically ask of their customers. Apple's homepage is long — but each section is short and fast. Our sections are deliberately slow and immersive.

**Risk:** Customers who arrive with high purchase intent (searching for a specific product or category) may be frustrated by the depth of brand storytelling before they reach products.

**Recommendation:** Consider a sticky navigation "Quick Access" bar that appears after scroll past the hero — showing: Collections / Shop / Occasions / Contact. This allows high-intent users to skip the story journey without removing it for those who need it.

---

**⚠ Concern 2 — The Journal Section (Section 10) is Premature**

The Journal section requires high-quality original editorial content to work. If Avighna does not have a functioning journal with at least 4–6 articles at launch, Section 10 will be empty or filled with placeholder content — which is worse than having no section at all.

**Recommendation:** At launch, replace Section 10 with an alternative trust-builder — such as a brief Brand Story editorial section with the founder's vision — until the journal has sufficient content. The Journal should be a future phase.

---

**⚠ Concern 3 — The Collections Map Asymmetric Grid is Risky**

The asymmetric grid (Section 03) with unequal column widths (32% / 24% / 24% / 20%) is editorially correct but technically complex. On intermediate screen sizes (1024px–1280px), the unequal columns may create uncomfortable layouts.

**Recommendation:** Define two breakpoint variants:
- Desktop 1280px+: Full asymmetric grid as designed
- Tablet 768px–1279px: 2×3 even grid with editorial photography
- Mobile: Horizontal scroll carousel

---

**⚠ Concern 4 — Social Proof Quality Dependency**

Section 08 (Testimonials) is only as strong as the testimonials themselves. Three mediocre testimonials will actively harm the brand. Generic testimonials (*"Loved it! Great quality"*) feel fraudulent in an editorial luxury layout.

**Recommendation:** At launch, use a maximum of 2 testimonials — but they must be specific, detailed, and emotional. Better to have 2 real testimonials than 3 generic ones. Do not launch this section without genuine, high-quality customer quotes.

---

**⚠ Concern 5 — Mobile Load Performance**

The homepage, as designed, contains: a hero image/video, a large editorial image (Section 02), a 5-tile collection grid (Section 03), a full-bleed dark editorial (Section 04), a large craft image (Section 05), 8 product images with dual states (Section 06), 4 occasion images (Section 07), 2 journal images (Section 10), and a newsletter image (Section 11).

**Total estimated images: 25–32 images**

On a 3G connection, this homepage will feel slow unless aggressive optimisation is applied.

**Recommendation:**
- All below-fold images: lazy loaded
- Hero image: preloaded, WebP, compressed to <200KB
- Product images: Only load the primary image; secondary (hover) images load on hover intent (mouseover)
- Implement a service worker for repeat visitors
- Set target LCP (Largest Contentful Paint): <2.0s

---

**⚠ Concern 6 — The Belief Statement Copy Must Be Custom**

Section 02 as designed is only as powerful as the actual copy. The placeholder copy (*"Every woman deserves to feel adorned"*) is directionally correct but may not be the final brand line. If generic copy is placed here, the editorial layout makes the mediocrity even more visible.

**Recommendation:** Before implementation, have the client confirm and approve the exact copy for:
- Hero headline
- Belief statement headline and body
- Craft story headline and pull quote

These four copy moments define the entire homepage's brand voice. They cannot be written by an AI alone.

---

### Priority Improvements Before Implementation

1. **Add a "Quick Access" sticky bar** after hero scroll for high-intent users
2. **Confirm journal content availability** before committing to Section 10 — have a swap plan ready
3. **Define precise breakpoints** for the asymmetric collections grid
4. **Collect and approve minimum 2 high-quality testimonials** before implementing Section 08
5. **Set image optimisation requirements** as a non-negotiable technical prerequisite
6. **Approve all key copy** (Hero, Belief Statement, Craft Story) before UI implementation begins

---

### The Final Test — Would Cartier Approve This?

Reviewing the complete homepage narrative:

✓ Brand story before products — **YES**  
✓ White space and editorial breathing room — **YES**  
✓ Product never feels like a catalogue — **YES**  
✓ Three emotional high-points (dark sections) — **YES**  
✓ No discount messaging, no badge bars — **YES**  
✓ Typography-led sections — **YES**  
✓ No more than 8 products on the homepage — **YES**  
✓ Mobile-first carousel approach — **YES**  
✓ Trust built through story, not badges — **YES**  

**Creative Director Verdict: Approved with the 6 conditions noted above.**

This IA is ready for client review and implementation approval.

---

---

*End of Homepage Information Architecture — Version 1.0*

*Prepared by: Avighna Collections Creative Leadership Team*  
*Source of Truth: AVIGHNA_COLLECTIONS_DESIGN_BIBLE.md*  
*Status: Awaiting Client Approval*  
*Last Updated: July 2026*

---
