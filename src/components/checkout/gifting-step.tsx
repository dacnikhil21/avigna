"use client";

import { Gift, Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";

interface GiftingStepProps {
  isGift: boolean;
  giftMessage: string;
  setGiftOptions: (isGift: boolean, message: string) => void;
}

export function GiftingStep({ isGift, giftMessage, setGiftOptions }: GiftingStepProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#EFECE7] p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#EFECE7] text-[#C5A880] flex items-center justify-center font-bold text-xs">
          <Gift className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-serif text-lg font-bold text-[#121212]">
            Gifting & Custom Packaging
          </h2>
          <p className="text-xs text-[#7A7A7A]">
            Add a personal touch for your loved ones
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#EFECE7]">
          <input
            type="checkbox"
            id="gift-note-toggle"
            checked={isGift}
            onChange={(e) => setGiftOptions(e.target.checked, e.target.checked ? giftMessage : "")}
            className="mt-0.5 border-gray-300 text-[#C5A880] focus:ring-[#C5A880] rounded w-4 h-4 cursor-pointer"
          />
          <label htmlFor="gift-note-toggle" className="text-xs sm:text-sm font-serif font-medium text-[#121212] select-none cursor-pointer">
            Add a complimentary handwritten gift card note
          </label>
        </div>

        {isGift && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <Label htmlFor="giftMessage" className="text-xs font-semibold text-[#121212] uppercase tracking-wider">
              Your Personal Calligraphy Message
            </Label>
            <textarea
              id="giftMessage"
              placeholder="Write your special note here (e.g. Happy Anniversary, My Love!)..."
              value={giftMessage}
              onChange={(e) => setGiftOptions(isGift, e.target.value)}
              rows={3}
              className="w-full text-xs sm:text-sm font-sans border border-[#EFECE7] p-3 focus:outline-none focus:border-[#C5A880] resize-none bg-[#FAF8F5]/50 rounded-xl"
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-[11px] text-[#7A7A7A] pt-1">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
          <span>
            Every order is wrapped in silk tissue inside our signature sandalwood box with custom wax seal.
          </span>
        </div>
      </div>
    </div>
  );
}
