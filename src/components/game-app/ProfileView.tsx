import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { categories, avatars } from './types';

interface ProfileViewProps {
  selectedAvatar: string;
  setSelectedAvatar: (avatar: string) => void;
  playerNickname: string;
  handleNicknameChange: (value: string) => void;
  playerLevel: number;
  playerXP: number;
  playerRank: number;
  gameProgress: {[key: number]: {completed: boolean, score: number}};
  setShowProfile: (show: boolean) => void;
}

export default function ProfileView({
  selectedAvatar,
  setSelectedAvatar,
  playerNickname,
  handleNicknameChange,
  playerLevel,
  playerXP,
  playerRank,
  gameProgress,
  setShowProfile
}: ProfileViewProps) {
  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-4 border-primary">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24 border-4 border-primary">
            <AvatarImage src={selectedAvatar} />
            <AvatarFallback>👤</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-3xl">{playerNickname || `Игрок #${playerRank}`}</CardTitle>
            <CardDescription className="text-lg flex items-center gap-2">
              <Icon name="Award" className="text-gold" size={20} />
              Уровень {playerLevel}
            </CardDescription>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Прогресс до следующего уровня</span>
                <span className="text-sm text-muted-foreground">{playerXP}%</span>
              </div>
              <Progress value={playerXP} className="h-3" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Icon name="User" className="text-primary" />
              Твой никнейм
            </h3>
            <div>
              <Label htmlFor="nickname" className="text-sm text-muted-foreground">Придумай себе крутое имя!</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="Например: МозгоШтурм"
                value={playerNickname}
                onChange={(e) => handleNicknameChange(e.target.value)}
                className="mt-2"
                maxLength={20}
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Icon name="Trophy" className="text-gold" />
              Достижения
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => {
                const completedGames = category.games.filter(g => gameProgress[g.id]?.completed).length;
                const totalGames = category.games.length;
                const isUnlocked = completedGames > 0;
                
                return (
                  <div 
                    key={category.id}
                    className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                      isUnlocked 
                        ? `${category.color}/20 border-${category.color.replace('bg-', '')} shadow-md` 
                        : 'bg-gray-100 border-gray-300 opacity-50'
                    }`}
                  >
                    <Icon 
                      name={category.icon} 
                      className={`${isUnlocked ? '' : 'text-gray-400'} w-10 h-10 mb-2`}
                    />
                    <span className="text-xs font-bold text-center mb-1">{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {completedGames}/{totalGames}
                    </span>
                    {completedGames === totalGames && totalGames > 0 && (
                      <Badge className="mt-2 bg-gold text-white">
                        <Icon name="CheckCircle" className="w-3 h-3 mr-1" />
                        100%
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Icon name="Image" className="text-primary" />
              Выбери аватар
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {avatars.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`p-2 rounded-lg border-2 transition-all hover:scale-110 ${
                    selectedAvatar === avatar ? 'border-primary bg-primary/10' : 'border-gray-200'
                  }`}
                >
                  <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full" />
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={() => setShowProfile(false)} 
            className="w-full"
            size="lg"
          >
            Вернуться к играм
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
