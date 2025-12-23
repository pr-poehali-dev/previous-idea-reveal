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
    
    for (let row = 0; row < rows; row++) {
      newPyramid[row] = [];
      newSolution[row] = [];
      
      for (let col = 0; col <= row; col++) {
        if (row === 0) {
          const num = Math.floor(Math.random() * 5) + 1;
          newSolution[row][col] = num;
          newPyramid[row][col] = num;
        } else {
          const left = newSolution[row - 1][col - 1] || 0;
          const right = newSolution[row - 1][col] || 0;
          newSolution[row][col] = left + right;
          
          if (row === rows - 1 || Math.random() > 0.6) {
            newPyramid[row][col] = null;
          } else {
            newPyramid[row][col] = newSolution[row][col];
          }
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

        <div className="flex justify-center gap-2 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
            <Button
              key={num}
              onClick={() => handleNumberClick(num)}
              size="lg"
              variant="outline"
              className="w-14 h-14 text-xl font-bold"
              disabled={!selectedCell}
            >
              {num}
            </Button>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Правило игры:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Каждое число в пирамиде = сумма двух чисел над ним</li>
            <li>Например: если сверху 2 и 3, то внизу будет 5</li>
            <li>Нажми на клетку с "?" и выбери число внизу</li>
            <li>Синие клетки - это подсказки, их менять нельзя</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}
