import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameSimpleAssociationsProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const associations = [
  { word: '☀️ Солнце', options: ['Луна', 'Тепло', 'Вода'], correct: 'Тепло', emoji: '☀️' },
  { word: '📚 Книга', options: ['Карандаш', 'Чтение', 'Музыка'], correct: 'Чтение', emoji: '📚' },
  { word: '❄️ Зима', options: ['Лето', 'Снег', 'Дождь'], correct: 'Снег', emoji: '❄️' },
  { word: '🏥 Врач', options: ['Учитель', 'Лечение', 'Еда'], correct: 'Лечение', emoji: '🏥' },
  { word: '🌊 Море', options: ['Гора', 'Волна', 'Лес'], correct: 'Волна', emoji: '🌊' },
];

export default function GameSimpleAssociations({ onComplete, onBack }: GameSimpleAssociationsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = associations[currentIndex];

  const handleAnswer = (answer: string) => {
    setSelected(answer);
    const correct = answer === current.correct;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < associations.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
        setIsCorrect(null);
      } else {
        const finalScore = Math.round((score + (correct ? 1 : 0)) / associations.length * 100);
        onComplete(finalScore);
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="outline">
          <Icon name="ArrowLeft" size={20} />
          Назад
        </Button>
        <div className="text-lg font-bold">
          {currentIndex + 1} / {associations.length}
        </div>
      </div>

      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold mb-2">Найди связь!</h3>
        <p className="text-gray-600">Выбери, что больше всего подходит</p>
      </div>

      <Card className="p-8 mb-6">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">{current.emoji}</div>
          <h2 className="text-4xl font-bold text-purple-600">{current.word.replace(current.emoji, '').trim()}</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {current.options.map((option, idx) => (
            <Button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={selected !== null}
              variant={
                selected === option
                  ? isCorrect
                    ? 'default'
                    : 'destructive'
                  : 'outline'
              }
              className={`h-16 text-xl ${
                selected === option && isCorrect 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : ''
              }`}
            >
              {option}
            </Button>
          ))}
        </div>

        {isCorrect !== null && (
          <div className={`mt-6 text-center text-2xl font-bold animate-bounce ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '✓ Правильно! Молодец!' : '✗ Попробуй ещё раз!'}
          </div>
        )}
      </Card>

      <div className="text-center">
        <div className="text-xl font-bold text-purple-600">Правильных ответов: {score}</div>
        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all"
            style={{ width: `${(score / associations.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
