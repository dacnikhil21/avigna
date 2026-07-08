"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BRAND, products as initialProducts, categories as initialCategories } from "@/lib/data";
import type { Product, Category } from "@/types";
import type { HeroSlide, AnnouncementBar } from "@prisma/client";

export interface MockOrder {
  id: string;
  customer: string;
  phone: string;
  email: string;
  products: string;
  amount: number;
  payment: string;
  status: "Pending" | "Accepted" | "Processing" | "Delivered" | "Cancelled";
  date: string;
}

export interface MockCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  orders: number;
  totalPurchase: number;
}

export interface WebsiteSettings {
  businessName: string;
  logoText: string;
  logoSubText: string;
  phone: string;
  email: string;
  address: string;
  storeTimings: string;
  heroTitle: string;
  heroSubtitle: string;
  offerBannerText: string;
  gst: string;
}

interface AdminStore {
  isLoggedIn: boolean;
  activeTab: string;
  products: Product[];
  categories: Category[];
  orders: MockOrder[];
  customers: MockCustomer[];
  websiteSettings: WebsiteSettings;
  
  // Actions
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setActiveTab: (tab: string) => void;
  
  // Product Actions
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt" | "category" | "slug">) => void;
  editProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  
  // Category Actions
  addCategory: (category: Omit<Category, "id" | "slug">) => void;
  editCategory: (id: string, updated: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  toggleHideCategory: (id: string) => void;
  
  // Order Actions
  updateOrderStatus: (id: string, status: MockOrder["status"]) => void;
  
  // Website Settings Actions
  updateWebsiteSettings: (settings: Partial<WebsiteSettings>) => void;
}

// Initial mock orders
const initialOrders: MockOrder[] = [
  {
    id: "ORD-2026-0001",
    customer: "Meenakshi Rao",
    phone: "9848022338",
    email: "meenakshi@gmail.com",
    products: "Temple Kemp Jhumka Earrings (1), Kemp Vanki Bangle (2)",
    amount: 4800,
    payment: "Razorpay",
    status: "Delivered",
    date: "2026-07-01",
  },
  {
    id: "ORD-2026-0002",
    customer: "Sravani Reddy",
    phone: "9988776655",
    email: "sravani.reddy@yahoo.com",
    products: "Antique Lakshmi Haram Set (1)",
    amount: 6500,
    payment: "Cash on Delivery",
    status: "Processing",
    date: "2026-07-06",
  },
  {
    id: "ORD-2026-0003",
    customer: "Prathyusha K",
    phone: "8123456789",
    email: "prathyusha.k@gmail.com",
    products: "Guttapusalu Pearl Choker (1)",
    amount: 3200,
    payment: "Razorpay",
    status: "Pending",
    date: "2026-07-07",
  },
  {
    id: "ORD-2026-0004",
    customer: "Hema Latha",
    phone: "7013099887",
    email: "hemalatha@gmail.com",
    products: "Ruby Kemp Necklace Set (1), Kemp Vanki Bangle (1)",
    amount: 5400,
    payment: "Razorpay",
    status: "Cancelled",
    date: "2026-07-05",
  },
];

// Initial mock customers
const initialCustomers: MockCustomer[] = [
  {
    id: "cust-1",
    name: "Meenakshi Rao",
    phone: "9848022338",
    email: "meenakshi@gmail.com",
    orders: 2,
    totalPurchase: 9600,
  },
  {
    id: "cust-2",
    name: "Sravani Reddy",
    phone: "9988776655",
    email: "sravani.reddy@yahoo.com",
    orders: 1,
    totalPurchase: 6500,
  },
  {
    id: "cust-3",
    name: "Prathyusha K",
    phone: "8123456789",
    email: "prathyusha.k@gmail.com",
    orders: 1,
    totalPurchase: 3200,
  },
  {
    id: "cust-4",
    name: "Hema Latha",
    phone: "7013099887",
    email: "hemalatha@gmail.com",
    orders: 1,
    totalPurchase: 0,
  },
];

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      activeTab: "dashboard",
      products: initialProducts,
      categories: initialCategories,
      orders: initialOrders,
      customers: initialCustomers,
      websiteSettings: {
        businessName: BRAND.name,
        logoText: "Sri Avighna",
        logoSubText: "1 Gram Gold Jewellery",
        phone: BRAND.phone,
        email: BRAND.email,
        address: BRAND.address,
        storeTimings: "10:30 AM – 9:00 PM",
        heroTitle: "Where Sacred Heritage Meets Timeless Celebration",
        heroSubtitle: "SRI AVIGHNA 1 GRAM GOLD JEWELLERY",
        offerBannerText: "FREE SHIPPING ON ALL ORDERS | BIS 916 CERTIFIED",
        gst: "36AAAAA1111A1Z1",
      },

