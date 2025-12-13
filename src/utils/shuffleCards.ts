import { DragonCardType } from "@/types/DragonCardType";

export const shuffledCards = () => {
  const cards = [
    DragonCardType.earth,
    DragonCardType.fire,
    DragonCardType.empty,
    DragonCardType.frost,
    DragonCardType.shadow,
    DragonCardType.storm,
  ];

  return cards
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}