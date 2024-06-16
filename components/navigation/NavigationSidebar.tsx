import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ModeSelect } from '../ModeSelect';

export default function NavigationSidebar() {
  return (
    <aside className='hidden sm:flex flex-col w-32'>
      <h2 className='text-2xl font-bold m-3'>LOGO</h2>
      <nav>
        <ul className='text-sm mx-3 mb-3'>
          <li className='mb-1 p-1 w-full cursor-pointer rounded-md hover:bg-gray-100'>
            <Link href='/' className='block w-full h-full'>
              기 록
            </Link>
          </li>
          <li className='mb-1 p-1 w-full cursor-pointer rounded-md hover:bg-gray-100'>
            <Link href='/user' className='block w-full h-full'>
              수 입
            </Link>
          </li>
          <li className='mb-1 p-1 w-full cursor-pointer rounded-md hover:bg-gray-100'>
            <Link href='/expense' className='block w-full h-full'>
              지 출
            </Link>
          </li>
        </ul>
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
