import { RiskEnum } from "@/types/RiskEnum";
import { GameStatus } from "@/types/GameStatus";

export type GameState = {
  balance: number;
  addToBalance: (howMuch: number) => void;
  subtractFromBalance: (howMuch: number) => void;

  bet: number;
  setBet: (bet: number) => void;

  risk: RiskEnum;
  setRisk: (risk: RiskEnum) => void;

  hasSound: boolean;
  changeSound: () => void;

  finishGameStatus: number[];
  setFinishGameStatus: (status: number[]) => void;

  gameStatus: GameStatus;
  changeGameStatus: (gameStatus: GameStatus) => void;

  hiddenCardsOrder: string[];
  setHiddenCardsOrder: (hiddenCardsOrder: string[]) => void;

  userCardsOrder: string[];
  userCardsSwipe: (fromIndex: number, toIndex: number) => void;
}