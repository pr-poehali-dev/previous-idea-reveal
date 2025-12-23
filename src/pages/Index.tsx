import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Game {
  id: number;
  name: string;
  description: string;
  difficulty: Difficulty;
  icon: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  games: Game[];
}

const categories: Category[] = [
  {
    id: 'logic',
    name: 'Логика',
    icon: 'Brain',
    color: 'bg-purple',
    games: [
      { id: 1, name: 'Судоку', description: 'Заполни числа от 1 до 9', difficulty: 'easy', icon: 'Grid3x3' },
      { id: 2, name: 'Шахматные задачи', description: 'Найди мат в 2 хода', difficulty: 'medium', icon: 'Crown' },
      { id: 3, name: 'Логические цепочки', description: 'Продолжи последовательность', difficulty: 'easy', icon: 'Link' },
      { id: 4, name: 'Ребусы', description: 'Разгадай зашифрованное слово', difficulty: 'medium', icon: 'MessageSquare' },
      { id: 5, name: 'Числовые пирамиды', description: 'Сложи числа правильно', difficulty: 'hard', icon: 'Triangle' },
      { id: 6, name: 'Танграм', description: 'Собери фигуру из частей', difficulty: 'medium', icon: 'Box' },
      { id: 7, name: 'Лабиринты', description: 'Найди выход из лабиринта', difficulty: 'easy', icon: 'Puzzle' },
      { id: 8, name: 'Логические загадки', description: 'Реши хитрую задачу', difficulty: 'hard', icon: 'Lightbulb' },
      { id: 9, name: 'Крестики-нолики 5x5', description: 'Собери 4 в ряд', difficulty: 'medium', icon: 'Grid2x2' },
      { id: 10, name: 'Найди отличия', description: 'Сравни две картинки', difficulty: 'easy', icon: 'Eye' },
    ]
  },
  {
    id: 'memory',
    name: 'Память',
    icon: 'BookOpen',
    color: 'bg-pink',
    games: [
      { id: 11, name: 'Найди пару', description: 'Переверни карточки и найди пары', difficulty: 'easy', icon: 'Copy' },
      { id: 12, name: 'Запомни порядок', description: 'Повтори последовательность', difficulty: 'medium', icon: 'ListOrdered' },
      { id: 13, name: 'Что изменилось?', description: 'Найди изменения на картинке', difficulty: 'medium', icon: 'Search' },
      { id: 14, name: 'Числовой ряд', description: 'Запомни и повтори числа', difficulty: 'hard', icon: 'Hash' },
      { id: 15, name: 'Мемо-слова', description: 'Запомни список слов', difficulty: 'medium', icon: 'Type' },
      { id: 16, name: 'Картинки-память', description: 'Вспомни детали картинки', difficulty: 'easy', icon: 'Image' },
      { id: 17, name: 'Цветовая память', description: 'Запомни цвета и их порядок', difficulty: 'medium', icon: 'Palette' },
      { id: 18, name: 'Звуковая память', description: 'Повтори последовательность звуков', difficulty: 'hard', icon: 'Music' },
      { id: 19, name: 'Мемо-фрукты', description: 'Запомни положение фруктов', difficulty: 'easy', icon: 'Apple' },
      { id: 20, name: 'Кто пропал?', description: 'Найди пропавший предмет', difficulty: 'medium', icon: 'HelpCircle' },
    ]
  },
  {
    id: 'thinking',
    name: 'Мышление',
    icon: 'Sparkles',
    color: 'bg-blue',
    games: [
      { id: 21, name: 'Ассоциации', description: 'Найди связь между словами', difficulty: 'easy', icon: 'Shuffle' },
      { id: 22, name: 'Категории', description: 'Раздели предметы по группам', difficulty: 'medium', icon: 'FolderTree' },
      { id: 23, name: 'Причина-следствие', description: 'Определи что было сначала', difficulty: 'medium', icon: 'ArrowRight' },
      { id: 24, name: 'Сравнение', description: 'Найди общее и различное', difficulty: 'easy', icon: 'Scale' },
      { id: 25, name: 'Аналогии', description: 'Подбери похожую пару', difficulty: 'hard', icon: 'GitCompare' },
      { id: 26, name: 'Что лишнее?', description: 'Найди предмет не из этой группы', difficulty: 'easy', icon: 'X' },
      { id: 27, name: 'Собери целое', description: 'Составь объект из частей', difficulty: 'medium', icon: 'Puzzle' },
      { id: 28, name: 'Противоположности', description: 'Найди антонимы', difficulty: 'easy', icon: 'ArrowLeftRight' },
      { id: 29, name: 'Креативное мышление', description: 'Придумай необычное применение', difficulty: 'hard', icon: 'Wand2' },
      { id: 30, name: 'Решение проблем', description: 'Найди выход из ситуации', difficulty: 'hard', icon: 'Target' },
    ]
  },
  {
    id: 'reading',
    name: 'Скорочтение',
    icon: 'BookMarked',
    color: 'bg-green',
    games: [
      { id: 31, name: 'Таблицы Шульте', description: 'Найди числа по порядку', difficulty: 'medium', icon: 'Table' },
      { id: 32, name: 'Расширение поля зрения', description: 'Увидь текст целиком', difficulty: 'hard', icon: 'Maximize2' },
      { id: 33, name: 'Чтение без возвратов', description: 'Читай только вперёд', difficulty: 'medium', icon: 'FastForward' },
      { id: 34, name: 'Поиск слов', description: 'Найди слово в тексте', difficulty: 'easy', icon: 'SearchCheck' },
      { id: 35, name: 'Скорость чтения', description: 'Читай быстро с пониманием', difficulty: 'hard', icon: 'Gauge' },
      { id: 36, name: 'Анаграммы', description: 'Составь слово из букв', difficulty: 'medium', icon: 'ALargeSmall' },
      { id: 37, name: 'Слоговое чтение', description: 'Читай по слогам быстро', difficulty: 'easy', icon: 'TextCursor' },
      { id: 38, name: 'Вращающийся текст', description: 'Читай под разными углами', difficulty: 'hard', icon: 'RotateCw' },
      { id: 39, name: 'Пропущенные буквы', description: 'Угадай пропущенное', difficulty: 'medium', icon: 'FileQuestion' },
      { id: 40, name: 'Лабиринт слов', description: 'Следуй за текстом', difficulty: 'easy', icon: 'Route' },
    ]
  },
  {
    id: 'hemispheres',
    name: 'Межполушарные связи',
    icon: 'GitBranch',
    color: 'bg-gold',
    games: [
      { id: 41, name: 'Рисуй двумя руками', description: 'Одновременное рисование', difficulty: 'medium', icon: 'PenTool' },
      { id: 42, name: 'Правая-левая', description: 'Различай стороны быстро', difficulty: 'easy', icon: 'Move' },
      { id: 43, name: 'Цвет-слово', description: 'Называй цвет, а не слово', difficulty: 'hard', icon: 'Paintbrush' },
      { id: 44, name: 'Перекрёстные движения', description: 'Координация рук и ног', difficulty: 'medium', icon: 'Activity' },
      { id: 45, name: 'Зеркальное письмо', description: 'Пиши в обе стороны', difficulty: 'hard', icon: 'FlipHorizontal2' },
      { id: 46, name: 'Одновременные узоры', description: 'Рисуй разные фигуры', difficulty: 'hard', icon: 'Shapes' },
      { id: 47, name: 'Ритм двух рук', description: 'Разные ритмы одновременно', difficulty: 'medium', icon: 'Drum' },
      { id: 48, name: 'Буквы в зеркале', description: 'Читай зеркальный текст', difficulty: 'medium', icon: 'FlipVertical2' },
      { id: 49, name: 'Кинезиология', description: 'Упражнения для мозга', difficulty: 'easy', icon: 'Hand' },
      { id: 50, name: 'Нейрогимнастика', description: 'Движения для связи полушарий', difficulty: 'easy', icon: 'Dumbbell' },
    ]
  }
];

