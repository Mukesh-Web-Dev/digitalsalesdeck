"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

type GlobalAudioContextType = {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
};

const GlobalAudioContext = createContext<GlobalAudioContextType>({
  isMuted: true,
  setIsMuted: () => {},
});

export function GlobalAudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <GlobalAudioContext.Provider value={{ isMuted, setIsMuted }}>
      {children}
    </GlobalAudioContext.Provider>
  );
}

export function useGlobalAudio() {
  return useContext(GlobalAudioContext);
}
