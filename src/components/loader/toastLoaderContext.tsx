'use client';

import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { ToasterLoader } from './toastLoader';

interface ToasterLoaderContextType {
  show: (options?: { message?: string; duration?: number }) => void;
  hide: () => void;
}

const ToasterLoaderContext = createContext<ToasterLoaderContextType | undefined>(undefined);

export function ToasterLoaderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState<number | null>(null);

  const show = useCallback(
    ({ message = 'Loading...', duration }: { message?: string; duration?: number } = {}) => {
      setMessage(message);
      setDuration(duration || 3000);
      setIsOpen(true);
    },
    []
  );

  const hide = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ToasterLoaderContext.Provider value={{ show, hide }}>
      {children}
      <ToasterLoader isOpen={isOpen} message={message} duration={duration} onClose={hide} />
    </ToasterLoaderContext.Provider>
  );
}

export function useToasterLoader() {
  const context = useContext(ToasterLoaderContext);
  if (context === undefined) {
    throw new Error('useToasterLoader must be used within a ToasterLoaderProvider');
  }

  return context;
}
