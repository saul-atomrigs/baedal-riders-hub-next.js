import Link from 'next/link';

import { useModalStore } from '@/hooks/useModalStore';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import ModeSelect from '@/components/ModeSelect';

export default function NavigationMenuModal() {
  const { isOpen, closeModal, type } = useModalStore();

  const isModalOpen = isOpen && type === 'navigationMenu';

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className='w-full h-full flex flex-col gap-y-10 py-20'>
        <Link
          onClick={closeModal}
          href='/expense'
          className='block px-2 py-1 rounded-md shadow-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100'
        >
          내 가계부
        </Link>
        <Link
          onClick={closeModal}
          href='/user'
          className='block px-2 py-1 rounded-md shadow-sm bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100'
        >
          소셜
        </Link>
        <div className='flex items-center justify-between h-[24px]'>
          테마 설정
          <div className='bg-slate-100 dark:bg-slate-900 rounded-full'>
            <ModeSelect />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
