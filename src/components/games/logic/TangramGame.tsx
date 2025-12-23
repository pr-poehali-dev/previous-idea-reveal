import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import GameWrapper from '../GameWrapper';

interface TangramGameProps {
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
}

interface Piece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  shape: string;
}

const shapes = ['triangle', 'square', 'parallelogram'];
const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400'];

export default function TangramGame({ level, onBack, onComplete }: TangramGameProps) {
  const pieceCount = 4 + level;
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    generatePuzzle();
  }, [level]);

  const generatePuzzle = () => {
    const newPieces: Piece[] = [];
    
    for (let i = 0; i < pieceCount; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 300,
        y: Math.random() * 200,
        rotation: Math.floor(Math.random() * 4) * 90,
        color: colors[i % colors.length],
        shape: shapes[i % shapes.length]
      });
    }
    
    setPieces(newPieces);
    setSelectedPiece(null);
    setMoves(0);
    setCompleted(false);
  };

  const handlePieceClick = (id: number) => {
    setSelectedPiece(id);
  };

  const handleRotate = () => {
    if (selectedPiece === null) return;
    
    setPieces(pieces.map(p => 
      p.id === selectedPiece 
        ? { ...p, rotation: (p.rotation + 90) % 360 }
        : p
    ));
    setMoves(moves + 1);
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (selectedPiece === null) return;
    
    setPieces(pieces.map(p => {
      if (p.id === selectedPiece) {
        const step = 20;
        switch (direction) {
          case 'up': return { ...p, y: Math.max(0, p.y - step) };
          case 'down': return { ...p, y: Math.min(300, p.y + step) };
          case 'left': return { ...p, x: Math.max(0, p.x - step) };
          case 'right': return { ...p, x: Math.min(400, p.x + step) };
          default: return p;
        }
      }
      return p;
    }));
    setMoves(moves + 1);
  };

  const handleComplete = () => {
    setCompleted(true);
    const score = Math.max(50, 100 - Math.floor(moves / 5));
    setTimeout(() => onComplete(score), 1000);
  };

  const renderPiece = (piece: Piece) => {
    const size = 60;
    
    return (
      <div
        key={piece.id}
        onClick={() => handlePieceClick(piece.id)}
        className={`absolute cursor-pointer transition-all ${piece.color} ${
          selectedPiece === piece.id ? 'ring-4 ring-primary scale-110' : 'hover:scale-105'
        }`}
        style={{
          left: piece.x,
          top: piece.y,
          width: size,
          height: size,
          transform: `rotate(${piece.rotation}deg)`,
          clipPath: piece.shape === 'triangle' 
            ? 'polygon(50% 0%, 0% 100%, 100% 100%)'
            : piece.shape === 'parallelogram'
            ? 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
            : 'none'
        }}
      />
    );
  };

  return (
    <GameWrapper
      title="Танграм"
      description="Собери красивую фигуру из всех частей!"
      level={level}
      onBack={onBack}
      onComplete={onComplete}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold">Ходов: {moves}</p>
          <Button onClick={generatePuzzle} variant="outline" size="sm">
            🔄 Новая головоломка
          </Button>
        </div>

        <div className="relative bg-gray-100 rounded-xl border-4 border-gray-300" style={{ width: 500, height: 400 }}>
          {pieces.map(renderPiece)}
        </div>

        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            <Button onClick={() => handleMove('up')} disabled={selectedPiece === null}>
              ⬆️
            </Button>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => handleMove('left')} disabled={selectedPiece === null}>
              ⬅️
            </Button>
            <Button onClick={handleRotate} disabled={selectedPiece === null}>
              🔄 Повернуть
            </Button>
            <Button onClick={() => handleMove('right')} disabled={selectedPiece === null}>
              ➡️
            </Button>
          </div>
          <div className="flex justify-center gap-2">
            <Button onClick={() => handleMove('down')} disabled={selectedPiece === null}>
              ⬇️
            </Button>
          </div>
        </div>

        {!completed ? (
          <Button onClick={handleComplete} size="lg" className="w-full bg-green-600 hover:bg-green-700">
            ✅ Готово!
          </Button>
        ) : (
          <div className="text-center p-6 bg-green-100 rounded-lg border-2 border-green-500">
            <p className="text-3xl font-bold text-green-700">
              🎉 Отличная работа!
            </p>
          </div>
        )}

        <div className="bg-blue-50 p-4 rounded-lg text-sm space-y-2">
          <p className="font-bold">💡 Как играть:</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Нажми на фигуру, чтобы её выбрать</li>
            <li>Используй стрелки, чтобы двигать фигуру</li>
            <li>Кнопка "🔄 Повернуть" вращает фигуру</li>
            <li>Собери красивую картинку из всех частей!</li>
          </ul>
        </div>
      </div>
    </GameWrapper>
  );
}
