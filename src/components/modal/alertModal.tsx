'use client';

import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type AlertType = 'success' | 'error' | 'info';

interface AlertModalProps {
  type?: AlertType;
  title?: string;
  description?: string;
  isOpen: boolean;
  closeText?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  type = 'error',
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  closeText = 'Cancel',
  confirmText = 'Ok',
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const btnConfirmClassName = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white hover:bg-green-600';

      case 'info':
        return 'bg-blue-500 text-white hover:bg-blue-600';

      default:
        return 'bg-red-500 text-white hover:bg-red-600';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{closeText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className={btnConfirmClassName()}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
