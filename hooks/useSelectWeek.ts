import { parseISO, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';

export default function useSelectWeek({
  currentDate,
  fetchIncomes,
}: {
  currentDate: Date;
  fetchIncomes: (startDate: string, endDate: string) => void;
}) {
  const [selectedWeekStart, setSelectedWeekStart] = useState(
    startOfWeek(currentDate, { weekStartsOn: 1 })
  );

  useEffect(() => {
    const firstDayOfWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
    setSelectedWeekStart(firstDayOfWeek);
  }, [currentDate]);

  const handleSelectWeek = (startDate: string, endDate: string) => {
    const start = parseISO(startDate);
    setSelectedWeekStart(start);
    fetchIncomes(startDate, endDate);
  };

  return { selectedWeekStart, handleSelectWeek };
}
