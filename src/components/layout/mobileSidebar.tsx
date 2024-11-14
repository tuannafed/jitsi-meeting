'use client';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

import { DashboardNav } from '@/components/dashboardNav';
import { Icons } from '@/components/icons';
import { navItems } from '@/components/layout/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { APP_NAME } from '@/constants/app';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="flex items-center mb-6 px-2.5 text-xl font-semibold tracking-tight">
                <Icons.bot className="w-6 h-6 mr-2" />
                <span className="pt-1">{APP_NAME}</span>
              </h2>

              <div className="space-y-1">
                <DashboardNav items={navItems} isMobileNav={true} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
