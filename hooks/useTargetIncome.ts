import { IncomeType } from '@/app/api/incomes/route';
import { getFromLocalStorage, saveInLocalStorage } from '@/lib/utils';
import { useEffect, useState } from 'react';

type TargetIncomeProps = {
  incomes: IncomeType[];
};

export default function useTargetIncome({ incomes }: TargetIncomeProps) {
  const [targetIncome, setTargetIncome] = useState('');

  useEffect(() => {
    const savedTargetIncome = getFromLocalStorage('targetIncome');
    if (savedTargetIncome) {
      setTargetIncome(savedTargetIncome);
    }
  }, []);

  const handleSaveTargetIncome = () => {
    if (incomes.length > 0) {
      saveInLocalStorage('targetIncome', targetIncome);
    }
  };

  return {
    targetIncome,
    setTargetIncome,
    handleSaveTargetIncome,
  };
}
