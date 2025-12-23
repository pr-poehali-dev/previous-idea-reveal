import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameSudokuProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const generateSudoku = (): { puzzle: number[][], solution: number[][] } => {
  const base = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];
  
  const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];
  
  return { puzzle: base, solution };
};

export default function GameSudoku({ onComplete, onBack }: GameSudokuProps) {
  const [sudoku, setSudoku] = useState(generateSudoku());
  const [userGrid, setUserGrid] = useState<number[][]>([]);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    setUserGrid(sudoku.puzzle.map(row => [...row]));
  }, [sudoku]);

  const handleInput = (row: number, col: number, value: string) => {
    if (sudoku.puzzle[row][col] !== 0) return;

    const num = parseInt(value) || 0;
    if (num < 0 || num > 9) return;

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

      <Card className="p-4">
        <div className="grid grid-cols-9 gap-1">
          {userGrid.map((row, i) =>
            row.map((cell, j) => (
              <input
                key={`${i}-${j}`}
                type="number"
                min="1"
                max="9"
                value={cell || ''}
                onChange={(e) => handleInput(i, j, e.target.value)}
                disabled={sudoku.puzzle[i][j] !== 0}
                className={`w-10 h-10 text-center border rounded ${
                  sudoku.puzzle[i][j] !== 0
                    ? 'bg-gray-200 font-bold'
                    : 'bg-white'
                } ${
                  cell !== 0 && cell !== sudoku.solution[i][j]
                    ? 'border-red-500 text-red-500'
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
