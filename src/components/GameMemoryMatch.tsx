import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameMemoryMatchProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const emojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍉', '🍒', '🍑'];

export default function GameMemoryMatch({ onComplete, onBack }: GameMemoryMatchProps) {
  const [cards, setCards] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

  const handleCardClick = (index: number) => {
    if (isChecking || flipped.includes(index) || matched.includes(index) || flipped.length >= 2) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      setTimeout(() => {
        if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
          setMatched([...matched, ...newFlipped]);
          if (matched.length + 2 === cards.length) {
            const score = Math.max(0, 100 - moves * 5);
            setTimeout(() => onComplete(score), 500);
          }
        }
        setFlipped([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="outline">
          <Icon name="ArrowLeft" size={20} />
          Назад
        </Button>
        <div className="text-lg font-bold">Ходы: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <Card
            key={index}
            className={`aspect-square cursor-pointer transition-all transform ${
              flipped.includes(index) || matched.includes(index) ? 'scale-105' : 'hover:scale-110'
            } ${matched.includes(index) ? 'opacity-50' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <CardContent className="flex items-center justify-center h-full p-0">
              {flipped.includes(index) || matched.includes(index) ? (
                <span className="text-4xl">{card}</span>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple to-pink rounded-lg flex items-center justify-center">
                  <span className="text-3xl">?</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {matched.length === cards.length && (
        <div className="mt-6 text-center">
          <h3 className="text-2xl font-bold text-green-600">Отлично!</h3>
          <p>Вы завершили за {moves} ходов</p>
        </div>
      )}
    </div>
  );
}
