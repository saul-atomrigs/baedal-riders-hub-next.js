'use client';

import React, { useState } from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import InputsPanel from '@/components/InputsPanel';
import DisplayPanel from '@/components/DisplayPanel';

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date());

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
        />

        <div className='flex flex-col w-full h-11 rounded-md p-2'>
          <DisplayPanel currentDate={currentDate} />

          <InputsPanel currentDate={currentDate} />
        </div>
      </div>
    </div>
  );
}
