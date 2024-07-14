'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import InputsPanel from '@/components/InputsPanel';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import useIncome from '@/hooks/useIncome';

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { incomes, postIncomes, updateIncomes } = useIncome({
    currentDate,
  });

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col gap-5'>
        <WeeklyCalendar
          label='이번주 실적'
          currentDate={currentDate}
          onDateClick={handleDateClick}
          incomes={incomes}
        />

        <div className='flex flex-col w-full h-11 rounded-md p-2'>
          {/* <DisplayPanel currentDate={currentDate} /> */}

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
