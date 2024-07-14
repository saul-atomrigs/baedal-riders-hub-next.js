import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

type IncomeProps = {
  kakaoId: string;
  currentDate: Date;
};

type IncomeData = {
  baemin: number;
  coupang: number;
};

const useIncome = ({ kakaoId, currentDate }: IncomeProps) => {
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

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  return {
    incomes,
    postIncomes,
    fetchIncomes,
  };
};

export default useIncome;
