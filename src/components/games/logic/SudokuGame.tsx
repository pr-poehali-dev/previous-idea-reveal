import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface SudokuGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export default function SudokuGame({ level, onBack, onComplete }: SudokuGameProps) {
  const size = 3 + level;
  const [grid, setGrid] = useState<(number | null)[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [startTime] = useState(Date.now());
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    generatePuzzle();
  }, []);

  const generatePuzzle = () => {
    const newSolution: number[][] = [];
    const newGrid: (number | null)[][] = [];
    
    for (let i = 0; i < size; i++) {
      newSolution[i] = [];
      newGrid[i] = [];
      for (let j = 0; j < size; j++) {
        newSolution[i][j] = ((i + j) % size) + 1;
        newGrid[i][j] = Math.random() > 0.5 ? newSolution[i][j] : null;
      }
    }
    
    setSolution(newSolution);
    setGrid(newGrid);
  };

  const handleCellClick = (row: number, col: number) => {
    if (grid[row][col] === null || selectedCell?.row === row && selectedCell?.col === col) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberClick = (num: number) => {
    if (!selectedCell) return;
    
    const newGrid = grid.map(row => [...row]);
    newGrid[selectedCell.row][selectedCell.col] = num;
    setGrid(newGrid);
    
    if (num !== solution[selectedCell.row][selectedCell.col]) {
      setMistakes(mistakes + 1);
    }
    
    if (checkWin(newGrid)) {
      const timeTaken = (Date.now() - startTime) / 1000;
      const score = Math.max(20, 100 - mistakes * 10 - Math.floor(timeTaken / 10));
      setTimeout(() => onComplete(score), 500);
    }
  };

  const checkWin = (currentGrid: (number | null)[][]) => {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (currentGrid[i][j] !== solution[i][j]) return false;
      }
    }
    return true;
  };

  return (
    <GameWrapper
      title="Судоку"
      description={`Заполни сетку ${size}x${size} числами от 1 до ${size}`}
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Ошибки: {mistakes}</p>
          <Button onClick={generatePuzzle} variant="outline" size="sm">
            Новая игра
          </Button>
        </div>
        
        <div className="flex justify-center">
          <div className="inline-grid gap-1 p-4 bg-white rounded-lg shadow-lg" 
               style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
            {grid.map((row, i) => 
              row.map((cell, j) => (
                <button
                  key={`${i}-${j}`}
                  onClick={() => handleCellClick(i, j)}
                  className={`w-12 h-12 border-2 flex items-center justify-center text-xl font-bold transition-all ${
                    selectedCell?.row === i && selectedCell?.col === j
                      ? 'border-primary bg-primary/10 scale-110'
                      : cell === null
                      ? 'border-gray-300 hover:border-primary bg-gray-50'
                      : 'border-gray-400 bg-blue-50'
                  }`}
                >
                  {cell || ''}
                </button>
              ))
            )}
          </div>
        </div>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {Array.from({ length: size }, (_, i) => i + 1).map(num => (
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
      </div>
    </GameWrapper>
  );
}
