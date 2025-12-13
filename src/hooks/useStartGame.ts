import { useCallback, useRef } from "react";
import { useGameStore } from "@/store/useGameStore";
import { riskTypes } from "@/types/RiskTypes";
import { GameStatus } from "@/types/GameStatus";
import { CardStatus } from "@/types/CardStatus";

const GAME_TIMINGS = {
  SHUFFLE_DURATION: 1500,
  FLIP_DURATION: 1800,
} as const;

export const useStartGame = () => {
  const {
    changeGameStatus,
    userCardsOrder,
    hiddenCardsOrder,
    setFinishGameStatus,
    risk
  } = useGameStore();

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const calculateWin = useCallback(() => {
    const results = userCardsOrder.map((userCard, index) => {
      if (userCard === hiddenCardsOrder[index]) {
        return riskTypes[risk][index] === 0
          ? CardStatus.lose
          : CardStatus.win;
      }
      return CardStatus.none;
    });

    setFinishGameStatus(results);
    return results;
  }, [userCardsOrder, hiddenCardsOrder, risk, setFinishGameStatus]);

  const finishGame = useCallback(() => {
    const timeout = setTimeout(() => {
      changeGameStatus(GameStatus.opened);
    }, GAME_TIMINGS.FLIP_DURATION);

    timeoutsRef.current.push(timeout);
  }, [changeGameStatus]);

  const startGame = useCallback(() => {
    clearTimeouts();

    changeGameStatus(GameStatus.process);

    const openTimeout = setTimeout(() => {
      changeGameStatus(GameStatus.opening);
      finishGame();
    }, GAME_TIMINGS.SHUFFLE_DURATION);

    timeoutsRef.current.push(openTimeout);
  }, [changeGameStatus, finishGame, clearTimeouts]);

  const resetGame = useCallback(() => {
    clearTimeouts();
    changeGameStatus(GameStatus.wait);
  }, [changeGameStatus, clearTimeouts]);

  return {
    startGame,
    calculateWin,
    resetGame,
    clearTimeouts
  };
}