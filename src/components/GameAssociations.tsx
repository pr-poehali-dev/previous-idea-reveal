import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameAssociationsProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const associations = [
  { word: 'Солнце', options: ['Луна', 'Тепло', 'Вода', 'Ветер'], correct: 'Тепло' },
  { word: 'Книга', options: ['Карандаш', 'Чтение', 'Музыка', 'Спорт'], correct: 'Чтение' },
  { word: 'Зима', options: ['Лето', 'Снег', 'Дождь', 'Жара'], correct: 'Снег' },
  { word: 'Врач', options: ['Учитель', 'Лечение', 'Еда', 'Спорт'], correct: 'Лечение' },
  { word: 'Море', options: ['Гора', 'Волна', 'Лес', 'Пустыня'], correct: 'Волна' },
  { word: 'Музыка', options: ['Картина', 'Мелодия', 'Книга', 'Фильм'], correct: 'Мелодия' },
  { word: 'Школа', options: ['Больница', 'Учёба', 'Работа', 'Отдых'], correct: 'Учёба' },
  { word: 'Дождь', options: ['Солнце', 'Зонт', 'Снег', 'Ветер'], correct: 'Зонт' },
];

export default function GameAssociations({ onComplete, onBack }: GameAssociationsProps) {
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
    }, 1000);
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

      <Card className="p-8 mb-6">
        <h2 className="text-3xl font-bold text-center mb-8">{current.word}</h2>
        <p className="text-center text-gray-600 mb-6">Выбери правильную ассоциацию</p>
        
        <div className="grid grid-cols-2 gap-4">
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
              className="h-20 text-lg"
            >
              {option}
            </Button>
          ))}
        </div>

        {isCorrect !== null && (
          <div className={`mt-6 text-center text-xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '✓ Верно!' : '✗ Неверно'}
          </div>
        )}
      </Card>

      <div className="text-center text-gray-600">
        Правильных ответов: {score}
      </div>
    </div>
  );
}
