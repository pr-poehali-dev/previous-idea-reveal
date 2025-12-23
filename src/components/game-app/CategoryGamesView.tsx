import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { categories, difficultyColors, difficultyLabels, Game } from './types';

interface CategoryGamesViewProps {
  selectedCategory: string;
  setSelectedCategory: (category: string | null) => void;
  gameProgress: {[key: number]: {completed: boolean, score: number}};
  setSelectedGame: (game: Game) => void;
}

export default function CategoryGamesView({
  selectedCategory,
  setSelectedCategory,
  gameProgress,
  setSelectedGame
}: CategoryGamesViewProps) {
  return (
    <div>
      <Button 
        onClick={() => setSelectedCategory(null)} 
        variant="outline" 
        className="mb-6"
      >
        <Icon name="ArrowLeft" className="mr-2" />
        Назад к категориям
      </Button>
      
      <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
        <Icon 
          name={categories.find(c => c.id === selectedCategory)?.icon || 'Brain'} 
          className="text-primary" 
          size={40} 
        />
        {categories.find(c => c.id === selectedCategory)?.name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.find(c => c.id === selectedCategory)?.games.map((game, idx) => {
          const prevGame = idx > 0 ? categories.find(c => c.id === selectedCategory)?.games[idx - 1] : null;
          const isUnlocked = game.unlocked || (prevGame && gameProgress[prevGame.id]?.completed);
          const isCompleted = gameProgress[game.id]?.completed;
          
          return (
          <Card 
            key={game.id} 
            className={`transition-all border-2 ${
              isUnlocked 
                ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer' 
                : 'opacity-50 cursor-not-allowed grayscale'
            } ${
              isCompleted ? 'border-green-500 bg-green-50' : ''
            }`}
            onClick={() => isUnlocked && setSelectedGame(game)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="relative">
                  <Icon 
                    name={game.icon} 
                    className="text-primary w-12 h-12 mb-2" 
                  />
                  {isCompleted && (
                    <Icon 
                      name="CheckCircle2" 
                      className="absolute -top-1 -right-1 text-green-600 w-6 h-6" 
                    />
                  )}
                  {!isUnlocked && (
                    <Icon 
                      name="Lock" 
                      className="absolute -top-1 -right-1 text-gray-600 w-6 h-6" 
                    />
                  )}
                </div>
                <Badge 
                  variant="outline" 
                  className={difficultyColors[game.difficulty]}
                >
                  {difficultyLabels[game.difficulty]}
                </Badge>
              </div>
              <CardTitle className="text-xl">{game.name}</CardTitle>
              <CardDescription>{game.description}</CardDescription>
              {isCompleted && gameProgress[game.id]?.score !== undefined && (
                <div className="mt-2 text-sm font-bold text-green-600">
                  Результат: {gameProgress[game.id].score}/100
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                size="lg"
                disabled={!isUnlocked}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isUnlocked) setSelectedGame(game);
                }}
              >
                {!isUnlocked ? (
                  <>
                    <Icon name="Lock" className="mr-2" size={18} />
                    Заблокировано
                  </>
                ) : isCompleted ? (
                  <>
                    <Icon name="RotateCcw" className="mr-2" size={18} />
                    Переиграть
                  </>
                ) : (
                  <>
                    Играть
                    <Icon name="Play" className="ml-2" size={18} />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        );
      })}
      </div>
    </div>
  );
}
