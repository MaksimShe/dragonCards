import { getImage } from "@/utils/getImage";
import Image from "next/image";

export const Background = () => {
  const bgImage = getImage("dragon-bg", "background");

  return (
    <div className="w-full h-full aspect-square relative max-w-[730px]">
      <Image
        src={bgImage}
        alt="background"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1080px) 730px, 730px"
        priority
        className="object-cover rounded-r-2xl max-lg:rounded-2xl"
        loading="eager"
      />
    </div>
  )
}