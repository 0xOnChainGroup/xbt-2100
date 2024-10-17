"use client";
import { useEffect, useRef, useState } from "react";
enum animationCursorTypeEnum {
  trail = "trail",
  explosion = "explosion",
}
type CursorPosition = {
  x: number;
  y: number;
  rand: number;
  randX: number;
  randY: number;
  id: number;
  direction: number;
  type: animationCursorTypeEnum.trail | animationCursorTypeEnum.explosion;
};

export function useCustomCursor() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [positions, setPositions] = useState<CursorPosition[]>([]);
  const idRef = useRef(0);
  const lastTimestampRef = useRef(0);

  useEffect(() => {
    const onMouseDownCursor = (e: MouseEvent) => {
      setIsMouseDown(true);
      const directions = Array.from({ length: 8 }, (_, i) => i);
      directions.forEach((direction) => {
        idRef.current += 1;
        const newPos = {
          x: e.clientX,
          y: e.clientY + window.scrollY,
          id: idRef.current,
          direction,
          type: animationCursorTypeEnum.explosion,
          rand: Math.random(),
          randX: Math.random(),
          randY: Math.random(),
        };
        setPositions((prevPositions) => [...prevPositions, newPos]);

        setTimeout(() => {
          setPositions((prevPositions) =>
            prevPositions.filter((pos) => pos.id !== newPos.id),
          );
        }, 1000);
      });
    };

    const onMouseUpCursor = () => {
      setIsMouseDown(false);
    };

    const onMouseMoveCursor = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTimestampRef.current >= 40) {
        lastTimestampRef.current = now;
        idRef.current += 1;
        const direction = Math.floor(Math.random() * 6);
        const newPos = {
          x: e.clientX,
          y: e.clientY + window.scrollY,
          id: idRef.current,
          direction,
          type: animationCursorTypeEnum.trail,
          rand: Math.random(),
          randX: Math.random(),
          randY: Math.random(),
        };
        setPositions((prevPositions) => [...prevPositions, newPos]);

        setTimeout(() => {
          setPositions((prevPositions) =>
            prevPositions.filter((pos) => pos.id !== newPos.id),
          );
        }, 1000);
      }
    };

    window.addEventListener("mousedown", onMouseDownCursor);
    window.addEventListener("mouseup", onMouseUpCursor);
    window.addEventListener("mousemove", onMouseMoveCursor);

    return () => {
      window.removeEventListener("mousedown", onMouseDownCursor);
      window.removeEventListener("mouseup", onMouseUpCursor);
      window.removeEventListener("mousemove", onMouseMoveCursor);
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = isMouseDown
      ? "url(/idees_curseur_1_up32x32.png) 16 16, help"
      : 'url("/idees_curseur_1_up32x32.png") 16 16, help';
  }, [isMouseDown]);
  return { positions };
}
