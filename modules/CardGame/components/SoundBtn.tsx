import { useGameStore } from "@/store/useGameStore";
import { getImage } from "@/utils/getImage";
import Image from "next/image";

export const SoundBtn = () => {
  const { hasSound, changeSound } = useGameStore();
  const soundImg = {
    on: getImage('sound-on', 'icons', 'svg'),
    off: getImage('sound-off', 'icons', 'svg')
  }

  return (
    <button
      className="w-10 h-10 absolute top-4 left-4 flex justify-center items-center
        bg-[var(--bet-bg-color)] rounded-lg hover:bg-[var(--button-hover)]"
      onClick={changeSound}
    >
      <Image src={hasSound ? soundImg.on : soundImg.off} alt="sound" width={24} height={24} />
    </button>
  )
}