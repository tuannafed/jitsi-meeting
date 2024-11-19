import React, { Fragment } from 'react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function PageContainer({
  children,
  scrollable = false,
  className,
  scrollClassName,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
  scrollClassName?: string;
}) {
  return (
    <Fragment>
      {scrollable ? (
        <ScrollArea className={cn('h-[calc(100dvh-52px)]', scrollClassName)}>
          <div className={cn('h-full p-4', className)}>{children}</div>
        </ScrollArea>
      ) : (
        <div className={cn('h-full w-full', className)}>{children}</div>
      )}
    </Fragment>
  );
}
