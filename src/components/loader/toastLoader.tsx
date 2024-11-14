'use client';

import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

import { Toast, ToastProvider, ToastViewport } from '@/components/ui/toast';

interface ToasterLoaderProps {
  isOpen: boolean;
  message: string;
  duration: number | null;
  onClose: () => void;
}

export function ToasterLoader({ isOpen, message, duration, onClose }: ToasterLoaderProps) {
  useEffect(() => {
    if (duration && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <ToastProvider>
      <div className="fixed inset-0 bg-black bg-opacity-50 w-full flex items-center justify-center z-50">
        <Toast
          open={isOpen}
          onOpenChange={(open) => {
            if (!open) onClose();
          }}
          className="bg-slate-800 p-4 rounded-md max-w-sm w-full border-slate-900"
        >
          <div className="flex items-center space-x-3">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
            <span className="text-sm font-medium text-white">{message}</span>
          </div>
        </Toast>
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}
