import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Skip, SkipStore } from '../types/skip'

export const useSkipStore = create<SkipStore>()(
  persist(
    (set) => ({
      selectedSkip: null,
      setSelectedSkip: (skip: Skip) => set({ selectedSkip: skip }),
      clearSelection: () => set({ selectedSkip: null }),
    }),
    {
      name: 'skip-selection-storage',
    }
  )
)