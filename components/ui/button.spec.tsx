import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button component', () => {
  test('renders default button', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button', { name: /default/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-primary text-primary-foreground hover:bg-primary/90'
    );
  });

  test('renders destructive button', () => {
    render(<Button variant='destructive'>Destructive</Button>);
    const button = screen.getByRole('button', { name: /destructive/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-destructive text-destructive-foreground hover:bg-destructive/90'
    );
  });

  test('renders outline button', () => {
    render(<Button variant='outline'>Outline</Button>);
    const button = screen.getByRole('button', { name: /outline/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
    );
  });

  test('renders secondary button', () => {
    render(<Button variant='secondary'>Secondary</Button>);
    const button = screen.getByRole('button', { name: /secondary/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-secondary text-secondary-foreground hover:bg-secondary/80'
    );
  });

  test('renders ghost button', () => {
    render(<Button variant='ghost'>Ghost</Button>);
    const button = screen.getByRole('button', { name: /ghost/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('hover:bg-accent hover:text-accent-foreground');
  });

  test('renders link button', () => {
    render(<Button variant='link'>Link</Button>);
    const button = screen.getByRole('button', { name: /link/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'text-primary underline-offset-4 hover:underline'
    );
  });

  test('renders small button', () => {
    render(<Button size='sm'>Small</Button>);
    const button = screen.getByRole('button', { name: /small/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-9 rounded-md px-3');
  });

  test('renders large button', () => {
    render(<Button size='lg'>Large</Button>);
    const button = screen.getByRole('button', { name: /large/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-11 rounded-md px-8');
  });

  test('renders icon button', () => {
    render(<Button size='icon'>Icon</Button>);
    const button = screen.getByRole('button', { name: /icon/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-10 w-10');
  });

  test('renders custom class name', () => {
    render(<Button className='custom-class'>Custom Class</Button>);
    const button = screen.getByRole('button', { name: /custom class/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
  });

  test('renders as a child component', () => {
    render(
      <Button asChild>
        <a href='/test'>Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });
});
