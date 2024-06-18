// MobileNavigationTopBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MobileNavigationTopBar from './MobileNavigationTopBar';

describe('MobileNavigationTopBar', () => {
  test('renders the menu button', () => {
    render(<MobileNavigationTopBar />);
    const menuButton = screen.getByLabelText('menu');
    expect(menuButton).toBeInTheDocument();
  });

  test('toggles the menu on button click', () => {
    render(<MobileNavigationTopBar />);
    const menuButton = screen.getByLabelText('menu');

    // Initially, the menu should not be visible
    expect(screen.queryByText('Home')).not.toBeInTheDocument();

    // Click the menu button to open the menu
    fireEvent.click(menuButton);
    expect(screen.getByText('Home')).toBeInTheDocument();

    // Click the menu button again to close the menu
    fireEvent.click(menuButton);
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  test('displays all navigation links when menu is open', () => {
    render(<MobileNavigationTopBar />);
    const menuButton = screen.getByLabelText('menu');

    // Open the menu
    fireEvent.click(menuButton);

    // Check that all links are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('navigates to correct section on link click', () => {
    render(<MobileNavigationTopBar />);
    const menuButton = screen.getByLabelText('menu');

    // Open the menu
    fireEvent.click(menuButton);

    // Mock the window location hash change
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    expect(window.location.hash).toBe('#home');

    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);
    expect(window.location.hash).toBe('#about');

    const servicesLink = screen.getByText('Services');
    fireEvent.click(servicesLink);
    expect(window.location.hash).toBe('#services');

    const contactLink = screen.getByText('Contact');
    fireEvent.click(contactLink);
    expect(window.location.hash).toBe('#contact');
  });
});
