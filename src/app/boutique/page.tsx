"use client";

import { useState } from "react";
import { Clock, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/components/shared/motion";
import { Button } from "@/components/ui/button";

const BOOKING_SERVICES = [
  { id: "boutique-styling", label: "In-Store Boutique Styling", duration: "60 Mins" },
  { id: "virtual-styling", label: "Virtual Video Consultation", duration: "45 Mins" },
  { id: "wedding-trousseau", label: "Bridal Trousseau Curation", duration: "90 Mins" },
];

const TIME_SLOTS = [
  "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM", "6:30 PM"
];

export default function BoutiquePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    preferences: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Success step
  };

  const selectedService = BOOKING_SERVICES.find(s => s.id === formData.service);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 md:pt-36 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Panel: Boutique Details & Styled Grayscale Map */}
          <div className="lg:col-span-5 space-y-8 sticky top-36">
            <FadeIn>
              <p className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#C5A880] mb-3">
                Flagship Store
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-light text-[#121212] mb-6">
                The Bangalore <br />
                <em>Boutique</em>
              </h1>
              <p className="font-sans text-sm text-[#6B6560] leading-relaxed mb-8">
                Step away from the digital noise. Visit our flagship sanctuary in the heart of Bengaluru for an unhurried, personal jewellery discovery.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="space-y-6 bg-white border border-[#EFECE7] p-8">
              <h3 className="font-serif text-lg font-light text-[#121212] mb-4">Location & Hours</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#121212]">Address</p>
                    <p className="text-sm text-[#6B6560] mt-1">
                      123, MG Road, Ashok Nagar,<br />
                      Bengaluru, Karnataka 560001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#121212]">Boutique Hours</p>
                    <p className="text-sm text-[#6B6560] mt-1">
                      Monday – Sunday<br />
                      11:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#C5A880] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-[#121212]">Client Concierge</p>
                    <p className="text-sm text-[#6B6560] mt-1">+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Custom Grayscale Styled Map Iframe Container */}
            <FadeIn delay={0.2} className="relative aspect-video w-full overflow-hidden border border-[#EFECE7] grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                title="Avighna Bangalore Boutique Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9267258380816!2d77.60744797621183!3d12.976483487339178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167e9cd575b5%3A0x8bae3d9ad2f447cf!2sM%20G%20Road%20Metro%20Station!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </FadeIn>
          </div>

          {/* Right Panel: Interactive Scheduler Form */}
          <div className="lg:col-span-7 bg-white border border-[#EFECE7] p-8 md:p-12">
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-light text-[#121212] mb-2">Book Your Visit</h2>
                  <p className="text-sm text-[#6B6560]">Select the service you wish to schedule.</p>
                </div>

                <div className="space-y-4">
                  {BOOKING_SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setFormData({ ...formData, service: service.id })}
                      className={`w-full p-6 text-left border flex items-center justify-between transition-all rounded-none ${
                        formData.service === service.id
                          ? "border-[#C5A880] bg-[#C5A880]/5"
                          : "border-[#EFECE7] hover:border-gray-400"
                      }`}
                    >
                      <div>
                        <h4 className="font-serif text-base text-[#121212] font-normal">{service.label}</h4>
                        <p className="text-xs text-luxury-muted mt-1">Duration: {service.duration}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        formData.service === service.id ? "border-[#C5A880]" : "border-gray-300"
                      }`}>
                        {formData.service === service.id && (
                          <div className="w-2 h-2 rounded-full bg-[#C5A880]" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-4">
                  <Button
                    variant="gold"
                    className="w-full py-4 uppercase tracking-wider text-xs font-semibold rounded-none"
                    disabled={!formData.service}
                    onClick={() => setStep(2)}
                  >
                    Select Date & Time
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-wider text-luxury-muted hover:text-[#121212] mb-4 flex items-center gap-1"
                  >
                    &larr; Back to Services
                  </button>
                  <h2 className="font-serif text-2xl font-light text-[#121212] mb-2">Details & Timing</h2>
                  <p className="text-xs text-[#C5A880] uppercase tracking-wider font-semibold">{selectedService?.label}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-muted font-sans font-medium">
                      Select Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="border-0 border-b border-[#EFECE7] py-3 text-sm text-[#121212] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  {/* Time Selection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-muted font-sans font-medium">
                      Select Time Slot
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="border-0 border-b border-[#EFECE7] bg-transparent py-3 text-sm text-[#121212] focus:outline-none focus:border-[#C5A880]"
                    >
                      <option value="">Choose a slot</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-[#EFECE7]">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-muted font-sans font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ananya Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-0 border-b border-[#EFECE7] py-3 text-sm text-[#121212] placeholder:text-gray-300 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-luxury-muted font-sans font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-0 border-b border-[#EFECE7] py-3 text-sm text-[#121212] placeholder:text-gray-300 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-wider text-luxury-muted font-sans font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="border-0 border-b border-[#EFECE7] py-3 text-sm text-[#121212] placeholder:text-gray-300 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  {/* Wardrobe Preferences */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-wider text-luxury-muted font-sans font-medium">
                      Design Notes & Preferences (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="I am looking for a heritage temple gold choker set matching an emerald green silk saree."
                      value={formData.preferences}
                      onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                      className="border-0 border-b border-[#EFECE7] py-3 text-sm text-[#121212] placeholder:text-gray-300 focus:outline-none focus:border-[#C5A880] resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#121212] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#C5A880] transition-colors rounded-none"
                  >
                    Confirm Styling Appointment
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-[#2D5A27]/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#2D5A27]" />
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-light text-[#121212]">Appointment Confirmed</h3>
                  <p className="text-sm text-[#6B6560] max-w-md mx-auto">
                    Thank you, {formData.name}. Your styling appointment has been reserved. A confirmation detail has been sent to your email.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-[#EFECE7] p-6 text-left space-y-3 max-w-md mx-auto">
                  <p className="text-xs uppercase tracking-wider text-luxury-muted font-semibold">Booking Details</p>
                  <div>
                    <p className="text-sm font-medium text-[#121212]">{selectedService?.label}</p>
                    <p className="text-xs text-[#6B6560] mt-0.5">Duration: {selectedService?.duration}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#EFECE7] text-sm">
                    <div>
                      <p className="text-xs text-luxury-muted">Date</p>
                      <p className="font-medium text-[#121212] mt-0.5">{formData.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-luxury-muted">Time</p>
                      <p className="font-medium text-[#121212] mt-0.5">{formData.time}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <Button variant="outline" className="rounded-none text-xs uppercase tracking-wider px-8 py-3.5" onClick={() => {
                    setStep(1);
                    setFormData({
                      service: "",
                      date: "",
                      time: "",
                      name: "",
                      phone: "",
                      email: "",
                      preferences: "",
                    });
                  }}>
                    Book Another Visit
                  </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
