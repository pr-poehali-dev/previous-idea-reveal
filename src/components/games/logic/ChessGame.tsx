import { useState } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface ChessGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export default function ChessGame({ level, onBack, onComplete }: ChessGameProps) {
  const [solved, setSolved] = useState(false);
  const moves = level + 1;

  const handleSolve = () => {
    setSolved(true);
    const score = Math.max(50, 100 - level * 5);
    setTimeout(() => onComplete(score), 1000);
  };

  return (
    <GameWrapper
      title="Шахматные задачи"
      description={`Найди мат в ${moves} ход${moves > 1 ? 'а' : ''}`}
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="grid grid-cols-8 gap-0 w-96 h-96 border-4 border-gray-800">
            {Array.from({ length: 64 }).map((_, i) => {
              const row = Math.floor(i / 8);
              const col = i % 8;
              const isLight = (row + col) % 2 === 0;
              
              return (
                <div
                  key={i}
                  className={`flex items-center justify-center text-4xl ${
                    isLight ? 'bg-amber-100' : 'bg-amber-700'
                  }`}
                >
                  {i === 4 && '♔'}
                  {i === 60 && '♚'}
                  {i === 28 && '♕'}
                  {i === 12 && '♖'}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-lg">
            {solved 
              ? '✅ Задача решена!' 
              : `Найди последовательность из ${moves} ходов для мата`}
          </p>
          <Button 
            onClick={handleSolve} 
            size="lg"
            disabled={solved}
          >
            {solved ? 'Решено!' : 'Показать решение'}
          </Button>
        </div>
      </div>
    </GameWrapper>
  );
}
