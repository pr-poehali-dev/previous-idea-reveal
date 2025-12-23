import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface DifferenceGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

interface Difference {
  x: number;
  y: number;
  found: boolean;
}

export default function DifferenceGame({ level, onBack, onComplete }: DifferenceGameProps) {
  const differenceCount = 3 + level;
  const [differences, setDifferences] = useState<Difference[]>([]);
  const [foundCount, setFoundCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    generateDifferences();
  }, [level]);

  const generateDifferences = () => {
    const newDifferences: Difference[] = [];
    
    for (let i = 0; i < differenceCount; i++) {
      newDifferences.push({
        x: Math.random() * 300 + 50,
        y: Math.random() * 300 + 50,
        found: false
      });
    }
    
    setDifferences(newDifferences);
    setFoundCount(0);
    setMistakes(0);
  };

  const handleClick = (x: number, y: number, isRightImage: boolean) => {
    if (!isRightImage) return;
    
    let found = false;
    
    const newDifferences = differences.map(diff => {
      if (!diff.found && Math.abs(diff.x - x) < 30 && Math.abs(diff.y - y) < 30) {
        found = true;
        return { ...diff, found: true };
      }
      return diff;
    });
    
    if (found) {
      setDifferences(newDifferences);
      setFoundCount(foundCount + 1);
      
      if (foundCount + 1 === differenceCount) {
        const score = Math.max(50, 100 - mistakes * 10);
        setTimeout(() => onComplete(score), 1000);
      }
    } else {
      setMistakes(mistakes + 1);
    }
  };

  const allFound = foundCount === differenceCount;

  return (
    <GameWrapper
      title="Найди отличия"
      description={`Найди ${differenceCount} отличий на правой картинке!`}
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-green-600">
            ✅ Найдено: {foundCount}/{differenceCount}
          </p>
          <p className="text-lg font-bold text-red-600">
            ❌ Ошибки: {mistakes}
          </p>
          <Button onClick={generateDifferences} variant="outline" size="sm">
            🔄 Новая игра
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <p className="text-center font-bold mb-2">Оригинал</p>
            <div className="relative w-full h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl border-4 border-gray-300 overflow-hidden">
              <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full" />
              <div className="absolute top-40 right-20 w-16 h-24 bg-red-400 rounded-lg" />
              <div className="absolute bottom-20 left-1/3 w-24 h-16 bg-green-400" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
              <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-pink-400 rotate-45" />
              <div className="absolute bottom-10 right-10 w-20 h-20 bg-orange-400 rounded-full" />
            </div>
          </div>

          <div className="relative">
            <p className="text-center font-bold mb-2">С отличиями (кликай здесь!)</p>
            <div 
              className="relative w-full h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl border-4 border-primary overflow-hidden cursor-crosshair"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                handleClick(x, y, true);
              }}
            >
              <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full" />
              <div className="absolute top-40 right-20 w-16 h-24 bg-red-400 rounded-lg" />
              <div className="absolute bottom-20 left-1/3 w-24 h-16 bg-green-400" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
              <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-pink-400 rotate-45" />
              <div className="absolute bottom-10 right-10 w-20 h-20 bg-orange-400 rounded-full" />
              
              {differences.map((diff, index) => (
                <div
                  key={index}
                  className={`absolute w-8 h-8 rounded-full transition-all ${
                    diff.found ? 'bg-green-500 ring-4 ring-green-300' : 'bg-blue-500'
                  }`}
                  style={{ 
                    left: diff.x, 
                    top: diff.y,
                    opacity: diff.found ? 0.8 : 0.3
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {allFound && (
          <div className="text-center p-6 bg-green-100 rounded-lg border-4 border-green-500">
            <p className="text-3xl font-bold text-green-700">
              🎉 Все отличия найдены!
            </p>
            <p className="text-xl mt-2">Ошибок: {mistakes}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Как играть:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Сравни две картинки внимательно</li>
            <li>На правой картинке есть {differenceCount} маленьких кружочков</li>
            <li>Нажми на кружок на правой картинке</li>
            <li>Если правильно - кружок станет зелёным!</li>
            <li>Будь внимателен, за ошибки снимаются баллы</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}
