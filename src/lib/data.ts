import type { Category, Product, Collection, ProductImage } from "@/types";

function makeImages(urls: string[]): ProductImage[] {
  return urls.map((url, i) => ({
    id: `img-${i}-${Math.random().toString(36).substr(2, 9)}`,
    productId: "",
    url,
    altText: undefined,
    position: i,
    isPrimary: i === 0,
  }));
}

export const BRAND = {
  name: "Sri Avighna Collections",
  tagline: "Timeless 1 Gram Gold Jewellery for Every Celebration",
  description:
    "Discover exquisite handcrafted 1 gram gold replica jewellery that celebrates India's rich heritage. From royal bridal masterpieces to daily wear and classical dance ornaments.",
  phone: "+91 70130 04127",
  whatsapp: "+91 70130 04127",
  email: "avighnacollections1@gmail.com",
  address: "Beside More Supermarket, Opp RR Complex, Polytechnic Road, Wanaparthy - 509103",
};

// Premium Unsplash Jewellery Images
// Premium Unsplash Jewellery Images
const IMG = {
  // Earrings
  earrings1: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&q=80",
  earrings2: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&q=80",
  earrings3: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
  earrings4: "https://images.unsplash.com/photo-1590548784585-645d8b9f887e?w=800&q=80",
  earrings5: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
  earrings6: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
  earrings7: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
  
  // Necklaces
  necklace1: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
  necklace2: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  necklace3: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
  necklace4: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?w=800&q=80",
  necklace5: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
  necklace6: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
  necklace7: "https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80",

  // Long / Short Harams
  haram1: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=800&q=80",
  haram2: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80",
  haram3: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80",
  haram4: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&q=80",
  
  // Bangles
  bangle1: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
  bangle2: "https://images.unsplash.com/photo-1615655406736-b37892a30a40?w=800&q=80",
  bangle3: "https://images.unsplash.com/photo-1615655406736-b37892a30a40?w=800&q=80",
  bangle4: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
  bangle5: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
  bangle6: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",

  // Rings
  ring1: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
  ring2: "https://images.unsplash.com/photo-1603561519411-07134e71a2a9?w=800&q=80",
  ring3: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?w=800&q=80",
  ring4: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=800&q=80",

  // Pendants & Nose Pins & Anklets
  pendant1: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
  pendant2: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&q=80",
  pendant3: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  nospin1: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
  nospin2: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80",
  anklet1: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
  anklet2: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&q=80",
  bracelet1: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
  bracelet2: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",

  // Hair Accessories
  hair1: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80",
  hair2: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80",
  hair3: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80",

  // Bridal / Dance Sets
  bridal1: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&q=80",
  bridal2: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=800&q=80",
  bridal3: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80",

  // Miscellaneous / Care / Box
  misc1: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=800&q=80",
  misc2: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
};

// All 30 Curated Categories
export const categories: Category[] = [
  { id: "cat-earrings",         name: "Earrings",              slug: "earrings",              description: "From subtle studs to dramatic jhumkas and chandeliers", image: IMG.earrings1, sortOrder: 1, isActive: true },
  { id: "cat-necklace",         name: "Necklace",              slug: "necklace",              description: "Statement neckpieces in temple, kemp, and modern styles", image: IMG.necklace1, sortOrder: 2, isActive: true },
  { id: "cat-long-haram",       name: "Long Haram",            slug: "long-haram",            description: "Traditional long necklaces for weddings and festivals", image: IMG.haram1, sortOrder: 3, isActive: true },
  { id: "cat-short-haram",      name: "Short Haram",           slug: "short-haram",           description: "Elegant short harams for everyday and occasional wear", image: IMG.haram3, sortOrder: 4, isActive: true },
  { id: "cat-bangles",          name: "Bangles",               slug: "bangles",               description: "Traditional and designer bangles for every occasion", image: IMG.bangle1, sortOrder: 5, isActive: true },
  { id: "cat-glass-bangles",    name: "Glass Bangles",         slug: "glass-bangles",         description: "Colourful glass bangles with gold accents", image: IMG.bangle5, sortOrder: 6, isActive: true },
  { id: "cat-thali-chains",     name: "Thali Chains",          slug: "thali-chains",          description: "Mangalsutra and thali chains for married women", image: IMG.necklace7, sortOrder: 7, isActive: true },
  { id: "cat-panchaloham",      name: "Panchaloham Jewellery", slug: "panchaloham-jewellery", description: "Five-metal alloy jewellery for auspicious occasions", image: IMG.bangle3, sortOrder: 8, isActive: true },
  { id: "cat-vaddanam",         name: "Vaddanam",              slug: "vaddanam",              description: "Ornate waist belts — essential bridal accessory", image: IMG.bridal2, sortOrder: 9, isActive: true },
  { id: "cat-champaswaralu",    name: "Champaswaralu",         slug: "champaswaralu",         description: "Traditional hair ornaments for brides and dancers", image: IMG.hair3, sortOrder: 10, isActive: true },
  { id: "cat-martilu",          name: "Martilu",               slug: "martilu",               description: "Forehead ornaments for brides and classical dancers", image: IMG.hair2, sortOrder: 11, isActive: true },
  { id: "cat-hair-accessories", name: "Hair Accessories",      slug: "hair-accessories",      description: "Hairpins, clips, and traditional hair ornaments", image: IMG.hair1, sortOrder: 12, isActive: true },
  { id: "cat-classical-dance",  name: "Classical Dance Jewellery", slug: "classical-dance-jewellery", description: "Complete sets for Bharatanatyam, Kuchipudi & classical arts", image: IMG.bridal3, sortOrder: 13, isActive: true },
  { id: "cat-beauty-products",  name: "Beauty Products",       slug: "beauty-products",       description: "Kumkum, sindoor, and jewellery care accessories", image: IMG.misc2, sortOrder: 14, isActive: true },
  { id: "cat-pendants",         name: "Pendants",              slug: "pendants",              description: "Lakshmi, Ganesh, and temple motif pendants", image: IMG.pendant1, sortOrder: 15, isActive: true },
  { id: "cat-bracelets",        name: "Bracelets",             slug: "bracelets",             description: "Delicate and statement bracelets for every style", image: IMG.bracelet1, sortOrder: 16, isActive: true },
  { id: "cat-long-black-beads", name: "Long Black Beads",      slug: "long-black-beads",      description: "Traditional black bead chains — the Telugu mangalsutra", image: IMG.necklace7, sortOrder: 17, isActive: true },
  { id: "cat-short-black-beads",name: "Short Black Beads",     slug: "short-black-beads",     description: "Short black bead chains for daily wear", image: IMG.necklace7, sortOrder: 18, isActive: true },
  { id: "cat-chandraharam",     name: "Chandraharam Chains",   slug: "chandraharam-chains",   description: "Traditional chandraharam moon-shaped chains", image: IMG.necklace4, sortOrder: 19, isActive: true },
  { id: "cat-beads-jewellery",  name: "Beads Jewellery",       slug: "beads-jewellery",       description: "Crystal, rudraksha, and decorative bead jewellery", image: IMG.ring3, sortOrder: 20, isActive: true },
  { id: "cat-fancy-items",      name: "Fancy Items",           slug: "fancy-items",           description: "Trendy and fashion-forward jewellery pieces", image: IMG.earrings7, sortOrder: 21, isActive: true },
  { id: "cat-finger-rings",     name: "Finger Rings",          slug: "finger-rings",          description: "Traditional and designer rings for all occasions", image: IMG.ring1, sortOrder: 22, isActive: true },
  { id: "cat-papitabilla",      name: "Papitabilla",           slug: "papitabilla",           description: "Traditional Telugu neck ornament for brides", image: IMG.bridal2, sortOrder: 23, isActive: true },
  { id: "cat-nose-pins",        name: "Nose Pins",             slug: "nose-pins",             description: "Elegant nose pins and naths in various styles", image: IMG.nospin2, sortOrder: 24, isActive: true },
  { id: "cat-jadabillalu",      name: "Jadabillalu",           slug: "jadabillalu",           description: "Ornate braid decorations for brides and dancers", image: IMG.hair1, sortOrder: 25, isActive: true },
  { id: "cat-anklets",          name: "Anklets",               slug: "anklets",               description: "Traditional payal and designer anklets", image: IMG.anklet1, sortOrder: 26, isActive: true },
  { id: "cat-bridal",           name: "Bridal Collection",     slug: "bridal-collection",     description: "Complete bridal jewellery sets for your most sacred day", image: IMG.bridal1, sortOrder: 27, isActive: true },
  { id: "cat-mens",             name: "Men's Collection",      slug: "mens-collection",       description: "Chains, rings, and bracelets for men", image: IMG.ring4, sortOrder: 28, isActive: true },
  { id: "cat-kids",             name: "Kids Collection",       slug: "kids-collection",       description: "Safe, lightweight jewellery for children", image: IMG.earrings6, sortOrder: 29, isActive: true },
  { id: "cat-latest",           name: "Latest Collections",    slug: "latest-collections",    description: "Our newest curation of pristine 1 gram gold jewellery drops", image: IMG.necklace3, sortOrder: 30, isActive: true }
];

