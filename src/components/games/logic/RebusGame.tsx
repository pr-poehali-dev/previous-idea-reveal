import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GameWrapper from '../GameWrapper';

interface RebusGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

interface RebusElement {
  type: 'emoji' | 'text' | 'operation';
  content: string;
  commasBefore?: number;
  commasAfter?: number;
  textAbove?: string;
  replaceRule?: string;
}

interface Rebus {
  elements: RebusElement[];
  answer: string;
  explanation: string;
  emojiMeaning?: string;
}

const rebusDatabase: Rebus[] = [
  {
    elements: [{ type: 'emoji', content: '🐱', commasAfter: 2 }],
    answer: 'КОШ',
    explanation: 'КОШКА - убираем 2 буквы справа (,,) = КОШ',
    emojiMeaning: '🐱 = КОШКА'
  },
  {
    elements: [{ type: 'emoji', content: '🐟', commasAfter: 2 }],
    answer: 'РЫ',
    explanation: 'РЫБА - убираем 2 буквы справа (,,) = РЫ',
    emojiMeaning: '🐟 = РЫБА'
  },
  {
    elements: [{ type: 'emoji', content: '🌲', commasBefore: 1 }],
    answer: 'ЕС',
    explanation: 'ЛЕС - убираем 1 букву слева (,) = ЕС',
    emojiMeaning: '🌲 = ЛЕС'
  },
  {
    elements: [{ type: 'emoji', content: '🏠', commasAfter: 1 }],
    answer: 'ДО',
    explanation: 'ДОМ - убираем 1 букву справа (,) = ДО',
    emojiMeaning: '🏠 = ДОМ'
  },
  {
    elements: [{ type: 'text', content: 'ДОМ', textAbove: '1=С' }],
    answer: 'СОМ',
    explanation: 'ДОМ - заменяем 1-ю букву Д на С = СОМ',
    emojiMeaning: 'Замена: 1=С'
  },
  {
    elements: [{ type: 'text', content: 'КОСА', textAbove: '1=Р' }],
    answer: 'РОСА',
    explanation: 'КОСА - заменяем 1-ю букву К на Р = РОСА',
    emojiMeaning: 'Замена: 1=Р'
  },
  {
    elements: [{ type: 'text', content: 'РОЗА', textAbove: '3=Т' }],
    answer: 'РОТА',
    explanation: 'РОЗА - заменяем 3-ю букву З на Т = РОТА',
    emojiMeaning: 'Замена: 3=Т'
  },
  {
    elements: [{ type: 'emoji', content: '👁️', commasBefore: 1 }],
    answer: 'ЛАЗ',
    explanation: 'ГЛАЗ - убираем 1 букву слева (,Г) = ЛАЗ',
    emojiMeaning: '👁️ = ГЛАЗ'
  },
  {
    elements: [
      { type: 'emoji', content: '🐱', commasAfter: 3 },
      { type: 'operation', content: '+' },
      { type: 'text', content: 'Т' }
    ],
    answer: 'КОТ',
    explanation: 'КОШКА,,, (КО) + Т = КОТ',
    emojiMeaning: '🐱 = КОШКА'
  },
  {
    elements: [
      { type: 'emoji', content: '🏠', commasAfter: 1 },
      { type: 'operation', content: '+' },
      { type: 'emoji', content: '🌙', commasAfter: 2 }
    ],
    answer: 'ДОЛ',
    explanation: 'ДОМ, (ДО) + ЛУНА,, (Л) = ДОЛ',
    emojiMeaning: '🏠 = ДОМ, 🌙 = ЛУНА'
  },
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
    const index = (level * 3 + 7) % rebusDatabase.length;
    setCurrentRebus(rebusDatabase[index]);
    setUserAnswer('');
    setAttempts(0);
    setShowHint(false);
    setSolved(false);
  };

  const handleCheck = () => {
    if (!currentRebus) return;
    
    setAttempts(attempts + 1);
    
    if (userAnswer.toUpperCase().trim() === currentRebus.answer.toUpperCase()) {
      setSolved(true);
      const score = Math.max(50, 100 - attempts * 15 - (showHint ? 20 : 0));
      setTimeout(() => onComplete(score), 1000);
    }
  };

  const renderElement = (element: RebusElement, index: number) => {
    return (
      <div key={index} className="flex flex-col items-center gap-1">
        {element.textAbove && (
          <div className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
            {element.textAbove}
          </div>
        )}
        
        <div className="flex items-center gap-1">
          {element.commasBefore && element.commasBefore > 0 && (
            <span className="text-3xl font-bold text-green-600">
              {','.repeat(element.commasBefore)}
            </span>
          )}
          
          <div className="relative">
            {element.type === 'emoji' && (
              <div className="text-6xl">{element.content}</div>
            )}
            {element.type === 'text' && (
              <div className="text-4xl font-bold bg-blue-50 px-4 py-2 rounded-lg border-2 border-blue-300">
                {element.content}
              </div>
            )}
            {element.type === 'operation' && (
              <div className="text-5xl font-bold text-purple-600 px-2">
                {element.content}
              </div>
            )}
          </div>
          
          {element.commasAfter && element.commasAfter > 0 && (
            <span className="text-3xl font-bold text-orange-600">
              {','.repeat(element.commasAfter)}
            </span>
          )}
        </div>
      </div>
    );
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
        <div className="flex justify-center items-center gap-4 bg-white p-8 rounded-xl shadow-2xl border-4 border-primary">
          {currentRebus.elements.map((element, index) => renderElement(element, index))}
        </div>

        {currentRebus.emojiMeaning && (
          <p className="text-center text-sm text-muted-foreground">{currentRebus.emojiMeaning}</p>
        )}

        {!solved ? (
          <>
            <div className="flex gap-4 justify-center">
              <Input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                placeholder="Твой ответ (заглавными)"
                className="w-64 text-center text-2xl uppercase"
                onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                maxLength={20}
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

            {showHint && (
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
                <p className="text-center font-bold">💡 Подсказка: {currentRebus.explanation}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-6 bg-green-100 rounded-lg border-2 border-green-500">
            <p className="text-3xl font-bold text-green-700 mb-2">
              🎉 Правильно!
            </p>
            <p className="text-xl mb-2">Ответ: {currentRebus.answer}</p>
            <p className="text-sm text-muted-foreground">{currentRebus.explanation}</p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">📚 Правила ребусов:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li><span className="text-orange-600 font-bold">,,,</span> справа — убрать буквы справа (столько запятых = столько букв)</li>
            <li><span className="text-green-600 font-bold">,,,</span> слева — убрать буквы слева</li>
            <li><span className="text-red-600 font-bold">1=С</span> — заменить 1-ю букву на С</li>
            <li><span className="text-purple-600 font-bold">+</span> — сложить части слов</li>
            <li>🐱=КОШКА, 🐟=РЫБА, 🌲=ЛЕС, 🏠=ДОМ, 👁️=ГЛАЗ, 🌙=ЛУНА</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}