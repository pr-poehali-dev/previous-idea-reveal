import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GameWrapper from '../GameWrapper';

interface RebusGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

interface Rebus {
  puzzle: string;
  hint: string;
  answer: string;
}

const rebusDatabase: Rebus[] = [
  { puzzle: '🐝 + 🎯', hint: 'Насекомое + цель', answer: 'бычок' },
  { puzzle: '🐟 + 👁️', hint: 'Рыба + глаз', answer: 'рыбак' },
  { puzzle: '🌙 + 🍎', hint: 'Луна + фрукт', answer: 'яблоко' },
  { puzzle: '🏠 + 🐱', hint: 'Дом + животное', answer: 'кошка' },
  { puzzle: '☀️ + 🌸', hint: 'Солнце + цветок', answer: 'подсолнух' },
  { puzzle: '🌊 + 🚢', hint: 'Вода + транспорт', answer: 'корабль' },
  { puzzle: '🎵 + 📖', hint: 'Музыка + книга', answer: 'нота' },
  { puzzle: '🌲 + 🍄', hint: 'Дерево + гриб', answer: 'лес' },
  { puzzle: '⭐ + 🌙', hint: 'Звезда + луна', answer: 'ночь' },
  { puzzle: '🔥 + 💧', hint: 'Огонь + вода', answer: 'пар' },
];

export default function RebusGame({ level, onBack, onComplete }: RebusGameProps) {
  const [currentRebus, setCurrentRebus] = useState<Rebus | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    generateRebus();
  }, [level]);

  const generateRebus = () => {
    const index = (level * 3) % rebusDatabase.length;
    setCurrentRebus(rebusDatabase[index]);
    setUserAnswer('');
    setAttempts(0);
    setShowHint(false);
    setSolved(false);
  };

  const handleCheck = () => {
    if (!currentRebus) return;
    
    setAttempts(attempts + 1);
    
    if (userAnswer.toLowerCase().trim() === currentRebus.answer.toLowerCase()) {
      setSolved(true);
      const score = Math.max(50, 100 - attempts * 15 - (showHint ? 20 : 0));
      setTimeout(() => onComplete(score), 1000);
    }
  };

  if (!currentRebus) return null;

  return (
    <GameWrapper
      title="Ребусы"
      description="Разгадай, какое слово зашифровано в картинках!"
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-xl shadow-2xl border-4 border-primary">
            <p className="text-6xl text-center">{currentRebus.puzzle}</p>
          </div>
        </div>

        {showHint && !solved && (
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
            <p className="text-center font-bold">💡 Подсказка: {currentRebus.hint}</p>
          </div>
        )}

        {!solved ? (
          <>
            <div className="flex gap-4 justify-center">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Твой ответ"
                className="w-64 text-center text-xl"
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
              />
              <Button onClick={handleCheck} size="lg">
                Проверить
              </Button>
            </div>

            {attempts > 0 && !solved && (
              <p className="text-center text-red-600 font-bold text-xl">
                ❌ Неверно! Попробуй ещё раз (попытка {attempts})
              </p>
            )}

            <div className="flex gap-4 justify-center">
              {!showHint && (
                <Button onClick={() => setShowHint(true)} variant="outline">
                  💡 Показать подсказку
                </Button>
              )}
              <Button onClick={generateRebus} variant="outline">
                🔄 Другой ребус
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center p-6 bg-green-100 rounded-lg border-2 border-green-500">
            <p className="text-3xl font-bold text-green-700 mb-2">
              🎉 Правильно!
            </p>
            <p className="text-xl">Ответ: {currentRebus.answer}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Как играть:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Посмотри на картинки-эмодзи</li>
            <li>Подумай, какое слово они образуют</li>
            <li>Напиши ответ и нажми "Проверить"</li>
            <li>Если трудно, нажми "Показать подсказку"</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}
