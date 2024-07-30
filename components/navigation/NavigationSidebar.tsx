import { signOut, useSession } from 'next-auth/react';
import ModeSelect from '../ModeSelect';
import { DollarSign, Users } from 'lucide-react';
import NavigationItem from './NavigationItem';

export default function NavigationSidebar() {
  const { data: session } = useSession();

  return (
    <aside className='hidden sm:flex flex-col w-24'>
      <h2 className='text-2xl font-bold m-3'>LOGO</h2>
      <nav className='text-sm mx-3 mb-3'>
        <NavigationItem
          href='/income'
          children='내 가계부'
          icon={<DollarSign />}
        />
        <NavigationItem href='/user' children='소셜' icon={<Users />} />
      </nav>
      <div className='mb-3 mt-auto flex items-center flex-col gap-y-4'>
        <ModeSelect />
        {session?.user?.name} 님
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className='text-xs text-rose-500 hover:text-rose-600'
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}
