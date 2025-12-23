import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface PyramidGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export default function PyramidGame({ level, onBack, onComplete }: PyramidGameProps) {
  const rows = 3 + level;
  const [pyramid, setPyramid] = useState<(number | null)[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    generatePyramid();
  }, [level]);

  const generatePyramid = () => {
    const newPyramid: (number | null)[][] = [];
    const newSolution: number[][] = [];
    
    // Заполняем нижний ряд случайными числами (основание пирамиды)
    for (let row = 0; row < rows; row++) {
      newPyramid[row] = [];
      newSolution[row] = [];
      
      for (let col = 0; col <= row; col++) {
        if (row === rows - 1) {
          // Нижний ряд - случайные числа от 1 до 9
          const num = Math.floor(Math.random() * 9) + 1;
          newSolution[row][col] = num;
          newPyramid[row][col] = num;
        }
      }
    }
    
    // Заполняем пирамиду снизу вверх: каждое число = сумма двух чисел снизу
    for (let row = rows - 2; row >= 0; row--) {
      for (let col = 0; col <= row; col++) {
        const leftBelow = newSolution[row + 1][col];
        const rightBelow = newSolution[row + 1][col + 1];
        newSolution[row][col] = leftBelow + rightBelow;
        
        // Делаем некоторые клетки пустыми (кроме верхушки)
        if (row === 0 || Math.random() > 0.5) {
          newPyramid[row][col] = null;
        } else {
          newPyramid[row][col] = newSolution[row][col];
        }
      }
    }
    
    setPyramid(newPyramid);
    setSolution(newSolution);
    setSelectedCell(null);
    setMistakes(0);
  };

  const handleCellClick = (row: number, col: number) => {
    if (pyramid[row][col] !== null) return;
    setSelectedCell({ row, col });
  };

  const handleNumberClick = (num: number) => {
    if (!selectedCell) return;
    
    const newPyramid = pyramid.map(row => [...row]);
    newPyramid[selectedCell.row][selectedCell.col] = num;
    setPyramid(newPyramid);
    
    if (num !== solution[selectedCell.row][selectedCell.col]) {
      setMistakes(mistakes + 1);
    }
    
    if (checkWin(newPyramid)) {
      const score = Math.max(50, 100 - mistakes * 10);
      setTimeout(() => onComplete(score), 500);
    }
  };

  const checkWin = (currentPyramid: (number | null)[][]) => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        if (currentPyramid[row][col] !== solution[row][col]) return false;
      }
    }
    return true;
  };

  return (
    <GameWrapper
      title="Числовые пирамиды"
      description="Каждое число равно сумме двух чисел над ним!"
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-red-600">❌ Ошибки: {mistakes}</p>
          <Button onClick={generatePyramid} variant="outline" size="sm">
            🔄 Новая пирамида
          </Button>
        </div>

        <div className="flex justify-center">
          <div className="space-y-2">
            {pyramid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-2">
                {row.map((cell, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`w-16 h-16 border-2 flex items-center justify-center text-xl font-bold transition-all rounded-lg ${
                      selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                        ? 'border-primary bg-primary/20 scale-110'
                        : cell === null
                        ? 'border-gray-300 hover:border-primary bg-gray-50 cursor-pointer'
                        : 'border-blue-400 bg-blue-50 cursor-default'
                    }`}
                  >
                    {cell || '?'}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 flex-wrap max-w-2xl mx-auto">
          {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
            <Button
              key={num}
              onClick={() => handleNumberClick(num)}
              size="lg"
              variant="outline"
              className="w-14 h-14 text-lg font-bold"
              disabled={!selectedCell}
            >
              {num}
            </Button>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Правило игры:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li><strong>Главное правило:</strong> Каждое число = сумма двух чисел ПОД ним</li>
            <li>Например: если снизу 2 и 3, то сверху будет 2+3=5</li>
            <li>Самый нижний ряд уже заполнен - это основание пирамиды</li>
            <li>Заполни пустые клетки "?" складывая числа снизу</li>
            <li>Синие клетки - подсказки, их менять нельзя</li>
          </ul>
          <div className="mt-4 p-3 bg-white rounded border-2 border-blue-300">
            <p className="font-bold text-center mb-2">Пример:</p>
            <div className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold text-green-600">[10]</div>
              <div className="text-lg">↗ ↖</div>
              <div className="flex gap-2 text-2xl font-bold">
                <span>[4]</span>
                <span>[6]</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">10 = 4 + 6</p>
            </div>
          </div>
        </div>
      </div>
    </GameWrapper>
  );
}