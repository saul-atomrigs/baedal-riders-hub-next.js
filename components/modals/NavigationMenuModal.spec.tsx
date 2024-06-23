import { render, screen, fireEvent } from '@testing-library/react';
import { useModalStore } from '@/hooks/useModalStore';
import NavigationMenuModal from '@/components/modals/NavigationMenuModal';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useModalStore.ts', () => ({
  useModalStore: jest.fn(),
}));

const mockCloseModal = jest.fn();

describe('NavigationMenuModal', () => {
  beforeEach(() => {
    (
      useModalStore as jest.MockedFunction<typeof useModalStore>
    ).mockReturnValue({
      isOpen: true,
      closeModal: mockCloseModal,
      type: 'navigationMenu',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with correct links and content', () => {
    render(<NavigationMenuModal />);

    // Check if the modal content is rendered
    expect(screen.getByText('내 가계부')).toBeInTheDocument();
    expect(screen.getByText('소셜')).toBeInTheDocument();
    expect(screen.getByText('테마 설정')).toBeInTheDocument();
  });

  it('should close the modal when a link is clicked', () => {
    render(<NavigationMenuModal />);

    // Simulate clicking on the '내 가계부' link
    fireEvent.click(screen.getByText('내 가계부'));

    // Verify that the closeModal function is called
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it('should close the modal when the close button is clicked', () => {
    render(<NavigationMenuModal />);

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    // Verify that the closeModal function is called
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
