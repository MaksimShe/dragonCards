import { GameStatus } from "@/types/GameStatus";

export const bntStatus = (gameStatus: GameStatus) => {
  return !(gameStatus === GameStatus.wait || gameStatus === GameStatus.opened);
}