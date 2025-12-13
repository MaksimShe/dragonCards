import { useGameStore } from "@/store/useGameStore";
import { useRiskManage } from "@/hooks/useRiskManage";
import { GameStatus } from "@/types/GameStatus";
import { useMemo } from "react";
import cn from "classnames";

export const Result = () => {
  const { risk, finishGameStatus, gameStatus } = useGameStore();
  const { giveRisk } = useRiskManage();

  const chances = useMemo(() => giveRisk(risk), [risk]);

  return (
    <div className="grid grid-cols-6 gap-3 font-['MedievalSharp'] text-2xl font-bold">
      {chances.map((chance, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center justify-center bg-[#111c] rounded-lg py-4",
            {
              "text-green-500":
                finishGameStatus[index] === 2 &&
                gameStatus === GameStatus.opened,
              "text-red-500":
                finishGameStatus[index] === 0 &&
                gameStatus === GameStatus.opened,
            }
          )}
        >
          <span className="text-center">
            {chance === 0 ? "lost" : `${chance}x`}
          </span>
        </div>
      ))}
    </div>
  );
};