// Luxury Collections
export const collections: Collection[] = [
  { id: "col-bridal-heritage",   name: "Bridal Heritage",    slug: "bridal-heritage",    tagline: "For Your Most Sacred Day",   description: "Complete bridal jewellery sets inspired by South Indian royal traditions.", coverImage: IMG.bridal1, image: IMG.bridal1, isFeatured: true, sortOrder: 1, isActive: true },
  { id: "col-temple-gold",       name: "Temple Gold",        slug: "temple-gold",         tagline: "Divine Craftsmanship",        description: "Sacred temple motifs crafted in premium 1 gram gold — timeless devotional beauty.", coverImage: IMG.necklace2, image: IMG.necklace2, isFeatured: true, sortOrder: 2, isActive: true },
  { id: "col-kemp-collection",   name: "Kemp Collection",    slug: "kemp-collection",     tagline: "The Colour of Celebrations",  description: "Vibrant Kemp stone jewellery in bold reds and golds for festive occasions.", coverImage: IMG.earrings1, image: IMG.earrings1, isFeatured: true, sortOrder: 3, isActive: true },
  { id: "col-everyday-luxe",     name: "Everyday Luxe",      slug: "everyday-luxe",       tagline: "Effortless Elegance Daily",   description: "Lightweight, versatile pieces designed for daily wear — office to evenings.", coverImage: IMG.pendant1, image: IMG.pendant1, isFeatured: false, sortOrder: 4, isActive: true },
  { id: "col-classical-dance",   name: "Natyam Edit",        slug: "natyam-edit",         tagline: "Dance with Radiance",         description: "Professional classical dance jewellery for Bharatanatyam, Kuchipudi & more.", coverImage: IMG.bridal3, image: IMG.bridal3, isFeatured: false, sortOrder: 5, isActive: true },
];

