import { create } from 'zustand';
import { shuffledCards } from "@/utils/shuffleCards";
import { GameState } from "@/types/GameState";
import { RiskEnum } from "@/types/RiskEnum";
import { GameStatus } from "@/types/GameStatus";
import { DragonCardType } from "@/types/DragonCardType";

export const useGameStore = create<GameState>()(
  (set) => ({
    balance: 1000,
    addToBalance: (howMuch) =>
      set((state) => ({ balance: state.balance + howMuch })),

    subtractFromBalance: (howMuch) =>
      set((state) => ({ balance: state.balance - howMuch })),

    bet: 10,
    setBet: (bet) => set({ bet }),

    risk: RiskEnum.low,
    setRisk: (risk: RiskEnum) => set({ risk }),

    hasSound: true,
    changeSound: () => set((state) => ({ hasSound: !state.hasSound })),

    gameStatus: GameStatus.wait,
    changeGameStatus: (gameStatus: GameStatus) => set({ gameStatus }),

    finishGameStatus: [1, 1, 1, 1, 1, 1],
    setFinishGameStatus: (status: number[]) => set({ finishGameStatus: status }),

    hiddenCardsOrder: shuffledCards(),
    setHiddenCardsOrder: (cards: string[]) => set({ hiddenCardsOrder: cards }),

    userCardsOrder: [
      DragonCardType.earth,
      DragonCardType.fire,
      DragonCardType.empty,
      DragonCardType.frost,
      DragonCardType.shadow,
      DragonCardType.storm,
    ],

    userCardsSwipe: (fromIndex, toIndex) =>
      set((state) => {
        const newOrder = [...state.userCardsOrder];
        [newOrder[fromIndex], newOrder[toIndex]] = [newOrder[toIndex], newOrder[fromIndex]];
        return { userCardsOrder: newOrder };
      }),
  })
);