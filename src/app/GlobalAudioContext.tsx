"use client";

import { createContext, useState, useContext, ReactNode } from 'react';

/**
 * Type definition for the Global Audio Context.
 * Describes the state and state-updater function that will be accessible
 * to any component wrapping or children of the GlobalAudioProvider.
 */
type GlobalAudioContextType = {
  /** True if all videos in the application should have audio silenced */
  isMuted: boolean;
  /** Function to update the muted state globally across all active components */
  setIsMuted: (muted: boolean) => void;
};

/**
 * Creates the React Context with a default configuration.
 * By default, audio is muted (true) to strictly align with modern browser 
 * autoplay policies (which block programmatic media audio playing without 
 * initial explicit user engagement).
 */
const GlobalAudioContext = createContext<GlobalAudioContextType>({
  isMuted: true,
  setIsMuted: () => {},
});

/**
 * GlobalAudioProvider Component
 * 
 * Wraps the entire layout (or sub-components) to provide a unified audio control state.
 * Any component (like PlayerControls or VideoSection) nested inside this provider can
 * dynamically read or update the muted status, ensuring that muting one video
 * instantly synchronizes and silences all other active videos.
 */
export function GlobalAudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <GlobalAudioContext.Provider value={{ isMuted, setIsMuted }}>
      {children}
    </GlobalAudioContext.Provider>
  );
}

/**
 * useGlobalAudio Custom Hook
 * 
 * Simple utility hook that allows any client component to easily access
 * the global audio state and updater functions without manually calling useContext.
 * 
 * @example
 * const { isMuted, setIsMuted } = useGlobalAudio();
 */
export function useGlobalAudio() {
  return useContext(GlobalAudioContext);
}
