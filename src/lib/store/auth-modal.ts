"use client";

import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  view: "login" | "register";
  onSuccessCallback?: () => void;
  openModal: (view?: "login" | "register", onSuccess?: () => void) => void;
  closeModal: () => void;
  setView: (view: "login" | "register") => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: "login",
  onSuccessCallback: undefined,
  openModal: (view = "login", onSuccess) =>
    set({ isOpen: true, view, onSuccessCallback: onSuccess }),
  closeModal: () => set({ isOpen: false, onSuccessCallback: undefined }),
  setView: (view) => set({ view }),
}));
