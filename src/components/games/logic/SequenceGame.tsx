import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GameWrapper from '../GameWrapper';

interface SequenceGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export default function SequenceGame({ level, onBack, onComplete }: SequenceGameProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    generateSequence();
  }, []);

  const generateSequence = () => {
    const length = 3 + level;
    const step = level + 2;
    const start = Math.floor(Math.random() * 10) + 1;
    const seq = Array.from({ length }, (_, i) => start + i * step);
    const next = start + length * step;
    
    setSequence(seq);
    setCorrectAnswer(next);
    setAnswer('');
    setAttempts(0);
  };

  const handleCheck = () => {
    const userAnswer = parseInt(answer);
    setAttempts(attempts + 1);
    
    if (userAnswer === correctAnswer) {
      const score = Math.max(50, 100 - attempts * 20);
      setTimeout(() => onComplete(score), 500);
    }
  };

  return (
    <GameWrapper
      title="Логические цепочки"
      description="Продолжи последовательность чисел"
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-center items-center gap-4 text-3xl font-bold">
          {sequence.map((num, i) => (
            <span key={i} className="w-16 h-16 flex items-center justify-center bg-primary text-white rounded-lg">
              {num}
            </span>
          ))}
          <span className="text-4xl">→</span>
          <span className="w-16 h-16 flex items-center justify-center border-4 border-dashed border-primary rounded-lg">
            ?
          </span>
        </div>
        
        <div className="flex justify-center gap-4">
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Ваш ответ"
            className="w-32 text-center text-2xl"
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
          />
          <Button onClick={handleCheck} size="lg">
            Проверить
          </Button>
        </div>
        
        {attempts > 0 && parseInt(answer) !== correctAnswer && (
          <p className="text-center text-red-600 font-bold">
            Попробуй ещё раз! (Попытка {attempts})
          </p>
        )}
        
        <Button onClick={generateSequence} variant="outline" className="w-full">
          Новая последовательность
        </Button>
      </div>
    </GameWrapper>
  );
}
