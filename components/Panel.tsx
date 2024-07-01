import { formatDateInKorean } from '@/lib/utils';
import React from 'react';
import { Input } from './ui/input';
import BrandedBadge from './BrandedBadge';

type PanelProps = {
  currentDate: Date;
};

export default function Panel({ currentDate }: PanelProps) {
  return (
    <div className='w-full h-full rounded-md p-2 bg-slate-200 dark:bg-gray-700'>
      <h1>{formatDateInKorean(currentDate)}</h1>

      <div className='flex flex-col gap-1 mt-1'>
        <Input
          placeholder='원'
          badge={<BrandedBadge label='배민' variant='baemin' />}
        />
        <Input
          placeholder='원'
          badge={<BrandedBadge label='쿠팡' variant='coupang' />}
        />
      </div>
    </div>
  );
}
