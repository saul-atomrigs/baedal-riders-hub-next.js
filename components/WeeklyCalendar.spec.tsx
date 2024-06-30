import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeeklyCalendar from './WeeklyCalendar';
import { format, startOfWeek, addDays } from 'date-fns';

describe('WeeklyCalendar', () => {
  it('renders the week correctly', () => {
    const today = new Date();
    const { container } = render(
      <WeeklyCalendar currentDate={today} onDateClick={() => {}} />
    );

    const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
    daysOfWeek.forEach((day, index) => {
      expect(screen.getByText(day)).toBeInTheDocument();
      const date = addDays(startOfWeek(today), index);
      expect(screen.getByText(format(date, 'd'))).toBeInTheDocument();
    });

    // Check if today's date is highlighted
    expect(container.querySelector('.bg-blue-500')).toBeInTheDocument();
  });

  it('calls onDateClick when a date is clicked', () => {
    const today = new Date();
    const onDateClick = jest.fn();
    render(<WeeklyCalendar currentDate={today} onDateClick={onDateClick} />);

    const start = startOfWeek(today);
    const dateToClick = addDays(start, 1); // Let's click on the second day (Monday)

    fireEvent.click(screen.getByText(format(dateToClick, 'd')));

    expect(onDateClick).toHaveBeenCalledTimes(1);
    expect(onDateClick).toHaveBeenCalledWith(dateToClick);
  });

  it('highlights the clicked date', () => {
    const today = new Date();
    const { rerender, container } = render(
      <WeeklyCalendar currentDate={today} onDateClick={() => {}} />
    );

    const start = startOfWeek(today);
    const dateToClick = addDays(start, 1); // Let's click on the second day (Monday)

    // Rerender the component with the clicked date
    rerender(
      <WeeklyCalendar currentDate={dateToClick} onDateClick={() => {}} />
    );

    // Check if the clicked date is highlighted
    expect(container.querySelector('.bg-blue-500')).toHaveTextContent(
      format(dateToClick, 'd')
    );

    // Check if the initial date is no longer highlighted
    expect(container.querySelector('.bg-gray-200')).toHaveTextContent(
      format(today, 'd')
    );
  });
});
