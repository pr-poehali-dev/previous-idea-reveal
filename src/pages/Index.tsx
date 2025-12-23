import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Logo from '@/components/Logo';
import PageTransition from '@/components/PageTransition';
import ProfileView from '@/components/game-app/ProfileView';
import CategoryGamesView from '@/components/game-app/CategoryGamesView';
import CategoriesView from '@/components/game-app/CategoriesView';
import GameComponent from '@/components/games';
import { categories, avatars, Game } from '@/components/game-app/types';

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  const getLogoVariant = (): 'default' | 'memory' | 'logic' | 'attention' | 'creativity' => {
    if (!selectedGame) return 'default';
    const categoryId = categories.find(c => c.games.some(g => g.id === selectedGame.id))?.id;
    if (categoryId === 'memory') return 'memory';
    if (categoryId === 'logic') return 'logic';
    if (categoryId === 'reading') return 'attention';
    if (categoryId === 'creativity') return 'creativity';
    return 'default';
  };
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatars[0]);
  const [playerNickname, setPlayerNickname] = useState<string>('');
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [playerLevel] = useState<number>(5);
  const [playerXP] = useState<number>(65);
  const [playerRank] = useState<number>(234);
  const [gameProgress, setGameProgress] = useState<{[key: number]: {completed: boolean, score: number}}>({});
  
  useEffect(() => {
    const saved = localStorage.getItem('brainup_progress');
    if (saved) {
      setGameProgress(JSON.parse(saved));
    }
    const savedNickname = localStorage.getItem('brainup_nickname');
    if (savedNickname) {
      setPlayerNickname(savedNickname);
    }
  }, []);
  
  const handleNicknameChange = (value: string) => {
    setPlayerNickname(value);
    localStorage.setItem('brainup_nickname', value);
  };
  
  const completeGame = (gameId: number, score: number) => {
    const newProgress = { ...gameProgress, [gameId]: { completed: true, score } };
    setGameProgress(newProgress);
    localStorage.setItem('brainup_progress', JSON.stringify(newProgress));
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen notebook-bg">
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b-4 border-primary">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo variant={getLogoVariant()} size={120} />
            <div>
              <h1 className="text-3xl font-bold text-primary">BrainUP</h1>
              <p className="text-sm text-muted-foreground">Прокачай свой мозг! 🚀</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={selectedAvatar} />
                <AvatarFallback>👤</AvatarFallback>
              </Avatar>
              <span>Профиль</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedGame ? (
          <PageTransition pageKey={`game-${selectedGame.id}`}>
            <GameComponent 
              game={selectedGame}
              onComplete={(score) => completeGame(selectedGame.id, score)} 
              onBack={() => setSelectedGame(null)} 
            />
          </PageTransition>
        ) : showProfile ? (
          <PageTransition pageKey="profile">
            <ProfileView
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
              playerNickname={playerNickname}
              handleNicknameChange={handleNicknameChange}
              playerLevel={playerLevel}
              playerXP={playerXP}
              playerRank={playerRank}
              gameProgress={gameProgress}
              setShowProfile={setShowProfile}
            />
          </PageTransition>
        ) : selectedCategory ? (
          <PageTransition pageKey={`category-${selectedCategory}`}>
            <CategoryGamesView
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              gameProgress={gameProgress}
              setSelectedGame={setSelectedGame}
            />
          </PageTransition>
        ) : (
          <PageTransition pageKey="home">
            <CategoriesView setSelectedCategory={setSelectedCategory} />
          </PageTransition>
        )}
      </main>
    </div>
  );
}