// Helper: build raw products mapping
const rawProducts = [
  // EARRINGS
  { id: "prod-ear-001", slug: "temple-kemp-jhumka-earrings", name: "Temple Kemp Jhumka", shortDesc: "Classic South Indian jhumka with kemp stones", description: "A timeless pair of temple-style jhumka earrings adorned with vibrant kemp stones and pearl drops. Lightweight enough for all-day wear.", price: 125000, sku: "AVG-EAR-001", metal: "Gold Plated Brass", purity: "Premium Quality", weight: "18g", stones: "Kemp, Pearls", stockQty: 25, isFeatured: true, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "earrings", collectionSlug: "kemp-collection", imageUrls: [IMG.earrings1, IMG.earrings2] },
  { id: "prod-ear-002", slug: "antique-lakshmi-earrings", name: "Antique Lakshmi Drop Earrings", shortDesc: "Antique finish Lakshmi motif earrings", description: "Exquisite antique gold-finish earrings featuring Goddess Lakshmi motif with meenakari work and ruby accents. Perfect for festivals and weddings.", price: 185000, sku: "AVG-EAR-002", metal: "Antique Gold Plated", purity: "Premium Finish", weight: "22g", stones: "Ruby, Kemp", stockQty: 18, isFeatured: false, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "earrings", collectionSlug: "temple-gold", imageUrls: [IMG.earrings3, IMG.earrings4] },
  { id: "prod-ear-003", slug: "pearl-chandbali-earrings", name: "Pearl Chandbali Earrings", shortDesc: "Elegant chandbali with pearl drops", description: "Gorgeous chandbali-style earrings with cascading fresh water pearl drops and a delicate gold filigree frame. Ideal for saree occasions.", price: 145000, salePrice: 119000, sku: "AVG-EAR-003", metal: "Gold Plated Brass", purity: "High Polish", weight: "15g", stones: "Fresh Water Pearls", stockQty: 30, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "earrings", collectionSlug: "everyday-luxe", imageUrls: [IMG.earrings7, IMG.earrings5] },

  // NECKLACE
  { id: "prod-nkl-001", slug: "kemp-choker-necklace", name: "Royal Kemp Choker", shortDesc: "Bold kemp choker for weddings and festivals", description: "A statement choker necklace crafted in premium 1 gram gold, adorned with vibrant kemp stones arranged in a traditional South Indian pattern. The perfect centrepiece for any bridal or festive ensemble.", price: 320000, sku: "AVG-NKL-001", metal: "Gold Plated Brass", purity: "Premium Polish", weight: "65g", stones: "Kemp, Emerald Green Glass", stockQty: 12, isFeatured: true, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "necklace", collectionSlug: "kemp-collection", imageUrls: [IMG.necklace1, IMG.necklace6] },
  { id: "prod-nkl-002", slug: "temple-lakshmi-necklace", name: "Temple Lakshmi Necklace", shortDesc: "Classic temple Lakshmi necklace set", description: "A stunning temple-style necklace featuring an intricate Lakshmi pendant with rubies and pearls. Paired with matching earrings, this set is ideal for Bharatanatyam or bridal wear.", price: 275000, sku: "AVG-NKL-002", metal: "Gold Plated Copper", purity: "Antique Finish", weight: "48g", stones: "Ruby, Pearls", stockQty: 20, isFeatured: true, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "necklace", collectionSlug: "temple-gold", imageUrls: [IMG.necklace2, IMG.necklace3] },
  { id: "prod-nkl-003", slug: "antique-coin-necklace", name: "Antique Lakshmi Coin Necklace", shortDesc: "Antique coin-style temple necklace", description: "A gorgeous antique-finish necklace featuring Lakshmi coins in a traditional south Indian style. Perfect for festive occasions and classical performances.", price: 215000, salePrice: 189000, sku: "AVG-NKL-003", metal: "Antique Gold Plated", purity: "Traditional Finish", weight: "42g", stones: "None", stockQty: 15, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "necklace", collectionSlug: "temple-gold", imageUrls: [IMG.necklace5, IMG.necklace7] },

  // LONG HARAM
  { id: "prod-lhr-001", slug: "bridal-long-kemp-haram", name: "Bridal Kemp Long Haram", shortDesc: "Opulent long kemp haram for brides", description: "An opulent long haram necklace stretching to the waist, set with layered kemp stones in a traditional South Indian bridal pattern. A centrepiece for any grand Telugu wedding.", price: 680000, sku: "AVG-LHR-001", metal: "Gold Plated Brass", purity: "Premium Matte", weight: "120g", stones: "Kemp, Ruby, Pearl", stockQty: 8, isFeatured: true, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "long-haram", collectionSlug: "bridal-heritage", imageUrls: [IMG.haram1, IMG.haram4] },
  { id: "prod-lhr-002", slug: "temple-long-haram-gold", name: "Temple Gold Long Haram", shortDesc: "Traditional temple-style long haram", description: "A classical long haram in pure temple gold style, featuring lotus and Lakshmi motifs repeated in a hand-crafted pattern. Ideal for Kuchipudi and Bharatanatyam.", price: 595000, sku: "AVG-LHR-002", metal: "Gold Plated Copper", purity: "Royal Antique", weight: "95g", stones: "None", stockQty: 10, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "long-haram", collectionSlug: "natyam-edit", imageUrls: [IMG.haram2, IMG.necklace2] },

  // SHORT HARAM
  { id: "prod-shr-001", slug: "kemp-short-haram-necklace", name: "Kemp Layered Short Haram", shortDesc: "Multi-layer kemp short haram necklace", description: "A beautifully layered short haram with multiple rows of kemp stones set in gold-plated frames. Versatile for both wedding and festival occasions.", price: 345000, sku: "AVG-SHR-001", metal: "Gold Plated Brass", purity: "Premium Matte", weight: "58g", stones: "Kemp, Pearls", stockQty: 14, isFeatured: false, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "short-haram", collectionSlug: "kemp-collection", imageUrls: [IMG.haram3, IMG.necklace6] },
  { id: "prod-shr-002", slug: "antique-short-haram", name: "Antique Padakkam Short Haram", shortDesc: "Antique gold padakkam pendant haram", description: "An antique-finish short haram featuring a large padakkam (central medallion) pendant surrounded by traditional floral motifs and polki-finish stones.", price: 420000, salePrice: 379000, sku: "AVG-SHR-002", metal: "Antique Gold Plated", purity: "Bespoke Polish", weight: "62g", stones: "Polki Finish, Kemp", stockQty: 10, isFeatured: true, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "short-haram", collectionSlug: "temple-gold", imageUrls: [IMG.necklace3, IMG.necklace2] },

  // BANGLES
  { id: "prod-bng-001", slug: "temple-gold-bangles-set", name: "Temple Gold Bangles Set of 4", shortDesc: "Traditional temple motif gold bangles", description: "A set of four elegant temple-style bangles in premium 1 gram gold, featuring Lakshmi and lotus motifs with intricate nakashi work. A timeless addition to any jewellery wardrobe.", price: 240000, sku: "AVG-BNG-001", metal: "Gold Plated Brass", purity: "Premium Antique", weight: "85g (Set of 4)", stones: "None", stockQty: 20, isFeatured: true, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "bangles", collectionSlug: "temple-gold", imageUrls: [IMG.bangle1, IMG.bangle2] },
  { id: "prod-bng-002", slug: "kemp-designer-bangles", name: "Kemp Stone Designer Bangles", shortDesc: "Wide kemp stone designer bangles pair", description: "A striking pair of wide designer bangles adorned with kemp stones in a floral pattern. Statement pieces for weddings, engagements, and cultural events.", price: 195000, sku: "AVG-BNG-002", metal: "Gold Plated Copper", purity: "High Polish", weight: "65g (Pair)", stones: "Kemp", stockQty: 18, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "bangles", collectionSlug: "kemp-collection", imageUrls: [IMG.bangle3, IMG.bangle2] },
  { id: "prod-bng-003", slug: "plain-gold-bangles-set6", name: "Plain Gold Bangles Set of 6", shortDesc: "Slim plain gold bangles for daily wear", description: "A set of six slim plain gold-plated bangles — lightweight, stackable, and perfect for daily wear. Elegant simplicity that complements any outfit.", price: 115000, sku: "AVG-BNG-003", metal: "Gold Plated Brass", purity: "High Polish", weight: "45g (Set of 6)", stones: "None", stockQty: 35, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "bangles", collectionSlug: "everyday-luxe", imageUrls: [IMG.bangle4, IMG.ring3] },

  // GLASS BANGLES
  { id: "prod-gbng-001", slug: "gold-thread-glass-bangles-12", name: "Gold Thread Glass Bangles (Set of 12)", shortDesc: "Traditional glass bangles with gold thread", description: "A vibrant set of 12 glass bangles woven with gold thread — a classic Telugu bridal tradition. Available in Navratri colours and bridal red.", price: 45000, sku: "AVG-GBN-001", metal: "Glass with Gold Accent", purity: "Handcrafted", weight: "120g (Set of 12)", stones: "None", stockQty: 50, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "glass-bangles", collectionSlug: "bridal-heritage", imageUrls: [IMG.bangle6, IMG.bangle5] },
  { id: "prod-gbng-002", slug: "lac-glass-bangles-festival", name: "Lac Glass Bangles — Festival Set", shortDesc: "Lac-coated glass bangles with stone inlay", description: "Colourful lac glass bangles with intricate stone inlay work — traditional craftsmanship from Hyderabad. Perfect for Navratri, Sankranti, and festivals.", price: 65000, salePrice: 55000, sku: "AVG-GBN-002", metal: "Lac Coated Glass", purity: "Artisanal", weight: "150g (Set of 12)", stones: "Inlay Stones", stockQty: 40, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "glass-bangles", collectionSlug: "kemp-collection", imageUrls: [IMG.bangle5, IMG.bangle6] },

  // THALI CHAINS
  { id: "prod-thl-001", slug: "traditional-thali-gold-chain", name: "Traditional Thali Chain", shortDesc: "24-inch traditional gold thali chain", description: "A 24-inch traditional thali chain in premium gold plating, designed to hold the sacred thali (mangalsutra pendant). Durable and elegant for daily wear by married women.", price: 135000, sku: "AVG-THL-001", metal: "Gold Plated Brass", purity: "High Durability", weight: "25g", stones: "None", stockQty: 30, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "thali-chains", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace7, IMG.necklace4] },
  { id: "prod-thl-002", slug: "black-gold-thali-chain", name: "Black Bead Thali Chain with Gold Caps", shortDesc: "Black bead and gold cap thali chain", description: "A traditional Telugu thali chain featuring alternating black beads and gold-capped beads — the classic South Indian mangalsutra design. 24-inch length.", price: 120000, sku: "AVG-THL-002", metal: "Gold Plated with Black Beads", purity: "Superior Finish", weight: "22g", stones: "Black Beads", stockQty: 28, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "thali-chains", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace7, IMG.necklace6] },

  // PANCHALOHAM
  { id: "prod-pnc-001", slug: "panchaloham-bangles-set", name: "Panchaloham Bangles Set of 6", shortDesc: "Sacred five-metal alloy bangles", description: "A set of six panchaloham (five-metal alloy) bangles — traditionally believed to bring good health and prosperity. Crafted using a combination of gold, silver, copper, iron, and zinc.", price: 210000, sku: "AVG-PNC-001", metal: "Five Metal Alloy", purity: "Auspicious Mix", weight: "60g (Set of 6)", stones: "None", stockQty: 20, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "panchaloham-jewellery", collectionSlug: "everyday-luxe", imageUrls: [IMG.bangle3, IMG.bangle4] },
  { id: "prod-pnc-002", slug: "panchaloham-pendant-chain", name: "Panchaloham Lakshmi Pendant Chain", shortDesc: "Five-metal Lakshmi pendant with chain", description: "An auspicious panchaloham chain featuring a Lakshmi pendant — ideal as a religious gift or for daily devotional wear.", price: 165000, sku: "AVG-PNC-002", metal: "Five Metal Alloy", purity: "Devotional Polish", weight: "30g", stones: "Ruby, Kemp", stockQty: 15, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "panchaloham-jewellery", collectionSlug: "temple-gold", imageUrls: [IMG.pendant1, IMG.necklace7] },

  // VADDANAM
  { id: "prod-vad-001", slug: "bridal-kemp-vaddanam", name: "Bridal Kemp Vaddanam", shortDesc: "Ornate kemp waist belt for brides", description: "An elaborate bridal vaddanam (waist belt) adorned with kemp stones and pearl drops in a traditional South Indian pattern. Adjustable to fit 26–34 inch waist. A must-have for Telugu brides.", price: 890000, sku: "AVG-VAD-001", metal: "Gold Plated Brass", purity: "Exquisite Antique", weight: "220g", stones: "Kemp, Pearls, Ruby", stockQty: 5, isFeatured: true, isLatest: false, isTrending: false, isExclusive: true, isBridal: true, categorySlug: "vaddanam", collectionSlug: "bridal-heritage", imageUrls: [IMG.bridal2, IMG.haram1] },
  { id: "prod-vad-002", slug: "temple-gold-vaddanam", name: "Temple Gold Vaddanam", shortDesc: "Traditional temple-style waist ornament", description: "A stunning temple-gold vaddanam featuring Lakshmi, Saraswati, and lotus motifs crafted in antique gold finish. Perfect for classical dance performances and bridal wear.", price: 780000, salePrice: 699000, sku: "AVG-VAD-002", metal: "Antique Gold Plated", purity: "Premium Matte", weight: "190g", stones: "Polki Finish", stockQty: 6, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "vaddanam", collectionSlug: "natyam-edit", imageUrls: [IMG.bridal1, IMG.haram2] },

  // CHAMPASWARALU
  { id: "prod-chp-001", slug: "bridal-champaswaralu-set", name: "Bridal Champaswaralu Set", shortDesc: "Traditional champaswaralu for brides", description: "An exquisite set of bridal champaswaralu (decorative hair ornaments) with kemp stones and pearl drops. Designed to cascade beautifully along the braid.", price: 220000, sku: "AVG-CHP-001", metal: "Gold Plated Brass", purity: "Premium Matte", weight: "55g (Set)", stones: "Kemp, Pearls", stockQty: 12, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "champaswaralu", collectionSlug: "bridal-heritage", imageUrls: [IMG.hair3, IMG.hair1] },
  { id: "prod-chp-002", slug: "dance-champaswaralu", name: "Dance Champaswaralu — Natyam", shortDesc: "Champaswaralu for classical dance", description: "Lightweight champaswaralu specially designed for classical dancers. Secure clip-on mechanism ensures they stay in place through vigorous performances.", price: 160000, sku: "AVG-CHP-002", metal: "Gold Plated Brass", purity: "Stage Polish", weight: "35g (Set)", stones: "None", stockQty: 15, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "champaswaralu", collectionSlug: "natyam-edit", imageUrls: [IMG.hair3, IMG.bridal3] },

  // MARTILU
  { id: "prod-mrt-001", slug: "bridal-gold-martilu", name: "Bridal Gold Martilu", shortDesc: "Gold forehead ornament for brides", description: "An ornate gold martilu (forehead ornament) with cascading tassels and kemp stone accents — an essential bridal accessory for Telugu weddings.", price: 175000, sku: "AVG-MRT-001", metal: "Gold Plated Brass", purity: "Traditional Polish", weight: "40g", stones: "Kemp, Pearls", stockQty: 10, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "martilu", collectionSlug: "bridal-heritage", imageUrls: [IMG.hair2, IMG.hair1] },
  { id: "prod-mrt-002", slug: "dance-martilu-set", name: "Dance Martilu Set", shortDesc: "Classical dance forehead ornament set", description: "A complete set of dance martilu for classical performers — includes the central piece and side pendants. Designed to withstand stage lighting and movement.", price: 125000, sku: "AVG-MRT-002", metal: "Gold Plated Brass", purity: "Reinforced stage wear", weight: "28g", stones: "None", stockQty: 18, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "martilu", collectionSlug: "natyam-edit", imageUrls: [IMG.hair2, IMG.bridal3] },

  // HAIR ACCESSORIES
  { id: "prod-hai-001", slug: "gold-hairpin-set-12", name: "Gold Hairpin Set (12 pcs)", shortDesc: "Classic gold hairpins for all occasions", description: "A set of 12 elegant gold-plated hairpins featuring small floral and leaf motifs. Perfect for everyday styling, sarees, and traditional occasions.", price: 49000, sku: "AVG-HAI-001", metal: "Gold Plated Brass", purity: "Daily Polish", weight: "25g (Set)", stones: "None", stockQty: 50, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "hair-accessories", collectionSlug: "everyday-luxe", imageUrls: [IMG.hair1, IMG.earrings6] },
  { id: "prod-hai-002", slug: "temple-gold-hair-clip", name: "Temple Gold Hair Clip", shortDesc: "Wide temple-style gold hair clip", description: "A wide, ornate hair clip in temple-gold finish with lotus and peacock motifs. Designed to hold a bun or half-up style elegantly for weddings and festivals.", price: 95000, sku: "AVG-HAI-002", metal: "Gold Plated Brass", purity: "Temple Antique", weight: "35g", stones: "None", stockQty: 25, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "hair-accessories", collectionSlug: "temple-gold", imageUrls: [IMG.hair1, IMG.hair2] },

  // CLASSICAL DANCE JEWELLERY
  { id: "prod-cls-001", slug: "bharatanatyam-full-set", name: "Bharatanatyam Full Jewellery Set", shortDesc: "Complete Bharatanatyam stage jewellery", description: "A professional-grade complete Bharatanatyam jewellery set including necklace (oddiyanam), earrings, maattal, martilu, champaswaralu, arm bands, bangles, and anklets. Lightweight and stage-ready.", price: 1850000, sku: "AVG-CLS-001", metal: "Gold Plated Brass", purity: "Stage Matte", weight: "350g (Complete Set)", stones: "Kemp, Cabochon Pearls", stockQty: 5, isFeatured: true, isLatest: false, isTrending: false, isExclusive: true, isBridal: false, categorySlug: "classical-dance-jewellery", collectionSlug: "natyam-edit", imageUrls: [IMG.bridal3, IMG.hair1] },
  { id: "prod-cls-002", slug: "kuchipudi-dance-set", name: "Kuchipudi Dance Jewellery Set", shortDesc: "Complete Kuchipudi performance jewellery", description: "A complete Kuchipudi dance set with all required ornaments for a professional performance. Includes head piece, necklace, earrings, bangles, and waist piece. Durable for intense performances.", price: 1550000, sku: "AVG-CLS-002", metal: "Gold Plated Brass", purity: "Durable stage polish", weight: "280g (Complete Set)", stones: "None", stockQty: 6, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "classical-dance-jewellery", collectionSlug: "natyam-edit", imageUrls: [IMG.bridal3, IMG.bridal1] },

  // BEAUTY PRODUCTS
  { id: "prod-bty-001", slug: "kumkum-sindoor-box-gold", name: "Gold Kumkum Box with Sindoor", shortDesc: "Decorative gold kumkum box with sindoor", description: "An ornate gold-plated kumkum box with quality sindoor — an auspicious gift for brides and newlyweds. Features a decorative Lakshmi motif lid.", price: 35000, sku: "AVG-BTY-001", metal: "Gold Plated Brass", purity: "Glossy Gold", weight: "80g", stones: "None", stockQty: 60, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "beauty-products", imageUrls: [IMG.misc1, IMG.misc2] },
  { id: "prod-bty-002", slug: "jewellery-care-kit", name: "Jewellery Care & Polish Kit", shortDesc: "Professional home jewellery care set", description: "A comprehensive jewellery care kit including polishing cloth, cleaning solution, and storage pouches. Helps maintain the gold shine of your 1 gram gold jewellery.", price: 28000, sku: "AVG-BTY-002", metal: "N/A", purity: "Professional Grade", weight: "200g (Kit)", stones: "None", stockQty: 40, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "beauty-products", imageUrls: [IMG.misc2, IMG.misc1] },

  // PENDANTS
  { id: "prod-pnd-001", slug: "lakshmi-gold-pendant", name: "Goddess Lakshmi Gold Pendant", shortDesc: "Intricate Lakshmi deity pendant", description: "A beautifully crafted Goddess Lakshmi pendant in antique gold finish with kemp stone accents. A divine gift for brides, daughters, and festive occasions.", price: 95000, sku: "AVG-PND-001", metal: "Antique Gold Plated", purity: "Premium Nakashi", weight: "12g", stones: "Kemp", stockQty: 35, isFeatured: true, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "pendants", collectionSlug: "temple-gold", imageUrls: [IMG.pendant1, IMG.pendant2] },
  { id: "prod-pnd-002", slug: "ganesh-pendant-gold", name: "Lord Ganesha Pendant", shortDesc: "Auspicious Ganesha gold pendant", description: "An auspicious Lord Ganesha pendant in premium 1 gram gold with fine detailing. Believed to bring wisdom and success to the wearer.", price: 85000, sku: "AVG-PND-002", metal: "Gold Plated Brass", purity: "Intricate Carving", weight: "10g", stones: "None", stockQty: 40, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "pendants", collectionSlug: "temple-gold", imageUrls: [IMG.pendant2, IMG.pendant1] },
  { id: "prod-pnd-003", slug: "om-pendant-gold", name: "Sacred Om Pendant", shortDesc: "Om symbol gold pendant with chain", description: "A minimalist yet powerful Om symbol pendant in gold-plated finish, paired with a matching 18-inch chain. Suitable for daily devotional wear.", price: 69000, salePrice: 59000, sku: "AVG-PND-003", metal: "Gold Plated Brass", purity: "High Polish", weight: "8g", stones: "None", stockQty: 45, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "pendants", collectionSlug: "everyday-luxe", imageUrls: [IMG.pendant3, IMG.pendant1] },

  // BRACELETS
  { id: "prod-brc-001", slug: "kemp-stone-bracelet", name: "Kemp Stone Tennis Bracelet", shortDesc: "Elegant kemp stone tennis bracelet", description: "A stunning tennis-style bracelet with kemp stones set in a continuous gold-plated frame. Adjustable with a secure lobster clasp. Ideal for weddings and festivities.", price: 145000, sku: "AVG-BRC-001", metal: "Gold Plated Brass", purity: "Matte Gold", weight: "20g", stones: "Kemp", stockQty: 22, isFeatured: false, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "bracelets", collectionSlug: "kemp-collection", imageUrls: [IMG.bracelet2, IMG.bangle2] },
  { id: "prod-brc-002", slug: "gold-chain-bracelet", name: "Classic Gold Chain Bracelet", shortDesc: "Simple gold chain bracelet for daily wear", description: "A classic gold-plated chain bracelet in a flat Byzantine weave pattern. Lightweight and versatile for office and casual wear.", price: 89000, sku: "AVG-BRC-002", metal: "Gold Plated Brass", purity: "High Polish", weight: "8g", stones: "None", stockQty: 35, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "bracelets", collectionSlug: "everyday-luxe", imageUrls: [IMG.bracelet1, IMG.necklace7] },

  // LONG BLACK BEADS
  { id: "prod-lbb-001", slug: "traditional-long-black-beads", name: "Traditional Long Black Bead Chain", shortDesc: "30-inch traditional Telugu mangalsutra", description: "A 30-inch traditional Telugu mangalsutra with authentic black beads and gold-capped beads in the classic South Indian style. The symbol of marriage in Telugu culture.", price: 165000, sku: "AVG-LBB-001", metal: "Gold Plated with Black Beads", purity: "High Durability", weight: "35g", stones: "Black Beads", stockQty: 25, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "long-black-beads", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace7, IMG.necklace3] },
  { id: "prod-lbb-002", slug: "designer-long-black-beads", name: "Designer Long Black Bead Chain", shortDesc: "Designer black bead with gold pendants", description: "A contemporary designer take on the traditional Telugu mangalsutra — long black bead chain with multiple gold-plated Lakshmi pendants.", price: 195000, sku: "AVG-LBB-002", metal: "Gold Plated with Black Beads", purity: "Nakashi Work", weight: "40g", stones: "None", stockQty: 18, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "long-black-beads", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace7, IMG.necklace1] },

  // SHORT BLACK BEADS
  { id: "prod-sbb-001", slug: "short-black-bead-chain", name: "Short Black Bead Chain 18 inch", shortDesc: "18-inch short black bead mangalsutra", description: "An 18-inch short black bead chain — lighter and more convenient for daily wear, especially for working women. Features the traditional gold-capped bead pattern.", price: 115000, sku: "AVG-SBB-001", metal: "Gold Plated with Black Beads", purity: "Daily Comfort", weight: "22g", stones: "Black Beads", stockQty: 30, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "short-black-beads", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace7, IMG.pendant3] },
  { id: "prod-sbb-002", slug: "gold-bead-black-chain-pendant", name: "Black Bead Chain with Heart Pendant", shortDesc: "Modern black bead chain with heart pendant", description: "A modern fusion short black bead chain with a gold heart-shaped pendant. A gift favourite for wives and newlyweds.", price: 135000, sku: "AVG-SBB-002", metal: "Gold Plated with Black Beads", purity: "High Polish", weight: "20g", stones: "Black Beads", stockQty: 22, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "short-black-beads", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace7, IMG.pendant2] },

  // CHANDRAHARAM
  { id: "prod-chr-001", slug: "traditional-chandraharam-chain", name: "Traditional Chandraharam", shortDesc: "Moon-shaped gold chandraharam chain", description: "A classic chandraharam chain in gold-plated brass featuring the traditional moon-shaped link pattern. Available in 20 and 24-inch lengths.", price: 285000, sku: "AVG-CHR-001", metal: "Gold Plated Brass", purity: "Royal Matte", weight: "45g", stones: "None", stockQty: 20, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "chandraharam-chains", collectionSlug: "temple-gold", imageUrls: [IMG.necklace4, IMG.necklace3] },
  { id: "prod-chr-002", slug: "kemp-chandraharam-chain", name: "Kemp Chandraharam Necklace", shortDesc: "Kemp stone chandraharam chain", description: "A decorative chandraharam chain with kemp stones embedded between each moon-shaped link — adding vibrant colour to the traditional design.", price: 345000, sku: "AVG-CHR-002", metal: "Gold Plated Brass", purity: "Exquisite Kemp Finish", weight: "52g", stones: "Kemp", stockQty: 14, isFeatured: false, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "chandraharam-chains", collectionSlug: "kemp-collection", imageUrls: [IMG.necklace4, IMG.necklace1] },

  // BEADS JEWELLERY
  { id: "prod-bds-001", slug: "crystal-bead-necklace-gold", name: "Crystal & Gold Bead Necklace", shortDesc: "Elegant crystal and gold bead necklace", description: "A sophisticated necklace alternating between faceted crystal beads and gold-plated oval beads. Light and stylish for office and evening wear.", price: 125000, sku: "AVG-BDS-001", metal: "Gold Plated + Crystal Beads", purity: "Modern Chic", weight: "30g", stones: "Crystals", stockQty: 28, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "beads-jewellery", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace6, IMG.ring3] },
  { id: "prod-bds-002", slug: "rudraksha-gold-bracelet", name: "Rudraksha & Gold Bracelet", shortDesc: "Sacred rudraksha with gold beads bracelet", description: "A spiritually significant bracelet combining authentic 5-mukhi rudraksha beads with gold-capped spacers. Ideal for gifting on religious occasions.", price: 95000, sku: "AVG-BDS-002", metal: "Gold Plated Caps with Rudraksha", purity: "Auspicious Polish", weight: "18g", stones: "Rudraksha", stockQty: 35, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "beads-jewellery", collectionSlug: "everyday-luxe", imageUrls: [IMG.ring4, IMG.bracelet1] },

  // FANCY ITEMS
  { id: "prod-fan-001", slug: "trendy-ear-cuff-set", name: "Trendy Gold Ear Cuff Set", shortDesc: "Modern ear cuff set for fashion lovers", description: "A fashionable set of three gold-plated ear cuffs — one plain hoop, one with small stones, and one geometric design. No piercing required. Perfect for teens and young women.", price: 69000, sku: "AVG-FAN-001", metal: "Gold Plated Brass", purity: "High Polish", weight: "10g (Set)", stones: "None", stockQty: 40, isFeatured: false, isLatest: true, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "fancy-items", collectionSlug: "everyday-luxe", imageUrls: [IMG.earrings7, IMG.earrings6] },
  { id: "prod-fan-002", slug: "layered-chain-necklace-set", name: "Layered Chain Necklace Set", shortDesc: "Three-layer gold chain necklace set", description: "A trendy three-layer chain necklace set with varied chain textures and a small coin pendant. Comes as a single adjustable piece for effortless styling.", price: 115000, salePrice: 99000, sku: "AVG-FAN-002", metal: "Gold Plated Brass", purity: "Premium Gold", weight: "15g", stones: "None", stockQty: 30, isFeatured: false, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "fancy-items", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace4, IMG.necklace7] },

  // FINGER RINGS
  { id: "prod-rng-001", slug: "kemp-cocktail-ring", name: "Kemp Cocktail Ring", shortDesc: "Bold kemp stone cocktail ring", description: "A bold statement cocktail ring featuring a large oval kemp stone surrounded by small gold beading. A conversation starter for parties and festive occasions.", price: 85000, sku: "AVG-RNG-001", metal: "Gold Plated Brass", purity: "Kemp Antique", weight: "8g", stones: "Kemp", stockQty: 30, isFeatured: false, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "finger-rings", collectionSlug: "kemp-collection", imageUrls: [IMG.ring1, IMG.ring2] },
  { id: "prod-rng-002", slug: "temple-thumb-ring", name: "Temple Gold Thumb Ring", shortDesc: "Wide temple-style thumb ring", description: "A wide temple-style thumb ring in antique gold finish with traditional floral motifs. A statement piece for classical dance performances and festive occasions.", price: 75000, sku: "AVG-RNG-002", metal: "Antique Gold Plated", purity: "Temple Nakashi", weight: "6g", stones: "None", stockQty: 25, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "finger-rings", collectionSlug: "temple-gold", imageUrls: [IMG.ring2, IMG.ring1] },
  { id: "prod-rng-003", slug: "adjustable-daily-ring", name: "Adjustable Daily Wear Ring", shortDesc: "Simple adjustable gold ring for daily wear", description: "A slim, elegant adjustable ring in gold-plated finish — perfect for daily wear. Features a minimal twisted band design that suits all hand types.", price: 45000, sku: "AVG-RNG-003", metal: "Gold Plated Brass", purity: "High Polish", weight: "4g", stones: "None", stockQty: 50, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "finger-rings", collectionSlug: "everyday-luxe", imageUrls: [IMG.ring3, IMG.ring1] },

  // PAPITABILLA
  { id: "prod-ppt-001", slug: "bridal-gold-papitabilla", name: "Bridal Gold Papitabilla", shortDesc: "Traditional Telugu neck ornament for brides", description: "An ornate papitabilla — a traditional Telugu neck ornament worn on the back of the neck — crafted in premium 1 gram gold with kemp stone accents and gold tassels.", price: 260000, sku: "AVG-PPT-001", metal: "Gold Plated Brass", purity: "Matte Gold", weight: "55g", stones: "Kemp, Pearl Tassels", stockQty: 8, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "papitabilla", collectionSlug: "bridal-heritage", imageUrls: [IMG.bridal2, IMG.hair1] },
  { id: "prod-ppt-002", slug: "dance-papitabilla", name: "Dance Papitabilla", shortDesc: "Dance papitabilla for classical performances", description: "A lightweight papitabilla for classical dance performances, designed with secure clips to stay in position during intense movement.", price: 195000, sku: "AVG-PPT-002", metal: "Gold Plated Brass", purity: "Stage wear grade", weight: "40g", stones: "None", stockQty: 12, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "papitabilla", collectionSlug: "natyam-edit", imageUrls: [IMG.bridal3, IMG.bridal2] },

  // NOSE PINS
  { id: "prod-nsp-001", slug: "bridal-nath-gold", name: "Bridal Nath with Chain", shortDesc: "Large bridal nath with pearl and kemp", description: "A stunning bridal nath (nose ring) with a large kemp stone centre and pearl drops, connected to the ear by a delicate gold chain. A centrepiece of the Telugu bridal look.", price: 135000, sku: "AVG-NSP-001", metal: "Gold Plated Brass", purity: "Traditional Bridal Matte", weight: "15g", stones: "Kemp, Pearls", stockQty: 15, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "nose-pins", collectionSlug: "bridal-heritage", imageUrls: [IMG.nospin2, IMG.bridal1] },
  { id: "prod-nsp-002", slug: "small-nose-pin-stud", name: "Small Nose Stud Gold", shortDesc: "Delicate small gold nose pin stud", description: "A simple and elegant small nose stud in gold-plated finish. A minimalist everyday piece suitable for single piercing.", price: 29000, sku: "AVG-NSP-002", metal: "Gold Plated Brass", purity: "Daily Comfort", weight: "0.5g", stones: "None", stockQty: 80, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "nose-pins", collectionSlug: "everyday-luxe", imageUrls: [IMG.nospin1, IMG.earrings6] },

  // JADABILLALU
  { id: "prod-jdb-001", slug: "bridal-jadabillalu-set", name: "Bridal Jadabillalu Set", shortDesc: "Full bridal jadabillalu braid ornament set", description: "A complete bridal jadabillalu set — multiple decorative gold ornaments worn along the length of the braid. Features kemp stone accents and cascading pearl tassels.", price: 420000, sku: "AVG-JDB-001", metal: "Gold Plated Brass", purity: "Matte Gold Polish", weight: "120g (Set)", stones: "Kemp, Pearl Tassels", stockQty: 6, isFeatured: true, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "jadabillalu", collectionSlug: "bridal-heritage", imageUrls: [IMG.hair1, IMG.bridal2] },
  { id: "prod-jdb-002", slug: "dance-jadabillalu", name: "Natyam Jadabillalu", shortDesc: "Dance jadabillalu for performances", description: "Lightweight jadabillalu set for classical dance performances — designed to catch stage light beautifully while remaining secure during rigorous movement.", price: 310000, sku: "AVG-JDB-002", metal: "Gold Plated Brass", purity: "Stage standard durability", weight: "80g (Set)", stones: "None", stockQty: 10, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "jadabillalu", collectionSlug: "natyam-edit", imageUrls: [IMG.hair1, IMG.bridal3] },

  // ANKLETS
  { id: "prod-ank-001", slug: "traditional-gold-payal-pair", name: "Traditional Gold Payal Pair", shortDesc: "Heavy traditional gold payal anklets", description: "A pair of traditional gold-plated payal (anklets) with small bells and intricate pattern work. The gentle chime is a classic symbol of femininity in South Indian culture.", price: 215000, sku: "AVG-ANK-001", metal: "Gold Plated Brass", purity: "Antique Gold", weight: "75g (Pair)", stones: "Bells", stockQty: 20, isFeatured: true, isLatest: false, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "anklets", collectionSlug: "temple-gold", imageUrls: [IMG.anklet1, IMG.anklet2] },
  { id: "prod-ank-002", slug: "slim-gold-anklet-pair", name: "Slim Gold Chain Anklet Pair", shortDesc: "Delicate slim gold chain anklets", description: "A pair of delicate slim gold-plated chain anklets — simple, elegant, and perfect for daily wear. Adjustable length with a secure lobster clasp.", price: 95000, sku: "AVG-ANK-002", metal: "Gold Plated Brass", purity: "High Polish", weight: "12g (Pair)", stones: "None", stockQty: 40, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "anklets", collectionSlug: "everyday-luxe", imageUrls: [IMG.anklet2, IMG.anklet1] },

  // BRIDAL COLLECTION
  { id: "prod-brd-001", slug: "complete-bridal-set-telugu", name: "Complete Telugu Bridal Set", shortDesc: "Full bridal jewellery set for Telugu weddings", description: "A magnificent complete bridal jewellery set for Telugu weddings — includes long haram, short haram, kemp choker, earrings, maang tikka, nath, vaddanam, bangles, champaswaralu, and jadabillalu. A complete bridal trousseau in one set.", price: 4800000, sku: "AVG-BRD-001", metal: "Gold Plated Brass", purity: "Grand Antique Gold Finish", weight: "900g (Complete Set)", stones: "Kemp, Ruby, Pearl, Emerald Green", stockQty: 3, isFeatured: true, isLatest: false, isTrending: false, isExclusive: true, isBridal: true, categorySlug: "bridal-collection", collectionSlug: "bridal-heritage", imageUrls: [IMG.bridal1, IMG.bridal2, IMG.bridal3] },
  { id: "prod-brd-002", slug: "bridal-kemp-necklace-set", name: "Bridal Kemp Necklace Set", shortDesc: "Complete kemp necklace and earring bridal set", description: "An opulent bridal kemp necklace set including a layered kemp choker, matching dangling earrings, and maang tikka — all in rich red kemp with pearls.", price: 750000, sku: "AVG-BRD-002", metal: "Gold Plated Brass", purity: "Exquisite Kemp Polish", weight: "180g (Set)", stones: "Kemp, Pearl", stockQty: 8, isFeatured: true, isLatest: false, isTrending: false, isExclusive: false, isBridal: true, categorySlug: "bridal-collection", collectionSlug: "bridal-heritage", imageUrls: [IMG.bridal2, IMG.necklace1] },

  // MEN'S COLLECTION
  { id: "prod-men-001", slug: "mens-gold-chain-20inch", name: "Men's Gold Chain 20 Inch", shortDesc: "Classic gold chain for men", description: "A sturdy 20-inch gold-plated chain for men in a flat Byzantine link pattern. Suitable for daily wear and for layering with a pendant.", price: 225000, sku: "AVG-MEN-001", metal: "Gold Plated Brass", purity: "High Polish", weight: "35g", stones: "None", stockQty: 25, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "mens-collection", collectionSlug: "everyday-luxe", imageUrls: [IMG.necklace7, IMG.ring4] },
  { id: "prod-men-002", slug: "mens-gold-bracelet-solid", name: "Men's Gold Bracelet", shortDesc: "Bold gold bracelet for men", description: "A bold gold-plated bracelet with a heavy chain link design and magnetic clasp. A statement piece for men who appreciate understated luxury.", price: 175000, sku: "AVG-MEN-002", metal: "Gold Plated Brass", purity: "High Polish", weight: "28g", stones: "None", stockQty: 18, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "mens-collection", collectionSlug: "everyday-luxe", imageUrls: [IMG.bracelet1, IMG.ring4] },
  { id: "prod-men-003", slug: "mens-rudraksha-bracelet", name: "Men's Rudraksha Bracelet", shortDesc: "Rudraksha and gold bead bracelet for men", description: "A powerful rudraksha bead bracelet with gold-capped spacers — both spiritually significant and stylistically bold. Popular gift for men.", price: 115000, sku: "AVG-MEN-003", metal: "Gold Plated Caps + Rudraksha", purity: "Auspicious Polish", weight: "22g", stones: "Rudraksha", stockQty: 30, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "mens-collection", imageUrls: [IMG.ring4, IMG.misc2] },

  // KIDS COLLECTION
  { id: "prod-kid-001", slug: "kids-gold-bangle-pair", name: "Children's Gold Bangle Pair", shortDesc: "Safe lightweight gold bangles for kids", description: "A pair of delicate gold-plated bangles for children aged 2–8 years. Rounded edges, lightweight, and made with hypoallergenic material. Perfect for naming ceremonies, birthdays, and festivals.", price: 85000, sku: "AVG-KID-001", metal: "Gold Plated Brass (Hypoallergenic)", purity: "Safe Gold Coat", weight: "15g (Pair)", stones: "None", stockQty: 40, isFeatured: false, isLatest: true, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "kids-collection", collectionSlug: "everyday-luxe", imageUrls: [IMG.bangle4, IMG.earrings6] },
  { id: "prod-kid-002", slug: "kids-gold-chain-pendant", name: "Children's Gold Chain with Pendant", shortDesc: "Kids gold chain with Ganesha pendant", description: "A lightweight 16-inch gold chain with a small Ganesha pendant — a traditional gift for newborns and toddlers. Safe, hypoallergenic, and beautifully presented in a gift box.", price: 110000, sku: "AVG-KID-002", metal: "Gold Plated Brass (Hypoallergenic)", purity: "Safe Gold Coat", weight: "8g", stones: "None", stockQty: 35, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "kids-collection", collectionSlug: "everyday-luxe", imageUrls: [IMG.pendant2, IMG.earrings6] },
  { id: "prod-kid-003", slug: "kids-gold-earrings-studs", name: "Children's Gold Stud Earrings", shortDesc: "Small gold stud earrings for kids", description: "Tiny, secure gold stud earrings for children — featuring a small flower motif with a screw-back clasp for safety. Available in two sizes: infant and toddler.", price: 65000, sku: "AVG-KID-003", metal: "Gold Plated Brass (Hypoallergenic)", purity: "Safe Gold Coat", weight: "2g (Pair)", stones: "None", stockQty: 50, isFeatured: false, isLatest: false, isTrending: false, isExclusive: false, isBridal: false, categorySlug: "kids-collection", imageUrls: [IMG.earrings6, IMG.earrings5] },

  // LATEST COLLECTIONS
  { id: "prod-lst-001", slug: "modern-minimalist-drops", name: "Modern Minimalist Gold Drop Necklace", shortDesc: "Chic geometric drop pendant necklace", description: "Our latest contemporary geometric gold-plated drop pendant necklace, highlighting clean lines and a satin gold finish. A stunning release for the modern woman.", price: 145000, sku: "AVG-LST-001", metal: "Gold Plated Brass", purity: "Satin Gold Finish", weight: "14g", stones: "None", stockQty: 15, isFeatured: true, isLatest: true, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "latest-collections", collectionSlug: "everyday-luxe", imageUrls: [IMG.pendant1, IMG.necklace7] },
  { id: "prod-lst-002", slug: "royal-crest-kemp-earrings", name: "Royal Crest Kemp Studs", shortDesc: "Regal kemp studs in geometric gold layout", description: "The newly released Royal Crest Kemp studs, combining traditional kemp stones with structured geometric gold outlines. Our latest design fusion.", price: 98000, sku: "AVG-LST-002", metal: "Gold Plated Brass", purity: "Premium Nakashi", weight: "10g", stones: "Kemp", stockQty: 22, isFeatured: false, isLatest: true, isTrending: true, isExclusive: false, isBridal: false, categorySlug: "latest-collections", collectionSlug: "kemp-collection", imageUrls: [IMG.earrings5, IMG.earrings2] }
];

