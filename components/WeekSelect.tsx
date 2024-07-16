import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type WeekSelectProps = {
  onSelectWeek: (startDate: string, endDate: string) => void;
};

type WeekDataProps = {
  id: number;
  label: string;
  value: string;
};

// Simulated function to fetch week data from the database
async function fetchWeekData() {
  // Replace with your actual data fetching logic
  return [
    { id: 3, label: '2024년 7월 3주', value: '2024-07-15_to_2024-07-21' },
    { id: 2, label: '2024년 7월 2주', value: '2024-07-08_to_2024-07-14' },
    { id: 1, label: '2024년 7월 1주', value: '2024-07-01_to_2024-07-07' },
    // Add more weeks as needed
  ];
}

export default function WeekSelect({ onSelectWeek }: WeekSelectProps) {
  const [weekData, setWeekData] = useState<WeekDataProps[]>([]);

  useEffect(() => {
    async function getWeekData() {
      const data = await fetchWeekData();
      setWeekData(data);
    }
    getWeekData();
  }, []);

  const handleSelect = (value: keyof WeekDataProps) => {
    const [startDate, endDate] = value.split('_to_');
    onSelectWeek(startDate, endDate);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='-- 주 --' />
      </SelectTrigger>
      <SelectContent>
        {weekData.map((week) => (
          <SelectItem key={week.id} value={week.value}>
            {week.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
