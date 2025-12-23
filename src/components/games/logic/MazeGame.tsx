import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface MazeGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

type Cell = 'wall' | 'path' | 'start' | 'end' | 'player';

export default function MazeGame({ level, onBack, onComplete }: MazeGameProps) {
  const size = (level + 3) * 2;
  const [maze, setMaze] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    generateMaze();
  }, [level]);

  const generateMaze = () => {
    const newMaze: Cell[][] = Array(size).fill(null).map(() => Array(size).fill('wall'));
    
    const carvePath = (row: number, col: number) => {
      newMaze[row][col] = 'path';
      
      const directions = [
        [0, 2], [2, 0], [0, -2], [-2, 0]
      ].sort(() => Math.random() - 0.5);
      
      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && newMaze[newRow][newCol] === 'wall') {
          newMaze[row + dr / 2][col + dc / 2] = 'path';
          carvePath(newRow, newCol);
        }
      }
    };
    
    const startRow = 1;
    const startCol = 1;
    carvePath(startRow, startCol);
    
    newMaze[startRow][startCol] = 'start';
    newMaze[size - 2][size - 2] = 'end';
    
    setMaze(newMaze);
    setPlayerPos({ row: startRow, col: startCol });
    setMoves(0);
    setWon(false);
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (won) return;
    
    let newRow = playerPos.row;
    let newCol = playerPos.col;
    
    switch (direction) {
      case 'up': newRow--; break;
      case 'down': newRow++; break;
      case 'left': newCol--; break;
      case 'right': newCol++; break;
    }
    
    if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && maze[newRow][newCol] !== 'wall') {
      setPlayerPos({ row: newRow, col: newCol });
      setMoves(moves + 1);
      
      if (maze[newRow][newCol] === 'end') {
        setWon(true);
        const score = Math.max(50, 100 - moves * 2);
        setTimeout(() => onComplete(score), 1000);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (won) return;
      
      switch (e.key) {
        case 'ArrowUp': handleMove('up'); break;
        case 'ArrowDown': handleMove('down'); break;
        case 'ArrowLeft': handleMove('left'); break;
        case 'ArrowRight': handleMove('right'); break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, won]);

  const cellSize = Math.min(400 / size, 30);

  return (
    <GameWrapper
      title="Лабиринт"
      description="Найди путь от зелёной клетки до красной!"
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">Ходов: {moves}</p>
          <Button onClick={generateMaze} variant="outline" size="sm">
            🔄 Новый лабиринт
          </Button>
        </div>

        <div className="flex justify-center">
          <div 
            className="border-4 border-gray-800 inline-grid gap-0"
            style={{ 
              gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${size}, ${cellSize}px)`
            }}
          >
            {maze.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isPlayer = playerPos.row === rowIndex && playerPos.col === colIndex;
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      ${cell === 'wall' ? 'bg-gray-800' : ''}
                      ${cell === 'path' ? 'bg-white' : ''}
                      ${cell === 'start' ? 'bg-green-400' : ''}
                      ${cell === 'end' ? 'bg-red-400' : ''}
                      ${isPlayer ? 'bg-blue-500' : ''}
                    `}
                    style={{ width: cellSize, height: cellSize }}
                  />
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-center">
            <Button onClick={() => handleMove('up')} size="lg" disabled={won}>
              ⬆️
            </Button>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => handleMove('left')} size="lg" disabled={won}>
              ⬅️
            </Button>
            <Button onClick={() => handleMove('down')} size="lg" disabled={won}>
              ⬇️
            </Button>
            <Button onClick={() => handleMove('right')} size="lg" disabled={won}>
              ➡️
            </Button>
          </div>
        </div>

        {won && (
          <div className="text-center p-6 bg-green-100 rounded-lg border-2 border-green-500">
            <p className="text-3xl font-bold text-green-700">
              🎉 Выход найден за {moves} ходов!
            </p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Как играть:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>🟢 Зелёная клетка - это старт</li>
            <li>🔵 Синяя клетка - это ты</li>
            <li>🔴 Красная клетка - это выход</li>
            <li>Используй стрелки или клавиши ⬆️⬇️⬅️➡️</li>
            <li>Найди путь через белые клетки!</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}
