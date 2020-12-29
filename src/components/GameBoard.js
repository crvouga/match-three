import { Box, makeStyles } from "@material-ui/core";
import * as colors from "@material-ui/core/colors";
import { AnimatePresence } from "framer-motion";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { useMatchThree } from "../match-three/useMatchThree";
import { GameBoardItem } from "./GameBoardItem";

const useSize = (ref) => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    if (ref.current) {
      const updateSize = () => {
        setSize([ref.current.offsetWidth, ref.current.offsetHeight]);
      };

      window.addEventListener("resize", updateSize);

      updateSize();

      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }
  }, [ref]);

  return size;
};

const toFill = (item) => colors[item.color][500];

const toPercent = (decimal) => `${decimal * 100}%`;

const useStyles = makeStyles((theme) => ({
  checker: {
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, .2) 50%, transparent 50%, transparent)",
  },
}));

export const GameBoard = () => {
  const classes = useStyles();
  const matchThree = useMatchThree();
  const { board, columnCount, rowCount } = matchThree;

  const handleClick = (index, item) => (e) => {
    matchThree.select({ index, item });
  };

  const ref = useRef();

  const [width] = useSize(ref);

  const height = (width / columnCount) * rowCount;

  return (
    <Box ref={ref} width="100%" height={height} position="relative">
      <div
        style={{
          postion: "aboslute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Flipper flipKey={JSON.stringify(board)} className={classes.checker}>
        <AnimatePresence>
          {board.map((column, columnIndex) =>
            column.map((item, rowIndex) =>
              item ? (
                <Flipped key={item.id} flipId={item.id}>
                  <div
                    style={{
                      position: "absolute",
                      top: toPercent(rowIndex / rowCount),
                      left: toPercent(columnIndex / columnCount),
                      width: width / columnCount,
                      height: width / columnCount,
                      color: toFill(item),
                    }}
                    onClick={handleClick([columnIndex, rowIndex], item)}
                  >
                    <GameBoardItem
                      width={width}
                      rowIndex={rowIndex}
                      columnIndex={columnIndex}
                      item={item}
                    />
                  </div>
                </Flipped>
              ) : null
            )
          )}
        </AnimatePresence>
      </Flipper>
    </Box>
  );
};