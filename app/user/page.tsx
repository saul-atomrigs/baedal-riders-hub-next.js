'use client';

import { signOut } from 'next-auth/react';

export default function UserPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-y-2'>
      <button onClick={() => signOut({ callbackUrl: '/' })}>Logout</button>
    </div>
  );
}
