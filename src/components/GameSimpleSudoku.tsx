import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameSimpleSudokuProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const generateSimpleSudoku = (): { puzzle: number[][], solution: number[][] } => {
  const solution = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 3, 4, 1],
    [4, 1, 2, 3]
  ];
  
  const puzzle = [
    [1, 0, 3, 0],
    [0, 4, 0, 2],
    [2, 0, 4, 0],
    [0, 1, 0, 3]
  ];
  
  return { puzzle, solution };
};

export default function GameSimpleSudoku({ onComplete, onBack }: GameSimpleSudokuProps) {
  const [sudoku] = useState(generateSimpleSudoku());
  const [userGrid, setUserGrid] = useState<number[][]>([]);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    setUserGrid(sudoku.puzzle.map(row => [...row]));
  }, [sudoku]);

  const handleInput = (row: number, col: number, value: string) => {
    if (sudoku.puzzle[row][col] !== 0) return;

    const num = parseInt(value) || 0;
    if (num < 0 || num > 4) return;

    const newGrid = userGrid.map(r => [...r]);
    newGrid[row][col] = num;
    setUserGrid(newGrid);

    if (num !== 0 && num !== sudoku.solution[row][col]) {
      setErrors(errors + 1);
    }

    const isComplete = newGrid.every((row, i) =>
      row.every((cell, j) => cell === sudoku.solution[i][j])
    );

    if (isComplete) {
      const score = Math.max(0, 100 - errors * 10);
      setTimeout(() => onComplete(score), 500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="outline">
          <Icon name="ArrowLeft" size={20} />
          Назад
        </Button>
        <div className="text-lg font-bold">Ошибки: {errors}</div>
      </div>

      <Card className="p-6">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold mb-2">Простое судоку 4×4</h3>
          <p className="text-gray-600">Заполни пустые клетки числами от 1 до 4</p>
          <p className="text-sm text-gray-500">В каждом ряду и столбце не должно повторяться чисел</p>
        </div>
        
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {userGrid.map((row, i) =>
            row.map((cell, j) => (
              <input
                key={`${i}-${j}`}
                type="number"
                min="1"
                max="4"
                value={cell || ''}
                onChange={(e) => handleInput(i, j, e.target.value)}
                disabled={sudoku.puzzle[i][j] !== 0}
                className={`w-16 h-16 text-center text-2xl border-2 rounded-lg ${
                  sudoku.puzzle[i][j] !== 0
                    ? 'bg-purple-100 font-bold text-purple-900'
                    : 'bg-white'
                } ${
                  cell !== 0 && cell !== sudoku.solution[i][j]
                    ? 'border-red-500 text-red-500 animate-pulse'
                    : 'border-gray-300'
                }`}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