const avatars = [
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Felix',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Princess',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Lucky',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Angel',
  'https://api.dicebear.com/7.x/adventurer/svg?seed=Buddy',
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string>(avatars[0]);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [playerLevel] = useState<number>(5);
  const [playerXP] = useState<number>(65);
  const [playerRank] = useState<number>(234);
  
  const difficultyColors = {
    easy: 'bg-green/20 text-green-700 border-green-300',
    medium: 'bg-gold/20 text-yellow-700 border-yellow-300',
    hard: 'bg-pink/20 text-red-700 border-red-300'
  };
  
  const difficultyLabels = {
    easy: 'Легко',
    medium: 'Средне',
    hard: 'Сложно'
  };

  return (
    <div className="min-h-screen notebook-bg">
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b-4 border-primary">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="https://cdn.poehali.dev/projects/d1692d23-0eae-4eca-981c-86c66d40d778/files/ba60b2d7-b9e5-4f4f-b474-821131154cb7.jpg" 
              alt="BrainUP" 
              className="w-16 h-16 animate-bounce-gentle"
            />
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
        {showProfile ? (
          <Card className="max-w-2xl mx-auto shadow-xl border-4 border-primary">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary">
                  <AvatarImage src={selectedAvatar} />
                  <AvatarFallback>👤</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-3xl">Игрок #{playerRank}</CardTitle>
                  <CardDescription className="text-lg">Уровень {playerLevel}</CardDescription>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Прогресс</span>
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
                    <Icon name="Trophy" className="text-gold" />
                    Достижения
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex flex-col items-center p-3 bg-gold/10 rounded-lg border-2 border-gold">
                      <Icon name="Star" className="text-gold w-8 h-8 mb-1" />
                      <span className="text-xs font-medium">Звезда</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
                      <Icon name="Zap" className="text-primary w-8 h-8 mb-1" />
                      <span className="text-xs font-medium">Молния</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-green/10 rounded-lg border-2 border-green">
                      <Icon name="Target" className="text-green-700 w-8 h-8 mb-1" />
                      <span className="text-xs font-medium">Меткий</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-pink/10 rounded-lg border-2 border-pink">
                      <Icon name="Heart" className="text-pink-700 w-8 h-8 mb-1" />
                      <span className="text-xs font-medium">Любитель</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <Icon name="User" className="text-primary" />
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
        ) : selectedCategory ? (
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
              {categories.find(c => c.id === selectedCategory)?.games.map(game => (
                <Card 
                  key={game.id} 
                  className="hover:shadow-2xl transition-all hover:-translate-y-2 border-2 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Icon 
                        name={game.icon} 
                        className="text-primary w-12 h-12 mb-2" 
                      />
                      <Badge 
                        variant="outline" 
                        className={difficultyColors[game.difficulty]}
                      >
                        {difficultyLabels[game.difficulty]}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{game.name}</CardTitle>
                    <CardDescription>{game.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" size="lg">
                      Играть
                      <Icon name="Play" className="ml-2" size={18} />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-4 text-primary">
                Выбери категорию
              </h2>
              <p className="text-xl text-muted-foreground">
                Развивай свои способности играючи! 🎮
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <Card 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer border-4 group"
                >
                  <CardHeader className={`${category.color}/10`}>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`${category.color} p-6 rounded-full group-hover:animate-bounce-gentle`}>
                        <Icon 
                          name={category.icon} 
                          className="text-white" 
                          size={48} 
                        />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-center">{category.name}</CardTitle>
                    <CardDescription className="text-center text-base">
                      {category.games.length} увлекательных игр
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Button className="w-full" size="lg" variant="outline">
                      Выбрать
                      <Icon name="ArrowRight" className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
