import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModeSelect from './ModeSelect';
import { useTheme } from 'next-themes';

// Mock the useTheme hook
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

describe('ModeSelect', () => {
  let setThemeMock: jest.Mock;

  beforeEach(() => {
    setThemeMock = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: setThemeMock,
    });
  });

  it('renders the button with sun if theme is light', () => {
    // Mock the useTheme hook:
    setThemeMock.mockReturnValue('light');
    render(<ModeSelect />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();

    const sunIcon = screen.getByLabelText('sun');

    expect(sunIcon).toBeInTheDocument();
  });

  it('renders the button with moon if theme is dark', () => {
    // Mock the useTheme hook:
    setThemeMock.mockReturnValue('dark');
    render(<ModeSelect />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();

    const moonIcon = screen.getByLabelText('moon');

    expect(moonIcon).toBeInTheDocument();
  });
});
