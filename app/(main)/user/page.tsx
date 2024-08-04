'use client';

import BuyMeACoffeeButton from '@/components/BuyMeACoffeeButton';

export default function UserPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-y-2'>
      ⚙️ 열씨미 만들고 있어요... 곧 만나요!
      <BuyMeACoffeeButton />
      (개발자 커피 사주기)
    </div>
  );
}
