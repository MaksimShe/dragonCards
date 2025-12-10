import { useGameStore } from "@/store/useGameStore";
import { riskTypes } from "@/types/RiskTypes";
import { GameStatus } from "@/types/GameStatus";
import { CardStatus } from "@/types/CardStatus";

export const useStartGame = () => {
  const { changeGameStatus, userCardsOrder, hiddenCardsOrder, setFinishGameStatus, risk } = useGameStore();

  const startGame = () => {
    changeGameStatus(GameStatus.process);
    setTimeout(() => {
      changeGameStatus(GameStatus.opening);
      finishGame();
    }, 1500)
  }

  const finishGame = () => {
    setTimeout(() => {
      changeGameStatus(GameStatus.opened);
    }, 1800)
  }

  const calculateWin = () => {
    const results = userCardsOrder.map((userCard, index) => {
      if (userCard === hiddenCardsOrder[index]) {
        return riskTypes[risk][index] === 0 ? CardStatus.lose : CardStatus.win;
      }
      return CardStatus.none;
    })

    setFinishGameStatus(results);
    return results;
  }

  return { startGame, calculateWin };
}