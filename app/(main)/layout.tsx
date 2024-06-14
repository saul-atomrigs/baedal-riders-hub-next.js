import { NavigationSidebar } from '@/components/navigation';
import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen bg-gray-50 dark:bg-gray-900'>
      <aside className='hidden sm:flex flex-col w-32 p-6'>
        <h2 className='text-2xl font-bold mb-2'>LOGO</h2>
        <nav>
          <ul className='text-sm'>
            <li className='mb-1 p-1 w-full cursor-pointer rounded-md hover:bg-gray-300'>
              <Link href='/' className='block w-full h-full'>
                내 기록
              </Link>
            </li>
            <li className='mb-1 p-1 w-full cursor-pointer rounded-md hover:bg-slate-300'>
              <Link href='/user' className='block w-full h-full'>
                수입
              </Link>
            </li>
            <li className='mb-1 p-1 w-full cursor-pointer rounded-md hover:bg-slate-300'>
              <Link href='/expense' className='block w-full h-full'>
                지출
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className='flex-1 p-6 bg-gray-100'>{children}</main>
    </div>
  );
}
