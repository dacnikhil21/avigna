"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Save, Globe, Info, Clock, Mail, Phone, MapPin, AlertTriangle, Plus, Trash2, Edit2, Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { HeroSlide, AnnouncementBar } from "@prisma/client";

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

  // Hero Slides & Announcements State
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementBar[]>([]);

  // Slide Form State
  const [slideModalOpen, setSlideModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [slideTitle, setSlideTitle] = useState("");
  const [slideSubtitle, setSlideSubtitle] = useState("");
  const [slideEyebrow, setSlideEyebrow] = useState("");
  const [slideCtaText, setSlideCtaText] = useState("");
  const [slideCtaUrl, setSlideCtaUrl] = useState("");
  const [slideImageUrl, setSlideImageUrl] = useState("");
  const [slideSortOrder, setSlideSortOrder] = useState("0");
  const [slideIsActive, setSlideIsActive] = useState(true);

  // Announcement Form State
  const [annModalOpen, setAnnModalOpen] = useState(false);
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);
  const [annText, setAnnText] = useState("");
  const [annLink, setAnnLink] = useState("");
  const [annLinkLabel, setAnnLinkLabel] = useState("");
  const [annSortOrder, setAnnSortOrder] = useState("0");
  const [annIsActive, setAnnIsActive] = useState(true);

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

  const fetchHeroSlides = async () => {
    try {
      const res = await fetch("/api/admin/hero-slides");
      const data = await res.json();
      setHeroSlides(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch("/api/admin/announcements");
      const data = await res.json();
      setAnnouncements(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadSettings();
    fetchHeroSlides();
    fetchAnnouncements();
  }, []);

  const handleFieldChange = <T,>(setter: (v: T) => void, val: T) => {
    setter(val);
    setIsDirty(true);
  };

  const showToastLocal = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
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
        loadSettings();
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

  // Hero Slide actions
  const openAddSlide = () => {
    setEditingSlideId(null);
    setSlideTitle("");
    setSlideSubtitle("");
    setSlideEyebrow("");
    setSlideCtaText("");
    setSlideCtaUrl("");
    setSlideImageUrl("");
    setSlideSortOrder((heroSlides.length + 1).toString());
    setSlideIsActive(true);
    setSlideModalOpen(true);
  };

  const openEditSlide = (slide: HeroSlide) => {
    setEditingSlideId(slide.id);
    setSlideTitle(slide.title);
    setSlideSubtitle(slide.subtitle || "");
    setSlideEyebrow(slide.eyebrow || "");
    setSlideCtaText(slide.ctaText || "");
    setSlideCtaUrl(slide.ctaUrl || "");
    setSlideImageUrl(slide.imageUrl);
    setSlideSortOrder(slide.sortOrder.toString());
    setSlideIsActive(slide.isActive);
    setSlideModalOpen(true);
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideImageUrl) {
      showToastLocal("Slide image is required.");
      return;
    }
    const payload = {
      title: slideTitle,
      subtitle: slideSubtitle,
      eyebrow: slideEyebrow,
      ctaText: slideCtaText,
      ctaUrl: slideCtaUrl,
      imageUrl: slideImageUrl,
      sortOrder: parseInt(slideSortOrder, 10),
      isActive: slideIsActive
    };
    try {
      let res;
      if (editingSlideId) {
        res = await fetch(`/api/admin/hero-slides/${editingSlideId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/hero-slides", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (res.ok) {
        showToastLocal("Hero slide saved successfully!");
        setSlideModalOpen(false);
        fetchHeroSlides();
      } else {
        showToastLocal("Failed to save hero slide.");
      }
    } catch (err) {
      console.error(err);
      showToastLocal("Error saving hero slide.");
    }
  };

  const handleDeleteSlide = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero slide?")) return;
    try {
      const res = await fetch(`/api/admin/hero-slides/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToastLocal("Hero slide deleted successfully!");
        fetchHeroSlides();
      } else {
        showToastLocal("Failed to delete hero slide.");
      }
    } catch (err) {
      console.error(err);
      showToastLocal("Error deleting hero slide.");
    }
  };

  // Image file reader for slides
  const handleSlideImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSlideImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Announcement actions
  const openAddAnn = () => {
    setEditingAnnId(null);
    setAnnText("");
    setAnnLink("");
    setAnnLinkLabel("");
    setAnnSortOrder((announcements.length + 1).toString());
    setAnnIsActive(true);
    setAnnModalOpen(true);
  };

  const openEditAnn = (ann: AnnouncementBar) => {
    setEditingAnnId(ann.id);
    setAnnText(ann.text);
    setAnnLink(ann.link || "");
    setAnnLinkLabel(ann.linkLabel || "");
    setAnnSortOrder(ann.sortOrder.toString());
    setAnnIsActive(ann.isActive);
    setAnnModalOpen(true);
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annText) {
      showToastLocal("Announcement text is required.");
      return;
    }
    const payload = {
      text: annText,
      link: annLink,
      linkLabel: annLinkLabel,
      sortOrder: parseInt(annSortOrder, 10),
      isActive: annIsActive
    };
    try {
      let res;
      if (editingAnnId) {
        res = await fetch(`/api/admin/announcements/${editingAnnId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/announcements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (res.ok) {
        showToastLocal("Announcement bar saved successfully!");
        setAnnModalOpen(false);
        fetchAnnouncements();
      } else {
        showToastLocal("Failed to save announcement bar.");
      }
    } catch (err) {
      console.error(err);
      showToastLocal("Error saving announcement bar.");
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;
    try {
      const res = await fetch(`/api/admin/announcements/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showToastLocal("Announcement deleted successfully!");
        fetchAnnouncements();
      } else {
        showToastLocal("Failed to delete announcement.");
      }
    } catch (err) {
      console.error(err);
      showToastLocal("Error deleting announcement.");
    }
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
    <div className="space-y-8 font-sans antialiased text-[#1A1A1A] max-w-4xl pb-12">
      
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
            Any modifications saved here are stored in your active PostgreSQL database and will immediately update the customer-facing headers, footers, and page sections.
          </p>
        </div>
      </div>

      {/* Unsaved Changes Banner */}
      {isDirty && (
        <div className="flex items-center justify-between gap-4 p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 animate-pulse">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>You have unsaved changes in basic brand configurations. Remember to save!</span>
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
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> Wanaparthy Showroom Address <span className="text-red-500">*</span>
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

      {/* Section 4: Manage Hero Slides list */}
      <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-serif text-base text-slate-950 font-bold flex items-center gap-2 uppercase tracking-wide">
            <Globe className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Homepage Hero Slides
          </h3>
          <Button
            onClick={openAddSlide}
            className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-2 px-4 rounded-xl flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Hero Slide
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-start gap-4 hover:shadow-md transition-all relative">
              <div className="w-24 h-24 rounded-lg bg-slate-200 overflow-hidden relative shrink-0">
                <img src={slide.imageUrl} alt={slide.title} className="object-cover w-full h-full" />
              </div>
              <div className="space-y-1 text-xs">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#C5A880]">Order: {slide.sortOrder}</span>
                <h4 className="font-bold text-slate-900 truncate max-w-[200px]">{slide.title || "Untitled Slide"}</h4>
                <p className="text-slate-500 italic max-w-[200px] truncate">{slide.subtitle}</p>
                <div className="flex items-center gap-2 pt-2">
                  <button onClick={() => openEditSlide(slide)} className="p-1 hover:bg-slate-200 rounded text-slate-700">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDeleteSlide(slide.id)} className="p-1 hover:bg-red-50 rounded text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider border font-bold ${
                    slide.isActive ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"
                  }`}>
                    {slide.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Manage Announcement Bars list */}
      <div className="bg-white border border-[#EFECE7] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-serif text-base text-slate-950 font-bold flex items-center gap-2 uppercase tracking-wide">
            <Globe className="w-4.5 h-4.5 text-[#C5A880] stroke-[2]" />
            Homepage Announcement Bars
          </h3>
          <Button
            onClick={openAddAnn}
            className="bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold py-2 px-4 rounded-xl flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add Announcement
          </Button>
        </div>

        <div className="space-y-4">
          {announcements.map((ann) => (
            <div key={ann.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between gap-4">
              <div className="text-xs space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#C5A880]">Order: {ann.sortOrder}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase font-bold tracking-wider ${
                    ann.isActive ? "bg-emerald-50 text-emerald-800 border border-emerald-25" : "bg-red-50 text-red-800 border border-red-25"
                  }`}>
                    {ann.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <p className="font-bold text-slate-900">{ann.text}</p>
                {ann.link && (
                  <p className="text-[10px] text-slate-500">Link: <a href={ann.link} target="_blank" className="underline">{ann.linkLabel || ann.link}</a></p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => openEditAnn(ann)} className="p-2 hover:bg-slate-200 rounded-xl text-slate-700">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteAnnouncement(ann.id)} className="p-2 hover:bg-red-50 rounded-xl text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Slide Modal Form */}
      {slideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveSlide} className="bg-white rounded-2xl max-w-lg w-full border border-[#EFECE7] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="bg-slate-50 border-b border-[#EFECE7] px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="font-serif text-base text-slate-950 font-bold">{editingSlideId ? "Edit Hero Slide" : "Add New Hero Slide"}</h3>
              <button type="button" onClick={() => setSlideModalOpen(false)} className="p-1 hover:bg-slate-200 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="space-y-1.5">
                <Label className="text-xs uppercase font-bold text-slate-900">Slide Image <span className="text-red-500">*</span></Label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-slate-100 border rounded-xl overflow-hidden relative shrink-0 flex items-center justify-center">
                    {slideImageUrl ? <img src={slideImageUrl} alt="Hero Slide Preview" className="object-cover w-full h-full" /> : <Upload className="w-6 h-6 text-slate-400" />}
                  </div>
                  <label className="px-3 py-1.5 bg-[#C5A880] hover:bg-[#b0936b] text-white text-xs uppercase tracking-wider font-bold rounded-lg cursor-pointer">
                    Upload Image
                    <input type="file" accept="image/*" className="hidden" onChange={handleSlideImageUpload} />
                  </label>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slide-title" className="text-xs uppercase font-bold text-slate-900">Main Title</Label>
                <Input id="slide-title" className="input-luxury" value={slideTitle} onChange={(e) => setSlideTitle(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slide-sub" className="text-xs uppercase font-bold text-slate-900">Subheading / Description</Label>
                <Input id="slide-sub" className="input-luxury" value={slideSubtitle} onChange={(e) => setSlideSubtitle(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slide-eyebrow" className="text-xs uppercase font-bold text-slate-900">Eyebrow (Small Top Text)</Label>
                <Input id="slide-eyebrow" className="input-luxury" value={slideEyebrow} onChange={(e) => setSlideEyebrow(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="slide-cta-txt" className="text-xs uppercase font-bold text-slate-900">CTA Button Text</Label>
                  <Input id="slide-cta-txt" className="input-luxury" placeholder="e.g. Shop Collection" value={slideCtaText} onChange={(e) => setSlideCtaText(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="slide-cta-url" className="text-xs uppercase font-bold text-slate-900">CTA Link URL</Label>
                  <Input id="slide-cta-url" className="input-luxury" placeholder="e.g. /shop" value={slideCtaUrl} onChange={(e) => setSlideCtaUrl(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="slide-order" className="text-xs uppercase font-bold text-slate-900">Sort Order</Label>
                  <Input id="slide-order" type="number" className="input-luxury" value={slideSortOrder} onChange={(e) => setSlideSortOrder(e.target.value)} />
                </div>
                <div className="flex items-center gap-2.5 pt-6">
                  <input type="checkbox" id="slide-active" checked={slideIsActive} onChange={(e) => setSlideIsActive(e.target.checked)} className="w-4 h-4" />
                  <Label htmlFor="slide-active" className="text-xs font-bold text-slate-950 cursor-pointer select-none">Active / Publish</Label>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 border-t flex justify-end gap-3.5 shrink-0">
              <Button type="button" onClick={() => setSlideModalOpen(false)} className="bg-white border text-slate-700 px-4 py-2">Cancel</Button>
              <Button type="submit" className="bg-[#C5A880] text-white px-5 py-2">Save Slide</Button>
            </div>
          </form>
        </div>
      )}

      {/* Announcement Modal Form */}
      {annModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveAnnouncement} className="bg-white rounded-2xl max-w-md w-full border border-[#EFECE7] shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-50 border-b border-[#EFECE7] px-6 py-4 flex items-center justify-between">
              <h3 className="font-serif text-base text-slate-950 font-bold">{editingAnnId ? "Edit Announcement" : "Add Announcement"}</h3>
              <button type="button" onClick={() => setAnnModalOpen(false)} className="p-1 hover:bg-slate-200 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ann-text" className="text-xs uppercase font-bold text-slate-900">Announcement Text <span className="text-red-500">*</span></Label>
                <Input id="ann-text" required className="input-luxury" placeholder="e.g. Free shipping on orders above ₹999!" value={annText} onChange={(e) => setAnnText(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ann-link" className="text-xs uppercase font-bold text-slate-900">Action URL (Link)</Label>
                  <Input id="ann-link" className="input-luxury" placeholder="e.g. /shop" value={annLink} onChange={(e) => setAnnLink(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ann-label" className="text-xs uppercase font-bold text-slate-900">Link Label</Label>
                  <Input id="ann-label" className="input-luxury" placeholder="e.g. Shop Now" value={annLinkLabel} onChange={(e) => setAnnLinkLabel(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="ann-order" className="text-xs uppercase font-bold text-slate-900">Sort Order</Label>
                  <Input id="ann-order" type="number" className="input-luxury" value={annSortOrder} onChange={(e) => setAnnSortOrder(e.target.value)} />
                </div>
                <div className="flex items-center gap-2.5 pt-6">
                  <input type="checkbox" id="ann-active" checked={annIsActive} onChange={(e) => setAnnIsActive(e.target.checked)} className="w-4 h-4" />
                  <Label htmlFor="ann-active" className="text-xs font-bold text-slate-950 cursor-pointer select-none">Active / Publish</Label>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 px-6 py-4 border-t flex justify-end gap-3.5">
              <Button type="button" onClick={() => setAnnModalOpen(false)} className="bg-white border text-slate-700 px-4 py-2">Cancel</Button>
              <Button type="submit" className="bg-[#C5A880] text-white px-5 py-2">Save</Button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
