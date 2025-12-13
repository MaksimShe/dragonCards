import { useGameStore } from "@/store/useGameStore";
import { useStartGame } from "@/hooks/useStartGame";
import { useSoundManager } from "@/hooks/useSoundManager";
import { getImage } from "@/utils/getImage";
import { shuffledCards } from "@/utils/shuffleCards";
import { riskTypes } from "@/types/RiskTypes";
import { GameStatus } from "@/types/GameStatus";
import { SoundTypes } from "@/types/SoundTypes";
import { useEffect, useState } from "react";
import cn from "classnames";
import Image from "next/image";

export const HiddenCards = () => {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(Array(6).fill(false));

  const { gameStatus, hiddenCardsOrder, setHiddenCardsOrder, risk, bet, addToBalance } = useGameStore();
  const { calculateWin } = useStartGame();
  const { playSound } = useSoundManager();

  const cardBackside = getImage('backface');
  const cardsHidden = Array(6).fill(cardBackside);

  useEffect(() => {
    if (hiddenCardsOrder.length > 0) {
      hiddenCardsOrder.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [hiddenCardsOrder]);

  useEffect(() => {
    if (gameStatus === GameStatus.process) {
      playSound(SoundTypes.reveal)
      setFlippedCards(Array(6).fill(false));

      const newCards = shuffledCards();
      setHiddenCardsOrder(newCards);
    }

    if (gameStatus === GameStatus.opening) {
      flippedCards.forEach((_, index) => {
        setTimeout(() => {
          playSound(SoundTypes.cardFlip);
          setFlippedCards(prev => {
            const newFlipped = [...prev];
            newFlipped[index] = true;
            return newFlipped;
          });
        }, index * 250);
      });
    }

    if (gameStatus === GameStatus.opened) {
      const result = calculateWin();
      if (result.includes(2) && !result.includes(0)) {
        playSound(SoundTypes.reward)
        const multipliers = result.reduce((acc, item, index) => {
          if (item === 2) {
            acc.push(riskTypes[risk][index]);
          }
          return acc;
        }, [] as number[]);

        const winSum = (multipliers.reduce((acc, i) => acc + i * bet, 0));
        addToBalance(winSum);
      } else {
        playSound(SoundTypes.result)
      }
    }
  }, [gameStatus]);


  return (
    <div className="grid grid-cols-6 gap-3">
      {
        cardsHidden.map((card, index) => (
          <div
            key={index}
            className="relative w-full aspect-[1/2] perspective-[1000px]"
          >
            <div
              className={cn(
                "relative w-full h-full transition-transform duration-300 [transform-style:preserve-3d]",
                { "[transform:rotateY(180deg)]": flippedCards[index] }
              )}
            >
              <div className="absolute w-full h-full [backface-visibility:hidden]">
                <Image
                  src={card}
                  alt="cardback"
                  fill
                  sizes="(max-width: 1024px) 20vw, 12vw"
                  priority
                  className="object-cover rounded-xl"
                />
              </div>

              <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <Image
                  src={hiddenCardsOrder[index] || card}
                  alt={`card front ${index}`}
                  fill
                  sizes="(max-width: 1024px) 20vw, 12vw"
                  className="object-cover rounded-xl"
                  priority
                />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}