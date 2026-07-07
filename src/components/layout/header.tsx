"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Heart, User, ChevronDown, MessageCircle, MapPin, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";

const MESSAGES = [
  "Complimentary Insured Shipping Across India",
  "WhatsApp Styling Concierge Available",
  "Visit Our Boutique – Wanaparthy, Telangana"
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { totalItems, openCart } = useCartStore();
  const itemCount = totalItems();
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Rotate announcement messages
  useEffect(() => {
    if (!showAnnouncement) return;
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [showAnnouncement]);

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

  const isHeaderDark = !isScrolled && !isMegaMenuOpen && !isSearchOpen;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col w-full">
        {/* Luxury Announcement Bar */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 34, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="w-full bg-[#FAF8F5] border-b border-[#EFECE7] relative overflow-hidden flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center w-full h-full px-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                    className="text-[12px] font-medium tracking-[0.08em] font-dmsans text-[#121212] uppercase text-center"
                  >
                    {MESSAGES[currentMessageIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <button
                onClick={() => setShowAnnouncement(false)}
                className="absolute right-4 p-1 hover:bg-black/5 rounded-full transition-colors text-[#121212]"
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
            isScrolled
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

            {/* Desktop Left Navigation */}
            <nav className={cn(
              "hidden lg:flex items-center gap-8 text-[13px] tracking-[0.08em] uppercase font-sans font-medium transition-colors duration-300",
              isHeaderDark ? "text-white" : "text-[#121212]"
            )}>
              <div
                onMouseEnter={() => handleShopHover(true)}
                onMouseLeave={() => handleShopHover(false)}
                className="relative py-8 cursor-pointer"
              >
                <span className="flex items-center gap-1 hover:text-[#C5A880] transition-colors duration-300">
                  Shop <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </div>
              <Link href="/collections" className="hover:text-[#C5A880] transition-colors duration-300 py-8">
                Collections
              </Link>
              <Link href="/bridal-salon" className="hover:text-[#C5A880] transition-colors duration-300 py-8">
                Bridal Salon
              </Link>
              <Link href="/about" className="hover:text-[#C5A880] transition-colors duration-300 py-8">
                Our Story
              </Link>
            </nav>

            {/* Centered Monogram / Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center group z-10">
              <div className="flex flex-col items-center">
                <span className={cn(
                  "font-serif text-xl md:text-2xl font-light tracking-[0.08em] transition-colors duration-300",
                  isHeaderDark ? "text-white" : "text-[#121212]"
                )}>
                  Avighna
                </span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-[#C5A880] mt-0.5 font-medium">
                  Collections
                </span>
              </div>
            </Link>

            {/* Desktop Right Navigation Utilities */}
            <div className={cn(
              "hidden lg:flex items-center gap-6 text-[13px] tracking-[0.08em] uppercase font-sans font-medium transition-colors duration-300",
              isHeaderDark ? "text-white" : "text-[#121212]"
            )}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors duration-300"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px] tracking-wider">Search</span>
              </button>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4 text-[#C5A880]" />
                <span>Concierge</span>
              </a>

              <Link
                href="/wishlist"
                className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px] tracking-wider">Wishlist</span>
              </Link>

              <button
                onClick={openCart}
                className="relative flex items-center gap-1.5 hover:text-[#C5A880] transition-colors duration-300"
                aria-label="Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px] tracking-wider">Cart</span>
                {itemCount > 0 && (
                  <span className="flex items-center justify-center bg-[#C5A880] text-white text-[9px] font-bold rounded-full w-4 h-4 -mt-1">
                    {itemCount}
                  </span>
                )}
              </button>

              <Link
                href="/account"
                className="flex items-center gap-1.5 hover:text-[#C5A880] transition-colors duration-300"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px] tracking-wider">Account</span>
              </Link>
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
                        Shop by Category
                      </h4>
                      <ul className="space-y-2 text-[13px] text-[#121212] font-normal tracking-[0.02em]">
                        <li><Link href="/shop?category=necklaces" className="hover:text-[#C5A880] transition-colors duration-250">Necklaces & Chokers</Link></li>
                        <li><Link href="/shop?category=earrings" className="hover:text-[#C5A880] transition-colors duration-250">Earrings & Jhumkas</Link></li>
                        <li><Link href="/shop?category=bangles" className="hover:text-[#C5A880] transition-colors duration-250">Bangles & Kadas</Link></li>
                        <li><Link href="/shop?category=rings" className="hover:text-[#C5A880] transition-colors duration-250">Rings & Accessories</Link></li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-[#C5A880] mb-4">
                        Shop by Occasion
                      </h4>
                      <ul className="space-y-2 text-[13px] text-[#121212] font-normal tracking-[0.02em]">
                        <li><Link href="/shop?occasion=wedding" className="hover:text-[#C5A880] transition-colors duration-250">Wedding Wear</Link></li>
                        <li><Link href="/shop?occasion=festival" className="hover:text-[#C5A880] transition-colors duration-250">Festival Wear</Link></li>
                        <li><Link href="/shop?occasion=daily" className="hover:text-[#C5A880] transition-colors duration-250">Daily Wear</Link></li>
                        <li><Link href="/shop?occasion=office" className="hover:text-[#C5A880] transition-colors duration-250">Office Wear</Link></li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-sans font-semibold text-[11px] tracking-[0.1em] uppercase text-[#C5A880] mb-4">
                        Shop by Collection
                      </h4>
                      <ul className="space-y-2 text-[13px] text-[#121212] font-normal tracking-[0.02em]">
                        <li><Link href="/collections/temple-gold" className="hover:text-[#C5A880] transition-colors duration-250">Temple Gold</Link></li>
                        <li><Link href="/collections/antique-royal" className="hover:text-[#C5A880] transition-colors duration-250">Antique Royal</Link></li>
                        <li><Link href="/collections/modern-minimalist" className="hover:text-[#C5A880] transition-colors duration-250">Modern Minimalist</Link></li>
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
                        src="https://images.unsplash.com/photo-1603561596112-0a132b757442?w=800&q=80"
                        alt="Temple Gold Collection Editorial"
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
                  <span className="font-serif text-2xl font-light">Avighna</span>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">
                    Collections
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
                        <Link href="/shop" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">All Jewelry</Link>
                        <Link href="/shop?category=necklaces" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">Necklaces & Chokers</Link>
                        <Link href="/shop?category=earrings" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">Earrings & Jhumkas</Link>
                        <Link href="/shop?category=bangles" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">Bangles & Kadas</Link>
                        <Link href="/shop?category=rings" onClick={() => setIsMobileOpen(false)} className="text-sm py-1.5 hover:text-[#C5A880] font-normal">Rings & Accessories</Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/collections" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40">
                  Collections
                </Link>

                <Link href="/bridal-salon" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40">
                  Bridal Salon
                </Link>

                <Link href="/about" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40">
                  Our Story
                </Link>

                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="py-2 hover:text-[#C5A880] transition-colors duration-300 text-left border-b border-[#EFECE7]/40 flex items-center gap-2"
                >
                  <Search className="w-4.5 h-4.5" />
                  <span>Search</span>
                </button>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40 flex items-center gap-2"
                >
                  <MessageCircle className="w-4.5 h-4.5 text-[#C5A880]" />
                  <span>Concierge</span>
                </a>

                <Link href="/wishlist" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 border-b border-[#EFECE7]/40 flex items-center gap-2">
                  <Heart className="w-4.5 h-4.5" />
                  <span>Wishlist</span>
                </Link>

                <Link href="/account" onClick={() => setIsMobileOpen(false)} className="py-2 hover:text-[#C5A880] transition-colors duration-300 flex items-center gap-2">
                  <User className="w-4.5 h-4.5" />
                  <span>Account</span>
                </Link>
              </div>

              {/* Bottom utilities inside mobile drawer */}
              <div className="mt-auto pt-6 border-t border-[#EFECE7] flex flex-col gap-3">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#121212] hover:text-[#C5A880] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#C5A880]" />
                  <span>WhatsApp Concierge</span>
                </a>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-[#121212] hover:text-[#C5A880] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C5A880]" />
                  <span>Boutique Locator</span>
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

      {/* Mobile Sticky Bottom Utility Bar (Search, Wishlist, Shop, Account) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#EFECE7] h-[64px] flex items-center justify-around md:hidden pb-safe">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center p-2 text-[#121212] hover:text-[#C5A880] transition-colors duration-250 w-16"
          aria-label="Search"
        >
          <Search className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Search</span>
        </button>

        <Link
          href="/wishlist"
          className="flex flex-col items-center justify-center p-2 text-[#121212] hover:text-[#C5A880] transition-colors duration-250 w-16"
          aria-label="Wishlist"
        >
          <Heart className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Wishlist</span>
        </Link>

        <Link
          href="/shop"
          className="flex flex-col items-center justify-center p-2 text-[#121212] hover:text-[#C5A880] transition-colors duration-250 w-16"
          aria-label="Shop"
        >
          <ShoppingBag className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Shop</span>
        </Link>

        <Link
          href="/account"
          className="flex flex-col items-center justify-center p-2 text-[#121212] hover:text-[#C5A880] transition-colors duration-250 w-16"
          aria-label="Account"
        >
          <User className="w-4.5 h-4.5" />
          <span className="text-[9px] tracking-wider uppercase font-medium mt-1 font-sans">Account</span>
        </Link>
      </div>

      {/* Full-screen Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#FAF8F5]/98 flex flex-col items-center justify-start pt-32 px-6"
          >
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 p-3 hover:bg-black/5 rounded-full transition-colors duration-300"
              aria-label="Close search"
            >
              <X className="w-6 h-6 text-[#121212]" />
            </button>
            <div className="w-full max-w-2xl text-center">
              <h3 className="font-serif text-2xl font-light text-[#121212] mb-8 uppercase tracking-wider">Search Our Boutique</h3>
              <input
                type="text"
                placeholder="What are you seeking today?"
                className="w-full border-b border-[#121212] py-4 text-2xl md:text-3xl font-light text-[#121212] placeholder:text-gray-400 bg-transparent focus:outline-none text-center"
                autoFocus
              />
              <div className="mt-12">
                <h4 className="font-sans font-medium text-xs tracking-[0.1em] uppercase text-[#C5A880] mb-4">Suggested Discoveries</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Temple Chokers", "Polki Earrings", "Bridal Sets", "Gold Bangles"].map((item) => (
                    <Link
                      key={item}
                      href={`/shop?q=${encodeURIComponent(item)}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="px-4 py-2 border border-[#EFECE7] hover:border-[#C5A880] hover:text-[#C5A880] text-sm text-[#121212] transition-colors duration-250 font-sans"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
