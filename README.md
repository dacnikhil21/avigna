# Avighna Collections

A world-class luxury jewellery e-commerce website built with Next.js 15, featuring premium design, Razorpay payments, and PostgreSQL.

**Tagline:** Timeless Elegance for Every Celebration.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animations:** Framer Motion
- **Database:** PostgreSQL + Prisma
- **Media:** Cloudinary
- **Payments:** Razorpay
- **State:** Zustand (cart)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Razorpay account (test mode for development)
- Cloudinary account (optional, for image uploads)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure your .env with database and API keys

# Push database schema
npm run db:push

# Seed sample data
npm run db:seed

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `RAZORPAY_KEY_ID` | Razorpay key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay key secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key (client-side) |
| `NEXT_PUBLIC_APP_URL` | App URL for SEO/sitemap |

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, collections, featured products |
| `/shop` | Product listing with category filters |
| `/product/[slug]` | Product detail with gallery & specs |
| `/collections` | Curated collection lookbook |
| `/collections/[slug]` | Individual collection page |
| `/checkout` | Secure checkout with Razorpay |
| `/about` | Brand story & craftsmanship |
| `/contact` | Contact form & store locator |

## Design System

- **Colors:** Luxury White, Champagne Gold, Elegant Black, Soft Beige
- **Typography:** Cormorant Garamond (headings) + Inter (body)
- **Effects:** Glass morphism, premium shadows, smooth micro-interactions

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run db:push      # Push Prisma schema to DB
npm run db:seed      # Seed sample products
npm run db:studio    # Open Prisma Studio
```

## License

Private — Avighna Collections
