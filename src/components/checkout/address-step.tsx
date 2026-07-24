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
    <div className="bg-white rounded-2xl border-2 border-[#121212]/10 p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-300">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EFECE7]">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
              isCompleted || true
                ? "bg-[#121212] text-white"
                : "bg-[#121212] text-white"
            }`}
          >
            {isCompleted ? "✓" : "1"}
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#121212] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#121212]" />
              Delivery Address
            </h2>
            <p className="text-xs text-[#5A544E] font-medium mt-0.5">
              Select or enter your shipping location for doorstep delivery
            </p>
          </div>
        </div>

        {shippingForm && !isAddingAddress && (
          <button
            type="button"
            onClick={() => setIsAddingAddress(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#121212] hover:bg-black px-4 py-2 rounded-xl transition-all shadow-xs active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New
          </button>
        )}
      </div>

      {/* Content Body */}
      {isAddingAddress || !shippingForm ? (
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[#F9F9F9] p-4 rounded-xl border border-[#E5E5E5]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#121212]">
              <Home className="w-4 h-4 text-[#121212]" />
              <span>Enter Shipping Details</span>
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={detectingLocation}
              className="inline-flex items-center gap-1.5 text-xs text-[#121212] font-bold bg-white px-3 py-1.5 rounded-xl border border-[#121212] hover:bg-[#121212] hover:text-white transition-all shadow-2xs"
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
              <Label htmlFor="new-name" className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                Full Name *
              </Label>
              <Input
                id="new-name"
                required
                placeholder="e.g. Ananya Sharma"
                value={newAddr.fullName}
                onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#121212]/30 focus:border-[#121212] bg-white text-[#121212] font-medium"
              />
            </div>

            <div>
              <Label htmlFor="new-mobile" className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                10-Digit Mobile Number *
              </Label>
              <Input
                id="new-mobile"
                required
                type="tel"
                placeholder="e.g. 9876543210"
                value={newAddr.mobile}
                onChange={(e) => setNewAddr({ ...newAddr, mobile: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#121212]/30 focus:border-[#121212] bg-white text-[#121212] font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="new-flat" className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                Flat / House No. / Building Name *
              </Label>
              <Input
                id="new-flat"
                required
                placeholder="e.g. Flat 402, Royal Residency"
                value={newAddr.houseFlat}
                onChange={(e) => setNewAddr({ ...newAddr, houseFlat: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#121212]/30 focus:border-[#121212] bg-white text-[#121212] font-medium"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="new-street" className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                Street Address / Area / Landmark *
              </Label>
              <Input
                id="new-street"
                required
                placeholder="e.g. Jubilee Hills, Road No. 36, Opp. Park"
                value={newAddr.street}
                onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#121212]/30 focus:border-[#121212] bg-white text-[#121212] font-medium"
              />
            </div>

            <div>
              <Label htmlFor="new-city" className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                City *
              </Label>
              <Input
                id="new-city"
                required
                placeholder="e.g. Hyderabad"
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#121212]/30 focus:border-[#121212] bg-white text-[#121212] font-medium"
              />
            </div>

            <div>
              <Label htmlFor="new-state" className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                State *
              </Label>
              <Input
                id="new-state"
                required
                placeholder="e.g. Telangana"
                value={newAddr.state}
                onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#121212]/30 focus:border-[#121212] bg-white text-[#121212] font-medium"
              />
            </div>

            <div>
              <Label htmlFor="new-pincode" className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                Pincode *
              </Label>
              <Input
                id="new-pincode"
                required
                placeholder="6-digit pincode"
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="mt-1 text-xs sm:text-sm rounded-xl border-[#121212]/30 focus:border-[#121212] bg-white text-[#121212] font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <Button
              type="submit"
              disabled={saveAddressLoading}
              className="bg-[#121212] hover:bg-black text-white text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
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
                className="text-xs uppercase tracking-widest border-[#121212]/30 text-[#121212] font-bold hover:bg-[#121212] hover:text-white rounded-xl py-3"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {/* Saved Addresses List / Cards */}
          {savedAddresses.length > 0 ? (
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
                        ? "border-[#121212] bg-[#F9F9F9] shadow-sm"
                        : "border-[#EFECE7] bg-white hover:border-[#121212]/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#121212]">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[9px] uppercase tracking-wider font-bold bg-[#F5F5F5] text-[#555555] border border-[#E5E5E5] px-2 py-0.5 rounded-md">
                            Default
                          </span>
                        )}
                      </div>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#121212] bg-[#F4F4F4] border border-[#121212]/30 px-2.5 py-1 rounded-full shadow-2xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#121212] shrink-0" />
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#121212] font-semibold flex items-center gap-1 mb-1">
                      <Phone className="w-3 h-3 text-[#121212]" /> {addr.mobile}
                    </p>
                    <p className="text-xs text-[#121212] font-medium leading-relaxed">
                      {fullAddr}, {addr.city}, {addr.state} - <span className="font-bold text-[#121212]">{addr.pincode}</span>
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Active Selected Single Address (When no saved list array exists) */
            <div className="bg-[#F9F9F9] p-5 rounded-xl border-2 border-[#121212] relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#121212]" />
                  <span className="text-xs font-bold text-[#121212] uppercase tracking-wider">
                    Delivering to:
                  </span>
                  <span className="font-bold text-sm text-[#121212]">{shippingForm.name}</span>
                  <span className="text-xs font-semibold text-[#121212]">({shippingForm.phone})</span>
                </div>
                <p className="text-xs text-[#121212] font-medium pl-6">
                  {shippingForm.address}, {shippingForm.city}, {shippingForm.state} -{" "}
                  <span className="font-bold text-[#121212]">{shippingForm.pincode}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingAddress(true)}
                className="self-start sm:self-center inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#121212] px-3.5 py-2 rounded-xl hover:bg-black transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Change Address
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
