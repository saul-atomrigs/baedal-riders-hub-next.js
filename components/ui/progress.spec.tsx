import { render, screen } from '@testing-library/react';
import { act } from 'React';
import '@testing-library/jest-dom';
import LoadingBar from '../LoadingBar';

jest.useFakeTimers();

describe('LoadingBar', () => {
  test('renders progress bar initially', () => {
    render(<LoadingBar />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  test('hides progress bar after reaching 100%', () => {
    render(<LoadingBar />);

    act(() => {
      jest.advanceTimersByTime(3000); // 3 intervals of 1000ms each
    });

    act(() => {
      jest.advanceTimersByTime(1000); // Ensure the component has time to unmount
    });

    const progressBar = screen.queryByRole('progressbar');
    expect(progressBar).not.toBeInTheDocument();
  });
});
