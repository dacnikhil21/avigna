"use client";

import { useState } from "react";
import { MapPin, Plus, CheckCircle2, Navigation, Edit2, Loader2, User, Phone, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface AddressForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface AddressStepProps {
  shippingForm: AddressForm | null;
  savedAddresses: Array<{
    id: string;
    fullName: string;
    mobile: string;
    houseFlat: string;
    street: string;
    area?: string | null;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }>;
  onSelectAddress: (form: AddressForm) => void;
  onSaveNewAddress: (newAddr: {
    fullName: string;
    mobile: string;
    houseFlat: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  }) => Promise<void>;
  isAddingAddress: boolean;
  setIsAddingAddress: (val: boolean) => void;
  saveAddressLoading: boolean;
  errorMsg: string | null;
  setErrorMsg: (msg: string | null) => void;
  userEmail?: string;
}

export function AddressStep({
  shippingForm,
  savedAddresses,
  onSelectAddress,
  onSaveNewAddress,
  isAddingAddress,
  setIsAddingAddress,
  saveAddressLoading,
  errorMsg,
  setErrorMsg,
  userEmail = "",
}: AddressStepProps) {
  const [newAddr, setNewAddr] = useState({
    fullName: "",
    mobile: "",
    houseFlat: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [detectingLocation, setDetectingLocation] = useState(false);

  const handleDetectLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          if (data && data.address) {
            const addr = data.address;
            setNewAddr((prev) => ({
              ...prev,
              city: addr.city || addr.town || addr.village || addr.county || prev.city,
              state: addr.state || prev.state,
              pincode: addr.postcode || prev.pincode,
              street: addr.suburb || addr.neighbourhood || addr.road || prev.street,
            }));
          }
        } catch (err) {
          console.error("Geocoding error:", err);
        } finally {
          setDetectingLocation(false);
        }
      },
      () => {
        setDetectingLocation(false);
        setErrorMsg("Unable to retrieve location automatically. Please fill details manually.");
        setTimeout(() => setErrorMsg(null), 4000);
      }
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newAddr.fullName ||
      !newAddr.mobile ||
      !newAddr.houseFlat ||
      !newAddr.street ||
      !newAddr.city ||
      !newAddr.state ||
      !newAddr.pincode
    ) {
      setErrorMsg("Please fill in all required address fields.");
      setTimeout(() => setErrorMsg(null), 4000);
      return;
    }
    await onSaveNewAddress(newAddr);
  };

  const isCompleted = Boolean(shippingForm && !isAddingAddress);

  return (
    <div className="bg-white rounded-2xl border border-[#EFECE7] p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-300">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EFECE7]">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
              isCompleted
                ? "bg-[#C5A880] text-white"
                : "bg-[#121212] text-white"
            }`}
          >
            {isCompleted ? "✓" : "1"}
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#121212] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C5A880]" />
              Delivery Address
            </h2>
            <p className="text-xs text-[#7A7A7A] mt-0.5">
              Select or enter your shipping location for doorstep delivery
            </p>
          </div>
        </div>

        {shippingForm && !isAddingAddress && (
          <button
            type="button"
            onClick={() => setIsAddingAddress(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A880] hover:text-[#121212] bg-[#FAF8F5] border border-[#EFECE7] px-3.5 py-1.5 rounded-full transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New
          </button>
        )}
      </div>

      {/* Content Body */}
      {isAddingAddress || !shippingForm ? (
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#EFECE7]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#121212]">
              <Home className="w-4 h-4 text-[#C5A880]" />
              <span>Enter Shipping Details</span>
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={detectingLocation}
              className="inline-flex items-center gap-1.5 text-xs text-[#C5A880] font-semibold bg-white px-3 py-1.5 rounded-full border border-[#C5A880]/30 hover:bg-[#C5A880] hover:text-white transition-all shadow-2xs"
            >
              {detectingLocation ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Detecting...
                </>
              ) : (
                <>
                  <Navigation className="w-3.5 h-3.5" />
                  Auto-Detect Location
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="new-name" className="text-xs font-semibold text-[#121212] uppercase tracking-wider">
                Full Name *
              </Label>
              <Input
                id="new-name"
                required
                placeholder="e.g. Ananya Sharma"
                value={newAddr.fullName}
                onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#EFECE7] focus:border-[#C5A880] bg-[#FAF8F5]/50 focus:bg-white"
              />
            </div>

            <div>
              <Label htmlFor="new-mobile" className="text-xs font-semibold text-[#121212] uppercase tracking-wider">
                10-Digit Mobile Number *
              </Label>
              <Input
                id="new-mobile"
                required
                type="tel"
                placeholder="e.g. 9876543210"
                value={newAddr.mobile}
                onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#EFECE7] focus:border-[#C5A880] bg-[#FAF8F5]/50 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="new-flat" className="text-xs font-semibold text-[#121212] uppercase tracking-wider">
                Flat / House No. / Building Name *
              </Label>
              <Input
                id="new-flat"
                required
                placeholder="e.g. Flat 402, Royal Residency"
                value={newAddr.houseFlat}
                onChange={(e) => setNewAddr({ ...newAddr, houseFlat: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#EFECE7] focus:border-[#C5A880] bg-[#FAF8F5]/50 focus:bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="new-street" className="text-xs font-semibold text-[#121212] uppercase tracking-wider">
                Street Address / Area / Landmark *
              </Label>
              <Input
                id="new-street"
                required
                placeholder="e.g. Jubilee Hills, Road No. 36, Opp. Park"
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#EFECE7] focus:border-[#C5A880] bg-[#FAF8F5]/50 focus:bg-white"
              />
            </div>

            <div>
              <Label htmlFor="new-city" className="text-xs font-semibold text-[#121212] uppercase tracking-wider">
                City *
              </Label>
              <Input
                id="new-city"
                required
                placeholder="e.g. Hyderabad"
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#EFECE7] focus:border-[#C5A880] bg-[#FAF8F5]/50 focus:bg-white"
              />
            </div>

            <div>
              <Label htmlFor="new-state" className="text-xs font-semibold text-[#121212] uppercase tracking-wider">
                State *
              </Label>
              <Input
                id="new-state"
                required
                placeholder="e.g. Telangana"
                value={newAddr.state}
                onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#EFECE7] focus:border-[#C5A880] bg-[#FAF8F5]/50 focus:bg-white"
              />
            </div>

            <div>
              <Label htmlFor="new-pincode" className="text-xs font-semibold text-[#121212] uppercase tracking-wider">
                Pincode *
              </Label>
              <Input
                id="new-pincode"
                required
                placeholder="6-digit pincode"
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#EFECE7] focus:border-[#C5A880] bg-[#FAF8F5]/50 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <Button
              type="submit"
              disabled={saveAddressLoading}
              className="bg-[#121212] hover:bg-[#C5A880] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
            >
              {saveAddressLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  Saving...
                </>
              ) : (
                "Save & Deliver Here"
              )}
            </Button>
            {shippingForm && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingAddress(false)}
                className="text-xs uppercase tracking-widest border-[#EFECE7] text-[#7A7A7A] hover:text-[#121212] rounded-xl py-3"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Saved Addresses List / Cards */}
          {savedAddresses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedAddresses.map((addr) => {
                const fullAddr = `${addr.houseFlat}, ${addr.street}${addr.area ? `, ${addr.area}` : ""}`;
                const isSelected =
                  shippingForm?.address === fullAddr && shippingForm?.name === addr.fullName;
                return (
                  <div
                    key={addr.id}
                    onClick={() =>
                      onSelectAddress({
                        name: addr.fullName,
                        email: userEmail,
                        phone: addr.mobile,
                        address: fullAddr,
                        city: addr.city,
                        state: addr.state,
                        pincode: addr.pincode,
                      })
                    }
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-[#C5A880] bg-[#FAF8F5] shadow-xs"
                        : "border-[#EFECE7] bg-white hover:border-[#C5A880]/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#121212]">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[9px] uppercase tracking-wider font-semibold bg-[#C5A880]/15 text-[#C5A880] px-2 py-0.5 rounded-md">
                            Default
                          </span>
                        )}
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0" />}
                    </div>
                    <p className="text-xs text-[#4A4A4A] flex items-center gap-1 mb-1">
                      <Phone className="w-3 h-3 text-[#7A7A7A]" /> {addr.mobile}
                    </p>
                    <p className="text-xs text-[#7A7A7A] leading-relaxed line-clamp-2">
                      {fullAddr}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Active Selected Shipping Address Display */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#C5A880]/30 relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                  Delivering to:
                </span>
                <span className="font-bold text-sm text-[#121212]">{shippingForm.name}</span>
                <span className="text-xs text-[#7A7A7A]">({shippingForm.phone})</span>
              </div>
              <p className="text-xs text-[#4A4A4A] pl-6">
                {shippingForm.address}, {shippingForm.city}, {shippingForm.state} -{" "}
                <span className="font-bold text-[#121212]">{shippingForm.pincode}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingAddress(true)}
              className="self-start sm:self-center inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A880] hover:underline"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Change Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
