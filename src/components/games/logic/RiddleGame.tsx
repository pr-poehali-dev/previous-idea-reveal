import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface RiddleGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

interface Riddle {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const riddles: Riddle[] = [
  {
    question: 'У Маши 3 яблока, у Пети 2 яблока. Сколько всего яблок?',
    options: ['4', '5', '6', '3'],
    correctAnswer: 1,
    explanation: '3 + 2 = 5 яблок'
  },
  {
    question: 'Что тяжелее: килограмм ваты или килограмм железа?',
    options: ['Вата', 'Железо', 'Одинаково', 'Зависит'],
    correctAnswer: 2,
    explanation: 'Килограмм - это вес. Оба весят одинаково!'
  },
  {
    question: 'Сколько месяцев в году имеют 28 дней?',
    options: ['Один', 'Два', 'Двенадцать', 'Нет правильного'],
    correctAnswer: 2,
    explanation: 'Все 12 месяцев имеют минимум 28 дней!'
  },
  {
    question: 'У собаки 4 лапы. У трёх собак сколько лап?',
    options: ['8', '10', '12', '16'],
    correctAnswer: 2,
    explanation: '4 × 3 = 12 лап'
  },
  {
    question: 'Что можно увидеть с закрытыми глазами?',
    options: ['Свет', 'Сны', 'Цвета', 'Ничего'],
    correctAnswer: 1,
    explanation: 'Мы видим сны, когда спим с закрытыми глазами!'
  },
  {
    question: 'Сколько будет 10 - 5 + 3?',
    options: ['2', '8', '12', '5'],
    correctAnswer: 1,
    explanation: '10 - 5 = 5, потом 5 + 3 = 8'
  },
  {
    question: 'Что идёт, но не двигается с места?',
    options: ['Машина', 'Время', 'Человек', 'Облако'],
    correctAnswer: 1,
    explanation: 'Время всегда идёт вперёд, но никуда не движется!'
  },
  {
    question: 'У квадрата сколько углов?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'У квадрата 4 угла'
  },
  {
    question: 'Что больше: половина или четверть?',
    options: ['Половина', 'Четверть', 'Одинаково', 'Зависит'],
    correctAnswer: 0,
    explanation: '½ (половина) больше чем ¼ (четверть)'
  },
  {
    question: 'Если завтра будет вчера как воскресенье, то какой день сегодня?',
    options: ['Воскресенье', 'Понедельник', 'Суббота', 'Среда'],
    correctAnswer: 1,
    explanation: 'Завтра станет вчера = послезавтра. Если послезавтра воскресенье, то сегодня понедельник'
  },
];

export default function RiddleGame({ level, onBack, onComplete }: RiddleGameProps) {
  const [currentRiddle, setCurrentRiddle] = useState<Riddle | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    generateRiddle();
  }, [level]);

  const generateRiddle = () => {
    const index = (level * 7) % riddles.length;
    setCurrentRiddle(riddles[index]);
    setSelectedAnswer(null);
    setShowResult(false);
    setAttempts(0);
  };

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    setAttempts(attempts + 1);
    
    if (index === currentRiddle?.correctAnswer) {
      const score = Math.max(50, 100 - attempts * 15);
      setTimeout(() => onComplete(score), 2000);
    }
  };

  if (!currentRiddle) return null;

  const isCorrect = selectedAnswer === currentRiddle.correctAnswer;

  return (
    <GameWrapper
      title="Логические загадки"
      description="Подумай хорошенько и выбери правильный ответ!"
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border-4 border-primary">
          <p className="text-2xl font-bold text-center">{currentRiddle.question}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentRiddle.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              size="lg"
              variant="outline"
              className={`text-xl py-8 ${
                showResult && index === currentRiddle.correctAnswer
                  ? 'bg-green-100 border-green-500 border-4'
                  : showResult && index === selectedAnswer && !isCorrect
                  ? 'bg-red-100 border-red-500 border-4'
                  : ''
              }`}
            >
              {option}
            </Button>
          ))}
        </div>

        {showResult && (
          <div className={`p-6 rounded-lg border-4 ${
            isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
          }`}>
            <p className="text-2xl font-bold text-center mb-4">
              {isCorrect ? '🎉 Правильно!' : '❌ Неправильно'}
            </p>
            <p className="text-lg text-center">
              💡 {currentRiddle.explanation}
            </p>
          </div>
        )}

        {showResult && !isCorrect && (
          <Button onClick={generateRiddle} size="lg" className="w-full">
            🔄 Следующая загадка
          </Button>
        )}

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Как играть:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Внимательно прочитай вопрос</li>
            <li>Подумай над ответом</li>
            <li>Выбери один из вариантов</li>
            <li>Не спеши, правильный ответ важнее скорости!</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}
