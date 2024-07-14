import { type IncomeType } from '@/app/api/incomes/route';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Input } from './ui/input';
import useTargetIncome from '@/hooks/useTargetIncome';

type WeeklyCalendarProps = {
  label: string;
  currentDate: Date;
  onDateClick: (date: Date) => void;
  incomes: IncomeType[];
};

export default function WeeklyCalendar({
  label,
  currentDate,
  onDateClick,
  incomes,
}: WeeklyCalendarProps) {
  const { targetIncome, setTargetIncome, handleSaveTargetIncome } =
    useTargetIncome({ incomes });

  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });

  const incomeMap: { [date: string]: number } = {};
  incomes.forEach((income) => {
    const date: string = format(income.createdAt, 'yyyy-MM-dd');
    if (!incomeMap[date]) {
      incomeMap[date] = 0;
    }
    incomeMap[date] += (income.baeminIncome || 0) + (income.coupangIncome || 0);
  });

  const barsData = daysOfWeek.map((_, index) => {
    const date = format(addDays(start, index), 'yyyy-MM-dd');
    return incomeMap[date] || 0;
  });

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex justify-between'>
        <h3>{label}</h3>
        <div className=''>
          <p>일일 목표</p>
          <Input
            type='number'
            placeholder='원'
            value={targetIncome}
            onChange={(e) => setTargetIncome(e.target.value)}
            onBlur={handleSaveTargetIncome}
          />
        </div>
      </div>
      <div className='grid grid-cols-7 gap-4'>
        {daysOfWeek.map((day, index) => {
          const date = addDays(start, index);
          return (
            <div
              key={day}
              className='flex flex-col items-center cursor-pointer'
              onClick={() => onDateClick(date)}
            >
              {/* Container for bar graph */}
              <div className='flex flex-col-reverse items-center h-24 mb-2'>
                <div
                  className='bg-blue-500 w-4'
                  style={{
                    height: `${(barsData[index] * 100) / +targetIncome}px`,
                  }}
                />
              </div>
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
