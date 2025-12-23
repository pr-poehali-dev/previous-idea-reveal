import SudokuGame from './logic/SudokuGame';
import ChessGame from './logic/ChessGame';
import SequenceGame from './logic/SequenceGame';
import UniversalGame from './UniversalGame';
import { Game } from '../game-app/types';

interface GameComponentProps {
  game: Game;
  onBack: () => void;
  onComplete: (score: number) => void;
}

export default function GameComponent({ game, onBack, onComplete }: GameComponentProps) {
  const gameId = game.id;
  const gameType = (gameId - 1) % 10;
  const level = game.level;

  if (gameId >= 1 && gameId <= 100) {
    switch (gameType) {
      case 0: return <SudokuGame level={level} onBack={onBack} onComplete={onComplete} />;
      case 1: return <ChessGame level={level} onBack={onBack} onComplete={onComplete} />;
      case 2: return <SequenceGame level={level} onBack={onBack} onComplete={onComplete} />;
      case 3: return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
      case 4: return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
      case 5: return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
      case 6: return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
      case 7: return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
      case 8: return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
      case 9: return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
    }
  }

  if (gameId >= 101 && gameId <= 200) {
    return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
  }

  if (gameId >= 201 && gameId <= 300) {
    return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
  }

  if (gameId >= 301 && gameId <= 400) {
    return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
  }

  if (gameId >= 401 && gameId <= 500) {
    return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
  }

  return <UniversalGame title={game.name} description={game.description} level={level} icon={game.icon} onBack={onBack} onComplete={onComplete} />;
}
