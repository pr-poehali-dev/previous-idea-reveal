import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameSimpleSchulteProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function GameSimpleSchulte({ onComplete, onBack }: GameSimpleSchulteProps) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [current, setCurrent] = useState(1);
  const [startTime, setStartTime] = useState<number>(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    const nums = Array.from({ length: 9 }, (_, i) => i + 1);
    setNumbers(nums.sort(() => Math.random() - 0.5));
    setStartTime(Date.now());
  }, []);

  const handleClick = (num: number) => {
    if (num === current) {
      if (current === 9) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const score = Math.max(0, 100 - timeSpent * 2 - errors * 5);
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
          <div className="text-2xl font-bold text-purple-600">Найди: {current}</div>
          <div className="text-sm text-gray-600">Ошибки: {errors}</div>
        </div>
      </div>

      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold mb-2">Таблица Шульте</h3>
        <p className="text-gray-600">Нажимай на числа от 1 до 9 по порядку!</p>
      </div>

      <Card className="p-6 max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {numbers.map((num, idx) => (
            <Card
              key={idx}
              className={`aspect-square cursor-pointer transition-all transform hover:scale-110 ${
                num < current ? 'opacity-20 grayscale' : ''
              } ${num === current ? 'ring-4 ring-purple-500 animate-pulse' : ''}`}
              onClick={() => handleClick(num)}
            >
              <CardContent className="flex items-center justify-center h-full p-0">
                <span className={`text-5xl font-bold ${num < current ? 'text-gray-400' : 'text-purple-600'}`}>
                  {num}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>

      <div className="mt-6 text-center">
        <div className="text-gray-600">
          <p className="text-lg">Прогресс: {current - 1} / 9</p>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div 
              className="bg-purple-600 h-4 rounded-full transition-all"
              style={{ width: `${((current - 1) / 9) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
