import { useGameStore } from "@/store/useGameStore";
import { useSoundManager } from "@/hooks/useSoundManager";
import { roundMoney } from "@/helpers/roundMoney";
import { bntStatus } from "@/utils/bntStatus";
import { SoundTypes } from "@/types/SoundTypes";
import { ChangeEvent, useEffect } from "react";
import cn from "classnames";

const MAX_BET = 1000;
export const MIN_BET = 10;

export const BetControls = () => {
  const { bet, setBet, balance, gameStatus } = useGameStore();
  const { playSound } = useSoundManager();
  const betControlBtns = ['1/2', 'x2', 'Max']

  useEffect(() => {
    if (bet > balance) {
      setBet(balance <= 0 ? 0 : balance);
    }
  }, [gameStatus]);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '') {
      setBet(0);
      return;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return;
    }
    if (numValue > MAX_BET) {
      setBet(MAX_BET);
    } else {
      setBet(numValue);
    }
    if (bet > balance) {
      setBet(balance);
    }
  }

  const handleBlur = () => {
    if (bet < MIN_BET) {
      setBet(MIN_BET);
    }
  }

  const handleButtonClick = (action: string) => {
    let newBet = bet;
    playSound(SoundTypes.bet);

    switch(action) {
      case '1/2':
        newBet = Math.max(MIN_BET, bet / 2);
        break;
      case 'x2':
        newBet = Math.min(MAX_BET, balance, bet * 2);
        break;
      case 'Max':
        newBet = Math.min(MAX_BET, balance);
        break;
    }

    setBet(+roundMoney(newBet));
  }

  return (
    <div className="flex gap-2.5 flex-col">

      <h2 className="font-bold">Bet Amount</h2>

      <div className="flex justify-between text-[13px] text-[var(--secondary-text-color)] font-bold">
        <span>Max Bet: {roundMoney(MAX_BET)}</span>
        <span className="text-[var(--main-text-color)]">$</span>
      </div>

      <div className="flex bg-[var(--bet-input-bg-color)] p-2 items-center gap-2 rounded-lg">
        <input
          className="flex-1 min-w-0 h-8 px-2 rounded-sm font-bold"
          type="number"
          placeholder={`${MIN_BET}.00`}
          value={bet ? roundMoney(bet) : ''}
          onChange={handleChangeInput}
          onBlur={handleBlur}
          disabled={bntStatus(gameStatus)}
        />
        <div className="flex gap-2 flex-shrink-0">
          {betControlBtns.map((btn) => (
            <button
              key={btn}
              disabled={bntStatus(gameStatus)}
              onClick={() => handleButtonClick(btn)}
              className={cn("w-10 h-8 bg-[var(--bet-bg-color)] rounded-sm text-xs ",
                "text-[var(--secondary-text-color)] hover:bg-[var(--button-hover)] hover:text-[var(--button-text-hover)]",
                {
                  "opacity-75": bntStatus(gameStatus)
                }
              )}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}