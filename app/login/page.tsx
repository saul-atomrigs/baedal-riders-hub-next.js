'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function InitialPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-y-2'>
      <h1 className='text-3xl font-bold rounded-md p-1'>라이더스 허브</h1>
      <h5>도로 위의 히어로, 대한민국 배달 라이더와 함께합니다</h5>

      <button
        onClick={() =>
          signIn('kakao', {
            callbackUrl: '/user',
          })
        }
        className='mt-5'
      >
        <Image
          src='/kakao_login_medium_wide.png'
          alt='kakao login'
          width={300}
          height={100}
        />
      </button>

      <Link href={''} className='underline text-xs'>
        둘러볼래요
      </Link>
    </div>
  );
}
