'use client';

import React, { useState } from 'react';
import WeeklyCalendar from '@/components/WeeklyCalendar';

export default function page() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <WeeklyCalendar
        label='이번주 실적'
        currentDate={currentDate}
        onDateClick={handleDateClick}
      />
    </div>
  );
}
