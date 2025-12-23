import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface GameSimpleDrawProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function GameSimpleDraw({ onComplete, onBack }: GameSimpleDrawProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#8b5cf6');
  const [completed, setCompleted] = useState(false);

  const colors = [
    { name: 'Фиолетовый', value: '#8b5cf6' },
    { name: 'Розовый', value: '#ec4899' },
    { name: 'Синий', value: '#3b82f6' },
    { name: 'Зелёный', value: '#10b981' },
    { name: 'Жёлтый', value: '#f59e0b' },
    { name: 'Красный', value: '#ef4444' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
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
    
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    const coords = getCoordinates(e);
    if (!coords) return;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  const handleComplete = () => {
    setCompleted(true);
    setTimeout(() => onComplete(100), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={onBack} variant="outline">
          <Icon name="ArrowLeft" size={20} />
          Назад
        </Button>
        <div className="flex gap-2">
          <Button onClick={clearCanvas} variant="outline">
            <Icon name="Eraser" size={20} className="mr-2" />
            Очистить
          </Button>
          <Button onClick={handleComplete} variant="default">
            Готово!
          </Button>
        </div>
      </div>

      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold mb-2">Рисуй двумя руками! 🎨</h3>
        <p className="text-gray-600">Рисуй одинаковые узоры с двух сторон от линии</p>
        <p className="text-sm text-gray-500">Левая рука — слева, правая — справа</p>
      </div>

      <div className="mb-4">
        <p className="text-center font-bold mb-2">Выбери цвет:</p>
        <div className="flex justify-center gap-2 flex-wrap">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              className={`w-12 h-12 rounded-full border-4 transition-transform hover:scale-110 ${
                color === c.value ? 'border-gray-800 scale-110' : 'border-gray-300'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <Card className="p-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="border-4 border-purple-300 rounded-lg cursor-crosshair w-full bg-white"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </Card>

      {completed && (
        <div className="mt-6 text-center animate-bounce">
          <div className="text-3xl font-bold text-green-600">
            🎉 Отличная работа!
          </div>
        </div>
      )}
    </div>
  );
}
