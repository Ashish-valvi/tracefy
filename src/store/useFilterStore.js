import { create } from "zustand";
import { HeaderObject } from "../components/extraData";

const useFilterStore = create((set) => ({
  filters: Object.keys(HeaderObject).reduce(
    (acc, key) => ({ ...acc, [key]: true }),
    {}
  ),

  setFilters: (newFilters) => set({ filters: newFilters }),

  toggleFilter: (key) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: !state.filters[key],
      },
    })),
}));

export default useFilterStore;