import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavigationItem from './NavigationItem';
import { DollarSign } from 'lucide-react';
import Link from 'next/link';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('NavigationItem', () => {
  test('renders correctly without icon', () => {
    render(<NavigationItem href='/test'>Test Item</NavigationItem>);
    const linkElement = screen.getByRole('link', { name: /test item/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test');
  });

  test('renders correctly with icon', () => {
    render(
      <NavigationItem href='/test' icon={<DollarSign />}>
        Test Item
      </NavigationItem>
    );
    const linkElement = screen.getByRole('link', { name: /test item/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test');
  });
});
