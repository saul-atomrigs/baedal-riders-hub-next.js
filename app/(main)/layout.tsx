'use client';

import LoadingBar from '@/components/LoadingBar';
import {
  NavigationSidebar,
  MobileNavigationTopBar,
} from '@/components/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingBar />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className='flex h-full bg-gray-50 dark:bg-gray-900'>
      <NavigationSidebar />
      <MobileNavigationTopBar />

      <main className='flex-1 bg-gray-100 dark:bg-gray-800'>{children}</main>
    </div>
  );
}
