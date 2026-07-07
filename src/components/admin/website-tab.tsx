"use client";

import { useState, useEffect } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { CheckCircle2, Save, Globe, Info, Clock, Mail, Phone, MapPin, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function WebsiteTab() {
  const { websiteSettings, updateWebsiteSettings } = useAdminStore();

  // Local Form States
  const [formBusinessName, setFormBusinessName] = useState(websiteSettings.businessName);
  const [formLogoText, setFormLogoText] = useState(websiteSettings.logoText);
  const [formLogoSubText, setFormLogoSubText] = useState(websiteSettings.logoSubText);
  const [formPhone, setFormPhone] = useState(websiteSettings.phone);
  const [formEmail, setFormEmail] = useState(websiteSettings.email);
  const [formAddress, setFormAddress] = useState(websiteSettings.address);
  const [formStoreTimings, setFormStoreTimings] = useState(websiteSettings.storeTimings);
  const [formHeroTitle, setFormHeroTitle] = useState(websiteSettings.heroTitle);
  const [formHeroSubtitle, setFormHeroSubtitle] = useState(websiteSettings.heroSubtitle);
  const [formOfferBannerText, setFormOfferBannerText] = useState(websiteSettings.offerBannerText);

  const [isDirty, setIsDirty] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleFieldChange = <T,>(setter: (v: T) => void, val: T) => {
    setter(val);
    setIsDirty(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formBusinessName || !formLogoText || !formPhone || !formEmail || !formAddress || !formStoreTimings) {
      setToastMsg("Please fill in all required fields marked with *");
      setTimeout(() => setToastMsg(""), 3000);
      return;
    }

    updateWebsiteSettings({
      businessName: formBusinessName,
      logoText: formLogoText,
      logoSubText: formLogoSubText,
      phone: formPhone,
      email: formEmail,
      address: formAddress,
      storeTimings: formStoreTimings,
      heroTitle: formHeroTitle,
      heroSubtitle: formHeroSubtitle,
      offerBannerText: formOfferBannerText,
    });

    setIsDirty(false);
    setToastMsg("Website settings saved! Changes reflect immediately on customer pages.");
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleReset = () => {
    setFormBusinessName(websiteSettings.businessName);
    setFormLogoText(websiteSettings.logoText);
    setFormLogoSubText(websiteSettings.logoSubText);
    setFormPhone(websiteSettings.phone);
    setFormEmail(websiteSettings.email);
    setFormAddress(websiteSettings.address);
    setFormStoreTimings(websiteSettings.storeTimings);
    setFormHeroTitle(websiteSettings.heroTitle);
    setFormHeroSubtitle(websiteSettings.heroSubtitle);
    setFormOfferBannerText(websiteSettings.offerBannerText);
    setIsDirty(false);
    showToastLocal("Changes discarded.");
  };

  const showToastLocal = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

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
            Any modifications saved here are stored in your active session and will immediately update the customer-facing headers, footers, boutique visit sections, and pages.
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
                Logo Subtitle / Tagline
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

        {/* Section 3: Contact & Showroom */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-slate-950 font-bold border-b pb-2 flex items-center gap-2 uppercase tracking-wide">
            <Globe className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Contact &amp; Showroom Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="web-phone" className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-slate-500" /> Phone Number <span className="text-red-500">*</span>
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
                <Mail className="w-4 h-4 text-slate-500" /> Contact Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-email"
                type="email"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formEmail}
                onChange={(e) => handleFieldChange(setFormEmail, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="web-hours" className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" /> Business Hours <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-hours"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formStoreTimings}
                onChange={(e) => handleFieldChange(setFormStoreTimings, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="web-address" className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-500" /> Store Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="web-address"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formAddress}
                onChange={(e) => handleFieldChange(setFormAddress, e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-3.5 pt-4 border-t border-[#EFECE7]">
          {isDirty && (
            <Button
              type="button"
              onClick={handleReset}
              className="bg-white border border-[#D1CFC9] text-slate-800 hover:bg-slate-50 text-xs uppercase tracking-wider font-bold py-3.5 px-6 rounded-xl shadow-sm"
            >
              Discard Changes
            </Button>
          )}
          <Button
            type="submit"
            className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-4 px-8 rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Website Changes
          </Button>
        </div>

      </form>

    </div>
  );
}
