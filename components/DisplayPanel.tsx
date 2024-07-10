import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

type PanelProps = {
  currentDate: Date;
};

export default function DisplayPanel() {
  const { data: session } = useSession();
  const kakaoId = session?.user?.id || '';

  return (
    <div>
      <div className='flex flex-col gap-1 mt-1'></div>
    </div>
  );
}
