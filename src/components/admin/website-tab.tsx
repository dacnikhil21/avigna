"use client";

import { useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { CheckCircle2, Save, Globe, Info, Clock, Mail, Phone, MapPin } from "lucide-react";
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

  const [toastMsg, setToastMsg] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    setToastMsg("Website settings saved! Changes reflect immediately on customer pages.");
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border bg-[#C5A880] text-white border-[#b8966f] text-xs uppercase tracking-wider font-medium transition-all duration-300 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          {toastMsg}
        </div>
      )}

      {/* Info card */}
      <div className="flex gap-4 p-5 bg-[#C5A880]/5 border border-[#C5A880]/20 rounded-2xl text-xs text-[#6B6560] leading-relaxed">
        <Info className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-serif text-[#121212] font-semibold text-sm mb-1">Live Updates Enabled</h4>
          <p>
            Any modifications saved here are stored in your active session and will immediately update the customer-facing headers, footers, boutique visit sections, and pages.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Hero & Announcements */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-[#121212] font-normal border-b pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C5A880]" />
            Homepage Banner &amp; Announcements
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="web-offer" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Offer Announcement Bar Text
              </Label>
              <Input
                id="web-offer"
                className="input-luxury rounded-xl"
                value={formOfferBannerText}
                onChange={(e) => setFormOfferBannerText(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="web-hero-title" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Hero Banner Main Headline
              </Label>
              <Input
                id="web-hero-title"
                className="input-luxury rounded-xl"
                value={formHeroTitle}
                onChange={(e) => setFormHeroTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="web-hero-sub" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Hero Banner Subheading
              </Label>
              <Input
                id="web-hero-sub"
                className="input-luxury rounded-xl"
                value={formHeroSubtitle}
                onChange={(e) => setFormHeroSubtitle(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Logo and Branding */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-[#121212] font-normal border-b pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C5A880]" />
            Brand Settings &amp; Logo Labels
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="web-brand" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Business Brand Name
              </Label>
              <Input
                id="web-brand"
                className="input-luxury rounded-xl"
                value={formBusinessName}
                onChange={(e) => setFormBusinessName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="web-logo-txt" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Logo Main Text
              </Label>
              <Input
                id="web-logo-txt"
                className="input-luxury rounded-xl"
                value={formLogoText}
                onChange={(e) => setFormLogoText(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="web-logo-sub" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Logo Subtitle / Tagline
              </Label>
              <Input
                id="web-logo-sub"
                className="input-luxury rounded-xl"
                value={formLogoSubText}
                onChange={(e) => setFormLogoSubText(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Contact & Showroom */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-[#121212] font-normal border-b pb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#C5A880]" />
            Contact &amp; Showroom Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="web-phone" className="text-xs uppercase tracking-wider font-light text-[#121212] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" /> Phone Number
              </Label>
              <Input
                id="web-phone"
                className="input-luxury rounded-xl"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="web-email" className="text-xs uppercase tracking-wider font-light text-[#121212] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" /> Contact Email
              </Label>
              <Input
                id="web-email"
                type="email"
                className="input-luxury rounded-xl"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="web-hours" className="text-xs uppercase tracking-wider font-light text-[#121212] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> Business Hours
              </Label>
              <Input
                id="web-hours"
                className="input-luxury rounded-xl"
                value={formStoreTimings}
                onChange={(e) => setFormStoreTimings(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="web-address" className="text-xs uppercase tracking-wider font-light text-[#121212] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gray-400" /> Store Address
              </Label>
              <Input
                id="web-address"
                className="input-luxury rounded-xl"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#EFECE7]">
          <Button
            type="submit"
            className="bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-wider font-semibold py-4 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Website Changes
          </Button>
        </div>

      </form>

    </div>
  );
}
