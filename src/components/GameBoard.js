import { Box } from "@material-ui/core";
import { AnimatePresence } from "framer-motion";
import React, { useRef } from "react";
import { Flipper } from "react-flip-toolkit";
import { useMatchThree } from "../match-three/useMatchThree";
import { GameBoardSlot } from "./GameBoardSlot";
import { useSize } from "./useSize";
import { useStylesCursor } from "./useStylesCursor";

export const GameBoard = () => {
  const matchThree = useMatchThree();
  const cursorClassName = useStylesCursor();
  const { board, columnCount, rowCount } = matchThree;

  const ref = useRef();
  const [boardWidth] = useSize(ref);
  const boardHeight = (boardWidth / columnCount) * rowCount;

  const flipKey = JSON.stringify(board);

  return (
    <Box
      className={cursorClassName}
      ref={ref}
      width="100%"
      height={boardHeight}
      position="relative"
    >
      <Flipper flipKey={flipKey}>
        <AnimatePresence>
          {board.map((column, columnIndex) =>
            column.map((item, rowIndex) =>
              item ? (
                <GameBoardSlot
                  key={item.id}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  item={item}
                  boardHeight={boardHeight}
                  boardWidth={boardWidth}
                />
              ) : null
            )
          )}
        </AnimatePresence>
      </Flipper>
    </Box>
  );
};
