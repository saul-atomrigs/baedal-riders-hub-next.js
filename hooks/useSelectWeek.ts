import { parseWeekData } from '@/lib/utils';
import { parseISO, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import type { FetchIncomes } from './useIncome';

export default function useSelectWeek({
  currentDate,
  fetchIncomes,
}: {
  currentDate: Date;
  fetchIncomes: FetchIncomes;
}) {
  const CURRENT_WEEK_START_DATE = startOfWeek(currentDate, { weekStartsOn: 1 });
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    CURRENT_WEEK_START_DATE
  );

  useEffect(() => {
    (async () => {
      const incomes = await fetchIncomes();
      parseWeekData(incomes);
    })();
  }, [currentDate]);

  const handleSelectWeek = async (startDate: string, endDate: string) => {
    const start = parseISO(startDate);
    setSelectedWeekStart(start);
    const incomes = await fetchIncomes(startDate, endDate);
    parseWeekData(incomes);
  };

  return { selectedWeekStart, handleSelectWeek };
}
