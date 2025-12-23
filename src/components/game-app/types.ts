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
  level: number;
}

export interface GameTemplate {
  name: string;
  baseDescription: string;
  icon: string;
  getLevelDescription: (level: number) => string;
  getDifficulty: (level: number) => Difficulty;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  games: Game[];
  gameTemplates: GameTemplate[];
}

const logicTemplates: GameTemplate[] = [
  {
    name: 'Судоку',
    baseDescription: 'Заполни числа',
    icon: 'Grid3x3',
    getLevelDescription: (level) => `Судоку ${3 + level}x${3 + level}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Шахматные задачи',
    baseDescription: 'Найди мат',
    icon: 'Crown',
    getLevelDescription: (level) => `Мат в ${level + 1} ход${level + 1 > 1 ? 'а' : ''}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Логические цепочки',
    baseDescription: 'Продолжи последовательность',
    icon: 'Link',
    getLevelDescription: (level) => `${level + 3} элемента`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Ребусы',
    baseDescription: 'Разгадай зашифрованное',
    icon: 'MessageSquare',
    getLevelDescription: (level) => `Сложность ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Числовые пирамиды',
    baseDescription: 'Сложи числа правильно',
    icon: 'Triangle',
    getLevelDescription: (level) => `${level + 3} уровней`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Танграм',
    baseDescription: 'Собери фигуру из частей',
    icon: 'Box',
    getLevelDescription: (level) => `${level + 4} детал${level + 4 > 4 ? 'ей' : 'и'}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Лабиринты',
    baseDescription: 'Найди выход',
    icon: 'Puzzle',
    getLevelDescription: (level) => `Размер ${(level + 3) * 2}x${(level + 3) * 2}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Логические загадки',
    baseDescription: 'Реши задачу',
    icon: 'Lightbulb',
    getLevelDescription: (level) => `Уровень ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Крестики-нолики',
    baseDescription: 'Собери в ряд',
    icon: 'Grid2x2',
    getLevelDescription: (level) => `${level + 3}x${level + 3}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Найди отличия',
    baseDescription: 'Сравни картинки',
    icon: 'Eye',
    getLevelDescription: (level) => `${level + 3} отличия`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  }
];

const memoryTemplates: GameTemplate[] = [
  {
    name: 'Найди пару',
    baseDescription: 'Переверни карточки',
    icon: 'Copy',
    getLevelDescription: (level) => `${(level + 2) * 2} пар`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Запомни порядок',
    baseDescription: 'Повтори последовательность',
    icon: 'ListOrdered',
    getLevelDescription: (level) => `${level + 3} элемента`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Что изменилось?',
    baseDescription: 'Найди изменения',
    icon: 'Search',
    getLevelDescription: (level) => `${level + 2} изменения`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Числовой ряд',
    baseDescription: 'Запомни числа',
    icon: 'Hash',
    getLevelDescription: (level) => `${level + 4} цифры`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Мемо-слова',
    baseDescription: 'Запомни список',
    icon: 'Type',
    getLevelDescription: (level) => `${level + 5} слов`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Картинки-память',
    baseDescription: 'Вспомни детали',
    icon: 'Image',
    getLevelDescription: (level) => `${level + 4} детали`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Цветовая память',
    baseDescription: 'Запомни цвета',
    icon: 'Palette',
    getLevelDescription: (level) => `${level + 4} цвета`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Звуковая память',
    baseDescription: 'Повтори звуки',
    icon: 'Music',
    getLevelDescription: (level) => `${level + 3} звука`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Мемо-фрукты',
    baseDescription: 'Запомни положение',
    icon: 'Apple',
    getLevelDescription: (level) => `${level + 5} фруктов`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Кто пропал?',
    baseDescription: 'Найди пропавший предмет',
    icon: 'HelpCircle',
    getLevelDescription: (level) => `Из ${level + 6} предметов`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  }
];

const thinkingTemplates: GameTemplate[] = [
  {
    name: 'Ассоциации',
    baseDescription: 'Найди связь',
    icon: 'Shuffle',
    getLevelDescription: (level) => `Уровень ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Категории',
    baseDescription: 'Раздели по группам',
    icon: 'FolderTree',
    getLevelDescription: (level) => `${level + 3} группы`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Причина-следствие',
    baseDescription: 'Определи порядок',
    icon: 'ArrowRight',
    getLevelDescription: (level) => `${level + 3} события`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Сравнение',
    baseDescription: 'Найди общее и различное',
    icon: 'Scale',
    getLevelDescription: (level) => `${level + 3} объекта`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Аналогии',
    baseDescription: 'Подбери пару',
    icon: 'GitCompare',
    getLevelDescription: (level) => `Сложность ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Что лишнее?',
    baseDescription: 'Найди лишний предмет',
    icon: 'X',
    getLevelDescription: (level) => `Из ${level + 5} предметов`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Собери целое',
    baseDescription: 'Составь объект',
    icon: 'Puzzle',
    getLevelDescription: (level) => `${level + 4} частей`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Противоположности',
    baseDescription: 'Найди антонимы',
    icon: 'ArrowLeftRight',
    getLevelDescription: (level) => `${level + 4} пар`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Креативное мышление',
    baseDescription: 'Придумай применение',
    icon: 'Wand2',
    getLevelDescription: (level) => `Задача ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Решение проблем',
    baseDescription: 'Найди выход',
    icon: 'Target',
    getLevelDescription: (level) => `Ситуация ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  }
];

const readingTemplates: GameTemplate[] = [
  {
    name: 'Таблицы Шульте',
    baseDescription: 'Найди числа по порядку',
    icon: 'Table',
    getLevelDescription: (level) => `${(level + 3)}x${(level + 3)}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Расширение поля зрения',
    baseDescription: 'Увидь текст целиком',
    icon: 'Maximize2',
    getLevelDescription: (level) => `${level + 3} слова`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Чтение без возвратов',
    baseDescription: 'Читай вперёд',
    icon: 'FastForward',
    getLevelDescription: (level) => `${(level + 3) * 10} слов`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Поиск слов',
    baseDescription: 'Найди слово в тексте',
    icon: 'SearchCheck',
    getLevelDescription: (level) => `${level + 2} слова`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Скорость чтения',
    baseDescription: 'Читай быстро',
    icon: 'Gauge',
    getLevelDescription: (level) => `${(level + 2) * 50} слов/мин`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Анаграммы',
    baseDescription: 'Составь слово',
    icon: 'ALargeSmall',
    getLevelDescription: (level) => `${level + 4} буквы`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Слоговое чтение',
    baseDescription: 'Читай по слогам',
    icon: 'TextCursor',
    getLevelDescription: (level) => `Скорость ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Вращающийся текст',
    baseDescription: 'Читай под углом',
    icon: 'RotateCw',
    getLevelDescription: (level) => `Угол ${(level + 1) * 15}°`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Пропущенные буквы',
    baseDescription: 'Угадай пропущенное',
    icon: 'FileQuestion',
    getLevelDescription: (level) => `${level + 2} пропуска`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Лабиринт слов',
    baseDescription: 'Следуй за текстом',
    icon: 'Route',
    getLevelDescription: (level) => `${level + 5} поворотов`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  }
];

const hemispheresTemplates: GameTemplate[] = [
  {
    name: 'Рисуй двумя руками',
    baseDescription: 'Одновременное рисование',
    icon: 'PenTool',
    getLevelDescription: (level) => `Фигура ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Правая-левая',
    baseDescription: 'Различай стороны',
    icon: 'Move',
    getLevelDescription: (level) => `Скорость ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Цвет-слово',
    baseDescription: 'Называй цвет',
    icon: 'Paintbrush',
    getLevelDescription: (level) => `${level + 5} слов`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Перекрёстные движения',
    baseDescription: 'Координация',
    icon: 'Activity',
    getLevelDescription: (level) => `${level + 3} движения`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Зеркальное письмо',
    baseDescription: 'Пиши зеркально',
    icon: 'FlipHorizontal2',
    getLevelDescription: (level) => `${level + 3} буквы`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Одновременные узоры',
    baseDescription: 'Рисуй разные фигуры',
    icon: 'Shapes',
    getLevelDescription: (level) => `Сложность ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Ритм двух рук',
    baseDescription: 'Разные ритмы',
    icon: 'Drum',
    getLevelDescription: (level) => `${level + 2} такта`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Буквы в зеркале',
    baseDescription: 'Читай зеркальный текст',
    icon: 'FlipVertical2',
    getLevelDescription: (level) => `${level + 4} слова`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Кинезиология',
    baseDescription: 'Упражнения для мозга',
    icon: 'Hand',
    getLevelDescription: (level) => `Комплекс ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  },
  {
    name: 'Нейрогимнастика',
    baseDescription: 'Движения для полушарий',
    icon: 'Dumbbell',
    getLevelDescription: (level) => `Уровень ${level + 1}`,
    getDifficulty: (level) => level <= 3 ? 'easy' : level <= 6 ? 'medium' : 'hard'
  }
];

function generateGames(templates: GameTemplate[], startId: number): Game[] {
  const games: Game[] = [];
  for (let i = 0; i < 100; i++) {
    const templateIndex = i % 10;
    const level = Math.floor(i / 10);
    const template = templates[templateIndex];
    
    games.push({
      id: startId + i,
      name: template.name,
      description: template.getLevelDescription(level),
      difficulty: template.getDifficulty(level),
      icon: template.icon,
      unlocked: i === 0,
      completed: false,
      level: level + 1
    });
  }
  return games;
}

export const categories: Category[] = [
  {
    id: 'logic',
    name: 'Логика',
    icon: 'Brain',
    color: 'bg-purple',
    gameTemplates: logicTemplates,
    games: generateGames(logicTemplates, 1)
  },
  {
    id: 'memory',
    name: 'Память',
    icon: 'BookOpen',
    color: 'bg-pink',
    gameTemplates: memoryTemplates,
    games: generateGames(memoryTemplates, 101)
  },
  {
    id: 'thinking',
    name: 'Мышление',
    icon: 'Sparkles',
    color: 'bg-blue',
    gameTemplates: thinkingTemplates,
    games: generateGames(thinkingTemplates, 201)
  },
  {
    id: 'reading',
    name: 'Скорочтение',
    icon: 'BookMarked',
    color: 'bg-green',
    gameTemplates: readingTemplates,
    games: generateGames(readingTemplates, 301)
  },
  {
    id: 'hemispheres',
    name: 'Межполушарные связи',
    icon: 'GitBranch',
    color: 'bg-gold',
    gameTemplates: hemispheresTemplates,
    games: generateGames(hemispheresTemplates, 401)
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
