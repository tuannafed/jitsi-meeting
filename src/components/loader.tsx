'use client';

import React from 'react';

import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';

interface ILoaderProps {
  classNames?: string;
  iconClassNames?: string;
}

export const Loader = ({ classNames, iconClassNames }: ILoaderProps) => {
  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-5',
        classNames
      )}
    >
      <Icons.loader className={cn('w-8 h-8 animate-spin', iconClassNames)} />
    </div>
  );
};
