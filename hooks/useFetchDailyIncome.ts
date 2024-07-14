import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { type IncomeData } from '@/hooks/useIncome';
import { IncomeType } from '@/app/api/incomes/route';

export default function useFetchDailyIncome(
  currentDate: Date,
  incomes: IncomeType[]
) {
  const [income, setIncome] = useState<IncomeData>({
    id: '',
    baemin: 0,
    coupang: 0,
  });

  useEffect(() => {
    const fetchIncome = () => {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const currentIncome = incomes.find(
        (income: IncomeType) =>
          format(new Date(income.createdAt), 'yyyy-MM-dd') === dateStr
      );
      if (currentIncome) {
        setIncome({
          id: currentIncome.id.toString(),
          baemin: currentIncome.baeminIncome || 0,
          coupang: currentIncome.coupangIncome || 0,
        });
      } else {
        setIncome({ id: '', baemin: 0, coupang: 0 });
      }
    };

    fetchIncome();
  }, [currentDate, incomes]);

  return income;
}
