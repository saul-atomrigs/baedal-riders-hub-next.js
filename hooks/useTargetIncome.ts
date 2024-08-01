import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { type IncomeType } from '@/app/api/incomes/route';

type TargetIncomeProps = {
  incomes: IncomeType[];
};

export default function useTargetIncome({ incomes }: TargetIncomeProps) {
  const [targetIncome, setTargetIncome] = useState<number>(100000); // Initialize with null or undefined to indicate loading
  const { data: session } = useSession();
  const kakaoId = session?.user?.id || '';

  useEffect(() => {
    const fetchTargetIncome = async () => {
      if (kakaoId) {
        try {
          const response = await axios.get('/api/user/target-income', {
            params: { kakaoId },
          });

          if (response.data) {
            setTargetIncome(response.data.targetIncome || 0); // Fallback to 0 if no targetIncome is found
          }
        } catch (error) {
          console.error('Error fetching target income:', error);
          setTargetIncome(0); // Fallback to a default value if error occurs
        }
      }
    };

    fetchTargetIncome();
  }, [kakaoId]); // Dependency on kakaoId, will run again if kakaoId changes

  const handleSaveTargetIncome = async () => {
    if (incomes.length > 0 && kakaoId) {
      try {
        const response = await axios.patch('/api/user/target-income', {
          kakaoId,
          targetIncome,
        });

        console.log('Updated user:', response.data);
      } catch (error) {
        console.error('Error saving target income:', error);
      }
    }
  };

  return {
    targetIncome,
    setTargetIncome,
    handleSaveTargetIncome,
  };
}
