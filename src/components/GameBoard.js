import { Box, makeStyles } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import * as R from "ramda";
import React, { useRef } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { useMatchThree } from "../match-three/useMatchThree";
import { GameBoardItem } from "./GameBoardItem";
import { useSize } from "./useSize";
const toPercent = (decimal) => `${decimal * 100}%`;

const useStyles = makeStyles((theme) => ({
  checker: {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent)",
  },
}));

const selectedVariants = {
  notSelected: {
    scale: 1,
    opacity: 1,
  },
  selected: {
    scale: 1 + 1 / 3,
    opacity: 3 / 4,
  },
};

export const GameBoard = () => {
  const classes = useStyles();
  const matchThree = useMatchThree();
  const { board, grabbed, columnCount, rowCount } = matchThree;

  const ref = useRef();

  const [width] = useSize(ref);

  const height = (width / columnCount) * rowCount;

  const flipKey = JSON.stringify(board);

  return (
    <Box ref={ref} width="100%" height={height} position="relative">
      <Flipper flipKey={flipKey} className={classes.checker}>
        <AnimatePresence>
          {board.map((column, columnIndex) =>
            column.map((item, rowIndex) =>
              item ? (
                <Flipped key={item.id} flipId={item.id}>
                  <Box
                    style={{
                      position: "absolute",
                      top: toPercent(rowIndex / rowCount),
                      left: toPercent(columnIndex / columnCount),
                      width: width / columnCount,
                      height: height / rowCount,
                      zIndex: R.equals(grabbed, [columnIndex, rowIndex])
                        ? 2
                        : 1,
                    }}
                    onMouseDown={() => {
                      if (R.equals(grabbed, [columnIndex, rowIndex])) {
                        matchThree.grab(undefined);
                      } else {
                        matchThree.grab([columnIndex, rowIndex]);
                      }
                    }}
                    onMouseEnter={() => {
                      if (grabbed) {
                        matchThree.drop([columnIndex, rowIndex]);
                      }
                    }}
                  >
                    <motion.div
                      style={{ width: "100%", height: "100%" }}
                      variants={selectedVariants}
                      initial="notSelected"
                      animate={
                        R.equals(grabbed, [columnIndex, rowIndex])
                          ? "selected"
                          : "notSelected"
                      }
                    >
                      <GameBoardItem item={item} />
                    </motion.div>
                  </Box>
                </Flipped>
              ) : null
            )
          )}
        </AnimatePresence>
      </Flipper>
    </Box>
  );
};
