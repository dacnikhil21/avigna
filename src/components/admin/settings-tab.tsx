"use client";

import { useState } from "react";
import { useAdminStore } from "@/lib/store/admin-store";
import { CheckCircle2, Save, Settings, ShieldAlert, BadgeInfo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SettingsTab() {
  const { websiteSettings, updateWebsiteSettings } = useAdminStore();

  const [formBusinessName, setFormBusinessName] = useState(websiteSettings.businessName);
  const [formLogoText, setFormLogoText] = useState(websiteSettings.logoText);
  const [formLogoSubText, setFormLogoSubText] = useState(websiteSettings.logoSubText);
  const [formPhone, setFormPhone] = useState(websiteSettings.phone);
  const [formEmail, setFormEmail] = useState(websiteSettings.email);
  const [formAddress, setFormAddress] = useState(websiteSettings.address);
  const [formStoreTimings, setFormStoreTimings] = useState(websiteSettings.storeTimings);
  const [formGst, setFormGst] = useState(websiteSettings.gst);

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
      gst: formGst
    });

    setToastMsg("Business configurations saved successfully!");
    setTimeout(() => setToastMsg(""), 3000);
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border bg-[#C5A880] text-white border-[#b8966f] text-xs uppercase tracking-wider font-medium transition-all duration-300">
          <CheckCircle2 className="w-4 h-4" />
          {toastMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Company Profile */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-[#121212] font-normal border-b pb-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#C5A880]" />
            Company Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="set-brand" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Registered Business Name
              </Label>
              <Input
                id="set-brand"
                className="input-luxury rounded-xl"
                value={formBusinessName}
                onChange={(e) => setFormBusinessName(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="set-gst" className="text-xs uppercase tracking-wider font-light text-[#121212] flex items-center gap-1.5">
                GSTIN / Tax Registration
              </Label>
              <Input
                id="set-gst"
                placeholder="e.g. 36AAAAA1111A1Z1"
                className="input-luxury rounded-xl font-mono uppercase"
                value={formGst}
                onChange={(e) => setFormGst(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="set-logo-main" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Branding Logo Main Text
              </Label>
              <Input
                id="set-logo-main"
                className="input-luxury rounded-xl"
                value={formLogoText}
                onChange={(e) => setFormLogoText(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="set-logo-sub" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Branding Logo Subtext
              </Label>
              <Input
                id="set-logo-sub"
                className="input-luxury rounded-xl"
                value={formLogoSubText}
                onChange={(e) => setFormLogoSubText(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Contact & Hours */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-[#121212] font-normal border-b pb-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#C5A880]" />
            Store Contact &amp; Hours
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="set-phone" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Store Support Phone
              </Label>
              <Input
                id="set-phone"
                className="input-luxury rounded-xl font-mono"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="set-email" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Store Support Email
              </Label>
              <Input
                id="set-email"
                type="email"
                className="input-luxury rounded-xl"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="set-timings" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Showroom Timings
              </Label>
              <Input
                id="set-timings"
                className="input-luxury rounded-xl"
                value={formStoreTimings}
                onChange={(e) => setFormStoreTimings(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="set-address" className="text-xs uppercase tracking-wider font-light text-[#121212]">
                Showroom Address
              </Label>
              <Input
                id="set-address"
                className="input-luxury rounded-xl"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Security Alert info card */}
        <div className="flex gap-4 p-5 bg-red-50/50 border border-red-200/50 rounded-2xl text-xs text-red-700 leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-serif font-semibold text-sm mb-1">Administrative Credentials Note</h4>
            <p>
              Login passwords and security options are currently set to dummy mockup state for Sprint 5 review. Connect databases to configure admin credentials securely later.
            </p>
          </div>
        </div>

        {/* Save CTA */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#EFECE7]">
          <Button
            type="submit"
            className="bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-wider font-semibold py-4 px-8 rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Business Configurations
          </Button>
        </div>

      </form>

    </div>
  );
}
