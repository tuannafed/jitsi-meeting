import { HTMLAttributes } from 'react';

import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  isPublic: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type TPageInfo = {
  title: string;
  icon?: React.ReactNode;
};

export type TPageAction = {
  children: React.ReactNode;
  classNames?: className;
};

export type TTab = {
  index?: number;
  label?: string;
};

export type className = HTMLAttributes<string>['className'];

export type RowAction = 'edit' | 'detail' | 'create' | 'delete' | 'cancel';

export type DefineColumnsProps<T> = {
  onAction?: (actionType: RowAction, data: T) => void;
};

export interface IOption {
  label: string;
  value: string;
}
