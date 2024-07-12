import { useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { formatDateInKorean } from '@/lib/utils';
import { Input } from './ui/input';
import BrandedBadge from './BrandedBadge';

type PanelProps = {
  currentDate: Date;
};

export default function InputsPanel({ currentDate }: PanelProps) {
  const [income, setIncome] = useState({
    baemin: 0,
    coupang: 0,
  });
  const { data: session } = useSession();
  const kakaoId = session?.user?.id || '';

  const handlePost = async () => {
    await axios.post('/api/incomes', {
      kakaoId: kakaoId,
      baeminIncome: income.baemin,
      coupangIncome: income.coupang,
      createdAt: currentDate,
    });
  };

  return (
    <>
      <h1>{formatDateInKorean(currentDate)}</h1>

      <div className='flex flex-col gap-1 mt-1'>
        <form onSubmit={handlePost}>
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
      </div>
      <button onClick={handlePost}>등록</button>
    </>
  );
}
