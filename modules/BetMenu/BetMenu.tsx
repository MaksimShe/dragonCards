"use client";

import { BetControls } from "./components/BetControls";
import { RiskControls } from "./components/RiskControls";
import { StartGameButton } from "./components/StartGameButton";
import { Balance } from "./components/Balance";
import { FC } from "react";

type Props = {
  haveBalance: boolean;
}

export const BetMenu: FC<Props> = ({ haveBalance }) => {
  return (
    <section
      className="w-full h-full bg-[var(--bet-bg-color)] rounded-l-2xl flex flex-col
      justify-between px-6 py-4 text-[14px] max-lg:rounded-2xl"
    >
      <div className="flex flex-col gap-6">
        <BetControls />
        <RiskControls />
        <StartGameButton />
      </div>
      {haveBalance &&
        <Balance />
      }
    </section>
  );
};
