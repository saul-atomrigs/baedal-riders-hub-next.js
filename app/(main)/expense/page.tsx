'use client';

import React, { useState } from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';
import Panel from '@/components/Panel';

export default function page() {
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

        <Panel currentDate={currentDate} />
      </div>
    </div>
  );
}
