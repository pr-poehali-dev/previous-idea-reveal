import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameSchulteTableProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function GameSchulteTable({ onComplete, onBack }: GameSchulteTableProps) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [current, setCurrent] = useState(1);
  const [startTime, setStartTime] = useState<number>(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const nums = Array.from({ length: 25 }, (_, i) => i + 1);
    setNumbers(nums.sort(() => Math.random() - 0.5));
    setStartTime(Date.now());
  }, []);

  const handleClick = (num: number) => {
    if (num === current) {
      if (current === 25) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const score = Math.max(0, 100 - timeSpent - errors * 5);
        onComplete(score);
      } else {
        setCurrent(current + 1);
      }
    } else {
      setErrors(errors + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="outline">
          <Icon name="ArrowLeft" size={20} />
          Назад
        </Button>
        <div className="space-y-1">
          <div className="text-lg font-bold">Найди: {current}</div>
          <div className="text-sm text-gray-600">Ошибки: {errors}</div>
        </div>
      </div>

      <Card className="p-4">
        <div className="grid grid-cols-5 gap-3">
          {numbers.map((num, idx) => (
            <Card
              key={idx}
              className={`aspect-square cursor-pointer transition-all transform hover:scale-105 ${
                num < current ? 'opacity-30' : ''
              }`}
              onClick={() => handleClick(num)}
            >
              <CardContent className="flex items-center justify-center h-full p-0">
                <span className="text-3xl font-bold">{num}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      <div className="mt-6 text-center text-gray-600">
        <p>Найдите все числа от 1 до 25 по порядку</p>
      </div>
    </div>
  );
}
