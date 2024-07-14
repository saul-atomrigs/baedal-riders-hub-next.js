'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

import WeeklyCalendar from '@/components/WeeklyCalendar';
import InputsPanel from '@/components/InputsPanel';
import DisplayPanel from '@/components/DisplayPanel';
import { type IncomeType } from '@/app/api/incomes/route';

export default function Page() {
  const { data: session } = useSession();
  const kakaoId = session?.user?.id || '';

  const [currentDate, setCurrentDate] = useState(new Date());
  const [incomes, setIncomes] = useState<IncomeType[]>([]);

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
  };

  const handlePost = async (incomeData: {
    baemin: number;
    coupang: number;
  }) => {
    await axios.post('/api/incomes', {
      kakaoId: kakaoId,
      baeminIncome: incomeData.baemin,
      coupangIncome: incomeData.coupang,
      createdAt: currentDate,
    });
    fetchIncomes();
  };

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`/api/incomes?kakaoId=${kakaoId}`);
      setIncomes(response.data);
    } catch (error) {
      console.log('[incomes page]', error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [currentDate]);

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

          <InputsPanel currentDate={currentDate} onPost={handlePost} />
        </div>
      </div>
    </div>
  );
}
