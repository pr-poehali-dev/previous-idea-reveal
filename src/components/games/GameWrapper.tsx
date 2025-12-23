import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { ReactNode } from 'react';

interface GameWrapperProps {
  title: string;
  description: string;
  level: number;
  onBack: () => void;
  onComplete: (score: number) => void;
  children: ReactNode;
}

export default function GameWrapper({
  title,
  description,
  level,
  onBack,
  children
}: GameWrapperProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Button 
        onClick={onBack} 
        variant="outline" 
        className="mb-4"
      >
        <Icon name="ArrowLeft" className="mr-2" />
        Назад
      </Button>
      
      <Card className="border-4 border-primary shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">{title}</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-muted-foreground">Уровень {level}</span>
            </div>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
