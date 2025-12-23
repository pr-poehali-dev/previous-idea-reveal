import { useState } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from './GameWrapper';
import Icon from '@/components/ui/icon';

interface UniversalGameProps {
  title: string;
  description: string;
  level: number;
  icon: string;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export default function UniversalGame({ 
  title, 
  description, 
  level, 
  icon,
  onBack, 
  onComplete 
}: UniversalGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 + level * 10);

  const handleStart = () => {
    setIsPlaying(true);
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          const score = Math.max(40, 80 - level * 3);
          onComplete(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleComplete = () => {
    const score = Math.max(50, 100 - (30 + level * 10 - timeLeft) / 2);
    onComplete(Math.floor(score));
  };

  return (
    <GameWrapper
      title={title}
      description={description}
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-8">
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          <div className="relative">
            <Icon name={icon} size={120} className="text-primary animate-bounce-gentle" />
            {isPlaying && (
              <div className="absolute -top-4 -right-4 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold animate-pulse">
                {timeLeft}
              </div>
            )}
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">Уровень {level}</h3>
            <p className="text-lg text-muted-foreground max-w-md">
              {description}
            </p>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Как играть:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Нажми "Начать игру"</li>
            <li>У тебя будет {30 + level * 10} секунд</li>
            <li>Выполни задание из описания</li>
            <li>Когда закончишь, нажми "Готово!"</li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-4">
          {!isPlaying ? (
            <Button onClick={handleStart} size="lg" className="w-full text-xl py-6">
              🎮 Начать игру
            </Button>
          ) : (
            <>
              <div className="p-6 bg-primary/10 rounded-lg border-2 border-primary animate-pulse">
                <p className="text-center text-xl font-bold">
                  ⏱️ Выполни задание и нажми "Готово"
                </p>
              </div>
              <Button onClick={handleComplete} size="lg" className="w-full bg-green-600 hover:bg-green-700 text-xl py-6">
                ✅ Готово!
              </Button>
            </>
          )}
        </div>
      </div>
    </GameWrapper>
  );
}