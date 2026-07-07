import { PrismaClient, FaqCategory } from "@prisma/client";

const prisma = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// PLACEHOLDER IMAGE BANK — Premium jewellery from Unsplash
// ─────────────────────────────────────────────────────────────────────────────
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

async function main() {
  console.log("🌱 Starting Sprint 4 seed...");

  // ─────────────────────────────────────────────────────────────────────────
  // 1. SITE SETTINGS — Real business info
  // ─────────────────────────────────────────────────────────────────────────
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {
      brandName:    "Avighna Collections",
      tagline:      "Timeless 1 Gram Gold Jewellery for Every Celebration",
      description:  "Avighna Collections by H. Geetha Rani offers the finest 1 gram gold jewellery in Wanaparthy. Bridal sets, classical dance ornaments, daily wear, and festive collections — all at honest prices.",
      phone:        "7013004127",
      whatsapp:     "7013004127",
      email:        "avighnacollections1@gmail.com",
      addressLine1: "Beside More Supermarket, Opp RR Complex",
      addressLine2: "Polytechnic Road",
      city:         "Wanaparthy",
      state:        "Telangana",
      pincode:      "509103",
      country:      "India",
      defaultMetaTitle: "Avighna Collections | Premium 1 Gram Gold Jewellery — Wanaparthy",
      defaultMetaDesc:  "Shop exquisite 1 gram gold bridal sets, earrings, necklaces, bangles & more at Avighna Collections, Wanaparthy. Authentic hallmarked jewellery by H. Geetha Rani.",
    },
    create: {
      id:           "singleton",
      brandName:    "Avighna Collections",
      tagline:      "Timeless 1 Gram Gold Jewellery for Every Celebration",
      description:  "Avighna Collections by H. Geetha Rani offers the finest 1 gram gold jewellery in Wanaparthy. Bridal sets, classical dance ornaments, daily wear, and festive collections — all at honest prices.",
      phone:        "7013004127",
      whatsapp:     "7013004127",
      email:        "avighnacollections1@gmail.com",
      addressLine1: "Beside More Supermarket, Opp RR Complex",
      addressLine2: "Polytechnic Road",
      city:         "Wanaparthy",
      state:        "Telangana",
      pincode:      "509103",
      country:      "India",
      defaultMetaTitle: "Avighna Collections | Premium 1 Gram Gold Jewellery — Wanaparthy",
      defaultMetaDesc:  "Shop exquisite 1 gram gold bridal sets, earrings, necklaces, bangles & more at Avighna Collections, Wanaparthy. Authentic hallmarked jewellery by H. Geetha Rani.",
    },
  });
  console.log("✓ SiteSettings");

  // ─────────────────────────────────────────────────────────────────────────
  // 2. BOUTIQUE INFO — Real Wanaparthy store
  // ─────────────────────────────────────────────────────────────────────────
  await prisma.boutiqueInfo.upsert({
    where: { id: "wanaparthy-flagship" },
    update: {
      name:          "Avighna Collections",
      addressLine1:  "Beside More Supermarket, Opp RR Complex",
      addressLine2:  "Polytechnic Road",
      landmark:      "Near More Supermarket",
      city:          "Wanaparthy",
      state:         "Telangana",
      pincode:       "509103",
      phone:         "7013004127",
      whatsapp:      "7013004127",
      email:         "avighnacollections1@gmail.com",
      googleMapsUrl: "https://maps.google.com/?q=Wanaparthy+Telangana+509103",
      mondayHours:   "10:00 AM – 9:00 PM",
      tuesdayHours:  "10:00 AM – 9:00 PM",
      wednesdayHours:"10:00 AM – 9:00 PM",
      thursdayHours: "10:00 AM – 9:00 PM",
      fridayHours:   "10:00 AM – 9:00 PM",
      saturdayHours: "10:00 AM – 9:00 PM",
      sundayHours:   "10:00 AM – 9:00 PM",
      hoursNote:     "Open all days including public holidays",
      isPrimary:     true,
    },
    create: {
      id:            "wanaparthy-flagship",
      name:          "Avighna Collections",
      addressLine1:  "Beside More Supermarket, Opp RR Complex",
      addressLine2:  "Polytechnic Road",
      landmark:      "Near More Supermarket",
      city:          "Wanaparthy",
      state:         "Telangana",
      pincode:       "509103",
      phone:         "7013004127",
      whatsapp:      "7013004127",
      email:         "avighnacollections1@gmail.com",
      googleMapsUrl: "https://maps.google.com/?q=Wanaparthy+Telangana+509103",
      mondayHours:   "10:00 AM – 9:00 PM",
      tuesdayHours:  "10:00 AM – 9:00 PM",
      wednesdayHours:"10:00 AM – 9:00 PM",
      thursdayHours: "10:00 AM – 9:00 PM",
      fridayHours:   "10:00 AM – 9:00 PM",
      saturdayHours: "10:00 AM – 9:00 PM",
      sundayHours:   "10:00 AM – 9:00 PM",
      hoursNote:     "Open all days including public holidays",
      isPrimary:     true,
    },
  });
  console.log("✓ BoutiqueInfo");

  // ─────────────────────────────────────────────────────────────────────────
  // 3. ANNOUNCEMENT BAR
  // ─────────────────────────────────────────────────────────────────────────
  const announcements = [
    { id: "ann-1", text: "✨ Free delivery on orders above ₹999 — Shop Now", link: "/shop", linkLabel: "Shop Now", sortOrder: 1 },
    { id: "ann-2", text: "💍 Bridal Collection 2025 — Book Your Private Styling Session", link: "/bridal-salon", linkLabel: "Book Now", sortOrder: 2 },
    { id: "ann-3", text: "📞 WhatsApp Us for Custom Orders: 7013004127", link: "https://wa.me/917013004127", linkLabel: "Chat Now", sortOrder: 3 },
  ];
  for (const ann of announcements) {
    await prisma.announcementBar.upsert({ where: { id: ann.id }, update: ann, create: ann });
  }
  console.log("✓ AnnouncementBars");

  // ─────────────────────────────────────────────────────────────────────────
  // 4. HERO SLIDES
  // ─────────────────────────────────────────────────────────────────────────
  const heroSlides = [
    {
      id: "hero-1",
      eyebrow: "Avighna Collections — Wanaparthy",
      title: "Jewellery That Tells Your Story",
      subtitle: "Handcrafted 1 gram gold ornaments for brides, celebrations & everyday elegance.",
      ctaText: "Explore Bridal",
      ctaUrl: "/bridal-salon",
      secondaryCtaText: "Shop All",
      secondaryCtaUrl: "/shop",
      imageUrl: IMG.bridal1,
      imageAlt: "Bridal gold jewellery set",
      sortOrder: 1,
    },
    {
      id: "hero-2",
      eyebrow: "Temple Gold Collection",
      title: "Sacred Craftsmanship, Timeless Beauty",
      subtitle: "Inspired by the divine art of South Indian temples — wearable heritage.",
      ctaText: "View Collection",
      ctaUrl: "/collections",
      imageUrl: IMG.necklace2,
      imageAlt: "Temple gold necklace",
      sortOrder: 2,
    },
  ];
  for (const slide of heroSlides) {
    await prisma.heroSlide.upsert({ where: { id: slide.id }, update: slide, create: slide });
  }
  console.log("✓ HeroSlides");

  // ─────────────────────────────────────────────────────────────────────────
  // 5. BRAND STORY SECTIONS
  // ─────────────────────────────────────────────────────────────────────────
  const brandSections = [
    {
      id: "bs-craft",
      sectionKey: "craft",
      heading: "1 Gram Gold — Crafted to Last a Lifetime",
      subheading: "Our Artisan Promise",
      body: "Every piece at Avighna Collections is crafted using premium copper-brass alloy cores electroformed with high-purity gold coating. The result is jewellery that looks, feels, and shines like solid gold — at a fraction of the cost. We partner with master artisans who have practised their craft for generations.",
      imageUrl: IMG.necklace3,
      ctaText: "Learn Our Process",
      ctaUrl: "/about",
      sortOrder: 1,
    },
    {
      id: "bs-heritage",
      sectionKey: "heritage",
      heading: "Rooted in Telugu Tradition",
      subheading: "A Heritage of Beauty",
      body: "Wanaparthy has always been a city of celebration. From Dasara festivals to grand weddings, jewellery is the centrepiece of every milestone moment. Avighna Collections honours this heritage by bringing the finest ornamental traditions — temple motifs, classical dance pieces, bridal adornments — under one roof.",
      imageUrl: IMG.bridal2,
      ctaText: "Explore Our Story",
      ctaUrl: "/about",
      sortOrder: 2,
    },
  ];
  for (const section of brandSections) {
    await prisma.brandStory.upsert({ where: { sectionKey: section.sectionKey }, update: section, create: { ...section } });
  }
  console.log("✓ BrandStory");

  // ─────────────────────────────────────────────────────────────────────────
  // 6. EDITORIAL GALLERY
  // ─────────────────────────────────────────────────────────────────────────
  const gallery = [
    { id: "gal-1", imageUrl: IMG.bridal1, altText: "Bridal gold set", caption: "The Bridal Edit", colSpan: 2, sortOrder: 1 },
    { id: "gal-2", imageUrl: IMG.earrings1, altText: "Temple gold earrings", caption: "Temple Gold", colSpan: 1, sortOrder: 2 },
    { id: "gal-3", imageUrl: IMG.necklace1, altText: "Kemp necklace", caption: "Kemp Heritage", colSpan: 1, sortOrder: 3 },
    { id: "gal-4", imageUrl: IMG.bangle1, altText: "Gold bangles", caption: "Festival Bangles", colSpan: 1, sortOrder: 4 },
    { id: "gal-5", imageUrl: IMG.pendant1, altText: "Lakshmi pendant", caption: "Divine Pendants", colSpan: 1, sortOrder: 5 },
    { id: "gal-6", imageUrl: IMG.bridal3, altText: "Bridal maang tikka", caption: "Bridal Accents", colSpan: 2, sortOrder: 6 },
  ];
  for (const item of gallery) {
    await prisma.editorialGallery.upsert({ where: { id: item.id }, update: item, create: item });
  }
  console.log("✓ EditorialGallery");

  // ─────────────────────────────────────────────────────────────────────────
  // 7. TESTIMONIALS
  // ─────────────────────────────────────────────────────────────────────────
  const testimonials = [
    { id: "test-1", name: "Lakshmi Prasanna", role: "Bride", location: "Wanaparthy", content: "My bridal set from Avighna Collections was the highlight of my wedding. Every relative asked where I got it from. The jewellery looked solid gold — no one could tell it was 1 gram!", rating: 5, isFeatured: true, sortOrder: 1 },
    { id: "test-2", name: "Rekha Devi", role: "Classical Dancer", location: "Hyderabad", content: "I ordered a complete Bharatanatyam jewellery set for my arangetram. The quality is excellent and the pieces are lightweight enough to wear through a full performance. Highly recommended!", rating: 5, isFeatured: true, sortOrder: 2 },
    { id: "test-3", name: "Suhasini Reddy", role: "Festival Shopper", location: "Mahabubnagar", content: "Bought Dasara jewellery for the whole family from Avighna Collections. The variety is amazing and the prices are very fair. The bangles set I got is absolutely stunning.", rating: 5, isFeatured: true, sortOrder: 3 },
    { id: "test-4", name: "Anitha Kumari", role: "Mother of Bride", location: "Wanaparthy", content: "Geetha Rani garu personally helped us choose every piece for my daughter's wedding. Her knowledge and patience made the whole experience so special. We are loyal customers now.", rating: 5, isFeatured: false, sortOrder: 4 },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.upsert({ where: { id: t.id }, update: t, create: t });
  }
  console.log("✓ Testimonials");

  // ─────────────────────────────────────────────────────────────────────────
  // 8. FAQ ENTRIES
  // ─────────────────────────────────────────────────────────────────────────
  const faqs = [
    // Material
    { id: "faq-m1", question: "What is 1 gram gold jewellery?", answer: "1 gram gold jewellery uses a premium brass-copper alloy core that is electroformed with high-purity 22K or 18K gold coating. The result is jewellery that is visually and tactilely indistinguishable from solid gold at a much more accessible price point.", category: FaqCategory.MATERIAL_COMPOSITION, sortOrder: 1 },
    { id: "faq-m2", question: "Is 1 gram gold jewellery safe for skin?", answer: "Yes. Our jewellery is nickel-free, lead-free, and hypoallergenic. The gold-plated surface ensures comfortable, irritation-free wear for all skin types including sensitive skin.", category: FaqCategory.MATERIAL_COMPOSITION, sortOrder: 2 },
    { id: "faq-m3", question: "How long does the gold finish last?", answer: "With proper care, our gold finish lasts 2–5 years of regular wear. Keeping pieces away from water, perfumes, and chemicals significantly extends their life. We also offer re-polishing services at our store.", category: FaqCategory.MATERIAL_COMPOSITION, sortOrder: 3 },
    // Care
    { id: "faq-c1", question: "How should I care for my jewellery?", answer: "Store each piece separately in the velvet pouch or box provided. Avoid direct contact with water, perfumes, hairspray, and lotions. Wipe gently with a soft dry cloth after every use. Remove jewellery before bathing, swimming, or exercising.", category: FaqCategory.CARE_GUARANTEE, sortOrder: 1 },
    { id: "faq-c2", question: "Can I clean my jewellery at home?", answer: "Yes. Use a soft, dry microfiber cloth to gently wipe the surface. For deeper cleaning, bring it to our store. Avoid ultrasonic cleaners, harsh chemicals, or abrasive cloths as they can damage the gold coating.", category: FaqCategory.CARE_GUARANTEE, sortOrder: 2 },
    { id: "faq-c3", question: "Do you offer re-polishing or repair services?", answer: "Yes. Visit our Wanaparthy store for re-polishing, repair, and restoration services. We can restore most pieces to near-original condition. Contact us on 7013004127 before visiting.", category: FaqCategory.CARE_GUARANTEE, sortOrder: 3 },
    // Shipping
    { id: "faq-s1", question: "Do you deliver outside Wanaparthy?", answer: "Yes. We ship across India. Standard delivery takes 4–7 business days. Express delivery (1–2 days) is available for select PIN codes at an additional charge.", category: FaqCategory.SHIPPING_SECURITY, sortOrder: 1 },
    { id: "faq-s2", question: "Is the packaging secure?", answer: "Every order is packed in our signature jewellery box with foam inserts and wrapped securely for transit. Fragile pieces are double-boxed. All shipments are insured and require signature-on-delivery.", category: FaqCategory.SHIPPING_SECURITY, sortOrder: 2 },
    { id: "faq-s3", question: "How can I track my order?", answer: "Once shipped, you will receive a tracking link via SMS and WhatsApp. You can also WhatsApp us on 7013004127 for real-time updates on your order.", category: FaqCategory.SHIPPING_SECURITY, sortOrder: 3 },
    // Orders & Returns
    { id: "faq-o1", question: "Can I return or exchange a product?", answer: "We accept returns within 7 days for unused items in original packaging. Exchange is accepted within 15 days. Custom orders and bridal sets are non-returnable. Contact us on WhatsApp or email to initiate a return.", category: FaqCategory.ORDERS_RETURNS, sortOrder: 1 },
    { id: "faq-o2", question: "Can I place a custom or bulk order?", answer: "Absolutely. We welcome custom orders for weddings, festivals, and institutional buyers. WhatsApp us on 7013004127 with your requirements and we will provide a personalised quote within 24 hours.", category: FaqCategory.ORDERS_RETURNS, sortOrder: 2 },
    // Bridal
    { id: "faq-b1", question: "Do you provide bridal sets for the full wedding trousseau?", answer: "Yes. We specialise in complete bridal trousseau sets including necklaces, harams, earrings, bangles, maang tikka, nath, haar, vaddanam, and more. Visit our store for a private bridal consultation with H. Geetha Rani.", category: FaqCategory.BRIDAL, sortOrder: 1 },
    { id: "faq-b2", question: "Can I book a bridal styling appointment?", answer: "Yes. Call or WhatsApp us on 7013004127 to book a private bridal session at our Wanaparthy boutique. We recommend booking at least 2–3 weeks before your wedding date.", category: FaqCategory.BRIDAL, sortOrder: 2 },
    { id: "faq-b3", question: "Do you offer classical dance jewellery sets?", answer: "Yes. We stock complete Bharatanatyam, Kuchipudi, and other classical dance jewellery sets — lightweight, durable, and stage-ready. Ideal for arangetrams, competitions, and performances.", category: FaqCategory.BRIDAL, sortOrder: 3 },
  ];
  for (const faq of faqs) {
    await prisma.faqEntry.upsert({ where: { id: faq.id }, update: faq, create: faq });
  }
  console.log("✓ FaqEntries");

  // ─────────────────────────────────────────────────────────────────────────
  // 9. COLLECTIONS
  // ─────────────────────────────────────────────────────────────────────────
  const collections = [
    { id: "col-bridal-heritage",   name: "Bridal Heritage",    slug: "bridal-heritage",    tagline: "For Your Most Sacred Day",   description: "Complete bridal jewellery sets inspired by South Indian royal traditions.", coverImage: IMG.bridal1, isFeatured: true, sortOrder: 1 },
    { id: "col-temple-gold",       name: "Temple Gold",        slug: "temple-gold",         tagline: "Divine Craftsmanship",        description: "Sacred temple motifs crafted in premium 1 gram gold — timeless devotional beauty.", coverImage: IMG.necklace2, isFeatured: true, sortOrder: 2 },
    { id: "col-kemp-collection",   name: "Kemp Collection",    slug: "kemp-collection",     tagline: "The Colour of Celebrations",  description: "Vibrant Kemp stone jewellery in bold reds and golds for festive occasions.", coverImage: IMG.earrings1, isFeatured: true, sortOrder: 3 },
    { id: "col-everyday-luxe",     name: "Everyday Luxe",      slug: "everyday-luxe",       tagline: "Effortless Elegance Daily",   description: "Lightweight, versatile pieces designed for daily wear — office to evenings.", coverImage: IMG.pendant1, isFeatured: false, sortOrder: 4 },
    { id: "col-classical-dance",   name: "Natyam Edit",        slug: "natyam-edit",         tagline: "Dance with Radiance",         description: "Professional classical dance jewellery for Bharatanatyam, Kuchipudi & more.", coverImage: IMG.bridal3, isFeatured: false, sortOrder: 5 },
  ];
  for (const col of collections) {
    await prisma.collection.upsert({ where: { slug: col.slug }, update: col, create: col });
  }
  console.log("✓ Collections");

  // ─────────────────────────────────────────────────────────────────────────
  // 10. CATEGORIES — All 29 real Avighna client categories
  // ─────────────────────────────────────────────────────────────────────────
  const categoryData = [
    { id: "cat-earrings",         name: "Earrings",              slug: "earrings",              description: "From subtle studs to dramatic jhumkas and chandeliers", image: IMG.earrings1, sortOrder: 1 },
    { id: "cat-necklace",         name: "Necklace",              slug: "necklace",              description: "Statement neckpieces in temple, kemp, and modern styles", image: IMG.necklace1, sortOrder: 2 },
    { id: "cat-long-haram",       name: "Long Haram",            slug: "long-haram",            description: "Traditional long necklaces for weddings and festivals", image: IMG.necklace2, sortOrder: 3 },
    { id: "cat-short-haram",      name: "Short Haram",           slug: "short-haram",           description: "Elegant short harams for everyday and occasional wear", image: IMG.necklace3, sortOrder: 4 },
    { id: "cat-bangles",          name: "Bangles",               slug: "bangles",               description: "Traditional and designer bangles for every occasion", image: IMG.bangle1, sortOrder: 5 },
    { id: "cat-glass-bangles",    name: "Glass Bangles",         slug: "glass-bangles",         description: "Colourful glass bangles with gold accents", image: IMG.bangle2, sortOrder: 6 },
    { id: "cat-thali-chains",     name: "Thali Chains",          slug: "thali-chains",          description: "Mangalsutra and thali chains for married women", image: IMG.necklace1, sortOrder: 7 },
    { id: "cat-panchaloham",      name: "Panchaloham Jewellery", slug: "panchaloham-jewellery", description: "Five-metal alloy jewellery for auspicious occasions", image: IMG.bangle3, sortOrder: 8 },
    { id: "cat-vaddanam",         name: "Vaddanam",              slug: "vaddanam",              description: "Ornate waist belts — essential bridal accessory", image: IMG.bridal1, sortOrder: 9 },
    { id: "cat-champaswaralu",    name: "Champaswaralu",         slug: "champaswaralu",         description: "Traditional hair ornaments for brides and dancers", image: IMG.hair1, sortOrder: 10 },
    { id: "cat-martilu",          name: "Martilu",               slug: "martilu",               description: "Forehead ornaments for brides and classical dancers", image: IMG.hair1, sortOrder: 11 },
    { id: "cat-hair-accessories", name: "Hair Accessories",      slug: "hair-accessories",      description: "Hairpins, clips, and traditional hair ornaments", image: IMG.hair1, sortOrder: 12 },
    { id: "cat-classical-dance",  name: "Classical Dance Jewellery", slug: "classical-dance-jewellery", description: "Complete sets for Bharatanatyam, Kuchipudi & classical arts", image: IMG.bridal3, sortOrder: 13 },
    { id: "cat-beauty-products",  name: "Beauty Products",       slug: "beauty-products",       description: "Kumkum, sindoor, and jewellery care accessories", image: IMG.misc2, sortOrder: 14 },
    { id: "cat-pendants",         name: "Pendants",              slug: "pendants",              description: "Lakshmi, Ganesh, and temple motif pendants", image: IMG.pendant1, sortOrder: 15 },
    { id: "cat-bracelets",        name: "Bracelets",             slug: "bracelets",             description: "Delicate and statement bracelets for every style", image: IMG.bracelet1, sortOrder: 16 },
    { id: "cat-long-black-beads", name: "Long Black Beads",      slug: "long-black-beads",      description: "Traditional black bead chains — the Telugu mangalsutra", image: IMG.necklace1, sortOrder: 17 },
    { id: "cat-short-black-beads",name: "Short Black Beads",     slug: "short-black-beads",     description: "Short black bead chains for daily wear", image: IMG.necklace3, sortOrder: 18 },
    { id: "cat-chandraharam",     name: "Chandraharam Chains",   slug: "chandraharam-chains",   description: "Traditional chandraharam moon-shaped chains", image: IMG.necklace2, sortOrder: 19 },
    { id: "cat-beads-jewellery",  name: "Beads Jewellery",       slug: "beads-jewellery",       description: "Crystal, rudraksha, and decorative bead jewellery", image: IMG.ring3, sortOrder: 20 },
    { id: "cat-fancy-items",      name: "Fancy Items",           slug: "fancy-items",           description: "Trendy and fashion-forward jewellery pieces", image: IMG.earrings7, sortOrder: 21 },
    { id: "cat-finger-rings",     name: "Finger Rings",          slug: "finger-rings",          description: "Traditional and designer rings for all occasions", image: IMG.ring1, sortOrder: 22 },
    { id: "cat-papitabilla",      name: "Papitabilla",           slug: "papitabilla",           description: "Traditional Telugu neck ornament for brides", image: IMG.bridal2, sortOrder: 23 },
    { id: "cat-nose-pins",        name: "Nose Pins",             slug: "nose-pins",             description: "Elegant nose pins and naths in various styles", image: IMG.nospin1, sortOrder: 24 },
    { id: "cat-jadabillalu",      name: "Jadabillalu",           slug: "jadabillalu",           description: "Ornate braid decorations for brides and dancers", image: IMG.hair1, sortOrder: 25 },
    { id: "cat-anklets",          name: "Anklets",               slug: "anklets",               description: "Traditional payal and designer anklets", image: IMG.anklet1, sortOrder: 26 },
    { id: "cat-bridal",           name: "Bridal Collection",     slug: "bridal-collection",     description: "Complete bridal jewellery sets for your most sacred day", image: IMG.bridal1, sortOrder: 27 },
    { id: "cat-mens",             name: "Men's Collection",      slug: "mens-collection",       description: "Chains, rings, and bracelets for men", image: IMG.ring2, sortOrder: 28 },
    { id: "cat-kids",             name: "Kids Collection",       slug: "kids-collection",       description: "Safe, lightweight jewellery for children", image: IMG.earrings6, sortOrder: 29 },
  ];

  for (const cat of categoryData) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: cat, create: cat });
  }
  console.log("✓ Categories (29)");

  // ─────────────────────────────────────────────────────────────────────────
  // 11. PRODUCTS — 2–3 per category
  // ─────────────────────────────────────────────────────────────────────────
  const colBridal   = await prisma.collection.findUnique({ where: { slug: "bridal-heritage" } });
  const colTemple   = await prisma.collection.findUnique({ where: { slug: "temple-gold" } });
  const colKemp     = await prisma.collection.findUnique({ where: { slug: "kemp-collection" } });
  const colEveryday = await prisma.collection.findUnique({ where: { slug: "everyday-luxe" } });
  const colDance    = await prisma.collection.findUnique({ where: { slug: "natyam-edit" } });

  // Helper: create a product with images
  const upsertProduct = async (data: {
    id: string; slug: string; name: string; description: string; shortDesc: string;
    price: number; salePrice?: number; sku: string; material: string; metal: string;
    purity?: string; color?: string; weight?: string; stones?: string;
    stockQty: number; isFeatured?: boolean; isLatest?: boolean; isTrending?: boolean;
    isBridal?: boolean; isExclusive?: boolean;
    categoryId: string; collectionId?: string;
    images: { url: string; altText: string; isPrimary?: boolean }[];
  }) => {
    const { images, id, slug, ...rest } = data;
    await prisma.product.upsert({
      where: { slug },
      update: { ...rest, slug, inStock: rest.stockQty > 0 },
      create: { id, slug, ...rest, inStock: rest.stockQty > 0 },
    });
    const product = await prisma.product.findUnique({ where: { slug: data.slug } });
    if (!product) return;
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: { productId: product.id, url: images[i].url, altText: images[i].altText, position: i, isPrimary: i === 0 },
      });
    }
  };

  const products = [
    // ── EARRINGS ──────────────────────────────────────────────────────────
    { id: "prod-ear-001", slug: "temple-kemp-jhumka-earrings", name: "Temple Kemp Jhumka", shortDesc: "Classic South Indian jhumka with kemp stones", description: "A timeless pair of temple-style jhumka earrings adorned with vibrant kemp stones and pearl drops. Lightweight enough for all-day wear.", price: 125000, sku: "AVG-EAR-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", weight: "18g", stones: "Kemp, Pearls", stockQty: 25, isFeatured: true, isLatest: true, categoryId: "cat-earrings", collectionId: colKemp?.id, images: [{ url: IMG.earrings1, altText: "Temple kemp jhumka earrings" }, { url: IMG.earrings2, altText: "Jhumka side view" }] },
    { id: "prod-ear-002", slug: "antique-lakshmi-earrings", name: "Antique Lakshmi Drop Earrings", shortDesc: "Antique finish Lakshmi motif earrings", description: "Exquisite antique gold-finish earrings featuring Goddess Lakshmi motif with meenakari work and ruby accents. Perfect for festivals and weddings.", price: 185000, sku: "AVG-EAR-002", material: "1 Gram Gold", metal: "Antique Gold Plated", color: "Antique Gold, Red", weight: "22g", stones: "Ruby, Kemp", stockQty: 18, isTrending: true, categoryId: "cat-earrings", collectionId: colTemple?.id, images: [{ url: IMG.earrings3, altText: "Antique Lakshmi earrings" }, { url: IMG.earrings4, altText: "Earrings detail view" }] },
    { id: "prod-ear-003", slug: "pearl-chandbali-earrings", name: "Pearl Chandbali Earrings", shortDesc: "Elegant chandbali with pearl drops", description: "Gorgeous chandbali-style earrings with cascading fresh water pearl drops and a delicate gold filigree frame. Ideal for saree occasions.", price: 145000, salePrice: 119000, sku: "AVG-EAR-003", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, White", weight: "15g", stones: "Fresh Water Pearls", stockQty: 30, isLatest: true, categoryId: "cat-earrings", collectionId: colEveryday?.id, images: [{ url: IMG.earrings7, altText: "Pearl chandbali earrings" }, { url: IMG.earrings5, altText: "Chandbali close up" }] },

    // ── NECKLACE ──────────────────────────────────────────────────────────
    { id: "prod-nkl-001", slug: "kemp-choker-necklace", name: "Royal Kemp Choker", shortDesc: "Bold kemp choker for weddings and festivals", description: "A statement choker necklace crafted in premium 1 gram gold, adorned with vibrant kemp stones arranged in a traditional South Indian pattern. The perfect centrepiece for any bridal or festive ensemble.", price: 320000, sku: "AVG-NKL-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red, Green", weight: "65g", stones: "Kemp, Emerald Green Glass", stockQty: 12, isFeatured: true, isTrending: true, categoryId: "cat-necklace", collectionId: colKemp?.id, images: [{ url: IMG.necklace1, altText: "Royal kemp choker necklace" }, { url: IMG.necklace6, altText: "Choker detail" }] },
    { id: "prod-nkl-002", slug: "temple-lakshmi-necklace", name: "Temple Lakshmi Necklace", shortDesc: "Classic temple Lakshmi necklace set", description: "A stunning temple-style necklace featuring an intricate Lakshmi pendant with rubies and pearls. Paired with matching earrings, this set is ideal for Bharatanatyam or bridal wear.", price: 275000, sku: "AVG-NKL-002", material: "1 Gram Gold", metal: "Gold Plated Copper", color: "Gold, Red", weight: "48g", stones: "Ruby, Pearls", stockQty: 20, isFeatured: true, categoryId: "cat-necklace", collectionId: colTemple?.id, images: [{ url: IMG.necklace2, altText: "Temple Lakshmi necklace" }, { url: IMG.necklace3, altText: "Necklace detail view" }] },
    { id: "prod-nkl-003", slug: "antique-coin-necklace", name: "Antique Lakshmi Coin Necklace", shortDesc: "Antique coin-style temple necklace", description: "A gorgeous antique-finish necklace featuring Lakshmi coins in a traditional south Indian style. Perfect for festive occasions and classical performances.", price: 215000, salePrice: 189000, sku: "AVG-NKL-003", material: "1 Gram Gold", metal: "Antique Gold Plated", color: "Antique Gold", weight: "42g", stones: "None", stockQty: 15, categoryId: "cat-necklace", collectionId: colTemple?.id, images: [{ url: IMG.necklace5, altText: "Antique coin necklace" }, { url: IMG.necklace7, altText: "Coin necklace close up" }] },

    // ── LONG HARAM ────────────────────────────────────────────────────────
    { id: "prod-lhr-001", slug: "bridal-long-kemp-haram", name: "Bridal Kemp Long Haram", shortDesc: "Opulent long kemp haram for brides", description: "An opulent long haram necklace stretching to the waist, set with layered kemp stones in a traditional South Indian bridal pattern. A centrepiece for any grand Telugu wedding.", price: 680000, sku: "AVG-LHR-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red, Green", weight: "120g", stones: "Kemp, Ruby, Pearl", stockQty: 8, isFeatured: true, isBridal: true, categoryId: "cat-long-haram", collectionId: colBridal?.id, images: [{ url: IMG.haram1, altText: "Bridal kemp long haram" }, { url: IMG.haram4, altText: "Long haram detail" }] },
    { id: "prod-lhr-002", slug: "temple-long-haram-gold", name: "Temple Gold Long Haram", shortDesc: "Traditional temple-style long haram", description: "A classical long haram in pure temple gold style, featuring lotus and Lakshmi motifs repeated in a hand-crafted pattern. Ideal for Kuchipudi and Bharatanatyam.", price: 595000, sku: "AVG-LHR-002", material: "1 Gram Gold", metal: "Gold Plated Copper", color: "Gold", weight: "95g", stones: "None", stockQty: 10, isBridal: true, categoryId: "cat-long-haram", collectionId: colDance?.id, images: [{ url: IMG.haram2, altText: "Temple long haram gold" }, { url: IMG.necklace2, altText: "Long haram full view" }] },

    // ── SHORT HARAM ───────────────────────────────────────────────────────
    { id: "prod-shr-001", slug: "kemp-short-haram-necklace", name: "Kemp Layered Short Haram", shortDesc: "Multi-layer kemp short haram necklace", description: "A beautifully layered short haram with multiple rows of kemp stones set in gold-plated frames. Versatile for both wedding and festival occasions.", price: 345000, sku: "AVG-SHR-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", weight: "58g", stones: "Kemp, Pearls", stockQty: 14, isTrending: true, categoryId: "cat-short-haram", collectionId: colKemp?.id, images: [{ url: IMG.haram3, altText: "Kemp short haram" }, { url: IMG.necklace6, altText: "Short haram layered view" }] },
    { id: "prod-shr-002", slug: "antique-short-haram", name: "Antique Padakkam Short Haram", shortDesc: "Antique gold padakkam pendant haram", description: "An antique-finish short haram featuring a large padakkam (central medallion) pendant surrounded by traditional floral motifs and polki-finish stones.", price: 420000, salePrice: 379000, sku: "AVG-SHR-002", material: "1 Gram Gold", metal: "Antique Gold Plated", color: "Antique Gold", weight: "62g", stones: "Polki Finish, Kemp", stockQty: 10, isFeatured: true, categoryId: "cat-short-haram", collectionId: colTemple?.id, images: [{ url: IMG.necklace3, altText: "Antique padakkam short haram" }, { url: IMG.necklace2, altText: "Haram detail" }] },

    // ── BANGLES ───────────────────────────────────────────────────────────
    { id: "prod-bng-001", slug: "temple-gold-bangles-set", name: "Temple Gold Bangles Set of 4", shortDesc: "Traditional temple motif gold bangles", description: "A set of four elegant temple-style bangles in premium 1 gram gold, featuring Lakshmi and lotus motifs with intricate nakashi work. A timeless addition to any jewellery wardrobe.", price: 240000, sku: "AVG-BNG-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "85g (Set of 4)", stockQty: 20, isFeatured: true, isTrending: true, categoryId: "cat-bangles", collectionId: colTemple?.id, images: [{ url: IMG.bangle1, altText: "Temple gold bangles set of 4" }, { url: IMG.bangle2, altText: "Bangles detail" }] },
    { id: "prod-bng-002", slug: "kemp-stone-designer-bangles", name: "Kemp Stone Designer Bangles", shortDesc: "Wide kemp stone designer bangles pair", description: "A striking pair of wide designer bangles adorned with kemp stones in a floral pattern. Statement pieces for weddings, engagements, and cultural events.", price: 195000, sku: "AVG-BNG-002", material: "1 Gram Gold", metal: "Gold Plated Copper", color: "Gold, Red", weight: "65g (Pair)", stones: "Kemp", stockQty: 18, categoryId: "cat-bangles", collectionId: colKemp?.id, images: [{ url: IMG.bangle3, altText: "Kemp designer bangles" }, { url: IMG.bangle2, altText: "Bangles pair view" }] },
    { id: "prod-bng-003", slug: "plain-gold-bangles-set6", name: "Plain Gold Bangles Set of 6", shortDesc: "Slim plain gold bangles for daily wear", description: "A set of six slim plain gold-plated bangles — lightweight, stackable, and perfect for daily wear. Elegant simplicity that complements any outfit.", price: 115000, sku: "AVG-BNG-003", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "45g (Set of 6)", stockQty: 35, isLatest: true, categoryId: "cat-bangles", collectionId: colEveryday?.id, images: [{ url: IMG.bangle4, altText: "Plain gold bangles set of 6" }, { url: IMG.ring3, altText: "Bangles stacked view" }] },

    // ── GLASS BANGLES ─────────────────────────────────────────────────────
    { id: "prod-gbng-001", slug: "gold-thread-glass-bangles-12", name: "Gold Thread Glass Bangles (Set of 12)", shortDesc: "Traditional glass bangles with gold thread", description: "A vibrant set of 12 glass bangles woven with gold thread — a classic Telugu bridal tradition. Available in Navratri colours and bridal red.", price: 45000, sku: "AVG-GBN-001", material: "Glass, Gold Thread", metal: "Glass with Gold Accent", color: "Red, Gold", weight: "120g (Set of 12)", stockQty: 50, isLatest: true, categoryId: "cat-glass-bangles", collectionId: colBridal?.id, images: [{ url: IMG.bangle6, altText: "Gold thread glass bangles" }, { url: IMG.bangle5, altText: "Glass bangles set" }] },
    { id: "prod-gbng-002", slug: "lac-glass-bangles-festival", name: "Lac Glass Bangles — Festival Set", shortDesc: "Lac-coated glass bangles with stone inlay", description: "Colourful lac glass bangles with intricate stone inlay work — traditional craftsmanship from Hyderabad. Perfect for Navratri, Sankranti, and festivals.", price: 65000, salePrice: 55000, sku: "AVG-GBN-002", material: "Lac, Glass", metal: "Lac Coated Glass", color: "Multicolor", weight: "150g (Set of 12)", stockQty: 40, categoryId: "cat-glass-bangles", collectionId: colKemp?.id, images: [{ url: IMG.bangle5, altText: "Lac glass festival bangles" }, { url: IMG.bangle6, altText: "Festival bangles close up" }] },

    // ── THALI CHAINS ──────────────────────────────────────────────────────
    { id: "prod-thl-001", slug: "traditional-thali-gold-chain", name: "Traditional Thali Chain", shortDesc: "24-inch traditional gold thali chain", description: "A 24-inch traditional thali chain in premium gold plating, designed to hold the sacred thali (mangalsutra pendant). Durable and elegant for daily wear by married women.", price: 135000, sku: "AVG-THL-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "25g", stockQty: 30, categoryId: "cat-thali-chains", collectionId: colEveryday?.id, images: [{ url: IMG.necklace7, altText: "Traditional thali gold chain" }, { url: IMG.necklace4, altText: "Thali chain detail" }] },
    { id: "prod-thl-002", slug: "black-gold-thali-chain", name: "Black Bead Thali Chain with Gold Caps", shortDesc: "Black bead and gold cap thali chain", description: "A traditional Telugu thali chain featuring alternating black beads and gold-capped beads — the classic South Indian mangalsutra design. 24-inch length.", price: 120000, sku: "AVG-THL-002", material: "1 Gram Gold, Black Beads", metal: "Gold Plated with Black Beads", color: "Gold, Black", weight: "22g", stockQty: 28, categoryId: "cat-thali-chains", collectionId: colEveryday?.id, images: [{ url: IMG.necklace7, altText: "Black gold thali chain" }, { url: IMG.necklace6, altText: "Thali chain close up" }] },

    // ── PANCHALOHAM ───────────────────────────────────────────────────────
    { id: "prod-pnc-001", slug: "panchaloham-bangles-set", name: "Panchaloham Bangles Set of 6", shortDesc: "Sacred five-metal alloy bangles", description: "A set of six panchaloham (five-metal alloy) bangles — traditionally believed to bring good health and prosperity. Crafted using a combination of gold, silver, copper, iron, and zinc.", price: 210000, sku: "AVG-PNC-001", material: "Panchaloham (Five Metal Alloy)", metal: "Five Metal Alloy", color: "Gold Tone", weight: "60g (Set of 6)", stockQty: 20, categoryId: "cat-panchaloham", collectionId: colEveryday?.id, images: [{ url: IMG.bangle3, altText: "Panchaloham bangles set" }, { url: IMG.bangle4, altText: "Panchaloham detail" }] },
    { id: "prod-pnc-002", slug: "panchaloham-pendant-chain", name: "Panchaloham Lakshmi Pendant Chain", shortDesc: "Five-metal Lakshmi pendant with chain", description: "An auspicious panchaloham chain featuring a Lakshmi pendant — ideal as a religious gift or for daily devotional wear.", price: 165000, sku: "AVG-PNC-002", material: "Panchaloham", metal: "Five Metal Alloy", color: "Gold Tone", weight: "30g", stockQty: 15, categoryId: "cat-panchaloham", collectionId: colTemple?.id, images: [{ url: IMG.pendant1, altText: "Panchaloham Lakshmi pendant" }, { url: IMG.necklace7, altText: "Pendant chain detail" }] },

    // ── VADDANAM ──────────────────────────────────────────────────────────
    { id: "prod-vad-001", slug: "bridal-kemp-vaddanam", name: "Bridal Kemp Vaddanam", shortDesc: "Ornate kemp waist belt for brides", description: "An elaborate bridal vaddanam (waist belt) adorned with kemp stones and pearl drops in a traditional South Indian pattern. Adjustable to fit 26–34 inch waist. A must-have for Telugu brides.", price: 890000, sku: "AVG-VAD-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", weight: "220g", stones: "Kemp, Pearls, Ruby", stockQty: 5, isFeatured: true, isBridal: true, isExclusive: true, categoryId: "cat-vaddanam", collectionId: colBridal?.id, images: [{ url: IMG.bridal2, altText: "Bridal kemp vaddanam" }, { url: IMG.haram1, altText: "Vaddanam detail" }] },
    { id: "prod-vad-002", slug: "temple-gold-vaddanam", name: "Temple Gold Vaddanam", shortDesc: "Traditional temple-style waist ornament", description: "A stunning temple-gold vaddanam featuring Lakshmi, Saraswati, and lotus motifs crafted in antique gold finish. Perfect for classical dance performances and bridal wear.", price: 780000, salePrice: 699000, sku: "AVG-VAD-002", material: "1 Gram Gold", metal: "Antique Gold Plated", color: "Antique Gold", weight: "190g", stockQty: 6, isBridal: true, categoryId: "cat-vaddanam", collectionId: colDance?.id, images: [{ url: IMG.bridal1, altText: "Temple gold vaddanam" }, { url: IMG.haram2, altText: "Vaddanam detail" }] },

    // ── CHAMPASWARALU ─────────────────────────────────────────────────────
    { id: "prod-chp-001", slug: "bridal-champaswaralu-set", name: "Bridal Champaswaralu Set", shortDesc: "Traditional champaswaralu for brides", description: "An exquisite set of bridal champaswaralu (decorative hair ornaments) with kemp stones and pearl drops. Designed to cascade beautifully along the braid.", price: 220000, sku: "AVG-CHP-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", weight: "55g (Set)", stones: "Kemp, Pearls", stockQty: 12, isBridal: true, categoryId: "cat-champaswaralu", collectionId: colBridal?.id, images: [{ url: IMG.hair3, altText: "Bridal champaswaralu set" }, { url: IMG.hair1, altText: "Champaswaralu side view" }] },
    { id: "prod-chp-002", slug: "dance-champaswaralu", name: "Dance Champaswaralu — Natyam", shortDesc: "Champaswaralu for classical dance", description: "Lightweight champaswaralu specially designed for classical dancers. Secure clip-on mechanism ensures they stay in place through vigorous performances.", price: 160000, sku: "AVG-CHP-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "35g (Set)", stockQty: 15, categoryId: "cat-champaswaralu", collectionId: colDance?.id, images: [{ url: IMG.hair3, altText: "Dance champaswaralu" }, { url: IMG.bridal3, altText: "Champaswaralu performance view" }] },

    // ── MARTILU ───────────────────────────────────────────────────────────
    { id: "prod-mrt-001", slug: "bridal-gold-martilu", name: "Bridal Gold Martilu", shortDesc: "Gold forehead ornament for brides", description: "An ornate gold martilu (forehead ornament) with cascading tassels and kemp stone accents — an essential bridal accessory for Telugu weddings.", price: 175000, sku: "AVG-MRT-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", weight: "40g", stones: "Kemp, Pearls", stockQty: 10, isBridal: true, categoryId: "cat-martilu", collectionId: colBridal?.id, images: [{ url: IMG.hair2, altText: "Bridal gold martilu" }, { url: IMG.hair1, altText: "Martilu close up" }] },
    { id: "prod-mrt-002", slug: "dance-martilu-set", name: "Dance Martilu Set", shortDesc: "Classical dance forehead ornament set", description: "A complete set of dance martilu for classical performers — includes the central piece and side pendants. Designed to withstand stage lighting and movement.", price: 125000, sku: "AVG-MRT-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "28g", stockQty: 18, categoryId: "cat-martilu", collectionId: colDance?.id, images: [{ url: IMG.hair2, altText: "Dance martilu set" }, { url: IMG.bridal3, altText: "Martilu performance" }] },

    // ── HAIR ACCESSORIES ──────────────────────────────────────────────────
    { id: "prod-hai-001", slug: "gold-hairpin-set-12", name: "Gold Hairpin Set (12 pcs)", shortDesc: "Classic gold hairpins for all occasions", description: "A set of 12 elegant gold-plated hairpins featuring small floral and leaf motifs. Perfect for everyday styling, sarees, and traditional occasions.", price: 49000, sku: "AVG-HAI-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "25g (Set)", stockQty: 50, isLatest: true, categoryId: "cat-hair-accessories", collectionId: colEveryday?.id, images: [{ url: IMG.hair1, altText: "Gold hairpin set" }, { url: IMG.earrings6, altText: "Hairpins detail" }] },
    { id: "prod-hai-002", slug: "temple-gold-hair-clip", name: "Temple Gold Hair Clip", shortDesc: "Wide temple-style gold hair clip", description: "A wide, ornate hair clip in temple-gold finish with lotus and peacock motifs. Designed to hold a bun or half-up style elegantly for weddings and festivals.", price: 95000, sku: "AVG-HAI-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "35g", stockQty: 25, categoryId: "cat-hair-accessories", collectionId: colTemple?.id, images: [{ url: IMG.hair1, altText: "Temple gold hair clip" }, { url: IMG.hair2, altText: "Hair clip worn view" }] },

    // ── CLASSICAL DANCE JEWELLERY ─────────────────────────────────────────
    { id: "prod-cls-001", slug: "bharatanatyam-full-set", name: "Bharatanatyam Full Jewellery Set", shortDesc: "Complete Bharatanatyam stage jewellery", description: "A professional-grade complete Bharatanatyam jewellery set including necklace (oddiyanam), earrings, maattal, martilu, champaswaralu, arm bands, bangles, and anklets. Lightweight and stage-ready.", price: 1850000, sku: "AVG-CLS-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", weight: "350g (Complete Set)", stones: "Kemp, Cabochon Pearls", stockQty: 5, isFeatured: true, isExclusive: true, categoryId: "cat-classical-dance", collectionId: colDance?.id, images: [{ url: IMG.bridal3, altText: "Bharatanatyam full jewellery set" }, { url: IMG.hair1, altText: "Dance set detail" }] },
    { id: "prod-cls-002", slug: "kuchipudi-dance-set", name: "Kuchipudi Dance Jewellery Set", shortDesc: "Complete Kuchipudi performance jewellery", description: "A complete Kuchipudi dance set with all required ornaments for a professional performance. Includes head piece, necklace, earrings, bangles, and waist piece. Durable for intense performances.", price: 1550000, sku: "AVG-CLS-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "280g (Complete Set)", stockQty: 6, categoryId: "cat-classical-dance", collectionId: colDance?.id, images: [{ url: IMG.bridal3, altText: "Kuchipudi dance jewellery set" }, { url: IMG.bridal1, altText: "Kuchipudi set detail" }] },

    // ── BEAUTY PRODUCTS ───────────────────────────────────────────────────
    { id: "prod-bty-001", slug: "kumkum-sindoor-box-gold", name: "Gold Kumkum Box with Sindoor", shortDesc: "Decorative gold kumkum box with sindoor", description: "An ornate gold-plated kumkum box with quality sindoor — an auspicious gift for brides and newlyweds. Features a decorative Lakshmi motif lid.", price: 35000, sku: "AVG-BTY-001", material: "1 Gram Gold, Sindoor", metal: "Gold Plated Brass", color: "Gold, Red", weight: "80g", stockQty: 60, isLatest: true, categoryId: "cat-beauty-products", images: [{ url: IMG.misc1, altText: "Gold kumkum box" }, { url: IMG.misc2, altText: "Kumkum box open" }] },
    { id: "prod-bty-002", slug: "jewellery-care-kit", name: "Jewellery Care & Polish Kit", shortDesc: "Professional home jewellery care set", description: "A comprehensive jewellery care kit including polishing cloth, cleaning solution, and storage pouches. Helps maintain the gold shine of your 1 gram gold jewellery.", price: 28000, sku: "AVG-BTY-002", material: "Care Products", metal: "N/A", color: "N/A", weight: "200g (Kit)", stockQty: 40, categoryId: "cat-beauty-products", images: [{ url: IMG.misc2, altText: "Jewellery care kit" }, { url: IMG.misc1, altText: "Care kit contents" }] },

    // ── PENDANTS ──────────────────────────────────────────────────────────
    { id: "prod-pnd-001", slug: "lakshmi-gold-pendant", name: "Goddess Lakshmi Gold Pendant", shortDesc: "Intricate Lakshmi deity pendant", description: "A beautifully crafted Goddess Lakshmi pendant in antique gold finish with kemp stone accents. A divine gift for brides, daughters, and festive occasions.", price: 95000, sku: "AVG-PND-001", material: "1 Gram Gold", metal: "Antique Gold Plated", color: "Antique Gold, Red", weight: "12g", stones: "Kemp", stockQty: 35, isFeatured: true, categoryId: "cat-pendants", collectionId: colTemple?.id, images: [{ url: IMG.pendant1, altText: "Lakshmi gold pendant" }, { url: IMG.pendant2, altText: "Pendant detail" }] },
    { id: "prod-pnd-002", slug: "ganesh-pendant-gold", name: "Lord Ganesha Pendant", shortDesc: "Auspicious Ganesha gold pendant", description: "An auspicious Lord Ganesha pendant in premium 1 gram gold with fine detailing. Believed to bring wisdom and success to the wearer.", price: 85000, sku: "AVG-PND-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "10g", stockQty: 40, categoryId: "cat-pendants", collectionId: colTemple?.id, images: [{ url: IMG.pendant2, altText: "Ganesha pendant gold" }, { url: IMG.pendant1, altText: "Pendant worn view" }] },
    { id: "prod-pnd-003", slug: "om-pendant-gold", name: "Sacred Om Pendant", shortDesc: "Om symbol gold pendant with chain", description: "A minimalist yet powerful Om symbol pendant in gold-plated finish, paired with a matching 18-inch chain. Suitable for daily devotional wear.", price: 69000, salePrice: 59000, sku: "AVG-PND-003", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "8g", stockQty: 45, isLatest: true, categoryId: "cat-pendants", collectionId: colEveryday?.id, images: [{ url: IMG.pendant3, altText: "Om pendant gold" }, { url: IMG.pendant1, altText: "Om pendant chain" }] },

    // ── BRACELETS ─────────────────────────────────────────────────────────
    { id: "prod-brc-001", slug: "kemp-stone-bracelet", name: "Kemp Stone Tennis Bracelet", shortDesc: "Elegant kemp stone tennis bracelet", description: "A stunning tennis-style bracelet with kemp stones set in a continuous gold-plated frame. Adjustable with a secure lobster clasp. Ideal for weddings and festivities.", price: 145000, sku: "AVG-BRC-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", weight: "20g", stones: "Kemp", stockQty: 22, isTrending: true, categoryId: "cat-bracelets", collectionId: colKemp?.id, images: [{ url: IMG.bracelet2, altText: "Kemp stone tennis bracelet" }, { url: IMG.bangle2, altText: "Bracelet clasp detail" }] },
    { id: "prod-brc-002", slug: "gold-chain-bracelet", name: "Classic Gold Chain Bracelet", shortDesc: "Simple gold chain bracelet for daily wear", description: "A classic gold-plated chain bracelet in a flat Byzantine weave pattern. Lightweight and versatile for office and casual wear.", price: 89000, sku: "AVG-BRC-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "8g", stockQty: 35, isLatest: true, categoryId: "cat-bracelets", collectionId: colEveryday?.id, images: [{ url: IMG.bracelet1, altText: "Gold chain bracelet" }, { url: IMG.necklace7, altText: "Bracelet styling view" }] },

    // ── LONG BLACK BEADS ──────────────────────────────────────────────────
    { id: "prod-lbb-001", slug: "traditional-long-black-beads", name: "Traditional Long Black Bead Chain", shortDesc: "30-inch traditional Telugu mangalsutra", description: "A 30-inch traditional Telugu mangalsutra with authentic black beads and gold-capped beads in the classic South Indian style. The symbol of marriage in Telugu culture.", price: 165000, sku: "AVG-LBB-001", material: "1 Gram Gold, Black Beads", metal: "Gold Plated with Black Beads", color: "Gold, Black", weight: "35g", stockQty: 25, categoryId: "cat-long-black-beads", collectionId: colEveryday?.id, images: [{ url: IMG.necklace7, altText: "Traditional long black bead chain" }, { url: IMG.necklace3, altText: "Black beads chain close up" }] },
    { id: "prod-lbb-002", slug: "designer-long-black-beads", name: "Designer Long Black Bead Chain", shortDesc: "Designer black bead with gold pendants", description: "A contemporary designer take on the traditional Telugu mangalsutra — long black bead chain with multiple gold-plated Lakshmi pendants.", price: 195000, sku: "AVG-LBB-002", material: "1 Gram Gold, Black Beads", metal: "Gold Plated with Black Beads", color: "Gold, Black", weight: "40g", stones: "None", stockQty: 18, categoryId: "cat-long-black-beads", collectionId: colEveryday?.id, images: [{ url: IMG.necklace7, altText: "Designer long black bead chain" }, { url: IMG.necklace1, altText: "Designer chain full view" }] },

    // ── SHORT BLACK BEADS ─────────────────────────────────────────────────
    { id: "prod-sbb-001", slug: "short-black-bead-chain", name: "Short Black Bead Chain 18 inch", shortDesc: "18-inch short black bead mangalsutra", description: "An 18-inch short black bead chain — lighter and more convenient for daily wear, especially for working women. Features the traditional gold-capped bead pattern.", price: 115000, sku: "AVG-SBB-001", material: "1 Gram Gold, Black Beads", metal: "Gold Plated with Black Beads", color: "Gold, Black", weight: "22g", stockQty: 30, isLatest: true, categoryId: "cat-short-black-beads", collectionId: colEveryday?.id, images: [{ url: IMG.necklace7, altText: "Short black bead chain" }, { url: IMG.pendant3, altText: "Chain detail" }] },
    { id: "prod-sbb-002", slug: "gold-bead-black-chain-pendant", name: "Black Bead Chain with Heart Pendant", shortDesc: "Modern black bead chain with heart pendant", description: "A modern fusion short black bead chain with a gold heart-shaped pendant. A gift favourite for wives and newlyweds.", price: 135000, sku: "AVG-SBB-002", material: "1 Gram Gold, Black Beads", metal: "Gold Plated with Black Beads", color: "Gold, Black", weight: "20g", stockQty: 22, categoryId: "cat-short-black-beads", collectionId: colEveryday?.id, images: [{ url: IMG.necklace7, altText: "Black bead chain with heart pendant" }, { url: IMG.pendant2, altText: "Pendant chain view" }] },

    // ── CHANDRAHARAM CHAINS ───────────────────────────────────────────────
    { id: "prod-chr-001", slug: "traditional-chandraharam-chain", name: "Traditional Chandraharam", shortDesc: "Moon-shaped gold chandraharam chain", description: "A classic chandraharam chain in gold-plated brass featuring the traditional moon-shaped link pattern. Available in 20 and 24-inch lengths.", price: 285000, sku: "AVG-CHR-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "45g", stockQty: 20, categoryId: "cat-chandraharam", collectionId: colTemple?.id, images: [{ url: IMG.necklace4, altText: "Traditional chandraharam chain" }, { url: IMG.necklace3, altText: "Chandraharam close up" }] },
    { id: "prod-chr-002", slug: "kemp-chandraharam-chain", name: "Kemp Chandraharam Necklace", shortDesc: "Kemp stone chandraharam chain", description: "A decorative chandraharam chain with kemp stones embedded between each moon-shaped link — adding vibrant colour to the traditional design.", price: 345000, sku: "AVG-CHR-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", stones: "Kemp", weight: "52g", stockQty: 14, isTrending: true, categoryId: "cat-chandraharam", collectionId: colKemp?.id, images: [{ url: IMG.necklace4, altText: "Kemp chandraharam necklace" }, { url: IMG.necklace1, altText: "Chandraharam detail" }] },

    // ── BEADS JEWELLERY ───────────────────────────────────────────────────
    { id: "prod-bds-001", slug: "crystal-bead-necklace-gold", name: "Crystal & Gold Bead Necklace", shortDesc: "Elegant crystal and gold bead necklace", description: "A sophisticated necklace alternating between faceted crystal beads and gold-plated oval beads. Light and stylish for office and evening wear.", price: 125000, sku: "AVG-BDS-001", material: "Crystal, 1 Gram Gold", metal: "Gold Plated + Crystal Beads", color: "Gold, White", weight: "30g", stockQty: 28, isLatest: true, categoryId: "cat-beads-jewellery", collectionId: colEveryday?.id, images: [{ url: IMG.necklace6, altText: "Crystal gold bead necklace" }, { url: IMG.ring3, altText: "Bead necklace detail" }] },
    { id: "prod-bds-002", slug: "rudraksha-gold-bracelet", name: "Rudraksha & Gold Bracelet", shortDesc: "Sacred rudraksha with gold beads bracelet", description: "A spiritually significant bracelet combining authentic 5-mukhi rudraksha beads with gold-capped spacers. Ideal for gifting on religious occasions.", price: 95000, sku: "AVG-BDS-002", material: "Rudraksha, 1 Gram Gold", metal: "Gold Plated Caps with Rudraksha", color: "Brown, Gold", weight: "18g", stockQty: 35, categoryId: "cat-beads-jewellery", collectionId: colEveryday?.id, images: [{ url: IMG.ring4, altText: "Rudraksha gold bracelet" }, { url: IMG.bracelet1, altText: "Bracelet detail" }] },

    // ── FANCY ITEMS ───────────────────────────────────────────────────────
    { id: "prod-fan-001", slug: "trendy-ear-cuff-set", name: "Trendy Gold Ear Cuff Set", shortDesc: "Modern ear cuff set for fashion lovers", description: "A fashionable set of three gold-plated ear cuffs — one plain hoop, one with small stones, and one geometric design. No piercing required. Perfect for teens and young women.", price: 69000, sku: "AVG-FAN-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "10g (Set)", stockQty: 40, isLatest: true, isTrending: true, categoryId: "cat-fancy-items", collectionId: colEveryday?.id, images: [{ url: IMG.earrings7, altText: "Trendy ear cuff set" }, { url: IMG.earrings6, altText: "Ear cuff worn view" }] },
    { id: "prod-fan-002", slug: "layered-chain-necklace-set", name: "Layered Chain Necklace Set", shortDesc: "Three-layer gold chain necklace set", description: "A trendy three-layer chain necklace set with varied chain textures and a small coin pendant. Comes as a single adjustable piece for effortless styling.", price: 115000, salePrice: 99000, sku: "AVG-FAN-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "15g", stockQty: 30, isTrending: true, categoryId: "cat-fancy-items", collectionId: colEveryday?.id, images: [{ url: IMG.necklace4, altText: "Layered chain necklace set" }, { url: IMG.necklace7, altText: "Layered necklace detail" }] },

    // ── FINGER RINGS ──────────────────────────────────────────────────────
    { id: "prod-rng-001", slug: "kemp-cocktail-ring", name: "Kemp Cocktail Ring", shortDesc: "Bold kemp stone cocktail ring", description: "A bold statement cocktail ring featuring a large oval kemp stone surrounded by small gold beading. A conversation starter for parties and festive occasions.", price: 85000, sku: "AVG-RNG-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", stones: "Kemp", weight: "8g", stockQty: 30, isTrending: true, categoryId: "cat-finger-rings", collectionId: colKemp?.id, images: [{ url: IMG.ring1, altText: "Kemp cocktail ring" }, { url: IMG.ring2, altText: "Ring top view" }] },
    { id: "prod-rng-002", slug: "temple-thumb-ring", name: "Temple Gold Thumb Ring", shortDesc: "Wide temple-style thumb ring", description: "A wide temple-style thumb ring in antique gold finish with traditional floral motifs. A statement piece for classical dance performances and festive occasions.", price: 75000, sku: "AVG-RNG-002", material: "1 Gram Gold", metal: "Antique Gold Plated", color: "Antique Gold", weight: "6g", stockQty: 25, categoryId: "cat-finger-rings", collectionId: colTemple?.id, images: [{ url: IMG.ring2, altText: "Temple thumb ring" }, { url: IMG.ring1, altText: "Thumb ring detail" }] },
    { id: "prod-rng-003", slug: "adjustable-daily-ring", name: "Adjustable Daily Wear Ring", shortDesc: "Simple adjustable gold ring for daily wear", description: "A slim, elegant adjustable ring in gold-plated finish — perfect for daily wear. Features a minimal twisted band design that suits all hand types.", price: 45000, sku: "AVG-RNG-003", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "4g", stockQty: 50, isLatest: true, categoryId: "cat-finger-rings", collectionId: colEveryday?.id, images: [{ url: IMG.ring3, altText: "Adjustable daily wear ring" }, { url: IMG.ring1, altText: "Ring hand view" }] },

    // ── PAPITABILLA ───────────────────────────────────────────────────────
    { id: "prod-ppt-001", slug: "bridal-gold-papitabilla", name: "Bridal Gold Papitabilla", shortDesc: "Traditional Telugu neck ornament for brides", description: "An ornate papitabilla — a traditional Telugu neck ornament worn on the back of the neck — crafted in premium 1 gram gold with kemp stone accents and gold tassels.", price: 260000, sku: "AVG-PPT-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", stones: "Kemp, Pearl Tassels", weight: "55g", stockQty: 8, isBridal: true, categoryId: "cat-papitabilla", collectionId: colBridal?.id, images: [{ url: IMG.bridal2, altText: "Bridal gold papitabilla" }, { url: IMG.hair1, altText: "Papitabilla detail" }] },
    { id: "prod-ppt-002", slug: "dance-papitabilla", name: "Dance Papitabilla", shortDesc: "Dance papitabilla for classical performances", description: "A lightweight papitabilla for classical dance performances, designed with secure clips to stay in position during intense movement.", price: 195000, sku: "AVG-PPT-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "40g", stockQty: 12, categoryId: "cat-papitabilla", collectionId: colDance?.id, images: [{ url: IMG.bridal3, altText: "Dance papitabilla" }, { url: IMG.bridal2, altText: "Papitabilla worn view" }] },

    // ── NOSE PINS ─────────────────────────────────────────────────────────
    { id: "prod-nsp-001", slug: "bridal-nath-gold", name: "Bridal Nath with Chain", shortDesc: "Large bridal nath with pearl and kemp", description: "A stunning bridal nath (nose ring) with a large kemp stone centre and pearl drops, connected to the ear by a delicate gold chain. A centrepiece of the Telugu bridal look.", price: 135000, sku: "AVG-NSP-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", stones: "Kemp, Pearls", weight: "15g", stockQty: 15, isBridal: true, categoryId: "cat-nose-pins", collectionId: colBridal?.id, images: [{ url: IMG.nospin2, altText: "Bridal nath with chain" }, { url: IMG.bridal1, altText: "Nath worn view" }] },
    { id: "prod-nsp-002", slug: "small-nose-pin-stud", name: "Small Nose Stud Gold", shortDesc: "Delicate small gold nose pin stud", description: "A simple and elegant small nose stud in gold-plated finish. A minimalist everyday piece suitable for single piercing.", price: 29000, sku: "AVG-NSP-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "0.5g", stockQty: 80, isLatest: true, categoryId: "cat-nose-pins", collectionId: colEveryday?.id, images: [{ url: IMG.nospin1, altText: "Small nose pin stud" }, { url: IMG.earrings6, altText: "Nose stud detail" }] },

    // ── JADABILLALU ───────────────────────────────────────────────────────
    { id: "prod-jdb-001", slug: "bridal-jadabillalu-set", name: "Bridal Jadabillalu Set", shortDesc: "Full bridal jadabillalu braid ornament set", description: "A complete bridal jadabillalu set — multiple decorative gold ornaments worn along the length of the braid. Features kemp stone accents and cascading pearl tassels.", price: 420000, sku: "AVG-JDB-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", stones: "Kemp, Pearl Tassels", weight: "120g (Set)", stockQty: 6, isFeatured: true, isBridal: true, categoryId: "cat-jadabillalu", collectionId: colBridal?.id, images: [{ url: IMG.hair1, altText: "Bridal jadabillalu set" }, { url: IMG.bridal2, altText: "Jadabillalu worn" }] },
    { id: "prod-jdb-002", slug: "dance-jadabillalu", name: "Natyam Jadabillalu", shortDesc: "Dance jadabillalu for performances", description: "Lightweight jadabillalu set for classical dance performances — designed to catch stage light beautifully while remaining secure during rigorous movement.", price: 310000, sku: "AVG-JDB-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "80g (Set)", stockQty: 10, categoryId: "cat-jadabillalu", collectionId: colDance?.id, images: [{ url: IMG.hair1, altText: "Natyam jadabillalu" }, { url: IMG.bridal3, altText: "Jadabillalu performance" }] },

    // ── ANKLETS ───────────────────────────────────────────────────────────
    { id: "prod-ank-001", slug: "traditional-gold-payal-pair", name: "Traditional Gold Payal Pair", shortDesc: "Heavy traditional gold payal anklets", description: "A pair of traditional gold-plated payal (anklets) with small bells and intricate pattern work. The gentle chime is a classic symbol of femininity in South Indian culture.", price: 215000, sku: "AVG-ANK-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "75g (Pair)", stockQty: 20, isFeatured: true, isTrending: true, categoryId: "cat-anklets", collectionId: colTemple?.id, images: [{ url: IMG.anklet1, altText: "Traditional gold payal pair" }, { url: IMG.anklet2, altText: "Payal detail" }] },
    { id: "prod-ank-002", slug: "slim-gold-anklet-pair", name: "Slim Gold Chain Anklet Pair", shortDesc: "Delicate slim gold chain anklets", description: "A pair of delicate slim gold-plated chain anklets — simple, elegant, and perfect for daily wear. Adjustable length with a secure lobster clasp.", price: 95000, sku: "AVG-ANK-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "12g (Pair)", stockQty: 40, isLatest: true, categoryId: "cat-anklets", collectionId: colEveryday?.id, images: [{ url: IMG.anklet2, altText: "Slim gold chain anklets" }, { url: IMG.anklet1, altText: "Anklet worn view" }] },

    // ── BRIDAL COLLECTION ─────────────────────────────────────────────────
    { id: "prod-brd-001", slug: "complete-bridal-set-telugu", name: "Complete Telugu Bridal Set", shortDesc: "Full bridal jewellery set for Telugu weddings", description: "A magnificent complete bridal jewellery set for Telugu weddings — includes long haram, short haram, kemp choker, earrings, maang tikka, nath, vaddanam, bangles, champaswaralu, and jadabillalu. A complete bridal trousseau in one set.", price: 4800000, sku: "AVG-BRD-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red, Green", stones: "Kemp, Ruby, Pearl, Emerald Green", weight: "900g (Complete Set)", stockQty: 3, isFeatured: true, isBridal: true, isExclusive: true, categoryId: "cat-bridal", collectionId: colBridal?.id, images: [{ url: IMG.bridal1, altText: "Complete Telugu bridal set" }, { url: IMG.bridal2, altText: "Bridal set detail" }, { url: IMG.bridal3, altText: "Bridal set worn" }] },
    { id: "prod-brd-002", slug: "bridal-kemp-necklace-set", name: "Bridal Kemp Necklace Set", shortDesc: "Complete kemp necklace and earring bridal set", description: "An opulent bridal kemp necklace set including a layered kemp choker, matching dangling earrings, and maang tikka — all in rich red kemp with pearls.", price: 750000, sku: "AVG-BRD-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", stones: "Kemp, Pearl", weight: "180g (Set)", stockQty: 8, isBridal: true, isFeatured: true, categoryId: "cat-bridal", collectionId: colBridal?.id, images: [{ url: IMG.bridal2, altText: "Bridal kemp necklace set" }, { url: IMG.necklace1, altText: "Necklace set detail" }] },

    // ── MEN'S COLLECTION ──────────────────────────────────────────────────
    { id: "prod-men-001", slug: "mens-gold-chain-20inch", name: "Men's Gold Chain 20 Inch", shortDesc: "Classic gold chain for men", description: "A sturdy 20-inch gold-plated chain for men in a flat Byzantine link pattern. Suitable for daily wear and for layering with a pendant.", price: 225000, sku: "AVG-MEN-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "35g", stockQty: 25, isLatest: true, categoryId: "cat-mens", collectionId: colEveryday?.id, images: [{ url: IMG.necklace7, altText: "Men's gold chain 20 inch" }, { url: IMG.ring4, altText: "Men's chain detail" }] },
    { id: "prod-men-002", slug: "mens-gold-bracelet-solid", name: "Men's Gold Bracelet", shortDesc: "Bold gold bracelet for men", description: "A bold gold-plated bracelet with a heavy chain link design and magnetic clasp. A statement piece for men who appreciate understated luxury.", price: 175000, sku: "AVG-MEN-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "28g", stockQty: 18, categoryId: "cat-mens", collectionId: colEveryday?.id, images: [{ url: IMG.bracelet1, altText: "Men's gold bracelet" }, { url: IMG.ring4, altText: "Bracelet clasp view" }] },
    { id: "prod-men-003", slug: "mens-rudraksha-bracelet", name: "Men's Rudraksha Bracelet", shortDesc: "Rudraksha and gold bead bracelet for men", description: "A powerful rudraksha bead bracelet with gold-capped spacers — both spiritually significant and stylistically bold. Popular gift for men.", price: 115000, sku: "AVG-MEN-003", material: "Rudraksha, 1 Gram Gold", metal: "Gold Plated Caps + Rudraksha", color: "Brown, Gold", weight: "22g", stockQty: 30, categoryId: "cat-mens", images: [{ url: IMG.ring4, altText: "Men's rudraksha bracelet" }, { url: IMG.misc2, altText: "Rudraksha bracelet detail" }] },

    // ── KIDS COLLECTION ───────────────────────────────────────────────────
    { id: "prod-kid-001", slug: "kids-gold-bangle-pair", name: "Children's Gold Bangle Pair", shortDesc: "Safe lightweight gold bangles for kids", description: "A pair of delicate gold-plated bangles for children aged 2–8 years. Rounded edges, lightweight, and made with hypoallergenic material. Perfect for naming ceremonies, birthdays, and festivals.", price: 85000, sku: "AVG-KID-001", material: "1 Gram Gold", metal: "Gold Plated Brass (Hypoallergenic)", color: "Gold", weight: "15g (Pair)", stockQty: 40, isLatest: true, categoryId: "cat-kids", collectionId: colEveryday?.id, images: [{ url: IMG.bangle4, altText: "Children's gold bangle pair" }, { url: IMG.earrings6, altText: "Kids bangles detail" }] },
    { id: "prod-kid-002", slug: "kids-gold-chain-pendant", name: "Children's Gold Chain with Pendant", shortDesc: "Kids gold chain with Ganesha pendant", description: "A lightweight 16-inch gold chain with a small Ganesha pendant — a traditional gift for newborns and toddlers. Safe, hypoallergenic, and beautifully presented in a gift box.", price: 110000, sku: "AVG-KID-002", material: "1 Gram Gold", metal: "Gold Plated Brass (Hypoallergenic)", color: "Gold", weight: "8g", stockQty: 35, categoryId: "cat-kids", collectionId: colEveryday?.id, images: [{ url: IMG.pendant2, altText: "Children's gold chain with Ganesha pendant" }, { url: IMG.earrings6, altText: "Kids pendant detail" }] },
    { id: "prod-kid-003", slug: "kids-gold-earrings-studs", name: "Children's Gold Stud Earrings", shortDesc: "Small gold stud earrings for kids", description: "Tiny, secure gold stud earrings for children — featuring a small flower motif with a screw-back clasp for safety. Available in two sizes: infant and toddler.", price: 65000, sku: "AVG-KID-003", material: "1 Gram Gold", metal: "Gold Plated Brass (Hypoallergenic)", color: "Gold", weight: "2g (Pair)", stockQty: 50, categoryId: "cat-kids", images: [{ url: IMG.earrings6, altText: "Children's gold stud earrings" }, { url: IMG.earrings5, altText: "Kids earrings close up" }] },

    // ── LATEST COLLECTIONS ────────────────────────────────────────────────
    { id: "prod-lst-001", slug: "modern-minimalist-drops", name: "Modern Minimalist Gold Drop Necklace", shortDesc: "Chic geometric drop pendant necklace", description: "Our latest contemporary geometric gold-plated drop pendant necklace, highlighting clean lines and a satin gold finish. A stunning release for the modern woman.", price: 145000, sku: "AVG-LST-001", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold", weight: "14g", stockQty: 15, isLatest: true, isFeatured: true, isTrending: true, categoryId: "cat-latest", collectionId: colEveryday?.id, images: [{ url: IMG.pendant1, altText: "Modern minimalist drop necklace" }, { url: IMG.necklace7, altText: "Necklace close up" }] },
    { id: "prod-lst-002", slug: "royal-crest-kemp-earrings", name: "Royal Crest Kemp Studs", shortDesc: "Regal kemp studs in geometric gold layout", description: "The newly released Royal Crest Kemp studs, combining traditional kemp stones with structured geometric gold outlines. Our latest design fusion.", price: 98000, sku: "AVG-LST-002", material: "1 Gram Gold", metal: "Gold Plated Brass", color: "Gold, Red", stones: "Kemp", weight: "10g", stockQty: 22, isLatest: true, isTrending: true, categoryId: "cat-latest", collectionId: colKemp?.id, images: [{ url: IMG.earrings5, altText: "Royal Crest Kemp studs" }, { url: IMG.earrings2, altText: "Studs detail view" }] }
  ];

  let productCount = 0;
  for (const product of products) {
    await upsertProduct(product as Parameters<typeof upsertProduct>[0]);
    productCount++;
    if (productCount % 10 === 0) console.log(`   ... ${productCount} products created`);
  }
  console.log(`✓ Products (${productCount})`);

  console.log("\n✅ Sprint 4 Seed Complete!");
  console.log("───────────────────────────────────────────────────────────");
  console.log(`  Site Settings:     1`);
  console.log(`  Boutique Info:     1 (Wanaparthy Flagship)`);
  console.log(`  Announcement Bars: 3`);
  console.log(`  Hero Slides:       2`);
  console.log(`  Brand Story:       2 sections`);
  console.log(`  Editorial Gallery: 6 images`);
  console.log(`  Testimonials:      4`);
  console.log(`  FAQ Entries:       14`);
  console.log(`  Collections:       5`);
  console.log(`  Categories:        29`);
  console.log(`  Products:          ${productCount}`);
  console.log("───────────────────────────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
