import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 33;
        }
        clearInterval(interval);
        return 100;
      });
    }, 1000);
  }, []);

  return (
    progress < 100 && (
      <Progress
        value={progress}
        className='fixed top-0 left-0 right-0 h-1 bg-gray-500'
      />
    )
  );
}
