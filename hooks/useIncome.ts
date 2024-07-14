import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type IncomeProps = {
  currentDate: Date;
};

export type IncomeData = {
  id?: string;
  baemin: number;
  coupang: number;
};

const useIncome = ({ currentDate }: IncomeProps) => {
  const { data: session } = useSession();
  const kakaoId = session?.user?.id || '';

  const [incomes, setIncomes] = useState([]);

  const fetchIncomes = useCallback(async () => {
    try {
      const response = await axios.get(`/api/incomes?kakaoId=${kakaoId}`);
      setIncomes(response.data);
    } catch (error) {
      console.log('[incomes page]', error);
    }
  }, [kakaoId]);

  const postIncomes = async (incomeData: IncomeData) => {
    try {
      await axios.post('/api/incomes', {
        kakaoId: kakaoId,
        baeminIncome: incomeData.baemin,
        coupangIncome: incomeData.coupang,
        createdAt: currentDate,
      });
      fetchIncomes();
    } catch (error) {
      console.log('[post income]', error);
    }
  };

  const updateIncomes = async (incomeData: IncomeData) => {
    try {
      await axios.patch(`/api/incomes?id=${incomeData.id}`, {
        baeminIncome: incomeData.baemin,
        coupangIncome: incomeData.coupang,
      });
      fetchIncomes();
    } catch (error) {
      console.log('[update income]', error);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  return {
    incomes,
    fetchIncomes,
    postIncomes,
    updateIncomes,
  };
};

export default useIncome;
