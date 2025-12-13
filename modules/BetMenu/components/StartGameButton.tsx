import { useGameStore } from "@/store/useGameStore";
import { useStartGame } from "@/hooks/useStartGame";
import { useSoundManager } from "@/hooks/useSoundManager";
import { SoundTypes } from "@/types/SoundTypes";
import { bntStatus } from "@/utils/bntStatus";
import { MIN_BET } from "./BetControls";
import cn from "classnames";

export const StartGameButton = () => {
  const { bet, subtractFromBalance, gameStatus, balance } = useGameStore();
  const { startGame } = useStartGame()
  const { playSound } = useSoundManager();

  const handleStartGame = () => {
    playSound(SoundTypes.click);
    subtractFromBalance(bet);
    startGame();
  };

  return (
    <button
      className={cn("w-full h-10 bg-[var(--button-place-bet)] font-bold rounded-lg",
        "hover:bg-[var(--button-place-bet-hover)]",
        {
          "opacity-75": bntStatus(gameStatus),
          "opacity-50 bg-red-900 hover:bg-red-900": balance < MIN_BET
        },

      )}
      onClick={handleStartGame}
      disabled={bntStatus(gameStatus) || balance < MIN_BET}
    >
      Place Bet
    </button>
  )
}