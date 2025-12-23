import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameDrawTwoHandsProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function GameDrawTwoHands({ onComplete, onBack }: GameDrawTwoHandsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [symmetryScore, setSymmetryScore] = useState(0);
  const [leftPath, setLeftPath] = useState<{x: number, y: number}[]>([]);
  const [rightPath, setRightPath] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#f9fafb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const coords = getCoordinates(e);
    if (!coords) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    if (coords.x < canvas.width / 2) {
      setLeftPath([coords]);
    } else {
      setRightPath([coords]);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const coords = getCoordinates(e);
    if (!coords) return;
    
    ctx.strokeStyle = coords.x < canvas.width / 2 ? '#8b5cf6' : '#ec4899';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    if (coords.x < canvas.width / 2) {
      const last = leftPath[leftPath.length - 1];
      ctx.moveTo(last.x, last.y);
      setLeftPath([...leftPath, coords]);
    } else {
      const last = rightPath[rightPath.length - 1];
      ctx.moveTo(last.x, last.y);
      setRightPath([...rightPath, coords]);
    }
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const calculateScore = () => {
    const minLength = Math.min(leftPath.length, rightPath.length);
    if (minLength < 10) return 20;
    
    let diff = 0;
    for (let i = 0; i < minLength; i++) {
      const leftY = leftPath[i].y;
      const rightY = rightPath[i].y;
      diff += Math.abs(leftY - rightY);
    }
    
    const avgDiff = diff / minLength;
    const score = Math.max(0, Math.min(100, 100 - avgDiff / 2));
    return Math.round(score);
  };

  const handleComplete = () => {
    const score = calculateScore();
    setSymmetryScore(score);
    setTimeout(() => onComplete(score), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="outline">
          <Icon name="ArrowLeft" size={20} />
          Назад
        </Button>
        <Button onClick={handleComplete} variant="default">
          Завершить
        </Button>
      </div>

      <Card className="p-4">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold">Рисуй одновременно двумя руками симметрично</h3>
          <p className="text-sm text-gray-600">Левая рука — левая половина, правая — правая</p>
        </div>
        
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="border-2 border-gray-300 rounded-lg cursor-crosshair w-full"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </Card>

      {symmetryScore > 0 && (
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            Симметрия: {symmetryScore}%
          </div>
        </div>
      )}
    </div>
  );
}
