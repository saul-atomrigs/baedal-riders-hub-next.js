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
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    startOfWeek(currentDate, { weekStartsOn: 1 })
  );
  const [weeks, setWeeks] = useState<
    { id: string; label: string; value: string }[]
  >([]);

  useEffect(() => {
    const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    setSelectedWeekStart(firstDayOfWeek);

    const loadWeeks = async () => {
      const incomes = await fetchIncomes();
      const weekData = parseWeekData(incomes);
      setWeeks(weekData);
    };

    loadWeeks();
  }, [currentDate]);

  const handleSelectWeek = async (startDate: string, endDate: string) => {
    const start = parseISO(startDate);
    setSelectedWeekStart(start);
    const incomes = await fetchIncomes(startDate, endDate);
    setWeeks(parseWeekData(incomes));
  };

  return { selectedWeekStart, handleSelectWeek, weeks };
}
