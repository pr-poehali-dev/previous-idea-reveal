import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface TicTacToeGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

type Player = 'X' | 'O' | null;

export default function TicTacToeGame({ level, onBack, onComplete }: TicTacToeGameProps) {
  const size = 3 + level;
  const winLength = Math.min(size, 3 + Math.floor(level / 2));
  const [board, setBoard] = useState<Player[][]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    initGame();
  }, [level]);

  const initGame = () => {
    const newBoard = Array(size).fill(null).map(() => Array(size).fill(null));
    setBoard(newBoard);
    setCurrentPlayer('X');
    setWinner(null);
    setMoves(0);
  };

  const checkWinner = (board: Player[][], row: number, col: number): boolean => {
    const player = board[row][col];
    if (!player) return false;

    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1]
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      
      for (let i = 1; i < winLength; i++) {
        const newRow = row + dx * i;
        const newCol = col + dy * i;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && board[newRow][newCol] === player) {
          count++;
        } else break;
      }
      
      for (let i = 1; i < winLength; i++) {
        const newRow = row - dx * i;
        const newCol = col - dy * i;
        if (newRow >= 0 && newRow < size && newCol >= 0 && newCol < size && board[newRow][newCol] === player) {
          count++;
        } else break;
      }
      
      if (count >= winLength) return true;
    }
    
    return false;
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    setMoves(moves + 1);

    if (checkWinner(newBoard, row, col)) {
      setWinner(currentPlayer);
      if (currentPlayer === 'X') {
        const score = Math.max(50, 100 - moves * 5);
        setTimeout(() => onComplete(score), 1000);
      }
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      
      if (nextPlayer === 'O' && !winner) {
        setTimeout(() => makeAIMove(newBoard), 500);
      }
    }
  };

  const makeAIMove = (currentBoard: Player[][]) => {
    const emptyCells: [number, number][] = [];
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (!currentBoard[i][j]) {
          emptyCells.push([i, j]);
        }
      }
    }
    
    if (emptyCells.length === 0) return;
    
    const [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    const newBoard = currentBoard.map(r => [...r]);
    newBoard[row][col] = 'O';
    setBoard(newBoard);
    setMoves(moves + 1);
    
    if (checkWinner(newBoard, row, col)) {
      setWinner('O');
    } else {
      setCurrentPlayer('X');
    }
  };

  const cellSize = Math.min(350 / size, 80);

  return (
    <GameWrapper
      title="Крестики-нолики"
      description={`Собери ${winLength} своих значков в ряд!`}
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">
            Ходов: {moves}
          </p>
          <p className="text-lg font-bold">
            {winner ? (
              winner === 'X' ? '🎉 Ты победил!' : '❌ Компьютер победил'
            ) : (
              `Ход: ${currentPlayer === 'X' ? 'Твой (X)' : 'Компьютер (O)'}`
            )}
          </p>
          <Button onClick={initGame} variant="outline" size="sm">
            🔄 Новая игра
          </Button>
        </div>

        <div className="flex justify-center">
          <div 
            className="inline-grid gap-2 bg-gray-200 p-4 rounded-xl"
            style={{ gridTemplateColumns: `repeat(${size}, ${cellSize}px)` }}
          >
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={!!cell || !!winner || currentPlayer === 'O'}
                  className={`bg-white border-4 border-gray-400 font-bold transition-all hover:bg-blue-50 disabled:hover:bg-white ${
                    cell === 'X' ? 'text-blue-600' : 'text-red-600'
                  }`}
                  style={{ width: cellSize, height: cellSize, fontSize: cellSize * 0.6 }}
                >
                  {cell}
                </button>
              ))
            )}
          </div>
        </div>

        {winner && (
          <div className={`text-center p-6 rounded-lg border-4 ${
            winner === 'X' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'
          }`}>
            <p className="text-3xl font-bold">
              {winner === 'X' ? '🎉 Поздравляем! Ты выиграл!' : '❌ Компьютер выиграл. Попробуй ещё раз!'}
            </p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Правила:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Ты играешь крестиками (X), компьютер - ноликами (O)</li>
            <li>Нужно собрать {winLength} своих значков в ряд</li>
            <li>Ряд может быть по горизонтали, вертикали или диагонали</li>
            <li>Нажми на пустую клетку, чтобы сделать ход</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}
