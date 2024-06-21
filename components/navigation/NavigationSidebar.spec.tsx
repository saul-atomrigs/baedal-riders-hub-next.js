import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationSidebar from './NavigationSidebar';
import { signOut } from 'next-auth/react';

// Mock the ModeSelect component
jest.mock('../ModeSelect', () => () => <div>ModeSelect Component</div>);

// Mock the lucide-react icons
jest.mock('lucide-react', () => ({
  DollarSign: () => <svg data-testid='dollar-sign' />,
  Users: () => <svg data-testid='users-icon' />,
}));

// Mock the signOut function from next-auth/react
jest.mock('next-auth/react', () => ({
  signOut: jest.fn(),
}));

describe('NavigationSidebar', () => {
  it('renders the sidebar with all elements', () => {
    render(<NavigationSidebar />);

    // Check for the logo
    expect(screen.getByText('LOGO')).toBeInTheDocument();

    // Check for the navigation items
    expect(screen.getByText('내 가계부')).toBeInTheDocument();
    expect(screen.getByText('소셜')).toBeInTheDocument();

    // Check for the icons
    expect(screen.getByTestId('dollar-sign')).toBeInTheDocument();
    expect(screen.getByTestId('users-icon')).toBeInTheDocument();

    // Check for the ModeSelect component
    expect(screen.getByText('ModeSelect Component')).toBeInTheDocument();

    // Check for the user name
    expect(screen.getByText('홍길동 님')).toBeInTheDocument();

    // Check for the logout button
    expect(screen.getByText('로그아웃')).toBeInTheDocument();
  });

  it('calls signOut function when logout button is clicked', () => {
    render(<NavigationSidebar />);

    // Find the logout button
    const logoutButton = screen.getByText('로그아웃');

    // Click the logout button
    fireEvent.click(logoutButton);

    // Check if signOut was called with the correct callback URL
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });
});
