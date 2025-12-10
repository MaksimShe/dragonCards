"use client";

import {Background} from "./components/Background";
import {SoundBtn} from "./components/SoundBtn";
import {HiddenCards} from "./components/HiddenCards";
import {PlayerCards} from "./components/PlayerCards";
import {Result} from "./components/Result";

export const CardGame = () => {
  return (
    <section className="relative w-full h-full lg:min-h-0">
      <div className="w-full h-full flex justify-center items-center">
        <Background />
        <SoundBtn />
      </div>

      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-full px-6 flex flex-col gap-8 max-w-[730px]">
        <HiddenCards />
        <PlayerCards />
        <Result />
      </div>
    </section>
  );
};