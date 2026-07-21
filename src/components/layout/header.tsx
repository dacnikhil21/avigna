"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Heart, User, ChevronDown, MapPin, HelpCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { useWebsiteData } from "@/lib/store/admin-store";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useRouter, usePathname } from "next/navigation";
import type { Product } from "@/types";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { brand } = useWebsiteData();
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Search states
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const isOverlayPage = pathname === "/" || pathname === "/bridal-salon" || pathname === "/shop" || pathname === "/collections" || pathname === "/about" || pathname === "/contact";

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("avighna-recent-searches");
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== cleanTerm.toLowerCase());
      const next = [cleanTerm, ...filtered].slice(0, 5);
      localStorage.setItem("avighna-recent-searches", JSON.stringify(next));
      return next;
    });
  };

  const deleteRecentSearch = (term: string) => {
    setRecentSearches((prev) => {
      const next = prev.filter((t) => t !== term);
      localStorage.setItem("avighna-recent-searches", JSON.stringify(next));
      return next;
    });
  };

  const handleSearchSubmit = (term: string) => {
    if (!term.trim()) return;
    saveRecentSearch(term);
    setIsSearchOpen(false);
    setSearchVal("");
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  };

  // Debounced search results
  useEffect(() => {
    if (!searchVal.trim()) {
      setSearchResults([]);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchVal)}&limit=6`);
        const data = await res.json();
        setSearchResults(data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [searchVal]);

  const dynamicMessages = [
    brand.offerBannerText,
    "Pristine 1 Gram Gold Replica Jewellery",
    "Explore Our 1 Gram Gold Jewellery – Wanaparthy, Telangana"
  ];

  const { totalItems, openCart, isOpen: isCartOpen } = useCartStore();
  const wishlistItems = useWishlistStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = mounted ? totalItems() : 0;
  const wishlistCount = mounted ? wishlistItems.length : 0;
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scrolling height & backgrounds
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Handle Mega Menu Hover timeouts
  const handleShopHover = (hovering: boolean) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current);
    }
    if (hovering) {
      setIsMegaMenuOpen(true);
    } else {
      menuTimeoutRef.current = setTimeout(() => {
        setIsMegaMenuOpen(false);
      }, 150);
    }
  };

  const isHeaderDark = isOverlayPage && !isScrolled && !isMegaMenuOpen && !isSearchOpen;

  return (
    <>
      <div className={cn(
        "fixed top-0 left-0 right-0 z-40 flex flex-col w-full transition-opacity duration-300",
        (isSearchOpen || isMobileOpen || isCartOpen) && "opacity-0 pointer-events-none"
      )}>
        {/* Luxury Announcement Bar */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 34, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="w-full bg-[#FAF8F5] border-b border-[#EFECE7] relative overflow-hidden flex items-center"
            >
              <div className="relative flex items-center w-full h-full overflow-hidden pr-10">
                <motion.div
                  className="flex shrink-0 items-center gap-10 whitespace-nowrap text-[11px] md:text-[12px] font-medium tracking-[0.1em] font-dmsans text-[#121212] uppercase"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                >
                  <span>{brand.offerBannerText || "FREE SHIPPING ON ALL ORDERS | BIS 916 CERTIFIED"}</span>
                  <span className="text-[#C5A880]">✦</span>
                  <span>Pristine 1 Gram Gold Replica Jewellery</span>
                  <span className="text-[#C5A880]">✦</span>
                  <span>Explore Our 1 Gram Gold Jewellery – Wanaparthy, Telangana</span>
                  <span className="text-[#C5A880]">✦</span>
                  <span>{brand.offerBannerText || "FREE SHIPPING ON ALL ORDERS | BIS 916 CERTIFIED"}</span>
                  <span className="text-[#C5A880]">✦</span>
                  <span>Pristine 1 Gram Gold Replica Jewellery</span>
                  <span className="text-[#C5A880]">✦</span>
                  <span>Explore Our 1 Gram Gold Jewellery – Wanaparthy, Telangana</span>
                  <span className="text-[#C5A880]">✦</span>
                </motion.div>
              </div>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="absolute right-3 z-10 p-1 bg-[#FAF8F5]/90 backdrop-blur-sm hover:bg-black/10 rounded-full transition-colors text-[#121212]"
                aria-label="Close announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Premium Header */}
        <header
          className={cn(
            "w-full transition-all duration-400 ease-out z-40 border-b",
            isScrolled || !isOverlayPage
              ? "bg-white/95 backdrop-blur-md shadow-sm border-[#EFECE7] h-16 md:h-20"
              : isMegaMenuOpen
                ? "bg-white border-[#EFECE7] h-20 md:h-[88px]"
                : "bg-transparent border-transparent h-20 md:h-[88px]"
          )}
        >
          <div className="w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
            
            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className={cn(
                "lg:hidden p-2 -ml-2 transition-colors duration-300",
                isHeaderDark ? "text-white hover:text-[#C5A880]" : "text-[#121212] hover:text-[#C5A880]"
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Left Navigation (Column 1) */}
            <nav className={cn(
              "hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-6 text-xs xl:text-[13px] tracking-[0.08em] uppercase font-sans font-medium transition-colors duration-300",
              isHeaderDark ? "text-white" : "text-[#121212]"
            )}>
              <Link href="/" className="hover:text-[#C5A880] transition-colors duration-300 py-6">
                Home
              </Link>
              <div
                onMouseEnter={() => handleShopHover(true)}
                onMouseLeave={() => handleShopHover(false)}
                className="relative py-6 cursor-pointer"
              >
                <span className="flex items-center gap-1 hover:text-[#C5A880] transition-colors duration-300">
                  Shop <ChevronDown className="w-3 h-3" />
                </span>
              </div>
              <Link href="/shop" className="hover:text-[#C5A880] transition-colors duration-300 py-6">
                Categories
              </Link>
              <Link href="/collections" className="hover:text-[#C5A880] transition-colors duration-300 py-6">
                Collections
              </Link>
            </nav>

            {/* Centered Monogram / Logo (Column 2) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
              <Link href="/" className="text-center group block">
                <div className="flex flex-col items-center">
                  <span className={cn(
                    "font-serif text-xl md:text-2xl font-light tracking-[0.08em] transition-colors duration-300 leading-none",
                    isHeaderDark ? "text-white" : "text-[#121212]"
                  )}>
                    {brand.logoText}
                  </span>
                  <span className="hidden sm:block text-[8px] uppercase tracking-[0.3em] text-[#C5A880] mt-0.5 font-medium leading-none">
                    {brand.logoSubText}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Right Navigation Utilities (Column 3) */}
            <div className={cn(
              "hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-6 justify-end transition-colors duration-300 text-xs xl:text-[13px] tracking-[0.08em] uppercase font-sans font-medium",
              isHeaderDark ? "text-white" : "text-[#121212]"
            )}>
              <Link href="/about" className="hover:text-[#C5A880] transition-colors duration-300 py-6">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-[#C5A880] transition-colors duration-300 py-6">
                Contact
              </Link>

              {/* Utility Icon Group */}
              <div className="flex items-center gap-2 lg:gap-3 xl:gap-4 ml-2 border-l border-current/10 pl-4">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center justify-center p-1.5 hover:text-[#C5A880] transition-colors duration-300"
                  aria-label="Search"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>

                <Link
                  href="/wishlist"
                  className="relative flex items-center justify-center p-1.5 hover:text-[#C5A880] transition-colors duration-300"
                  aria-label="Wishlist"
                >
                  <Heart className="w-4.5 h-4.5" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 flex items-center justify-center bg-[#C5A880] text-white text-[8px] font-bold rounded-full animate-in zoom-in duration-200">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <button
                  onClick={openCart}
                  className="relative flex items-center justify-center p-1.5 hover:text-[#C5A880] transition-colors duration-300"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-[#C5A880] text-white text-[8px] font-bold rounded-full">
                      {itemCount}
                    </span>
                  )}
                </button>

                <Link
                  href="/account"
                  className="flex items-center justify-center p-1.5 hover:text-[#C5A880] transition-colors duration-300"
                  aria-label="Account"
                >
                  <User className="w-4.5 h-4.5" />
                </Link>
              </div>
            </div>

            {/* Mobile Header Right Utilities */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={openCart}
                className={cn(
                  "relative p-2 transition-colors duration-300",
                  isHeaderDark ? "text-white hover:text-[#C5A880]" : "text-[#121212] hover:text-[#C5A880]"
                )}
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center bg-[#C5A880] text-white text-[9px] font-medium rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

          </div>

          {/* Luxury Mega Menu (Desktop Only) */}
          <AnimatePresence>
            {isMegaMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                onMouseEnter={() => handleShopHover(true)}
                onMouseLeave={() => handleShopHover(false)}
                className="absolute left-0 right-0 w-full bg-white border-b border-[#EFECE7] shadow-lg z-30 py-12 px-16"
              >
                <div className="grid grid-cols-12 gap-8 max-w-7xl mx-auto">
                  
                  {/* Column 1: Grid of categories */}
                  <div className="col-span-6 grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-[#C5A880] mb-4">
                        Necklaces &amp; Chains
                      </h4>
                      <ul className="space-y-2 text-[13px] text-[#121212] font-normal tracking-[0.02em]">
                        <li><Link href="/shop?category=necklace" className="hover:text-[#C5A880] transition-colors duration-250">Necklace</Link></li>
                        <li><Link href="/shop?category=long-haram" className="hover:text-[#C5A880] transition-colors duration-250">Long Haram</Link></li>
                        <li><Link href="/shop?category=short-haram" className="hover:text-[#C5A880] transition-colors duration-250">Short Haram</Link></li>
                        <li><Link href="/shop?category=thali-chains" className="hover:text-[#C5A880] transition-colors duration-250">Thali Chains</Link></li>
                        <li><Link href="/shop?category=chandraharam-chains" className="hover:text-[#C5A880] transition-colors duration-250">Chandraharam Chains</Link></li>
                        <li><Link href="/shop?category=long-black-beads" className="hover:text-[#C5A880] transition-colors duration-250">Long Black Beads</Link></li>
                        <li><Link href="/shop?category=short-black-beads" className="hover:text-[#C5A880] transition-colors duration-250">Short Black Beads</Link></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-[#C5A880] mb-4">
                        Bangles &amp; Rings
                      </h4>
                      <ul className="space-y-2 text-[13px] text-[#121212] font-normal tracking-[0.02em]">
                        <li><Link href="/shop?category=earrings" className="hover:text-[#C5A880] transition-colors duration-250">Earrings</Link></li>
                        <li><Link href="/shop?category=bangles" className="hover:text-[#C5A880] transition-colors duration-250">Bangles</Link></li>
                        <li><Link href="/shop?category=glass-bangles" className="hover:text-[#C5A880] transition-colors duration-250">Glass Bangles</Link></li>
                        <li><Link href="/shop?category=finger-rings" className="hover:text-[#C5A880] transition-colors duration-250">Finger Rings</Link></li>
                        <li><Link href="/shop?category=bracelets" className="hover:text-[#C5A880] transition-colors duration-250">Bracelets</Link></li>
                        <li><Link href="/shop?category=anklets" className="hover:text-[#C5A880] transition-colors duration-250">Anklets</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-[#C5A880] mb-4">
                        Special Collections
                      </h4>
                      <ul className="space-y-2 text-[13px] text-[#121212] font-normal tracking-[0.02em]">
                        <li><Link href="/shop?category=bridal-collection" className="hover:text-[#C5A880] transition-colors duration-250">Bridal Collection</Link></li>
                        <li><Link href="/shop?category=classical-dance-jewellery" className="hover:text-[#C5A880] transition-colors duration-250">Classical Dance</Link></li>
                        <li><Link href="/shop?category=panchaloham-jewellery" className="hover:text-[#C5A880] transition-colors duration-250">Panchaloham</Link></li>
                        <li><Link href="/shop?category=vaddanam" className="hover:text-[#C5A880] transition-colors duration-250">Vaddanam</Link></li>
                        <li><Link href="/shop?category=mens-collection" className="hover:text-[#C5A880] transition-colors duration-250">Men&apos;s Collection</Link></li>
                        <li><Link href="/shop?category=kids-collection" className="hover:text-[#C5A880] transition-colors duration-250">Kids Collection</Link></li>
                        <li><Link href="/shop?category=latest-collections" className="hover:text-[#C5A880] transition-colors duration-250">Latest Collections</Link></li>
                      </ul>
                    </div>
                  </div>

                  {/* Column 2: Featured Collection */}
                  <div className="col-span-3 border-l border-[#EFECE7] pl-8 flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-[#C5A880] mb-4">
                        Featured Collection
                      </h4>
                      <h5 className="font-serif text-2xl font-light text-[#121212] mb-2">Temple Gold</h5>
                      <p className="text-[13px] text-[#121212]/80 leading-relaxed font-normal mb-6">
                        Sacred motifs and antique nakashi work crafted in pure gold replica plating. Designed for the modern bride.
                      </p>
                    </div>
                    <Link
                      href="/collections/temple-gold"
                      className="inline-flex items-center text-[12px] font-medium tracking-[0.08em] uppercase text-[#121212] hover:text-[#C5A880] transition-colors duration-300 group mt-auto self-start"
                    >
                      <span className="relative">
                        Explore Temple Gold
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#121212] scale-x-100 group-hover:scale-x-0 origin-left transition-transform duration-300" />
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C5A880] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                      </span>
                    </Link>
                  </div>

                  {/* Column 3: Large Editorial Image Placeholder */}
                  <div className="col-span-3 h-[240px] overflow-hidden relative group">
                    <Link href="/collections/temple-gold">
                      <Image
                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
                        alt="Temple Gold Collection — Premium 1 Gram Gold Jewellery"
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 1024px) 25vw, 15vw"
                      />
                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/0" />
                    </Link>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      {/* Mobile Drawer (Left Navigation Drawer) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
              className="fixed left-0 top-0 w-[85%] max-w-sm bg-white shadow-xl p-8 flex flex-col z-50 overflow-y-auto"
              style={{ height: "100dvh" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-serif text-2xl font-light">{brand.logoText}</span>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">
                    {brand.logoSubText}
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#121212]" />
                </button>
              </div>

              {/* Main Accordion Menu */}
              <div className="flex flex-col gap-4 font-sans text-lg font-medium text-[#121212] flex-1">
                <div>
                  <button
                    onClick={() => setIsShopExpanded(!isShopExpanded)}
                    className="flex items-center justify-between w-full py-2 hover:text-[#C5A880] transition-colors duration-300"
                  >
                    <span>Shop</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300 text-[#C5A880]", isShopExpanded && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isShopExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="pl-4 overflow-hidden flex flex-col gap-2.5 mt-2 border-l border-[#EFECE7]"
                      >
                        <Link href="/shop" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">All Jewellery</Link>
                        <Link href="/shop?category=necklace" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">Necklaces & Chokers</Link>
                        <Link href="/shop?category=earrings" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">Earrings & Jhumkas</Link>
                        <Link href="/shop?category=bangles" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">Bangles & Kadas</Link>
                        <Link href="/shop?category=finger-rings" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">Rings & Accessories</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40">
                  Home
                </Link>

                <Link href="/shop" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40">
                  Shop
                </Link>

                <Link href="/collections" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40">
                  Collections
                </Link>

                <Link href="/about" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40">
                  About Us
                </Link>

                <Link href="/contact" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40">
                  Contact
                </Link>

                <Link href="/wishlist" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40 flex items-center justify-between gap-2">
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="w-5 h-5 flex items-center justify-center bg-[#C5A880] text-white text-[10px] font-bold rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                <Link href="/account" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 flex items-center gap-2">
                  <User className="w-4.5 h-4.5" />
                  <span>Account</span>
                </Link>
              </div>

              {/* Bottom utilities inside mobile drawer */}
              <div className="mt-auto pt-6 border-t border-[#EFECE7] flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-[#121212] hover:text-[#C5A880] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span>1 Gram Gold Store Locator</span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-[#121212] hover:text-[#C5A880] transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[#C5A880]" />
                  <span>Client FAQ</span>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#EFECE7] h-[64px] flex items-center justify-around md:hidden pb-safe">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center p-2 transition-colors duration-250 w-14",
            pathname === "/" ? "text-[#C5A880]" : "text-[#121212] hover:text-[#C5A880]"
          )}
          aria-label="Home"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Home</span>
        </Link>

        <Link
          href="/shop"
          className={cn(
            "flex flex-col items-center justify-center p-2 transition-colors duration-250 w-14",
            (pathname.startsWith("/shop") || pathname.startsWith("/collections")) ? "text-[#C5A880]" : "text-[#121212] hover:text-[#C5A880]"
          )}
          aria-label="Categories"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Categories</span>
        </Link>

        <Link
          href="/wishlist"
          className={cn(
            "relative flex flex-col items-center justify-center p-2 transition-colors duration-250 w-14",
            pathname.startsWith("/wishlist") ? "text-[#C5A880]" : "text-[#121212] hover:text-[#C5A880]"
          )}
          aria-label="Wishlist"
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-2.5 w-4 h-4 flex items-center justify-center bg-[#C5A880] text-white text-[8px] font-bold rounded-full animate-in zoom-in duration-200">
              {wishlistCount}
            </span>
          )}
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Wishlist</span>
        </Link>

        <button
          onClick={openCart}
          className={cn(
            "relative flex flex-col items-center justify-center p-2 transition-colors duration-250 w-14",
            isCartOpen ? "text-[#C5A880]" : "text-[#121212] hover:text-[#C5A880]"
          )}
          aria-label="Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 flex items-center justify-center bg-[#C5A880] text-white text-[8px] font-bold rounded-full">
              {itemCount}
            </span>
          )}
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Cart</span>
        </button>

        <Link
          href="/account"
          className={cn(
            "flex flex-col items-center justify-center p-2 transition-colors duration-250 w-14",
            (pathname.startsWith("/account") || pathname.startsWith("/login") || pathname.startsWith("/register")) ? "text-[#C5A880]" : "text-[#121212] hover:text-[#C5A880]"
          )}
          aria-label="Account"
        >
          <User className="w-5 h-5" />
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Account</span>
        </Link>
      </div>

      {/* Premium Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop with dark overlay and blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-[95] bg-black/45 backdrop-blur-sm"
            />

            {/* Premium centered search panel */}
            <motion.div
              initial={{ opacity: 0, y: -40, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: -40, x: "-50%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-6 left-1/2 z-[100] w-[92%] max-w-2xl bg-white shadow-2xl rounded-2xl border border-[#EFECE7] font-sans antialiased text-[#1A1A1A] overflow-hidden"
            >
              {/* Input Row */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-[#EFECE7]">
                <Search className="w-5 h-5 text-[#C5A880] shrink-0" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(searchVal)}
                  placeholder="Search Our 1 Gram Gold Jewellery..."
                  className="flex-grow text-base font-light text-[#121212] placeholder:text-gray-400 focus:outline-none bg-transparent"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 hover:bg-black/5 rounded-full transition-colors shrink-0"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5 text-[#1A1A1A]" />
                </button>
              </div>

              {/* Dynamic results or Suggestions layout */}
              {!searchVal ? (
                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                  {recentSearches.length > 0 && (
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-semibold text-[#C5A880] mb-2.5 flex items-center gap-1.5 select-none">
                        <Clock className="w-3.5 h-3.5" /> Recent Searches
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <div
                            key={term}
                            className="group flex items-center gap-1.5 px-3 py-1 bg-[#FAF8F5] border border-[#EFECE7] rounded-full text-xs text-[#4A4A4A] hover:border-[#C5A880] transition-colors"
                          >
                            <button
                              onClick={() => handleSearchSubmit(term)}
                              className="hover:text-[#C5A880] font-medium"
                            >
                              {term}
                            </button>
                            <button
                              onClick={() => deleteRecentSearch(term)}
                              className="p-0.5 rounded-full hover:bg-[#EFECE7] transition-colors"
                              aria-label={`Remove ${term}`}
                            >
                              <X className="w-2.5 h-2.5 text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-semibold text-[#C5A880] mb-3 select-none">Popular Categories</h4>
                      <ul className="space-y-2">
                        {[
                          { name: "Earrings", slug: "earrings" },
                          { name: "Necklace", slug: "necklace" },
                          { name: "Long Haram", slug: "long-haram" },
                          { name: "Bangles", slug: "bangles" },
                          { name: "Finger Rings", slug: "finger-rings" }
                        ].map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              href={`/shop?category=${cat.slug}`}
                              onClick={() => {
                                saveRecentSearch(cat.name);
                                setIsSearchOpen(false);
                              }}
                              className="text-xs text-[#4A4A4A] hover:text-[#C5A880] font-medium flex items-center gap-2 transition-colors group"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#EFECE7] group-hover:bg-[#C5A880] transition-colors" />
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase tracking-widest font-semibold text-[#C5A880] mb-3 select-none">Trending Searches</h4>
                      <ul className="space-y-2">
                        {[
                          "1 Gram Gold Necklace",
                          "Bridal Choker",
                          "Ruby Earrings",
                          "Kemp Vaddanam",
                          "Panchaloham Rings"
                        ].map((term) => (
                          <li key={term}>
                            <button
                              onClick={() => handleSearchSubmit(term)}
                              className="text-xs text-[#4A4A4A] hover:text-[#C5A880] font-medium flex items-center gap-2 text-left transition-colors group"
                            >
                              <Search className="w-3 h-3 text-gray-400 group-hover:text-[#C5A880] transition-colors" />
                              {term}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 max-h-[70vh] overflow-y-auto no-scrollbar space-y-4">
                  <h4 className="text-[10px] uppercase tracking-widest font-semibold text-[#C5A880] select-none">Search Results</h4>
                  {searchLoading ? (
                    <div className="flex items-center justify-center py-10">
                      <div className="w-6 h-6 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="divide-y divide-[#EFECE7]">
                      {searchResults.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.slug}`}
                          onClick={() => {
                            saveRecentSearch(searchVal);
                            setIsSearchOpen(false);
                            setSearchVal("");
                          }}
                          className="flex items-center gap-4 py-3 group cursor-pointer"
                        >
                          <div className="relative w-12 h-12 bg-[#FAF8F5] border border-[#EFECE7] rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={prod.images?.[0]?.url || "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80"}
                              alt={prod.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h5 className="text-xs font-semibold text-[#1A1A1A] truncate group-hover:text-[#C5A880] transition-colors">
                              {prod.name}
                            </h5>
                            <p className="text-[10px] text-gray-400 truncate uppercase tracking-wider">{prod.sku}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {prod.salePrice ? (
                              <div>
                                <span className="text-xs font-semibold text-[#C5A880]">₹{prod.salePrice.toLocaleString()}</span>
                                <span className="text-[10px] text-gray-400 line-through ml-1.5">₹{prod.price.toLocaleString()}</span>
                              </div>
                            ) : (
                              <span className="text-xs font-semibold text-[#1A1A1A]">₹{prod.price.toLocaleString()}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 py-6 text-center select-none">No products found matching &ldquo;{searchVal}&rdquo;</p>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
