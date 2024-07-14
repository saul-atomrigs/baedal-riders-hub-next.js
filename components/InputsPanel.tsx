import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { formatDateInKorean } from '@/lib/utils';
import useIncome, { IncomeData } from '@/hooks/useIncome';
import { Input } from './ui/input';
import { Button } from './ui/button';
import BrandedBadge from './BrandedBadge';
import { IncomeType } from '@/app/api/incomes/route';

type PanelProps = {
  currentDate: Date;
};

export default function InputsPanel({ currentDate }: PanelProps) {
  const { incomes, postIncomes, updateIncomes } = useIncome({ currentDate });

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
          id: currentIncome.id,
          baemin: currentIncome.baeminIncome || 0,
          coupang: currentIncome.coupangIncome || 0,
        });
      } else {
        setIncome({ id: '', baemin: 0, coupang: 0 });
      }
    };

    fetchIncome();
  }, [currentDate, incomes]);

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
        />
        <Input
          placeholder='원'
          badge={<BrandedBadge label='쿠팡' variant='coupang' />}
          type='number'
          value={income.coupang}
          onChange={(e) => setIncome({ ...income, coupang: +e.target.value })}
        />
      </form>

      <Button variant='primary' onClick={handlePost}>
        등록
      </Button>
    </div>
  );
}
