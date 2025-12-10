import { useGameStore } from "@/store/useGameStore";
import { useSoundManager } from "@/hooks/useSoundManager";
import { bntStatus } from "@/utils/bntStatus";
import { SoundTypes } from "@/types/SoundTypes";
import cn from "classnames";

export const RiskControls = () => {
  const riskControlBtns = ['Low', 'Medium', 'High', 'Classic'];

  const { risk, setRisk, gameStatus } = useGameStore();
  const { playSound } = useSoundManager();

  const handleClick = (index: number) => {
    playSound(SoundTypes.bet);
    setRisk(index)
  }
  console.log(risk);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Risk</h2>
      <div className="flex gap-2 w-full">
        {riskControlBtns.map((btn, index) => (
          <button
            key={btn}
            disabled={bntStatus(gameStatus)}
            className={cn(
              "h-8 bg-[var(--button-bg)] ",
              "flex flex-1 items-center justify-center rounded-md",
              {
                "bg-[var(--button-hover)] text-[var(--button-bg-active)]" : index === risk,
                "hover:bg-[var(--button-hover)] hover:text-[var(--button-text-hover)] text-[var(--secondary-text-color)]" : index !== risk,
                "opacity-75": bntStatus(gameStatus)
              }
            )}
            onClick={() => handleClick(index)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  )
}