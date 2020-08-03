import { AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { useDispatch, useSelector } from "react-redux";
import root from "../redux/root";
import Item from "./Item";
import { Box, makeStyles, useTheme } from "@material-ui/core";
import * as colors from "@material-ui/core/colors";

const useSize = (ref) => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    if (ref.current) {
      const updateSize = () => {
        setSize([ref.current.offsetWidth, ref.current.offsetHeight]);
      };
      window.addEventListener("resize", updateSize);
      updateSize();

      return () => window.removeEventListener("resize", updateSize);
    }
  }, [ref.current]);
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

export default () => {
  const classes = useStyles();
  const board = useSelector(root.selectors.board);
  const columnCount = useSelector(root.selectors.columnCount);
  const rowCount = useSelector(root.selectors.rowCount);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleGrab = (index, item) => (e) => {
    dispatch(root.actions.grab({ item, index }));
  };
  const handleDrop = (index, item) => (e) => {
    dispatch(root.actions.drop({ index, item }));
  };
  const handleClick = (index, item) => (e) => {
    dispatch(root.actions.select({ index, item }));
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
          {board.map((_, columnIndex) =>
            _.map((item, rowIndex) =>
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
                    <Item
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
