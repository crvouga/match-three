import { Box } from "@material-ui/core";
import { motion } from "framer-motion";
import * as R from "ramda";
import React from "react";
import { Flipped } from "react-flip-toolkit";
import { Status } from "../match-three";
import { useMatchThree } from "../match-three/useMatchThree";
import { GameBoardItem } from "./GameBoardItem";

const toPercent = (decimal) => `${decimal * 100}%`;

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

export const GameBoardSlot = (props) => {
  const {
    rowIndex,
    columnIndex,
    boardHeight,
    boardWidth,
    item,
    status,
  } = props;

  const { grabbed, columnCount, rowCount, grab, drop } = useMatchThree();

  const isGrabbed = R.equals(grabbed, [columnIndex, rowIndex]);

  const handleGrab = () => {
    if (isGrabbed) {
      grab(undefined);
    } else {
      grab([columnIndex, rowIndex]);
    }
  };

  const handleDrop = () => {
    if (grabbed) {
      drop([columnIndex, rowIndex]);
    }
  };

  const styles = {
    position: "absolute",
    top: toPercent(rowIndex / rowCount),
    left: toPercent(columnIndex / columnCount),
    width: boardWidth / columnCount,
    height: boardHeight / rowCount,
    zIndex: isGrabbed ? 2 : 1,
    cursor: status === Status.COLLAPSING ? "grab" : undefined,
  };

  return (
    <Flipped key={item.id} flipId={item.id}>
      <Box style={styles} onMouseDown={handleGrab} onMouseEnter={handleDrop}>
        <motion.div
          style={{ width: "100%", height: "100%" }}
          variants={selectedVariants}
          initial="notSelected"
          animate={isGrabbed ? "selected" : "notSelected"}
        >
          <GameBoardItem item={item} />
        </motion.div>
      </Box>
    </Flipped>
  );
};
