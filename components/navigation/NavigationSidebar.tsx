import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { ModeSelect } from '../ModeSelect';
import { DollarSign, Users } from 'lucide-react';
import NavigationItem from './NavigationItem';

export default function NavigationSidebar() {
  return (
    <aside className='hidden sm:flex flex-col w-24'>
      <h2 className='text-2xl font-bold m-3'>LOGO</h2>
      <nav className='text-sm mx-3 mb-3'>
        <NavigationItem
          href='/expense'
          children='내 가계부'
          icon={<DollarSign />}
        />
        <NavigationItem href='/user' children='소셜' icon={<Users />} />
      </nav>
      <div className='mb-3 mt-auto flex items-center flex-col gap-y-4'>
        <ModeSelect />
        홍길동 님
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className='text-xs text-rose-500 hover:text-rose-600'
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}
