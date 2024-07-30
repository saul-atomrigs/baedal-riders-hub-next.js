'use client';

import { useState } from 'react';

import InputsPanel from '@/components/InputsPanel';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import useIncome from '@/hooks/useIncome';

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { incomes, fetchIncomes, postIncomes, updateIncomes } = useIncome({
    currentDate,
  });

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col gap-5'>
        <WeeklyCalendar
          currentDate={currentDate}
          incomes={incomes}
          fetchIncomes={fetchIncomes}
          onDateClick={handleDateClick}
        />

        <div className='flex flex-col w-full h-11 rounded-md p-2'>
          <InputsPanel
            currentDate={currentDate}
            incomes={incomes}
            postIncomes={postIncomes}
            updateIncomes={updateIncomes}
          />
        </div>
      </div>
    </div>
  );
}