      login: (username, password) => {
        if (username.trim() === "admin" && password.trim() === "admin123") {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },

      logout: () => set({ isLoggedIn: false, activeTab: "dashboard" }),
      
      setActiveTab: (activeTab) => set({ activeTab }),

      // Product Actions
      addProduct: (p) => {
        const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const category = get().categories.find((c) => c.id === p.categoryId) || initialCategories[0];
        const newProduct: Product = {
          ...p,
          id: `prod-${Math.random().toString(36).substr(2, 9)}`,
          slug,
          category,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          products: [newProduct, ...state.products],
        }));
      },

      editProduct: (id, updated) => {
        set((state) => {
          const categoryId = updated.categoryId || state.products.find((p) => p.id === id)?.categoryId;
          const category = state.categories.find((c) => c.id === categoryId);
          return {
            products: state.products.map((p) =>
              p.id === id
                ? {
                    ...p,
                    ...updated,
                    category: category ? category : p.category,
                    updatedAt: new Date(),
                  }
                : p
            ),
          };
        });
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      duplicateProduct: (id) => {
        const product = get().products.find((p) => p.id === id);
        if (product) {
          const newProduct: Product = {
            ...product,
            id: `prod-${Math.random().toString(36).substr(2, 9)}`,
            name: `${product.name} (Copy)`,
            slug: `${product.slug}-copy`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          set((state) => ({
            products: [newProduct, ...state.products],
          }));
        }
      },

      // Category Actions
      addCategory: (c) => {
        const slug = c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const newCategory: Category = {
          ...c,
          id: `cat-${Math.random().toString(36).substr(2, 9)}`,
          slug,
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      editCategory: (id, updated) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updated } : c
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },

      toggleHideCategory: (id) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c
          ),
        }));
      },

      // Order Actions
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        }));
      },

      // Website Settings Actions
      updateWebsiteSettings: (updated) => {
        set((state) => ({
          websiteSettings: { ...state.websiteSettings, ...updated },
        }));
      },
    }),
    {
      name: "avighna-admin-store",
    }
  )
);

export function useWebsiteData(): {
  brand: WebsiteSettings;
  products: Product[];
  categories: Category[];
  heroSlides: HeroSlide[];
  announcements: AnnouncementBar[];
} {
  const store = useAdminStore();
  return useWebsiteDataInternal(store);
}

import React from "react";

function useWebsiteDataInternal(store: {
  websiteSettings: WebsiteSettings;
  products: Product[];
  categories: Category[];
}): {
  brand: WebsiteSettings;
  products: Product[];
  categories: Category[];
  heroSlides: HeroSlide[];
  announcements: AnnouncementBar[];
} {
  const [mounted, setMounted] = React.useState(false);
  const [heroSlides, setHeroSlides] = React.useState<HeroSlide[]>([]);
  const [announcements, setAnnouncements] = React.useState<AnnouncementBar[]>([]);
  const [brand, setBrand] = React.useState<WebsiteSettings>({
    businessName: "Sri Avighna 1 Gram Gold Jewellery",
    logoText: "Sri Avighna",
    logoSubText: "1 Gram Gold Jewellery",
    phone: "7013004127",
    email: "avighnacollections1@gmail.com",
    address: "Beside More Supermarket, Opp RR Complex, Polytechnic Road, Wanaparthy - 509103",
    storeTimings: "10:30 AM – 9:00 PM",
    heroTitle: "Where Sacred Heritage Meets Timeless Celebration",
    heroSubtitle: "SRI AVIGHNA 1 GRAM GOLD JEWELLERY",
    offerBannerText: "FREE SHIPPING ON ALL ORDERS | BIS 916 CERTIFIED",
    gst: "36AAAAA1111A1Z1",
  });

  React.useEffect(() => {
    setMounted(true);
    async function loadCMSData() {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        if (data.settings) {
          setBrand((prev) => ({
            ...prev,
            businessName: data.settings.brandName || prev.businessName,
            logoText: data.settings.logoText || prev.logoText,
            logoSubText: data.settings.logoSubText || prev.logoSubText,
            phone: data.settings.phone || prev.phone,
            email: data.settings.email || prev.email,
            address: data.settings.addressLine1 || prev.address,
            storeTimings: data.settings.storeTimings || prev.storeTimings,
            gst: data.settings.gstNumber || prev.gst,
          }));
        }
        if (data.heroSlides && data.heroSlides.length > 0) {
          setHeroSlides(data.heroSlides);
          setBrand((prev) => ({
            ...prev,
            heroTitle: data.heroSlides[0].title || prev.heroTitle,
            heroSubtitle: data.heroSlides[0].subtitle || prev.heroSubtitle,
          }));
        }
        if (data.announcements && data.announcements.length > 0) {
          setAnnouncements(data.announcements);
          setBrand((prev) => ({
            ...prev,
            offerBannerText: data.announcements.map((a: { text: string }) => a.text).join(" | "),
          }));
        }
      } catch (err) {
        console.error("Error fetching CMS settings:", err);
      }
    }
    loadCMSData();
  }, []);

  const defaultBrand = {
    businessName: "Sri Avighna 1 Gram Gold Jewellery",
    logoText: "Sri Avighna",
    logoSubText: "1 Gram Gold Jewellery",
    phone: "7013004127",
    email: "avighnacollections1@gmail.com",
    address: "Beside More Supermarket, Opp RR Complex, Polytechnic Road, Wanaparthy - 509103",
    storeTimings: "10:30 AM – 9:00 PM",
    heroTitle: "Where Sacred Heritage Meets Timeless Celebration",
    heroSubtitle: "SRI AVIGHNA 1 GRAM GOLD JEWELLERY",
    offerBannerText: "FREE SHIPPING ON ALL ORDERS | BIS 916 CERTIFIED",
    gst: "36AAAAA1111A1Z1",
  };

  if (!mounted) {
    return {
      brand: defaultBrand,
      products: store.products,
      categories: store.categories,
      heroSlides: [],
      announcements: [],
    };
  }

  return {
    brand,
    products: store.products,
    categories: store.categories,
    heroSlides,
    announcements,
  };
}
