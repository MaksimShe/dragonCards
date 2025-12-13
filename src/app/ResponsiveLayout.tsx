'use client';

import { BetMenu } from "../../modules/BetMenu/BetMenu";
import {CardGame} from "../../modules/CardGame/CargGame";
import {useMediaQuery} from "react-responsive";
import {Balance} from "../../modules/BetMenu/components/Balance";
import {useImagePreloader} from "@/hooks/useImagePreloader";
import {LoadingScreen} from "../../modules/LoadingScreen";

export default function ResponsiveLayout() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const { imagesLoaded, loadingProgress } = useImagePreloader();

  if (!imagesLoaded) {
    return <LoadingScreen progress={loadingProgress} />;
  }

  return (
    <div className="w-full min-h-screen overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[1080px] mx-auto py-6 px-4">
        {isDesktop ? (
          <div className="grid grid-cols-[350px_minmax(0,1fr)]">
            <BetMenu haveBalance={isDesktop} />
            <CardGame />
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full max-w-[730px] mx-auto">
            <Balance />
            <CardGame />
            <BetMenu haveBalance={isDesktop} />
          </div>
        )}
      </div>
    </div>
  );
}