// Map raw products to standard typed Category/Collection/Product structures
export const products: Product[] = rawProducts.map((p) => {
  const category = categories.find((c) => c.slug === p.categorySlug) || categories[0];
  const collection = collections.find((col) => col.slug === p.collectionSlug);
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    shortDesc: p.shortDesc,
    price: p.price,
    salePrice: p.salePrice,
    sku: p.sku,
    metal: p.metal,
    purity: p.purity,
    weight: p.weight,
    stones: p.stones,
    stockQty: p.stockQty,
    inStock: p.stockQty > 0,
    isFeatured: p.isFeatured,
    isLatest: p.isLatest,
    isTrending: p.isTrending,
    isExclusive: p.isExclusive,
    isBridal: p.isBridal,
    isActive: true,
    categoryId: category.id,
    category,
    collectionId: collection?.id,
    collection,
    images: makeImages(p.imageUrls),
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category.slug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export const testimonials = [
  {
    name: "Lakshmi Prasanna",
    role: "Bride",
    location: "Wanaparthy",
    content: "My bridal set from Avighna Collections was the highlight of my wedding. Every relative asked where I got it from. The jewellery looked solid gold — no one could tell it was 1 gram!",
    rating: 5,
  },
  {
    name: "Rekha Devi",
    role: "Classical Dancer",
    location: "Hyderabad",
    content: "I ordered a complete Bharatanatyam jewellery set for my arangetram. The quality is excellent and the pieces are lightweight enough to wear through a full performance. Highly recommended!",
    rating: 5,
  },
  {
    name: "Suhasini Reddy",
    role: "Festival Shopper",
    location: "Mahabubnagar",
    content: "Bought Dasara jewellery for the whole family from Avighna Collections. The variety is amazing and the prices are very fair. The bangles set I got is absolutely stunning.",
    rating: 5,
  },
];

export const navLinks = [
  { label: "Collections", href: "/collections" },
  { label: "Shop", href: "/shop" },
  { label: "Bridal", href: "/shop?category=bridal-collection" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
