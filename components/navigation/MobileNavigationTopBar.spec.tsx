import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useModalStore } from '@/hooks/useModalStore';
import MobileNavigationTopBar from './MobileNavigationTopBar';
import NavigationMenuModal from '../modals/NavigationMenuModal';

jest.mock('../../hooks/useModalStore');

describe('MobileNavigationTopBar and NavigationMenuModal', () => {
  const openModal = jest.fn();
  const closeModal = jest.fn();

  beforeEach(() => {
    openModal.mockReset();
    closeModal.mockReset();

    (
      useModalStore as jest.MockedFunction<typeof useModalStore>
    ).mockReturnValue({
      openModal,
      closeModal,
      isOpen: false,
      type: null,
    });
  });

  test('renders the menu button', () => {
    render(<MobileNavigationTopBar />);
    const menuButton = screen.getByLabelText('menu');
    expect(menuButton).toBeInTheDocument();
  });

  test('opens the menu modal when the menu button is clicked', () => {
    render(
      <>
        <MobileNavigationTopBar />
        <NavigationMenuModal />
      </>
    );

    const menuButton = screen.getByLabelText('menu');
    fireEvent.click(menuButton);

    expect(openModal).toHaveBeenCalledWith('navigationMenu');
  });

  test('displays the modal when openModal is called with "navigationMenu"', () => {
    (
      useModalStore as jest.MockedFunction<typeof useModalStore>
    ).mockReturnValue({
      openModal,
      closeModal,
      isOpen: true,
      type: 'navigationMenu',
    });

    render(<NavigationMenuModal />);

    const dialogContent = screen.getByRole('dialog');

    expect(dialogContent).toBeInTheDocument();
  });
});
