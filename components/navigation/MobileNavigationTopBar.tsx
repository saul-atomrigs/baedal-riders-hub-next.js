import { useModalStore } from '@/hooks/useModalStore';
import { Menu } from 'lucide-react';

export default function MobileNavigationTopBar() {
  const { openModal } = useModalStore();

  return (
    <>
      <div className='fixed top-0 left-0 w-full shadow-md flex md:hidden justify-between items-center p-4'>
        <span>LOGO</span>
        <Menu aria-label='menu' onClick={() => openModal('navigationMenu')} />
      </div>
    </>
  );
}
