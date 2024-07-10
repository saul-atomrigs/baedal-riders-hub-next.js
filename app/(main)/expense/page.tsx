'use client';

import React, { useState } from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import Panel from '@/components/Panel';
import DisplayPanel from '@/components/DisplayPanel';
import useHover from '@/hooks/useHover';

export default function Page() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHover();

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

        <div
          className='w-full h-11 rounded-md p-2'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered ? <Panel currentDate={currentDate} /> : <DisplayPanel />}
        </div>
      </div>
    </div>
  );
}
