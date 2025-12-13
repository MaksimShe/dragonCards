import { useGameStore } from "@/store/useGameStore";
import { useState, DragEvent } from "react";
import Image from "next/image";
import cn from "classnames";

export const PlayerCards = () => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const { userCardsOrder, userCardsSwipe } = useGameStore();

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      userCardsSwipe(draggedIndex, dropIndex);
    }

    handleDragEnd();
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const isActiveIndex = (index: number) => {
    return draggedIndex === index;
  }

  const isActiveOverIndex = (index: number) => {
    return dragOverIndex === index;
  }

  return (
    <div className="grid grid-cols-6 gap-3">
      {
        userCardsOrder.map((card, index) => (
          <div
            key={index}
            className={cn("relative w-full aspect-[1/2] cursor-grab active:cursor-grabbing transition-all",
              {
                'opacity-50 scale-95': isActiveIndex(index),
                'scale-105' : isActiveOverIndex(index),
              })
            }
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            <Image
              src={card}
              alt={`card ${index}`}
              width={150}
              height={300}
              className="w-full h-full object-cover rounded-xl pointer-events-none"
            />
          </div>
        ))
      }
    </div>
  )
}
