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
      <SelectTrigger style={{ width: '180px' }}>
        <SelectValue placeholder={weekData[0]?.label} />
      </SelectTrigger>
      <SelectContent
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          scrollbarWidth: 'thin' /* For Firefox */,
          scrollbarColor: '#888 #e0e0e0' /* For Firefox */,
        }}
      >
        {weekData.map((week) => (
          <SelectItem key={week.id} value={week.value}>
            {week.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
