'use client';

import { NavigationSidebar } from '@/components/navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full bg-gray-50 dark:bg-gray-900'>
      <NavigationSidebar />
      <main className='flex-1 bg-gray-100 dark:bg-gray-800'>{children}</main>
    </div>
  );
}
