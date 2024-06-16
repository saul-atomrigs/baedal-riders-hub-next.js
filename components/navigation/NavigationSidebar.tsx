import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ModeSelect } from '../ModeSelect';

export default function NavigationSidebar() {
  return (
    <aside className='hidden sm:flex flex-col w-32'>
      <h2 className='text-2xl font-bold m-3'>LOGO</h2>
      <nav className='text-sm mx-3 mb-3'>
        <Link
          href='/'
          className='block w-full mb-1 p-1 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          기 록
        </Link>
        <Link
          href='/user'
          className='block w-full mb-1 p-1 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          수 입
        </Link>
        <Link
          href='/expense'
          className='block w-full  mb-1 p-1 cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-gray-800'
        >
          지 출
        </Link>
      </nav>
      <div className='mb-3 mt-auto flex items-center flex-col gap-y-4'>
        <ModeSelect />
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className='hover:bh-gray-100'
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
