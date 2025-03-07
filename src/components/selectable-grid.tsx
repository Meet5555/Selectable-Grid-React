import { useState } from "react";
import { mergeClassnames } from "../utils/merge-classnames";

interface SelectableGridProps {
  rows?: number;
  cols?: number;
}

const SelectableGrid = ({ rows = 10, cols = 10 }: SelectableGridProps) => {
  const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [anchorBox, setAnchorBox] = useState<number | null>(null);

  const handleMouseDown = (boxNumber: number) => {
    setIsDragging(true);
    setAnchorBox(boxNumber);
    setSelectedBoxes([boxNumber]);
  };

  const handleMouseEnter = (boxNumber: number) => {
    if (isDragging && anchorBox !== null) {
      const startBox = anchorBox;
      const endBox = boxNumber;

      const startRow = Math.floor((startBox - 1) / cols);
      const endRow = Math.floor((endBox - 1) / cols);
      const startCol = (startBox - 1) % cols;
      const endCol = (endBox - 1) % cols;

      const minRow = Math.min(startRow, endRow);
      const maxRow = Math.max(startRow, endRow);
      const minCol = Math.min(startCol, endCol);
      const maxCol = Math.max(startCol, endCol);

      const selected: number[] = [];
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          selected.push(row * cols + col + 1);
        }
      }

      setSelectedBoxes(selected);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="grid w-fit mx-auto gap-1 select-none"
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}>
      {[...Array(rows * cols).keys()].map((i) => {
        return (
          <div
            key={i}
            className={mergeClassnames([
              "flex items-center justify-center bg-gray-300 w-[35px] h-[35px]",
              selectedBoxes.includes(i + 1) ? "bg-red-50" : "",
            ])}
            onMouseDown={() => handleMouseDown(i + 1)}
            onMouseEnter={() => handleMouseEnter(i + 1)}>
            {i + 1}
          </div>
        );
      })}
    </div>
  );
};

export default SelectableGrid;
