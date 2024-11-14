'use client';

import { CardWrapperHeader } from '@/components/card/cardWrapperHeader';
import { cn } from '@/lib/utils';

import { BackButton } from '../backButton';
import { SocialLogin } from '../socialLogin';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

type CardWrapperProps = {
  children: React.ReactNode;
  headerTitle?: string;
  headerLabel: string;
  hidenHeader?: boolean;
  hidenFooter?: boolean;
  backButtonLabel?: string;
  backButtonHref?: string;
  className?: string;
  contentClassNames?: string;
  showSocial?: boolean;
};

export const CardWrapper = ({
  children,
  headerTitle,
  backButtonHref,
  backButtonLabel,
  hidenHeader = false,
  hidenFooter = false,
  headerLabel,
  showSocial = false,
  className,
  contentClassNames,
}: CardWrapperProps) => {
  return (
    <Card className={cn('bg-white dark:bg-muted w-full shadow-md', className)}>
      {!hidenHeader && (
        <CardHeader>
          <CardWrapperHeader title={headerTitle} label={headerLabel} />
        </CardHeader>
      )}

      <CardContent className={cn(contentClassNames)}>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <SocialLogin />
        </CardFooter>
      )}

      {backButtonLabel && backButtonHref && !hidenFooter && (
        <CardFooter>
          <BackButton label={backButtonLabel || ''} href={backButtonHref || ''} />
        </CardFooter>
      )}
    </Card>
  );
};
