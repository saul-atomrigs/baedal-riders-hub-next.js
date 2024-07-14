import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { formatDateInKorean } from '@/lib/utils';
import { Input } from './ui/input';
import BrandedBadge from './BrandedBadge';
import { Button } from './ui/button';

type PanelProps = {
  currentDate: Date;
  onPost: (incomeData: { baemin: number; coupang: number }) => void;
};

export default function InputsPanel({ currentDate, onPost }: PanelProps) {
  const [income, setIncome] = useState({
    baemin: 0,
    coupang: 0,
  });
  const { data: session } = useSession();
  const kakaoId = session?.user?.id || '';

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    onPost(income);
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <h1>{formatDateInKorean(currentDate)}</h1>

      <form onSubmit={handlePost} className='flex flex-col gap-y-2'>
        <Input
          placeholder='원'
          badge={<BrandedBadge label='배민' variant='baemin' />}
          type='number'
          value={income.baemin || ''}
          onChange={(e) => setIncome({ ...income, baemin: +e.target.value })}
        />
        <Input
          placeholder='원'
          badge={<BrandedBadge label='쿠팡' variant='coupang' />}
          type='number'
          value={income.coupang || ''}
          onChange={(e) => setIncome({ ...income, coupang: +e.target.value })}
        />
      </form>

      <Button variant='primary' onClick={handlePost}>
        등록
      </Button>
    </div>
  );
}
