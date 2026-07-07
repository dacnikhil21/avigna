"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingBag,
  Users,
  Globe,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  User,
  Loader2,
  Lock,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Tabs
import { DashboardTab } from "@/components/admin/dashboard-tab";
import { ProductsTab } from "@/components/admin/products-tab";
import { CategoriesTab } from "@/components/admin/categories-tab";
import { OrdersTab } from "@/components/admin/orders-tab";
import { CustomersTab } from "@/components/admin/customers-tab";
import { WebsiteTab } from "@/components/admin/website-tab";
import { ReportsTab } from "@/components/admin/reports-tab";
import { SettingsTab } from "@/components/admin/settings-tab";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const {
    isLoggedIn,
    activeTab,
    login,
    logout,
    setActiveTab,
    websiteSettings
  } = useAdminStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#C5A880] animate-spin" />
      </div>
    );
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    setTimeout(() => {
      const success = login(usernameInput.trim(), passwordInput.trim());
      setIsSubmitting(false);
      if (!success) {
        setErrorMsg("Invalid Username or Password.");
      }
    }, 800);
  };

  // If not logged in, render the Vercel/Stripe-styled Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 font-sans">
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-luxury border border-[#EFECE7] p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center mx-auto mb-4 border border-[#C5A880]/20">
              <Lock className="w-5 h-5 text-[#C5A880]" />
            </div>
            <h1 className="font-serif text-2xl text-[#121212] font-light">
              Admin Portal
            </h1>
            <p className="text-xs text-luxury-muted mt-2 tracking-wider uppercase">
              {websiteSettings.businessName}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-light flex items-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-xs text-[#121212] uppercase tracking-wider font-light">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                required
                placeholder="Enter admin username"
                className="input-luxury rounded-xl"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs text-[#121212] uppercase tracking-wider font-light">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="input-luxury rounded-xl"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 rounded-xl"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin mx-auto" />
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-[10px] text-luxury-muted font-light">
              Demo Credentials: admin / admin123
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Define sidebar navigation items
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "categories", label: "Categories", icon: FolderOpen },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "customers", label: "Customers", icon: Users },
    { id: "website", label: "Website", icon: Globe },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const activeItem = navItems.find((item) => item.id === activeTab) || navItems[0];

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex font-sans text-sm text-[#1A1A1A] antialiased">
      
      {/* Sidebar - Shopify/Stripe aesthetics */}
      <aside className={`bg-white border-r border-[#EFECE7] flex flex-col shrink-0 transition-all duration-300 shadow-sm ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}>
        
        {/* Brand Header */}
        <div className="h-20 px-4 border-b border-[#EFECE7] flex items-center justify-between overflow-hidden">
          {!isSidebarCollapsed ? (
            <div className="flex flex-col pl-2 animate-in fade-in duration-300">
              <span className="font-serif text-lg font-bold text-slate-950 tracking-wider leading-none">
                {websiteSettings.logoText}
              </span>
              <span className="text-[7.5px] uppercase tracking-[0.25em] text-[#C5A880] mt-1 font-bold leading-none">
                {websiteSettings.logoSubText}
              </span>
            </div>
          ) : (
            <div className="mx-auto flex items-center justify-center animate-in fade-in duration-300">
              <span className="font-serif text-xl font-bold text-slate-950 bg-[#C5A880]/10 px-2.5 py-1.5 rounded-xl border border-[#C5A880]/20">
                SA
              </span>
            </div>
          )}
          {!isSidebarCollapsed && (
            <div className="text-[8px] bg-[#C5A880]/10 border border-[#C5A880]/20 text-[#C5A880] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase">
              v1.0
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav className="flex-grow px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center py-3.5" : "px-4 py-3.5 gap-3.5"
                } ${
                  isActive
                    ? "bg-[#C5A880]/10 text-slate-950 font-extrabold border-l-4 border-[#C5A880]"
                    : "text-slate-800 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? "text-[#C5A880] stroke-[2.5]" : "text-slate-700 stroke-[2]"}`} />
                {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Toggle & Logout Buttons in Footer */}
        <div className="p-3 border-t border-[#EFECE7] space-y-1.5">
          {/* Collapse Toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`w-full flex items-center text-xs uppercase tracking-wider font-bold text-slate-800 hover:bg-slate-50 hover:text-slate-950 rounded-xl py-2.5 transition-all duration-200 ${
              isSidebarCollapsed ? "justify-center" : "px-4 gap-3.5"
            }`}
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="w-4.5 h-4.5 text-slate-700" />
            ) : (
              <>
                <ChevronLeft className="w-4.5 h-4.5 text-slate-700" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            title={isSidebarCollapsed ? "Logout" : undefined}
            className={`w-full flex items-center text-xs uppercase tracking-wider font-bold text-[#A84A4A] hover:bg-red-50 hover:text-red-700 rounded-xl py-3 transition-all duration-200 ${
              isSidebarCollapsed ? "justify-center" : "px-4 gap-3.5"
            }`}
          >
            <LogOut className="w-4.5 h-4.5 text-red-500 stroke-[2.5]" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Panel Content Container */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Dashboard Topbar */}
        <header className="h-20 bg-white border-b border-[#EFECE7] flex items-center justify-between px-8 md:px-10 shrink-0">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-950 tracking-wide">
              {activeItem.label}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Search Bar mockup */}
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 stroke-[2]" />
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full bg-[#FAF8F5] border border-transparent hover:border-[#EFECE7] focus:border-[#C5A880] focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all duration-200 placeholder-slate-500 font-bold"
              />
            </div>

            {/* Icons */}
            <button className="relative p-2 text-slate-600 hover:text-slate-950 transition-colors">
              <Bell className="w-4.5 h-4.5 stroke-[2]" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#C5A880] rounded-full" />
            </button>

            <div className="h-8 w-px bg-[#EFECE7]" />

            {/* Profile Info */}
            <div className="flex items-center gap-3 select-none">
              <div className="w-9 h-9 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/20 flex items-center justify-center">
                <User className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-950 leading-none">Administrator</p>
                <p className="text-[9px] text-slate-500 mt-1 leading-none tracking-wide font-bold uppercase">admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tab View Switcher */}
        <main className="flex-grow p-8 md:p-10 overflow-y-auto">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "categories" && <CategoriesTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "customers" && <CustomersTab />}
          {activeTab === "website" && <WebsiteTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}
