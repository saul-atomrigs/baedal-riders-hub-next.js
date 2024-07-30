import { format, addDays, isSameDay } from 'date-fns';

import { type IncomeType } from '@/app/api/incomes/route';
import { type FetchIncomes } from '@/hooks/useIncome';
import useSelectWeek from '@/hooks/useSelectWeek';
import useTargetIncome from '@/hooks/useTargetIncome';
import WeekSelect from '@/components/WeekSelect';
import { Input } from '@/components/ui/input';

type WeeklyCalendarProps = {
  currentDate: Date;
  onDateClick: (date: Date) => void;
  incomes: IncomeType[];
  fetchIncomes: FetchIncomes;
};

export default function WeeklyCalendar({
  currentDate,
  onDateClick,
  incomes,
  fetchIncomes,
}: WeeklyCalendarProps) {
  const { targetIncome, setTargetIncome, handleSaveTargetIncome } =
    useTargetIncome({ incomes });
  const { selectedWeekStart, handleSelectWeek } = useSelectWeek({
    currentDate,
    fetchIncomes,
  });

  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

  const incomeMap: { [date: string]: number } = {};
  incomes.forEach((income) => {
    const date: string = format(income.createdAt, 'yyyy-MM-dd');
    if (!incomeMap[date]) {
      incomeMap[date] = 0;
    }
    incomeMap[date] += (income.baeminIncome || 0) + (income.coupangIncome || 0);
  });

  const barsData = daysOfWeek.map((_, index) => {
    const date = format(addDays(selectedWeekStart, index), 'yyyy-MM-dd');
    return incomeMap[date] || 0;
  });

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex justify-between'>
        <div className='w-[150px]'>
          <h3>이번주 실적</h3>
          <WeekSelect
            onSelectWeek={handleSelectWeek}
            fetchIncomes={fetchIncomes}
          />
        </div>
        <div className='w-[100px]'>
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
          const date = addDays(selectedWeekStart, index);
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
