'use client';

import { ChevronLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { DashboardNav } from '@/components/dashboardNav';
import { APP_NAME } from '@/constants/app';
import { useSidebar } from '@/hooks/useSidebar';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    isPublic: true,
    label: 'dashboard',
  },
];

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-gray-100 dark:bg-gray-900 transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden p-5 pt-10 md:flex md-items-center">
        <Link href="/dashboard" target="_blank">
          <ShieldCheck className="mr-2 h-6 w-6" />
        </Link>
        {!isMinimized && <h1 className="font-bold text-xl">{APP_NAME}</h1>}
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
