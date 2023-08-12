import React, { useState } from "react";

type Props = {
  targetRef: React.RefObject<HTMLDivElement>;
};

export const Draggable: React.FC<Props> = ({ targetRef }) => {
  const [initialPos, setInitialPos] = useState<number | null>(null);
  const [initialSize, setInitialSize] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(0);

  const initial = (e: React.DragEvent<HTMLDivElement>) => {
    setInitialPos(e.clientX);
    setInitialSize(targetRef.current?.offsetWidth || 0);
  };

  const resize = (e: React.DragEvent<HTMLDivElement>) => {
    if (initialPos !== null && initialSize !== null) {
      setWidth(initialSize - (e.clientX - initialPos));
      targetRef.current!.style.width = `${width}px`;
    }
  };

  return (
    <div
      className="absolute left-0 top-0 w-1 h-full cursor-ew-resize"
      draggable={true}
      onDrag={resize}
      onDragStart={initial}
    ></div>
  );
};
