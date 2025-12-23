export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Game {
  id: number;
  name: string;
  description: string;
  difficulty: Difficulty;
  icon: string;
  unlocked: boolean;
  completed: boolean;
  score?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  games: Game[];
}

export const categories: Category[] = [
  {
    id: 'logic',
    name: 'Логика',
    icon: 'Brain',
    color: 'bg-purple',
    games: [
      { id: 1, name: 'Судоку', description: 'Заполни числа от 1 до 9', difficulty: 'easy', icon: 'Grid3x3', unlocked: true, completed: false },
      { id: 2, name: 'Шахматные задачи', description: 'Найди мат в 2 хода', difficulty: 'medium', icon: 'Crown', unlocked: false, completed: false },
      { id: 3, name: 'Логические цепочки', description: 'Продолжи последовательность', difficulty: 'easy', icon: 'Link', unlocked: false, completed: false },
      { id: 4, name: 'Ребусы', description: 'Разгадай зашифрованное слово', difficulty: 'medium', icon: 'MessageSquare', unlocked: false, completed: false },
      { id: 5, name: 'Числовые пирамиды', description: 'Сложи числа правильно', difficulty: 'hard', icon: 'Triangle', unlocked: false, completed: false },
      { id: 6, name: 'Танграм', description: 'Собери фигуру из частей', difficulty: 'medium', icon: 'Box', unlocked: false, completed: false },
      { id: 7, name: 'Лабиринты', description: 'Найди выход из лабиринта', difficulty: 'easy', icon: 'Puzzle', unlocked: false, completed: false },
      { id: 8, name: 'Логические загадки', description: 'Реши хитрую задачу', difficulty: 'hard', icon: 'Lightbulb', unlocked: false, completed: false },
      { id: 9, name: 'Крестики-нолики 5x5', description: 'Собери 4 в ряд', difficulty: 'medium', icon: 'Grid2x2', unlocked: false, completed: false },
      { id: 10, name: 'Найди отличия', description: 'Сравни две картинки', difficulty: 'easy', icon: 'Eye', unlocked: false, completed: false },
    ]
  },
  {
    id: 'memory',
    name: 'Память',
    icon: 'BookOpen',
    color: 'bg-pink',
    games: [
      { id: 11, name: 'Найди пару', description: 'Переверни карточки и найди пары', difficulty: 'easy', icon: 'Copy', unlocked: true, completed: false },
      { id: 12, name: 'Запомни порядок', description: 'Повтори последовательность', difficulty: 'medium', icon: 'ListOrdered', unlocked: false, completed: false },
      { id: 13, name: 'Что изменилось?', description: 'Найди изменения на картинке', difficulty: 'medium', icon: 'Search', unlocked: false, completed: false },
      { id: 14, name: 'Числовой ряд', description: 'Запомни и повтори числа', difficulty: 'hard', icon: 'Hash', unlocked: false, completed: false },
      { id: 15, name: 'Мемо-слова', description: 'Запомни список слов', difficulty: 'medium', icon: 'Type', unlocked: false, completed: false },
      { id: 16, name: 'Картинки-память', description: 'Вспомни детали картинки', difficulty: 'easy', icon: 'Image', unlocked: false, completed: false },
      { id: 17, name: 'Цветовая память', description: 'Запомни цвета и их порядок', difficulty: 'medium', icon: 'Palette', unlocked: false, completed: false },
      { id: 18, name: 'Звуковая память', description: 'Повтори последовательность звуков', difficulty: 'hard', icon: 'Music', unlocked: false, completed: false },
      { id: 19, name: 'Мемо-фрукты', description: 'Запомни положение фруктов', difficulty: 'easy', icon: 'Apple', unlocked: false, completed: false },
      { id: 20, name: 'Кто пропал?', description: 'Найди пропавший предмет', difficulty: 'medium', icon: 'HelpCircle', unlocked: false, completed: false },
    ]
  },
  {
    id: 'thinking',
    name: 'Мышление',
    icon: 'Sparkles',
    color: 'bg-blue',
    games: [
      { id: 21, name: 'Ассоциации', description: 'Найди связь между словами', difficulty: 'easy', icon: 'Shuffle', unlocked: true, completed: false },
      { id: 22, name: 'Категории', description: 'Раздели предметы по группам', difficulty: 'medium', icon: 'FolderTree', unlocked: false, completed: false },
      { id: 23, name: 'Причина-следствие', description: 'Определи что было сначала', difficulty: 'medium', icon: 'ArrowRight', unlocked: false, completed: false },
      { id: 24, name: 'Сравнение', description: 'Найди общее и различное', difficulty: 'easy', icon: 'Scale', unlocked: false, completed: false },
      { id: 25, name: 'Аналогии', description: 'Подбери похожую пару', difficulty: 'hard', icon: 'GitCompare', unlocked: false, completed: false },
      { id: 26, name: 'Что лишнее?', description: 'Найди предмет не из этой группы', difficulty: 'easy', icon: 'X', unlocked: false, completed: false },
      { id: 27, name: 'Собери целое', description: 'Составь объект из частей', difficulty: 'medium', icon: 'Puzzle', unlocked: false, completed: false },
      { id: 28, name: 'Противоположности', description: 'Найди антонимы', difficulty: 'easy', icon: 'ArrowLeftRight', unlocked: false, completed: false },
      { id: 29, name: 'Креативное мышление', description: 'Придумай необычное применение', difficulty: 'hard', icon: 'Wand2', unlocked: false, completed: false },
      { id: 30, name: 'Решение проблем', description: 'Найди выход из ситуации', difficulty: 'hard', icon: 'Target', unlocked: false, completed: false },
    ]
  },
  {
    id: 'reading',
    name: 'Скорочтение',
    icon: 'BookMarked',
    color: 'bg-green',
    games: [
      { id: 31, name: 'Таблицы Шульте', description: 'Найди числа по порядку', difficulty: 'medium', icon: 'Table', unlocked: true, completed: false },
      { id: 32, name: 'Расширение поля зрения', description: 'Увидь текст целиком', difficulty: 'hard', icon: 'Maximize2', unlocked: false, completed: false },
      { id: 33, name: 'Чтение без возвратов', description: 'Читай только вперёд', difficulty: 'medium', icon: 'FastForward', unlocked: false, completed: false },
      { id: 34, name: 'Поиск слов', description: 'Найди слово в тексте', difficulty: 'easy', icon: 'SearchCheck', unlocked: false, completed: false },
      { id: 35, name: 'Скорость чтения', description: 'Читай быстро с пониманием', difficulty: 'hard', icon: 'Gauge', unlocked: false, completed: false },
      { id: 36, name: 'Анаграммы', description: 'Составь слово из букв', difficulty: 'medium', icon: 'ALargeSmall', unlocked: false, completed: false },
      { id: 37, name: 'Слоговое чтение', description: 'Читай по слогам быстро', difficulty: 'easy', icon: 'TextCursor', unlocked: false, completed: false },
      { id: 38, name: 'Вращающийся текст', description: 'Читай под разными углами', difficulty: 'hard', icon: 'RotateCw', unlocked: false, completed: false },
      { id: 39, name: 'Пропущенные буквы', description: 'Угадай пропущенное', difficulty: 'medium', icon: 'FileQuestion', unlocked: false, completed: false },
      { id: 40, name: 'Лабиринт слов', description: 'Следуй за текстом', difficulty: 'easy', icon: 'Route', unlocked: false, completed: false },
    ]
  },
  {
    id: 'hemispheres',
    name: 'Межполушарные связи',
    icon: 'GitBranch',
    color: 'bg-gold',
    games: [
      { id: 41, name: 'Рисуй двумя руками', description: 'Одновременное рисование', difficulty: 'medium', icon: 'PenTool', unlocked: true, completed: false },
      { id: 42, name: 'Правая-левая', description: 'Различай стороны быстро', difficulty: 'easy', icon: 'Move', unlocked: false, completed: false },
      { id: 43, name: 'Цвет-слово', description: 'Называй цвет, а не слово', difficulty: 'hard', icon: 'Paintbrush', unlocked: false, completed: false },
      { id: 44, name: 'Перекрёстные движения', description: 'Координация рук и ног', difficulty: 'medium', icon: 'Activity', unlocked: false, completed: false },
      { id: 45, name: 'Зеркальное письмо', description: 'Пиши в обе стороны', difficulty: 'hard', icon: 'FlipHorizontal2', unlocked: false, completed: false },
      { id: 46, name: 'Одновременные узоры', description: 'Рисуй разные фигуры', difficulty: 'hard', icon: 'Shapes', unlocked: false, completed: false },
      { id: 47, name: 'Ритм двух рук', description: 'Разные ритмы одновременно', difficulty: 'medium', icon: 'Drum', unlocked: false, completed: false },
      { id: 48, name: 'Буквы в зеркале', description: 'Читай зеркальный текст', difficulty: 'medium', icon: 'FlipVertical2', unlocked: false, completed: false },
      { id: 49, name: 'Кинезиология', description: 'Упражнения для мозга', difficulty: 'easy', icon: 'Hand', unlocked: false, completed: false },
      { id: 50, name: 'Нейрогимнастика', description: 'Движения для связи полушарий', difficulty: 'easy', icon: 'Dumbbell', unlocked: false, completed: false },
    ]
  }
];

export const avatars = [
  'https://api.dicebear.com/7.x/anime/svg?seed=Sakura',
  'https://api.dicebear.com/7.x/anime/svg?seed=Kaito',
  'https://api.dicebear.com/7.x/anime/svg?seed=Yuki',
  'https://api.dicebear.com/7.x/anime/svg?seed=Haru',
  'https://api.dicebear.com/7.x/anime/svg?seed=Rin',
  'https://api.dicebear.com/7.x/anime/svg?seed=Sora',
];

export const difficultyColors = {
  easy: 'bg-green/20 text-green-700 border-green-300',
  medium: 'bg-gold/20 text-yellow-700 border-yellow-300',
  hard: 'bg-pink/20 text-red-700 border-red-300'
};

export const difficultyLabels = {
  easy: 'Легко',
  medium: 'Средне',
  hard: 'Сложно'
};
