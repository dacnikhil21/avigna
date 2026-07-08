export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  altText?: string | null;
  position: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc?: string | null;
  price: number;
  salePrice?: number | null;
  sku: string;
  material?: string | null;
  metal: string;
  purity?: string | null;
  color?: string | null;
  weight?: string | null;
  stones?: string | null;
  dimensions?: string | null;
  stockQty: number;
  inStock: boolean;
  isFeatured: boolean;
  isLatest: boolean;
  isExclusive: boolean;
  isTrending: boolean;
  isBridal: boolean;
  isActive: boolean;
  categoryId: string;
  category: Category;
  collectionId?: string | null;
  collection?: Collection | null;
  images: ProductImage[];
  metaTitle?: string | null;
  metaDesc?: string | null;
  metaKeywords?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  icon?: string | null;
  parentId?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  coverImage?: string | null;
  image?: string | null;           // alias for coverImage — used by static data & legacy UI
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  metal: string;
}

export interface SiteSettings {
  id: string;
  brandName: string;
  tagline?: string;
  description?: string;
  logoUrl?: string;
  faviconUrl?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  pinterestUrl?: string;
  razorpayKeyId?: string;
  logoText?: string;
  logoSubText?: string;
  storeTimings?: string;
  gstNumber?: string;
  defaultMetaTitle?: string;
  defaultMetaDesc?: string;
  defaultOgImage?: string;
  googleAnalyticsId?: string;
}

export interface AnnouncementBar {
  id: string;
  text: string;
  link?: string;
  linkLabel?: string;
  isActive: boolean;
  sortOrder: number;
  bgColor: string;
  textColor: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  ctaText?: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  imageUrl: string;
  imageAlt?: string;
  overlayOpacity: number;
  isActive: boolean;
  sortOrder: number;
}

export interface BrandStory {
  id: string;
  sectionKey: string;
  heading: string;
  subheading?: string;
  body: string;
  imageUrl?: string;
  imageAlt?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface EditorialGallery {
  id: string;
  imageUrl: string;
  altText?: string;
  caption?: string;
  link?: string;
  colSpan: number;
  rowSpan: number;
  isActive: boolean;
  sortOrder: number;
}

export interface BoutiqueInfo {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  mapEmbedUrl?: string;
  googleMapsUrl?: string;
  mondayHours?: string;
  tuesdayHours?: string;
  wednesdayHours?: string;
  thursdayHours?: string;
  fridayHours?: string;
  saturdayHours?: string;
  sundayHours?: string;
  hoursNote?: string;
  isActive: boolean;
  isPrimary: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  location?: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  productId?: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  category: "GENERAL" | "MATERIAL_COMPOSITION" | "SHIPPING_SECURITY" | "CARE_GUARANTEE" | "ORDERS_RETURNS" | "BRIDAL";
  sortOrder: number;
  isActive: boolean;
}
