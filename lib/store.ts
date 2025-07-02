import { create } from 'zustand';
import { Section } from './types';

type User = {
  id:string;
  name: string;
  email: string;
  isVerified: boolean;
  isAdmin?:boolean;
};

type AppState = {
  currentSection: Section;
  setCurrentSection: (section: Section) => void;
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  currentSection: 'home',
  setCurrentSection: (section) => set({ currentSection: section }),
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, currentSection: 'home' }),
}));
