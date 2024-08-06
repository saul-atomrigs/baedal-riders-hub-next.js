import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

import { type IncomeType } from '@/app/api/incomes/route';

type TargetIncomeProps = {
  incomes: IncomeType[];
};

const fetchTargetIncome = async (kakaoId: string) => {
  const response = await axios.get('/api/user/target-income', {
    params: { kakaoId },
  });
  console.log('fetchTargetIncome', response.data.targetIncome);
  return response.data.targetIncome;
};

const updateTargetIncome = async ({
  kakaoId,
  targetIncome,
}: {
  kakaoId: string;
  targetIncome: number;
}) => {
  const response = await axios.patch('/api/user/target-income', {
    kakaoId,
    targetIncome,
  });
  return response.data;
};

export default function useTargetIncome({ incomes }: TargetIncomeProps) {
  const [targetIncome, setTargetIncome] = useState<number>(100000);
  const { data: session } = useSession();
  const kakaoId = session?.user?.id || '';

  const targetIncomeQuery = useQuery({
    queryKey: ['targetIncome', kakaoId],
    queryFn: () => fetchTargetIncome(kakaoId),
  });

  useEffect(() => {
    if (targetIncomeQuery.data !== undefined) {
      setTargetIncome(targetIncomeQuery.data);
    }
  }, [targetIncomeQuery.data]);

  const targetIncomeMutation = useMutation({
    mutationFn: updateTargetIncome,
  });

  const handleSaveTargetIncome = () => {
    if (incomes.length > 0 && kakaoId) {
      targetIncomeMutation.mutate({ kakaoId, targetIncome });
      console.log('Updated target income:', targetIncome);
    }
  };

  return {
    targetIncome,
    setTargetIncome,
    handleSaveTargetIncome,
  };
}
