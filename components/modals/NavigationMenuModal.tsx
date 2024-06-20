import { useModalStore } from '@/hooks/useModalStore';
import { Dialog, DialogContent } from '../ui/dialog';

export default function NavigationMenuModal() {
  const { isOpen, closeModal, type } = useModalStore();

  const isModalOpen = isOpen && type === 'navigationMenu';

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className='w-full h-full flex flex-col gap-y-10 py-20'>
        <button>내 가계부</button>
        <button>소셜</button>
      </DialogContent>
    </Dialog>
  );
}
