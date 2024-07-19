import { useEffect, useState } from 'react';
import { formatDateInKorean } from '@/lib/utils';
import { type IncomeData } from '@/hooks/useIncome';
import { Input } from './ui/input';
import { Button } from './ui/button';
import BrandedBadge from './BrandedBadge';
import { IncomeType } from '@/app/api/incomes/route';
import useFetchDailyIncome from '@/hooks/useFetchDailyIncome';

type PanelProps = {
  currentDate: Date;
  incomes: IncomeType[];
  postIncomes: (incomeData: IncomeData) => void;
  updateIncomes: (incomeData: IncomeData) => void;
};

export default function InputsPanel({
  currentDate,
  incomes,
  postIncomes,
  updateIncomes,
}: PanelProps) {
  const fetchedIncome = useFetchDailyIncome(currentDate, incomes);
  const [income, setIncome] = useState<IncomeData>(fetchedIncome);

  useEffect(() => {
    setIncome(fetchedIncome);
  }, [fetchedIncome]);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (income.id) {
      updateIncomes({
        id: income.id,
        baemin: income.baemin,
        coupang: income.coupang,
      });
    } else {
      postIncomes({
        baemin: income.baemin,
        coupang: income.coupang,
      });
    }
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <h1>{formatDateInKorean(currentDate)}</h1>

      <form onSubmit={handlePost} className='flex flex-col gap-y-2'>
        <Input
          placeholder='원'
          badge={<BrandedBadge label='배민' variant='baemin' />}
          type='number'
          value={income.baemin}
          onChange={(e) => setIncome({ ...income, baemin: +e.target.value })}
          onFocus={(e) => e.target.select()}
        />
        <Input
          placeholder='원'
          badge={<BrandedBadge label='쿠팡' variant='coupang' />}
          type='number'
          value={income.coupang}
          onChange={(e) => setIncome({ ...income, coupang: +e.target.value })}
          onFocus={(e) => e.target.select()}
        />
        <Button variant='primary' type='submit'>
          등록
        </Button>
      </form>
    </div>
  );
}
