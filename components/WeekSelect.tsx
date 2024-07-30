import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { parseWeekData } from '@/lib/utils';
import type { FetchIncomes } from '@/hooks/useIncome';

type WeekSelectProps = {
  onSelectWeek: (startDate: string, endDate: string) => void;
  fetchIncomes: FetchIncomes;
};

type WeekDataProps = {
  id: number;
  label: string;
  value: string;
};

export default function WeekSelect({
  onSelectWeek,
  fetchIncomes,
}: WeekSelectProps) {
  const [weekData, setWeekData] = useState<WeekDataProps[]>([]);

  useEffect(() => {
    async function getWeekData() {
      const incomes = await fetchIncomes();
      const data = parseWeekData(incomes);
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
        <SelectValue placeholder={weekData[0]?.label} />
      </SelectTrigger>
      <SelectContent>
        {weekData.map((week) => {
          return (
            <SelectItem key={week.id} value={week.value}>
              {week.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
