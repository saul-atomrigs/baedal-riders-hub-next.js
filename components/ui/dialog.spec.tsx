// Dialog.test.tsx
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './dialog';

describe('Dialog component', () => {
  test('renders dialog trigger', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
      </Dialog>
    );
    const trigger = screen.getByRole('button', { name: /open dialog/i });
    expect(trigger).toBeInTheDocument();
  });

  test('opens and closes dialog', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogFooter>
            <button>Close</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    const trigger = screen.getByRole('button', { name: /open dialog/i });
    fireEvent.click(trigger);

    const title = screen.getByText('Dialog Title');
    const description = screen.getByText('Dialog Description');
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    expect(title).not.toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
  });

  test('renders dialog header, footer, title, and description', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogFooter>
            <button>Footer Button</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
    const trigger = screen.getByRole('button', { name: /open dialog/i });
    fireEvent.click(trigger);

    const title = screen.getByText('Dialog Title');
    const description = screen.getByText('Dialog Description');
    const footerButton = screen.getByRole('button', { name: /footer button/i });

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(footerButton).toBeInTheDocument();
  });

  test('closes dialog using close button', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogDescription>Dialog Description</DialogDescription>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );
    const trigger = screen.getByRole('button', { name: /open dialog/i });
    fireEvent.click(trigger);

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    const title = screen.queryByText('Dialog Title');
    const description = screen.queryByText('Dialog Description');

    expect(title).not.toBeInTheDocument();
    expect(description).not.toBeInTheDocument();
  });
});
