import { useModalStore } from '@/hooks/useModalStore';
import { Dialog, DialogContent } from '../ui/dialog';

export default function NavigationMenuModal() {
  const { isOpen, closeModal, type } = useModalStore();

  const isModalOpen = isOpen && type === 'navigationMenu';

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <div>내 가계부</div>
        <div>소셜</div>
      </DialogContent>
    </Dialog>
  );
}
