import { roundMoney } from "@/helpers/roundMoney";
import { useGameStore } from "@/store/useGameStore";

export const Balance = () => {
  const { balance } = useGameStore();

  return (
    <div className="bg-[var(--button-bg)] flex py-2.5 justify-center items-center gap-2 rounded-lg">
      <span className="text-[var(--secondary-text-color)]">Balance:</span>
      <span>{roundMoney(balance)}</span>
    </div>
  )
}