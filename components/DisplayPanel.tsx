import { IncomeType } from '@/app/api/incomes/route';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type DisplayPanelProps = {
  currentDate: Date;
};

export default function DisplayPanel({ currentDate }: DisplayPanelProps) {
  const { data: session } = useSession();
  const kakaoId = session?.user?.id || '';
  const [incomes, setIncomes] = useState<IncomeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetIncomes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/incomes?kakaoId=${kakaoId}`);
      setIncomes(response.data);
    } catch (error) {
      setError('Failed to fetch incomes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetIncomes();
  }, [currentDate]);

  return (
    <div>
      {error && <div className='text-red-500'>{error}</div>}
      <div className='mt-2'>
        {incomes.length > 0 ? (
          <ul>
            {incomes.map((income) => (
              <li key={income.id}>Baemin Income: {income.baeminIncome}</li>
            ))}
          </ul>
        ) : (
          <div>No incomes found</div>
        )}
      </div>
    </div>
  );
}
