"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Save, Settings, ShieldAlert, AlertTriangle, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SettingsTab() {
  const [loading, setLoading] = useState(true);
  const [formBusinessName, setFormBusinessName] = useState("");
  const [formLogoText, setFormLogoText] = useState("");
  const [formLogoSubText, setFormLogoSubText] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formStoreTimings, setFormStoreTimings] = useState("");
  const [formGst, setFormGst] = useState("");
  const [formLogoUrl, setFormLogoUrl] = useState("");
  const [formInstagram, setFormInstagram] = useState("");
  const [formFacebook, setFormFacebook] = useState("");
  const [formYoutube, setFormYoutube] = useState("");
  const [formPinterest, setFormPinterest] = useState("");

  const [isDirty, setIsDirty] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const loadSettings = async () => {
    try {
      setLoading(true);
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
        setFormGst(data.gstNumber || "");
        setFormLogoUrl(data.logoUrl || "");
        setFormInstagram(data.instagramUrl || "");
        setFormFacebook(data.facebookUrl || "");
        setFormYoutube(data.youtubeUrl || "");
        setFormPinterest(data.pinterestUrl || "");
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormLogoUrl(reader.result as string);
        setIsDirty(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formBusinessName || !formLogoText || !formPhone || !formEmail || !formAddress || !formStoreTimings || !formGst) {
      setToastMsg("Please fill in all required fields marked with *");
      setTimeout(() => setToastMsg(""), 3000);
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
      gstNumber: formGst,
      logoUrl: formLogoUrl,
      instagramUrl: formInstagram,
      facebookUrl: formFacebook,
      youtubeUrl: formYoutube,
      pinterestUrl: formPinterest
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsDirty(false);
        setToastMsg("Business configurations saved successfully!");
        setTimeout(() => setToastMsg(""), 3000);
        loadSettings();
      } else {
        setToastMsg("Failed to update database configurations.");
        setTimeout(() => setToastMsg(""), 3000);
      }
    } catch (err) {
      console.error(err);
      setToastMsg("Error saving configurations.");
      setTimeout(() => setToastMsg(""), 3000);
    }
  };

  const handleReset = () => {
    loadSettings();
    setIsDirty(false);
    setToastMsg("Changes discarded.");
    setTimeout(() => setToastMsg(""), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="w-8 h-8 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin mr-3" />
        <span className="text-xs uppercase tracking-widest font-semibold text-[#1A1A1A]">Loading business settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans antialiased text-[#1A1A1A] max-w-4xl pb-12">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border bg-emerald-600 text-white border-emerald-700 text-xs uppercase tracking-wider font-semibold transition-all duration-300">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* Unsaved Changes Warning */}
      {isDirty && (
        <div className="flex items-center justify-between gap-4 p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>You have unsaved settings changes. Remember to save!</span>
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
        
        {/* Company Profile */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-slate-950 font-bold border-b pb-2 flex items-center gap-2 uppercase tracking-wide">
            <Settings className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Company Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="set-brand" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Registered Business Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="set-brand"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formBusinessName}
                onChange={(e) => handleFieldChange(setFormBusinessName, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="set-gst" className="text-xs uppercase tracking-wider font-bold text-slate-900 flex items-center gap-1.5">
                GSTIN / Tax Registration <span className="text-red-500">*</span>
              </Label>
              <Input
                id="set-gst"
                required
                placeholder="e.g. 36AAAAA1111A1Z1"
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold font-mono uppercase"
                value={formGst}
                onChange={(e) => handleFieldChange(setFormGst, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="set-logo-main" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Branding Logo Main Text <span className="text-red-500">*</span>
              </Label>
              <Input
                id="set-logo-main"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formLogoText}
                onChange={(e) => handleFieldChange(setFormLogoText, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="set-logo-sub" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Branding Logo Subtext
              </Label>
              <Input
                id="set-logo-sub"
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formLogoSubText}
                onChange={(e) => handleFieldChange(setFormLogoSubText, e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-xs uppercase tracking-wider font-bold text-slate-900">Upload Store Logo / Icon</Label>
              <div className="flex items-center gap-4 pt-1">
                <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-xl overflow-hidden relative flex items-center justify-center">
                  {formLogoUrl ? <img src={formLogoUrl} alt="Store Logo Preview" className="object-cover w-full h-full" /> : <Globe className="w-6 h-6 text-slate-400" />}
                </div>
                <label className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold rounded-lg cursor-pointer">
                  Upload Logo
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Hours */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-slate-950 font-bold border-b pb-2 flex items-center gap-2 uppercase tracking-wide">
            <Settings className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Store Contact &amp; Hours
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="set-phone" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Store Support Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="set-phone"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold font-mono"
                value={formPhone}
                onChange={(e) => handleFieldChange(setFormPhone, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="set-email" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Store Support Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="set-email"
                type="email"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formEmail}
                onChange={(e) => handleFieldChange(setFormEmail, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="set-timings" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Showroom Timings <span className="text-red-500">*</span>
              </Label>
              <Input
                id="set-timings"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formStoreTimings}
                onChange={(e) => handleFieldChange(setFormStoreTimings, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="set-address" className="text-xs uppercase tracking-wider font-bold text-slate-900">
                Showroom Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="set-address"
                required
                className="input-luxury rounded-xl border-[#D1CFC9] hover:border-slate-400 focus:border-[#C5A880] text-slate-900 font-bold"
                value={formAddress}
                onChange={(e) => handleFieldChange(setFormAddress, e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-serif text-base text-slate-950 font-bold border-b pb-2 flex items-center gap-2 uppercase tracking-wide">
            <Globe className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Social Media Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-950 font-bold">
            <div className="space-y-1.5">
              <Label htmlFor="set-instagram">Instagram Profile URL</Label>
              <Input id="set-instagram" className="input-luxury" placeholder="https://instagram.com/sriavighna" value={formInstagram} onChange={(e) => handleFieldChange(setFormInstagram, e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="set-facebook">Facebook Page URL</Label>
              <Input id="set-facebook" className="input-luxury" placeholder="https://facebook.com/sriavighna" value={formFacebook} onChange={(e) => handleFieldChange(setFormFacebook, e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="set-youtube">YouTube Channel URL</Label>
              <Input id="set-youtube" className="input-luxury" placeholder="https://youtube.com/c/sriavighna" value={formYoutube} onChange={(e) => handleFieldChange(setFormYoutube, e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="set-pinterest">Pinterest Boards URL</Label>
              <Input id="set-pinterest" className="input-luxury" placeholder="https://pinterest.com/sriavighna" value={formPinterest} onChange={(e) => handleFieldChange(setFormPinterest, e.target.value)} />
            </div>
          </div>
        </div>

        {/* Security Alert info card */}
        <div className="flex gap-4 p-5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 leading-relaxed font-bold shadow-sm">
          <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-serif font-extrabold text-sm mb-1 uppercase tracking-wide">Administrative Credentials Note</h4>
            <p>
              Login passwords and security options are currently set to dummy mockup state for Sprint 5 review. Connect databases to configure admin credentials securely later.
            </p>
          </div>
        </div>

        {/* Save CTA */}
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
            <Save className="w-4 h-4" /> Save Business Configurations
          </Button>
        </div>

      </form>

    </div>
  );
}
