import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface ChessGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn' | null;
type PieceColor = 'white' | 'black';

interface Piece {
  type: PieceType;
  color: PieceColor;
}

interface Position {
  row: number;
  col: number;
}

const pieceSymbols = {
  white: { king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙' },
  black: { king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟' }
};

export default function ChessGame({ level, onBack, onComplete }: ChessGameProps) {
  const [board, setBoard] = useState<(Piece | null)[][]>([]);
  const [selectedPiece, setSelectedPiece] = useState<Position | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white');
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initializeBoard();
  }, [level]);

  const initializeBoard = () => {
    const newBoard: (Piece | null)[][] = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Упрощенная расстановка для детей
    if (level <= 2) {
      // Уровень 1-2: только короли и одна фигура
      newBoard[0][4] = { type: 'king', color: 'black' };
      newBoard[7][4] = { type: 'king', color: 'white' };
      newBoard[6][3] = { type: 'queen', color: 'white' };
    } else if (level <= 5) {
      // Уровень 3-5: короли + 2-3 фигуры
      newBoard[0][4] = { type: 'king', color: 'black' };
      newBoard[7][4] = { type: 'king', color: 'white' };
      newBoard[6][3] = { type: 'queen', color: 'white' };
      newBoard[7][0] = { type: 'rook', color: 'white' };
    } else {
      // Уровень 6-10: стандартная начальная позиция
      // Черные фигуры
      newBoard[0][0] = { type: 'rook', color: 'black' };
      newBoard[0][7] = { type: 'rook', color: 'black' };
      newBoard[0][1] = { type: 'knight', color: 'black' };
      newBoard[0][6] = { type: 'knight', color: 'black' };
      newBoard[0][2] = { type: 'bishop', color: 'black' };
      newBoard[0][5] = { type: 'bishop', color: 'black' };
      newBoard[0][3] = { type: 'queen', color: 'black' };
      newBoard[0][4] = { type: 'king', color: 'black' };
      for (let i = 0; i < 8; i++) {
        newBoard[1][i] = { type: 'pawn', color: 'black' };
      }
      
      // Белые фигуры
      newBoard[7][0] = { type: 'rook', color: 'white' };
      newBoard[7][7] = { type: 'rook', color: 'white' };
      newBoard[7][1] = { type: 'knight', color: 'white' };
      newBoard[7][6] = { type: 'knight', color: 'white' };
      newBoard[7][2] = { type: 'bishop', color: 'white' };
      newBoard[7][5] = { type: 'bishop', color: 'white' };
      newBoard[7][3] = { type: 'queen', color: 'white' };
      newBoard[7][4] = { type: 'king', color: 'white' };
      for (let i = 0; i < 8; i++) {
        newBoard[6][i] = { type: 'pawn', color: 'white' };
      }
    }
    
    setBoard(newBoard);
    setSelectedPiece(null);
    setCurrentPlayer('white');
    setMoves(0);
    setGameWon(false);
  };

  const isValidMove = (from: Position, to: Position): boolean => {
    const piece = board[from.row][from.col];
    if (!piece) return false;
    
    const targetPiece = board[to.row][to.col];
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    
    switch (piece.type) {
      case 'king':
        return rowDiff <= 1 && colDiff <= 1;
        
      case 'queen':
        return (rowDiff === 0 || colDiff === 0 || rowDiff === colDiff) && 
               isPathClear(from, to);
        
      case 'rook':
        return (rowDiff === 0 || colDiff === 0) && isPathClear(from, to);
        
      case 'bishop':
        return rowDiff === colDiff && isPathClear(from, to);
        
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        if (colDiff === 0 && !targetPiece) {
          if (to.row - from.row === direction) return true;
          if (from.row === startRow && to.row - from.row === direction * 2 && 
              !board[from.row + direction][from.col]) return true;
        }
        
        if (colDiff === 1 && to.row - from.row === direction && targetPiece) {
          return true;
        }
        return false;
        
      default:
        return false;
    }
  };

  const isPathClear = (from: Position, to: Position): boolean => {
    const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;
    
    let row = from.row + rowStep;
    let col = from.col + colStep;
    
    while (row !== to.row || col !== to.col) {
      if (board[row][col]) return false;
      row += rowStep;
      col += colStep;
    }
    
    return true;
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameWon) return;
    
    if (selectedPiece) {
      if (selectedPiece.row === row && selectedPiece.col === col) {
        setSelectedPiece(null);
        return;
      }
      
      if (isValidMove(selectedPiece, { row, col })) {
        const newBoard = board.map(r => [...r]);
        const targetPiece = newBoard[row][col];
        
        newBoard[row][col] = newBoard[selectedPiece.row][selectedPiece.col];
        newBoard[selectedPiece.row][selectedPiece.col] = null;
        
        setBoard(newBoard);
        setMoves(moves + 1);
        setSelectedPiece(null);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        
        if (targetPiece && targetPiece.type === 'king') {
          setGameWon(true);
          const score = Math.max(50, 100 - moves * 5);
          setTimeout(() => onComplete(score), 1000);
        }
      }
    } else {
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedPiece({ row, col });
      }
    }
  };

  return (
    <GameWrapper
      title="Шахматы"
      description={level <= 2 ? "Поставь мат королю соперника" : level <= 5 ? "Побей короля соперника своими фигурами" : "Играй по правилам шахмат"}
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">
            Ход: <span className={currentPlayer === 'white' ? 'text-blue-600' : 'text-gray-700'}>
              {currentPlayer === 'white' ? 'Белые ⚪' : 'Чёрные ⚫'}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">Ходов: {moves}</p>
          <Button onClick={initializeBoard} variant="outline" size="sm">
            Новая игра
          </Button>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-8 gap-0 w-96 h-96 border-4 border-gray-800 shadow-2xl">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0;
                const isSelected = selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex;
                
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    className={`flex items-center justify-center text-4xl transition-all ${
                      isLight ? 'bg-amber-100' : 'bg-amber-700'
                    } ${
                      isSelected ? 'ring-4 ring-primary scale-105' : 'hover:opacity-80'
                    }`}
                  >
                    {piece && pieceSymbols[piece.color][piece.type!]}
                  </button>
                );
              })
            )}
          </div>
        </div>
        
        {gameWon && (
          <div className="text-center p-4 bg-green-100 rounded-lg border-2 border-green-500">
            <p className="text-2xl font-bold text-green-700">
              🎉 Победа за {moves} ходов!
            </p>
          </div>
        )}
        
        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Подсказка:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Нажми на свою фигуру, потом на клетку куда хочешь пойти</li>
            <li>Король ходит на 1 клетку в любую сторону</li>
            <li>Ферзь (королева) ходит в любую сторону на любое расстояние</li>
            <li>Ладья ходит прямо (вверх/вниз/влево/вправо)</li>
            <li>Слон ходит по диагонали</li>
            <li>Конь ходит буквой "Г"</li>
            <li>Пешка ходит вперёд на 1 клетку, бьёт по диагонали</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}
