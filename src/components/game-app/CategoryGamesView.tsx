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
  const category = categories.find(c => c.id === selectedCategory);
  
  if (!category) return null;
  
  const completedCount = category.games.filter(g => gameProgress[g.id]?.completed).length;
  
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
      
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Icon 
            name={category.icon} 
            className="text-primary" 
            size={40} 
          />
          {category.name}
        </h2>
        <p className="text-lg text-muted-foreground">
          Прогресс: {completedCount} / {category.games.length} игр пройдено
        </p>
        <div className="mt-3 w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${category.color} transition-all duration-500`}
            style={{ width: `${(completedCount / category.games.length) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-gold opacity-30" />
        
        <div className="space-y-6">
          {category.games.map((game, idx) => {
            const prevGame = idx > 0 ? category.games[idx - 1] : null;
            const isUnlocked = game.unlocked || (prevGame && gameProgress[prevGame.id]?.completed);
            const isCompleted = gameProgress[game.id]?.completed;
            const isNextToPlay = isUnlocked && !isCompleted;
            
            return (
              <div key={game.id} className="relative flex items-center gap-4">
                <div className={`z-10 flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${
                  isCompleted 
                    ? 'bg-green-500 border-green-600 shadow-lg' 
                    : isNextToPlay 
                    ? `${category.color} border-white shadow-xl animate-pulse` 
                    : 'bg-gray-200 border-gray-300'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" className="text-white" size={32} />
                  ) : isUnlocked ? (
                    <Icon name={game.icon} className="text-white" size={28} />
                  ) : (
                    <Icon name="Lock" className="text-gray-400" size={28} />
                  )}
                </div>
                
                <div 
                  onClick={() => isUnlocked && setSelectedGame(game)}
                  className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                    isUnlocked 
                      ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-white' 
                      : 'opacity-50 cursor-not-allowed bg-gray-50'
                  } ${
                    isCompleted ? 'border-green-400' : isNextToPlay ? 'border-primary shadow-md' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-muted-foreground">#{idx + 1}</span>
                        <h3 className="text-xl font-bold">{game.name}</h3>
                        <Badge className="text-xs">Уровень {game.level}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{game.description}</p>
                      
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="outline" 
                          className={`${difficultyColors[game.difficulty]} text-xs`}
                        >
                          {difficultyLabels[game.difficulty]}
                        </Badge>
                        
                        {isCompleted && gameProgress[game.id]?.score !== undefined && (
                          <span className="text-sm font-bold text-green-600">
                            ⭐ {gameProgress[game.id].score} / 100
                          </span>
                        )}
                        
                        {isNextToPlay && (
                          <Badge className="bg-primary text-white animate-pulse">
                            Следующая игра!
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      size="lg"
                      disabled={!isUnlocked}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isUnlocked) setSelectedGame(game);
                      }}
                      className={isNextToPlay ? 'animate-bounce-gentle' : ''}
                    >
                      {!isUnlocked ? (
                        <>
                          <Icon name="Lock" className="mr-2" size={18} />
                          Закрыто
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {completedCount === category.games.length && (
        <div className="mt-12 p-8 bg-gradient-to-r from-gold/20 to-primary/20 rounded-xl border-4 border-gold text-center">
          <Icon name="Trophy" className="text-gold mx-auto mb-4" size={64} />
          <h3 className="text-3xl font-bold mb-2">Поздравляем!</h3>
          <p className="text-lg text-muted-foreground">
            Вы прошли все 100 игр в категории "{category.name}"! 🎉
          </p>
        </div>
      )}
    </div>
  );
}
