import { Howl } from 'howler';
import { useGameStore } from '@/store/useGameStore';
import { useEffect, useRef } from 'react';

export const useSoundManager = () => {
  const { hasSound } = useGameStore();
  const soundsRef = useRef<{ [key: string]: Howl }>({});

  useEffect(() => {
    soundsRef.current = {
      cardFlip: new Howl({
        src: ['/sounds/card-flip.mp3'],
        volume: 0.7,
        preload: true
      }),
      bet: new Howl({
        src: ['/sounds/bet.mp3'],
        volume: 0.7,
        preload: true
      }),
      click: new Howl({
        src: ['/sounds/click.wav'],
        volume: 0.6,
        preload: true
      }),
      result: new Howl({
        src: ['/sounds/result.mp3'],
        volume: 0.6,
        preload: true
      }),
      reveal: new Howl({
        src: ['/sounds/reveal.mp3'],
        volume: 0.4,
        preload: true
      }),
      reward: new Howl({
        src: ['/sounds/reward.mp3'],
        volume: 0.5,
        preload: true
      }),
    };

    return () => {
      Object.values(soundsRef.current).forEach(sound => sound.unload());
    };
  }, []);

  const playSound = (soundName: string) => {
    if (hasSound && soundsRef.current[soundName]) {
      soundsRef.current[soundName].play();
    }
  };

  return { playSound };
};