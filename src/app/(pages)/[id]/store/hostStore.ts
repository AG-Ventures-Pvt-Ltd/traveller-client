import { create } from 'zustand';

interface HostStore {
  hostId: string | null;
  fullName: string | null;
  setHostData: (id: string, fullName: string) => void;
  clearHostData: () => void;
}

export const useHostStore = create<HostStore>((set) => ({
  hostId: null,
  fullName: null,
  setHostData: (id: string, fullName: string) =>
    set({ hostId: id, fullName }),
  clearHostData: () => set({ hostId: null, fullName: null }),
}));
