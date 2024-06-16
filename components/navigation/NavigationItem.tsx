import { DollarSign } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type NavigationItemProps = {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
};

export default function NavigationItem({
  children,
  href,
  icon,
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      className='flex flex-col items-center gap-y-1 w-full mb-1 p-1 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 '
    >
      {icon && <span>{icon}</span>}

      {children}
    </Link>
  );
}
