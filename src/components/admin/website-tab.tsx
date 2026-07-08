"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Save, Globe, Info, Clock, Mail, Phone, MapPin, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function WebsiteTab() {
  const [formBusinessName, setFormBusinessName] = useState("");
  const [formLogoText, setFormLogoText] = useState("");
  const [formLogoSubText, setFormLogoSubText] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formStoreTimings, setFormStoreTimings] = useState("");
  const [formHeroTitle, setFormHeroTitle] = useState("");
  const [formHeroSubtitle, setFormHeroSubtitle] = useState("");
  const [formOfferBannerText, setFormOfferBannerText] = useState("");

  const [loading, setLoading] = useState(true);
  const [isDirty, setIsDirty] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data) {
        setFormBusinessName(data.brandName || "");
        setFormLogoText(data.logoText || "");
        setFormLogoSubText(data.logoSubText || "");
        setFormPhone(data.phone || "");
        setFormEmail(data.email || "");
        setFormAddress(data.addressLine1 || "");
        setFormStoreTimings(data.storeTimings || "");
        setFormHeroTitle(data.defaultMetaTitle || "");
        setFormHeroSubtitle(data.tagline || "");
        setFormOfferBannerText(data.defaultOgImage || "");
      }
    } catch (err) {
      console.error("Error loading settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleFieldChange = <T,>(setter: (v: T) => void, val: T) => {
    setter(val);
    setIsDirty(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formBusinessName || !formLogoText || !formPhone || !formEmail || !formAddress || !formStoreTimings) {
      showToastLocal("Please fill in all required fields marked with *");
      return;
    }

    const payload = {
      brandName: formBusinessName,
      logoText: formLogoText,
      logoSubText: formLogoSubText,
      phone: formPhone,
      email: formEmail,
      addressLine1: formAddress,
      storeTimings: formStoreTimings,
      defaultMetaTitle: formHeroTitle,
      tagline: formHeroSubtitle,
      defaultOgImage: formOfferBannerText,
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsDirty(false);
        showToastLocal("Website settings saved successfully to active showroom DB!");
      } else {
        showToastLocal("Failed to save website settings.");
      }
    } catch (err) {
      console.error(err);
      showToastLocal("An error occurred while saving.");
    }
  };

  const handleReset = () => {
    loadSettings();
    setIsDirty(false);
    showToastLocal("Changes discarded.");
  };

  const showToastLocal = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mr-3" />
        <span className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Loading configurations...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans antialiased text-[#1A1A1A] max-w-4xl">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border bg-emerald-600 text-white border-emerald-700 text-xs uppercase tracking-wider font-semibold transition-all duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Info card */}
      <div className="flex gap-4 p-5 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-2xl text-xs text-slate-800 leading-relaxed font-bold shadow-sm">
        <Info className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-serif text-[#1A1A1A] font-extrabold text-sm mb-1 uppercase tracking-wide">Live Content Syncing</h4>
          <p>
            Any modifications saved here are stored in your active PostgreSQL database and will immediately update the customer-facing headers, footers, boutique visit sections, and pages.
          </p>
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {isDirty && (
        <div className="flex items-center justify-between gap-4 p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>You have unsaved changes. Remember to save before exiting!</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-[10px] uppercase font-bold tracking-wider text-slate-700 hover:text-slate-950 underline"
          >
            Discard
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Hero & Announcements */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-slate-950 font-bold border-b pb-2 flex items-center gap-2 uppercase tracking-wide">
            <Globe className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Homepage Banner &amp; Announcements
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="web-offer" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Offer Announcement Bar Text
              </Label>
              <Input
                id="web-offer"
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formOfferBannerText}
                onChange={(e) => handleFieldChange(setFormOfferBannerText, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="web-hero-title" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Hero Banner Main Headline
              </Label>
              <Input
                id="web-hero-title"
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formHeroTitle}
                onChange={(e) => handleFieldChange(setFormHeroTitle, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="web-hero-sub" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Hero Banner Subheading
              </Label>
              <Input
                id="web-hero-sub"
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formHeroSubtitle}
                onChange={(e) => handleFieldChange(setFormHeroSubtitle, e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Logo and Branding */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-slate-950 font-bold border-b pb-2 flex items-center gap-2 uppercase tracking-wide">
            <Globe className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Brand Settings &amp; Logo Labels
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="web-brand" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Business Brand Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-brand"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formBusinessName}
                onChange={(e) => handleFieldChange(setFormBusinessName, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="web-logo-txt" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Logo Main Text <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-logo-txt"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formLogoText}
                onChange={(e) => handleFieldChange(setFormLogoText, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="web-logo-sub" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Logo Sub Text
              </Label>
              <Input
                id="web-logo-sub"
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formLogoSubText}
                onChange={(e) => handleFieldChange(setFormLogoSubText, e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact & Store Visit Details */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-slate-950 font-bold border-b pb-2 flex items-center gap-2 uppercase tracking-wide">
            <Globe className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Location &amp; Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="web-phone" className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" /> Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-phone"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formPhone}
                onChange={(e) => handleFieldChange(setFormPhone, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="web-email" className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> Email Support <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-email"
                required
                type="email"
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formEmail}
                onChange={(e) => handleFieldChange(setFormEmail, e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="web-address" className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> Wanaparthy Boutique Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-address"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formAddress}
                onChange={(e) => handleFieldChange(setFormAddress, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="web-timings" className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Showroom Opening Timings <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-timings"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formStoreTimings}
                onChange={(e) => handleFieldChange(setFormStoreTimings, e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-3.5 border-t border-[#EFECE7] pt-6 select-none">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={!isDirty}
            className="border-[#D1CFC9] text-slate-700 hover:bg-slate-50 font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all"
          >
            Discard
          </Button>
          <Button
            type="submit"
            disabled={!isDirty}
            className="bg-[#C5A880] hover:bg-[#b0936b] text-white font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Configurations
          </Button>
        </div>
      </form>
    </div>
  );
}
