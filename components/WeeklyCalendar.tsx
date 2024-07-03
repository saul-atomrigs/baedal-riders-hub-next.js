import { format, startOfWeek, addDays, isToday, isSameDay } from 'date-fns';

type WeeklyCalendarProps = {
  label: string;
  currentDate: Date;
  onDateClick: (date: Date) => void;
};

export default function WeeklyCalendar({
  label,
  currentDate,
  onDateClick,
}: WeeklyCalendarProps) {
  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

  const start = startOfWeek(new Date());

  return (
    <div className='flex flex-col gap-3'>
      <h3>{label}</h3>
      <div className='grid grid-cols-7 gap-4'>
        {daysOfWeek.map((day, index) => {
          const date = addDays(start, index + 1);
          return (
            <div
              key={day}
              className='flex flex-col items-center cursor-pointer'
              onClick={() => onDateClick(date)}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-md ${
                  isSameDay(date, currentDate)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                {format(date, 'd')}
              </div>
              <div>{day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
