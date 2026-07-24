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
    <div className="bg-white rounded-2xl border-2 border-[#121212]/10 p-5 sm:p-6 md:p-8 shadow-sm transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-[#121212] text-white flex items-center justify-center font-bold text-xs shadow-xs">
          <Gift className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="font-serif text-lg font-bold text-[#121212]">
            Gifting & Custom Packaging
          </h2>
          <p className="text-xs text-[#5A544E] font-medium">
            Add a personal touch for your loved ones
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 bg-[#F9F9F9] p-4 rounded-xl border border-[#E5E5E5]">
          <input
            type="checkbox"
            id="gift-note-toggle"
            checked={isGift}
            onChange={(e) => setGiftOptions(e.target.checked, e.target.checked ? giftMessage : "")}
            className="mt-0.5 border-[#121212] text-[#121212] focus:ring-[#121212] rounded w-4 h-4 cursor-pointer"
          />
          <label htmlFor="gift-note-toggle" className="text-xs sm:text-sm font-serif font-bold text-[#121212] select-none cursor-pointer">
            Add a complimentary handwritten gift card note
          </label>
        </div>

        {isGift && (
          <div className="space-y-2 animate-in fade-in duration-300">
            <Label htmlFor="giftMessage" className="text-xs font-bold text-[#121212] uppercase tracking-wider">
              Your Personal Calligraphy Message
            </Label>
            <textarea
              id="giftMessage"
              placeholder="Write your special note here (e.g. Happy Anniversary, My Love!)..."
              value={giftMessage}
              onChange={(e) => setGiftOptions(isGift, e.target.value)}
              rows={3}
              className="w-full text-xs sm:text-sm font-sans border-2 border-[#121212]/30 p-3 focus:outline-none focus:border-[#121212] resize-none bg-white rounded-xl text-[#121212] font-medium"
            />
          </div>
        )}

        <div className="flex items-center gap-2 text-[11px] text-[#121212] font-semibold pt-1">
          <Sparkles className="w-3.5 h-3.5 text-[#121212] shrink-0" />
          <span>
            Every order is wrapped in silk tissue inside our signature sandalwood box with custom wax seal.
          </span>
        </div>
      </div>
    </div>
  );
}
